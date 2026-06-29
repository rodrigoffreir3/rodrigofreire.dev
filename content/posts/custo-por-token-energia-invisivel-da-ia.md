---
title: "Custo por Token: a fatura de energia invisível que ninguém mede na IA"
date: 2026-06-28
draft: false
tags: ["Deep-Tech", "GreenToken", "FinOps", "eBPF", "RAPL", "NVML", "Observability"]
description: "Toda empresa mede o gasto de nuvem da IA em dólares por mês, mas quase ninguém mede o que de fato importa: quantos watts e quantos centavos custa cada token gerado. Por que esse número é tão difícil de obter — e como medi-lo no nível do kernel."
---

# Custo por Token: a fatura de energia invisível que ninguém mede na IA

*Por Rodrigo Freire — Pesquisa e Desenvolvimento em Deep Tech*

Todo time de FinOps sabe responder quanto a empresa paga de nuvem por mês. Quase nenhum sabe responder a pergunta que realmente importa: **quanto custa, em watts e em centavos, cada token que o seu modelo gera?**

Esse vão — entre "pagamos X mil dólares de GPU por mês" e "o modelo Y custa Z centavos por mil tokens para rodar" — é onde mora um dos maiores desperdícios invisíveis da computação atual. E não é um problema de planilha. É um problema de instrumentação que vive lá embaixo, no nível do kernel.

Neste artigo eu decomponho por que esse número é tão difícil de obter, por que as ferramentas de observabilidade tradicionais não chegam até ele, e qual é a arquitetura que torna possível atribuir energia a um token específico. Vou ser franco também sobre onde a abordagem tem limites — inclusive a minha.

## A pergunta que parece simples e não é

A equação que define o problema cabe em uma linha:

```
custo_por_token = (W_cpu + W_dram + W_gpu) × tempo_inferência / tokens_gerados
```

Parece trivial. Não é. Cada termo dessa conta vive numa camada diferente do sistema, exposto por uma interface diferente, com uma granularidade diferente — e nenhuma ferramenta junta tudo num número só, atribuído ao processo certo, no instante certo.

O gargalo real da expansão de datacenters de IA hoje não é capital para comprar GPU. É **megawatt disponível na rede elétrica**. Quando a restrição física é energia, saber exatamente onde cada watt está sendo gasto deixa de ser curiosidade de engenheiro e vira decisão de negócio. Uma redução de 5% a 10% no consumo agregado de um cluster de inferência representa milhões de dólares por ano em eletricidade e refrigeração. Mas você não otimiza o que não mede — e ninguém está medindo no nível certo.

## Por que a observabilidade tradicional não chega lá

Pare e observe o que torna esse número escorregadio.

**A energia da CPU mora num lugar.** O consumo de CPU e DRAM é exposto pela interface RAPL (*Running Average Power Limit*) da Intel, lida via `/sys/class/powercap`. É um contador acumulado em microjoules, com subdomínios separados para o pacote do processador e para a memória. Útil — mas cobre só uma fatia do consumo.

**A energia da GPU mora em outro.** Numa inferência de LLM em datacenter, 80% a 90% dos watts estão na GPU, não na CPU. E a GPU não fala RAPL. Ela fala NVML (*NVIDIA Management Library*), uma biblioteca completamente separada, com sua própria API, suas próprias unidades, seu próprio modelo de processo. Quem mede só RAPL está medindo a ponta do iceberg e ignorando o bloco submerso.

**Os tokens moram num terceiro lugar.** O número de tokens gerados vive dentro do engine de inferência — vLLM, llama.cpp, Ollama — e cada um o expõe de um jeito. Alguns têm endpoint de métricas estruturado; outros só cospem no log.

**E a correlação temporal não mora em lugar nenhum.** Aqui está o nó. Ferramentas como Prometheus, DCGM e OpenTelemetry medem energia *agregada do host*. Elas dizem "este servidor consumiu tantos watts". Nenhuma delas responde "o processo de PID 214, rodando o modelo Llama, consumiu tantos watts de CPU **mais** tantos de GPU **enquanto** gerava estes tokens, nesta janela de 200 milissegundos". A atribuição atômica — energia ligada a um processo ligado a um output — simplesmente não existe nas ferramentas de prateleira.

Em resumo: toda ferramenta que pergunta *"quanto este host gastou?"* erra a pergunta. A pergunta certa é *"quanto este token custou?"* — e ela exige descer ao nível onde o escalonador do sistema operacional decide quem roda quando.

## A arquitetura: correlação no nível do kernel

A peça que ninguém tem é a ponte temporal entre o processo e a energia. E essa ponte se constrói com eBPF.

