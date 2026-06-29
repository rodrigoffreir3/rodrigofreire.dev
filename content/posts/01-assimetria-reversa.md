---
title: "Bloquear o invasor na hora foi o pior conselho que eu segui"
date: 2026-06-24
draft: false
tags: ["Security", "Cyber-Deception", "Behavioral-Detection", "Kernel"]
description: "Por anos eu tratei segurança como um portão: detectou, bloqueou, fim. Até perceber que o bloqueio imediato é exatamente o feedback que um atacante moderno precisa para te vencer. Aqui está o que mudou minha cabeça."
---

# Bloquear o invasor na hora foi o pior conselho que eu segui

*Por Rodrigo Freire — Pesquisa e Desenvolvimento em Deep Tech*

Se você trabalha com infraestrutura, provavelmente aprendeu a mesma regra que eu: detectou processo malicioso, derruba na hora. Mata a conexão, encerra o processo, devolve um `Access Denied` sonoro. Eu segui essa regra por muito tempo achando que era o certo. Era rápido, era limpo, parecia profissional.

Demorei a perceber o óbvio: **o bloqueio imediato é o melhor feedback que você pode dar ao atacante.**

Quando o adversário é um script genérico ou uma varredura automática, tudo bem — a guilhotina funciona e custa pouco. O problema é o cenário que virou regra: ataques orquestrados por IA e ameaças persistentes. Se você bloqueia uma IA de ataque no instante em que ela pisa em falso, você acabou de ensinar ela. O bloqueio é o sinal de que existe uma barreira ali e que ela precisa ofuscar o próximo movimento. Você entra num jogo onde a defesa tem que acertar sempre e o atacante só precisa acertar uma vez. Esse jogo você perde no longo prazo.

Foi apanhando dessa lógica que eu fui estudar uma abordagem diferente — não inventada por mim, mas emprestada da biologia: em vez de cortar, sufocar.

## O custo escondido de dizer "não" rápido demais

O que ninguém te conta quando você aprende a bloquear na hora é tudo que você joga fora junto.

Quando você mata o processo instantaneamente, você perde a chance de ver a ameaça "ligar para casa". Perde o rastro do servidor de comando e controle. Perde a árvore genealógica de processos que te levaria até a origem real do ataque — o *paciente zero*. Você ganha a satisfação imediata de ter bloqueado, e paga com a cegueira sobre quem realmente entrou e por onde.

A inversão de raciocínio é essa: e se, em vez de alertar o invasor, você deixasse ele continuar achando que venceu — só que dentro de uma simulação?

## Sufocar em vez de cortar

A ideia tem dois ganhos táticos que o bloqueio nunca te dá.

O primeiro é envenenar o aprendizado do atacante. Se ele acessa arquivos de configuração e bancos de dados que parecem reais mas são forjados, o pipeline de uma IA atacante converge para uma solução errada. Ela gasta tempo e orçamento processando lixo que parece ouro. Você não barrou o ataque — você fez ele trabalhar contra si mesmo.

O segundo é tempo. Manter o invasor ocupado numa simulação compra os milissegundos preciosos para rastrear toda a linhagem do ataque antes de arrancar a rede pela raiz. Você troca a satisfação imediata do bloqueio pela informação completa sobre a ameaça.

Para que essa simulação seja convincente, ela precisa operar abaixo do nível do usuário, lá onde o sistema operacional não mente. Três camadas tornam isso possível:

**A ilusão do sistema de arquivos.** Em vez de negar a leitura de credenciais, você injeta espelhos falsos no namespace restrito do invasor. Ele lê o que acha serem segredos — e são armadilhas perfeitas, enquanto a produção real segue intocada.

**O silêncio de rede.** Cortar a conexão TCP avisa o atacante na hora. Aplicar descarte silencioso de pacotes atrelado ao grupo de processos dele faz a requisição pendurar num timeout infinito. Para ele, a internet só parece instável.

**A asfixia de recursos.** Aqui está o golpe econômico. Em vez de matar um ataque que roda só em memória, você corta o tempo de processamento que o escalonador do sistema dá àquele grupo. O resultado é uma assimetria perfeita: as máquinas do atacante continuam queimando energia máxima para manter as requisições vivas, enquanto o seu servidor simplesmente esfria. Você reduz a sua conta enquanto derrete o bolso do invasor.

## Onde essa abordagem tem limite (porque tem)

Não vou vender isso como bala de prata. Decepção ativa é cara de construir e de manter — exige forjar ambientes falsos convincentes, e um atacante muito experiente pode farejar a simulação. Para a esmagadora maioria das ameaças comuns, o bom e velho bloqueio continua sendo a resposta certa, porque é barato e suficiente. A asfixia faz sentido para a fração de ameaças avançadas onde a informação sobre o atacante vale mais que a velocidade de barrá-lo. Aplicar isso em tudo seria over-engineering puro.

## O que eu tirei disso

A lição que ficou comigo vai além de segurança. Na cibersegurança moderna, a guerra é de atrito: vence quem inviabiliza o lado econômico do oponente primeiro. E o reflexo de "dizer não o mais rápido possível" — que parece força — muitas vezes é o que entrega informação de graça ao outro lado.

Parei de pensar em construir muros mais altos e passei a pensar em projetar areia movediça. Não se trata de sobreviver ao ataque. Se trata de fazer o atacante se arrepender amargamente do custo de ter tentado.

Se você gerencia infraestrutura e ainda trata todo incidente como "detectou, bloqueou", vale a pergunta: quanta informação sobre quem está te atacando você está jogando fora junto com o processo que você matou?
