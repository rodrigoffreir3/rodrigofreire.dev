---
title: "GreenToken"
description: "Observabilidade termodinâmica e FinOps para IA. Descubra quanto cada resposta do seu modelo gasta em Watts, Joules e centavos."
layout: "project-single"
badge: "FinOps, Hardware & Eficiência em IA"
hero_image: "/images/projetos/greentoken/greentoken-hero.png"
github_url: "https://github.com/rodrigoffreir3/GreenToken"
whatsapp_message: "Olá Rodrigo! Vi o GreenToken no seu portfólio e gostaria de entender como auditar o consumo e os custos de IA da minha empresa."

gallery:
  - image: "/images/projetos/greentoken/greentoken-hero.png"
    caption: "Visão geral da plataforma GreenToken e telemetria energética"
  - image: "/images/projetos/greentoken/greentoken-dashboard-metrica.png"
    caption: "Métricas de custo em Joules por token e atribuição de processo"
  - image: "/images/projetos/greentoken/greentoken-grafico-consumo.png"
    caption: "Curva de consumo elétrico da GPU sob diferentes regimes de inferência"

problem_description: >
  Quando chega a fatura da nuvem no final do mês, o time financeiro vê um número fechado: cinco ou dez mil dólares em servidores de IA. Só que ninguém sabe dizer de onde veio esse valor. Qual modelo de inteligência artificial tá gastando mais? Quanto custou aquela resposta longa de mil tokens?


  Ferramentas comuns de monitoramento só olham a máquina como um todo. Elas não conseguem dizer qual processo específico usou qual fatia de energia e quantos tokens ele gerou naquela fração de segundo.


  O GreenToken resolve essa conta. Ele se conecta nos sensores físicos do processador e da placa de vídeo pra medir com precisão cirúrgica a energia gasta por cada resposta gerada pela sua IA.

technical_details: >
  ### Arquitetura de Medição Física e Atribuição Granular


  O GreenToken opera em Rust com foco em observabilidade sem overhead no pipeline de inferência:


  * **Leitura Direta nos Sensores de Hardware (RAPL + NVML):** Coleta o consumo elétrico real da CPU e dos canais de memória DRAM via interface Intel/AMD Running Average Power Limit (RAPL). Na GPU NVIDIA, faz amostragem contínua em milissegundos via NVIDIA Management Library (NVML).


  * **Atribuição por Processo com Kernel eBPF:** Cruza os dados de energia com o identificador de processo (PID) e o tempo de execução no kernel Linux, calculando o custo exato: `(W_cpu + W_dram + W_gpu) * tempo / tokens`.


  * **Compatibilidade com Servidores de Inferência Modernos:** Integração pronta para interceptar métricas do vLLM, Ollama, llama.cpp e pipelines customizados de PyTorch.


  * **Zero Impacto em Performance:** Coleta puramente passiva que não injeta latência na geração de tokens nem consome recursos significativos de computação.
---

### O que o GreenToken mede no hardware

* **CPU e Memória:** consumo energético instantâneo através dos registradores MSR do processador.
* **GPU NVIDIA:** potência instantânea em Watts, temperatura e clocks de memória da placa de vídeo.
* **Tokens gerados:** contagem e velocidade de resposta da inferência para fechar a equação de Joules por token.

### Validação com experimentos reais

O GreenToken foi usado em bancadas reais com placas NVIDIA L40S e T4 para medir o consumo de modelos de linguagem sob diferentes regimes de contexto e quantização, comprovando que a ociosidade do servidor de IA consome muito mais energia do que as métricas superficiais de marketing indicam.
