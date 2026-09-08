---
title: "Sua empresa mede o gasto de IA em dólares por mês. O número que importa está escondido no kernel"
date: 2026-06-28
draft: false
tags: ["Deep-Tech", "FinOps", "eBPF", "RAPL", "NVML", "Observability"]
description: "Todo time de FinOps sabe o gasto mensal de nuvem da IA. Quase nenhum sabe quanto custa cada token gerado. Fui atrás desse número e descobri por que ele é tão difícil de obter — e cometi um erro de 80% no caminho."
---

# Sua empresa mede o gasto de IA em dólares por mês. O número que importa está escondido no kernel

*Por Rodrigo Freire — Pesquisa e Desenvolvimento em Deep Tech*

Faz um teste mental rápido. Se alguém perguntar quanto a sua empresa gasta de nuvem com IA por mês, você acha o número numa planilha. Agora a pergunta que quase ninguém consegue responder: **quanto custa, em watts e em centavos, cada token que o seu modelo gera?**

Eu fui atrás dessa segunda pergunta achando que seria simples. Não era. E o caminho me ensinou mais sobre observabilidade do que qualquer tutorial — inclusive me fez errar feio antes de acertar.

## A conta que parece trivial e não é

O problema cabe numa linha:

```
custo_por_token = (W_cpu + W_dram + W_gpu) × tempo / tokens_gerados
```

O detalhe cruel é que cada termo dessa conta vive numa camada diferente do sistema, exposto por uma interface diferente, com granularidade diferente. E nenhuma ferramenta de prateleira junta tudo num número só, atribuído ao processo certo, no instante certo.

E isso importa cada vez mais por um motivo concreto: o gargalo real da expansão de datacenters de IA hoje não é dinheiro para comprar GPU. É megawatt disponível na rede. Quando a restrição vira energia, saber onde cada watt está indo deixa de ser curiosidade e vira sobrevivência do negócio. Mas você não otimiza o que não enxerga.

## Por que as ferramentas que você já usa não chegam lá

Quando comecei, achei que Prometheus ou algum exporter resolveria. Aqui está por que não resolve:

**A energia da CPU mora num canto.** Consumo de CPU e DRAM é exposto pela interface RAPL, lida via sistema de arquivos. Útil, mas cobre só uma fatia.

**A energia da GPU mora em outro canto totalmente separado.** Numa inferência de LLM, 80% a 90% dos watts estão na GPU — e a GPU não fala RAPL. Ela fala NVML, uma biblioteca à parte, com API própria. Quem mede só RAPL mede a ponta do iceberg e ignora o bloco inteiro embaixo d'água.

**Os tokens moram dentro do engine.** vLLM, llama.cpp, Ollama — cada um expõe o número de um jeito.

**E a correlação não mora em lugar nenhum.** Esse é o nó. As ferramentas tradicionais medem energia agregada do host: "este servidor gastou tantos watts". Nenhuma responde "o processo de PID 214, rodando o modelo X, gastou tantos watts de CPU mais tantos de GPU enquanto gerava estes tokens nesta janela de 200 milissegundos". A atribuição que liga energia a processo a output simplesmente não existe pronta.

A virada de chave foi essa: toda ferramenta que pergunta "quanto este host gastou?" está errando a pergunta. A certa é "quanto este token custou?" — e respondê-la exige descer até onde o kernel decide quem roda quando.

## O erro de 80% que me ensinou a lição

Aqui vai a parte que dói confessar, mas que é o coração do aprendizado.

Para contar tokens, minha primeira versão lia o log de saída do engine e tinha uma lógica de deduplicação para não contar o mesmo evento duas vezes. A chave de identidade dessa dedup era o valor numérico: se "gerou 50 tokens" aparecesse duas vezes em menos de meio segundo, a segunda era descartada como repetição.

Funcionou nos meus testes simples. Aí veio a carga concorrente real. Quando vinte requisições idênticas geram 50 tokens cada, quase no mesmo milissegundo, a dedup confundiu requisições legítimas e diferentes com repetições do mesmo evento. Descartou dezoito delas. O número que deveria ser mil tokens virou duzentos. **Subcontagem de 80%.**

A causa raiz não era a dedup. Era a minha teimosia de reconstruir, a partir de texto de log não-estruturado, um número que o engine já entregava pronto e estruturado no endpoint de métricas dele. A correção não foi melhorar o parser — foi jogá-lo fora como fonte primária e ler o contador canônico que a inferência já reporta.

A lição vale muito além desse caso: **quando você se pega fazendo engenharia reversa de um dado que a fonte já entrega estruturado, você está otimizando o caminho errado.** E o barato foi descobrir isso num teste de mesa de cinco dólares, não num cluster de produção depois de prometer precisão a alguém.

## A arquitetura que finalmente fecha a conta

A peça que ninguém tem é a ponte temporal entre processo e energia. Ela se constrói com eBPF.

Um programa eBPF no tracepoint de escalonamento do kernel enxerga, com precisão de microssegundo, exatamente quando um worker de inferência entra e sai da CPU. Esse é o relógio que faltava. Com ele dá para correlacionar a janela de execução de um PID com a leitura de energia daquele intervalo — somando RAPL (CPU e DRAM) à leitura de NVML (GPU) do mesmo processo, e dividindo pelos tokens que aquele processo gerou na janela, lidos da fonte estruturada.

São três fontes que vivem em camadas diferentes, costuradas por uma correlação temporal que só existe quando você desce até o escalonador.

## Onde isso tem limite

Sendo honesto: num host que serve vários modelos ao mesmo tempo, dividir a energia com exatidão entre eles é difícil — a aproximação por tempo de CPU funciona para um workload e vira estimativa para vários. RAPL é coisa de Intel; AMD e ARM têm mecanismos próprios e desiguais. E medir não é otimizar — saber o custo é o primeiro passo, não o último. Quem promete precisão absoluta em qualquer cenário está vendendo, não medindo.

## O que eu levei disso

A indústria aprendeu a medir gasto de nuvem em dólares por mês. O próximo nível de maturidade é medir eficiência por unidade de trabalho útil: watts por token, joules por requisição, centavos por mil tokens, atribuídos ao processo e ao modelo certos.

Esse número não sai de planilha nem de dashboard de host. Ele sai de costurar três fontes que vivem em camadas separadas, lá embaixo, onde o kernel agenda os processos. É trabalho invisível, de fundação. Mas é na fundação que se decide quem vai conseguir escalar IA quando a conta deixar de ser dinheiro e passar a ser, de vez, energia.

Se você roda inferência em produção, fica a pergunta que me tirou o sono: você sabe quanto custa o seu último mil tokens? Se a resposta for "uns dólares de GPU por mês, mais ou menos", você está medindo a coisa certa pela lente errada.