Um programa eBPF anexado ao tracepoint `sched/sched_switch` enxerga, com precisão de microssegundo, exatamente quando um worker de inferência entra e sai da CPU. Esse é o relógio que faltava. Com ele, dá para correlacionar a janela de execução de um PID específico com a leitura de energia daquele intervalo — somando a fatia de RAPL (CPU + DRAM) à leitura de NVML (GPU) atribuída àquele mesmo processo.

O fluxo, em camadas:

**1. Coleta de CPU e DRAM.** O leitor RAPL via `powercap` entrega watts de pacote e de memória. Um detalhe que morde quem implementa rápido demais: o contador é cíclico e estoura (`max_energy_range_uj`). Tratar o *wraparound* sem produzir watts negativos é obrigatório, não opcional.

**2. Coleta de GPU.** Bindings de NVML leem o consumo por dispositivo e — crucialmente — mapeiam qual PID está rodando em qual GPU via `nvmlDeviceGetComputeRunningProcesses`. Esse é o elo que liga o processo à placa.

**3. A janela temporal via eBPF.** O tracepoint de escalonamento define os limites exatos da janela de medição por processo, em vez de uma média grosseira do host inteiro.

**4. A contagem de tokens.** Aqui está a parte mais frágil de toda a cadeia, e vale honestidade total: contar tokens lendo o log de saída do engine é traiçoeiro. A fonte confiável é o endpoint de métricas nativo do engine — por exemplo, o contador `generation_tokens_total` do vLLM, que é estruturado, monotônico e livre de ambiguidade. O parsing de log deve ser fallback de último recurso, não a fonte de verdade.

## A lição que custou caro (e foi barata)

Sobre o ponto 4, uma confissão técnica que ilustra o método.

A primeira implementação que validei contava tokens fazendo parsing do log de saída, com uma lógica de deduplicação para evitar contar o mesmo evento duas vezes. A heurística usava o *valor numérico* como chave de identidade: se "gerou 50 tokens" aparecesse duas vezes em menos de meio segundo, a segunda ocorrência era descartada como duplicata.

O problema apareceu sob carga concorrente real. Quando vinte requisições idênticas geram 50 tokens cada, quase no mesmo milissegundo, a deduplicação as confundiu com repetições do mesmo evento — e descartou dezoito delas. Resultado: **subcontagem de 80%**. O número que deveria ser mil tokens virou duzentos.

A causa raiz não era o dedup. Era a tentativa de reconstruir, a partir de texto não-estruturado, um número que o engine já expunha de forma canônica. A correção não foi melhorar o parser — foi abandoná-lo como fonte primária e ler o contador estruturado do endpoint de métricas, exatamente como a inferência o reporta.

A lição vale além desse caso: **quando você se vê fazendo engenharia reversa de um dado que a fonte já entrega estruturado, você está otimizando o caminho errado.** O barato aqui foi descobrir isso num teste de mesa de cinco dólares, não num cluster de produção depois de prometer precisão a um cliente.

## Onde isso tem limites

Nenhuma arquitetura é mágica, e a honestidade sobre os próprios limites é o que separa pesquisa de marketing.

**A atribuição multi-modelo é difícil.** Num host que serve vários modelos ao mesmo tempo, dividir a energia entre eles com exatidão exige cuidado. A aproximação por tempo de CPU funciona bem para um único workload e vira estimativa quando há vários competindo pela mesma placa.

**RAPL é Intel.** A interface cobre CPU e DRAM em plataformas Intel; AMD e ARM têm seus próprios mecanismos, com cobertura desigual.

**Medir não é otimizar.** Saber o custo por token é o primeiro passo, não o último. O passo seguinte — agir sobre esse número — é um território com riscos próprios, sobretudo o de violar SLAs de latência se alguém ceder à tentação de estrangular processos no momento errado. Por isso a observabilidade pura, que só mede e nunca atua, é um produto defensável por si só: ela entrega o dado sem nunca colocar a inferência em risco.

## Conclusão

A indústria de IA aprendeu a medir gasto de nuvem em dólares por mês. O próximo nível de maturidade é medir eficiência energética por unidade de trabalho útil — watts por token, joules por requisição, centavos por mil tokens, atribuídos ao processo e ao modelo certos.

Esse número não vem de uma planilha nem de um dashboard de host. Ele vem de juntar três fontes que vivem em camadas diferentes do sistema — RAPL, NVML e eBPF — numa correlação temporal que só existe quando você desce até onde o kernel agenda os processos.

É um trabalho silencioso, invisível, e fica nas fundações. Mas é exatamente nas fundações que se decide quem vai conseguir escalar IA quando a restrição deixar de ser dinheiro e passar a ser, definitivamente, energia.
