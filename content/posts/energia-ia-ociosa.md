---
title: "Quanto de energia uma IA gasta enquanto não faz nada?"
date: 2026-08-24
draft: false
tags: ["Deep-Tech", "FinOps", "GreenToken", "RAPL", "NVML", "Hardware", "IA", "Eficiência"]
description: "Servidor de inferência de IA passa a maior parte do tempo esperando. Medi o consumo sob diferentes regimes de ocupação em hardware real e descobri por que o gasto em baixa carga é 12x maior do que o folheto promete."
---

# Quanto de energia uma IA gasta enquanto não faz nada?

Toda comparação de eficiência energética de IA que aparece por aí vem do mesmo jeito. GPU no talo, batch cheio, tudo saturado, e no fim um número redondo de "tantos TOPS por watt". Você olha aquilo e acha que tá com a conta na mão.

Só que servidor de inferência não vive assim. Ele passa a boa parte do tempo esperando alguém digitar alguma coisa.

Fiquei pensando nisso um tempo e resolvi medir por conta própria, em vez de continuar aceitando número de marketing.

## Antes de mais nada: os três primeiros experimentos não descobriram nada

Vou logo entregando a parte chata, porque acho pior descobrir isso no meio do texto.

A série teve quatro experimentos. Os dois primeiros confirmam coisa que já é conhecida desde 2017, quando saiu o paper de atenção. Que o custo de inferência escala com o quadrado do tamanho do contexto, e que rodar em precisão menor economiza energia. Ninguém esconde isso, tá em livro texto.

A diferença é que eu não queria só *saber*. Queria ver o número saindo do meu silício, com protocolo sério em cima, sem depender de benchmark de quem vende placa de vídeo.

Então montei tudo como experimento científico de verdade: hipótese pré-registrada em git antes de coletar qualquer dado, gate de falha declarado antes de rodar (se o baseline térmico derivar mais que 5%, a série toda é descartada), dado bruto commitado, e um critério explícito de que resultado negativo também vale publicação. A instrumentação foi feita com o GreenToken, que lê RAPL pra CPU e DRAM e NVML pra GPU, atribuindo consumo por processo.

O testes rodaram em uma L40S e uma T4. Começando pelo E1, a escala quadrática apareceu certinha: de 128 pra 512 tokens o consumo saltou 13,71x, contra 16x que a teoria prevê. De 512 pra 1024, deu 3,92x contra 4x teórico. Bem perto, sem forçar.

O E2 comparou precisão com acurácia igualada. FP32 marcou 51,678 J por inferência. FP16 caiu pra 19,099 J, o que dá 63,04% de economia. INT8 ficou em 33,995 J, uns 34,22% abaixo do FP32. Todos com dispersão baixa, coeficiente de variação entre 2,6% e 3,7%.

Teve um terceiro experimento no meio do caminho que virou apêndice, porque era simulação de hardware analógico e não medição de silício real. Simulação não tem o mesmo peso de dado medido, e misturar as duas coisas no mesmo patamar seria desonesto. Ficou lá, separado, com o nome da pasta gritando que é simulação.

## Aí veio o quarto, que era pra ser só mais um

A ideia do último experimento era simples e eu confesso que esperava nada muito além do prometido: medir a mesma inferência sob perfis diferentes de utilização, pra ver quanto a conta muda quando a GPU não tá 100% ocupada o tempo todo.

A trava metodológica era normalizar tudo por entrega útil. Nada de comparar janela de tempo bruta. Divide a energia total da janela pelo número exato de inferências que saíram dali (vinte, em todos os perfis) e compara maçã com maçã.

Rodou primeiro numa Tesla T4 e depois numa L40S, com quatro perfis de carga. Segue o que saiu:

| Perfil | Energia por inferência útil | Quanto pior que o pico |
|---|---|---|
| 100% saturada | 29,45 J | 1,00x (esse é o número de folheto) |
| 50% carga | 47,83 J | 1,62x |
| 20% carga | 106,23 J | 3,61x |
| 5% carga | 355,87 J | **12,08x** |

Doze vezes. A mesma inferência, entregando exatamente a mesma resposta.

## Por que 12x e não 4x

Aqui é onde ficou interessante de verdade, e onde tive que parar e investigar em vez de só reportar o número.

Fiz a conta ingênua primeiro, do jeito que qualquer um faria no papel. Se a GPU voltasse pro estado de repouso profundo entre as requisições, ela consumiria os 9,9 W que eu medi como baseline ocioso. Somando a energia ativa com esse repouso ao longo da janela, dá 2489 J, ou 124,45 J por inferência. Uma degradação de 4,23x.

Só que o medido foi 7117 J. Quase três vezes acima da previsão.

A explicação tá no driver, não no modelo. Servidor de inferência de verdade mantém o contexto CUDA residente na VRAM entre uma requisição e outra, porque descarregar e recarregar tudo a cada chamada seria absurdamente lento. E o driver da NVIDIA, com contexto residente, não devolve a placa pro repouso profundo nas pausas curtas. Ele segura num estado intermediário.

Medi esse estado: 34,02 W. Quase três vezes e meia o repouso real da placa.

Refazendo a conta com esse número, os 7117 J fecham direitinho. O custo não tá na inferência. Tá na histerese de ficar pronto pra responder.

## O carro parado no sinal

A analogia que ficou martelando na minha cabeça foi a de consumo de veículo.

Propaganda de carro te dá o consumo na cidade e o consumo na estrada. Os dois em movimento. Só que se você mora num lugar com trânsito pesado, boa parte da sua vida ao volante é o carro parado e ligado, e isso não aparece em lugar nenhum do anúncio. Se o gasto nessa condição fosse considerável, você ia querer saber antes de comprar, né?

Benchmark de IA faz exatamente isso. Mostra o motor em rotação máxima e cala sobre a marcha lenta. Só que marcha lenta, multiplicada por milhões de requisições espalhadas ao longo do dia, é onde a conta de luz realmente mora.

## O que isso não prova

Fazendo jus ao protocolo, vale dizer onde o experimento não chega.

Isso foi medido numa T4 e numa L40S, com carga sintética controlada nas duas, vinte inferências por janela. Não é um servidor de produção real com tráfego orgânico, nem cobre toda arquitetura de serving que existe por aí. vLLM, TensorRT e companhia têm estratégias próprias de gerenciamento de contexto que podem mudar bastante esse número, pra cima ou pra baixo.

O que dá pra afirmar com o dado na mão é mais modesto e ainda assim incômodo: existe uma diferença enorme entre o número de pico que a indústria publica e o custo por resposta útil em regime de baixa ocupação, e essa diferença não é explicada pelo repouso nominal da placa.

Se alguém quiser conferir, discordar ou rodar em outro hardware, tá tudo aberto. Pré-registro, código dos coletores, dado bruto de cada repetição, tudo commitado. Publiquei também no Zenodo, que é o repositório do CERN, pra ter DOI permanente e não depender de link de GitHub sobreviver pra sempre:

https://zenodo.org/records/22036311

Uma pergunta que ficou aberta e que eu não sei responder ainda: se a histerese do contexto residente é o que domina o custo em baixa ocupação, quanto disso é escolha do driver e quanto é limitação física mesmo? Porque se for escolha, tem otimização inteira esperando alguém olhar pra ela.
