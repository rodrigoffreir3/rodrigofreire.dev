---
title: "Imunno System"
description: "Sistema imunológico adaptativo para servidores. Neutraliza ameaças zero-day e agentes autônomos usando eBPF no kernel e decepção ativa."
layout: "project-single"
badge: "Segurança & Decepção Ativa"
hero_image: "/images/projetos/imunno-system/imunno-hero.png"
github_url: ""
whatsapp_message: "Olá Rodrigo! Vi o Imunno System no seu portfólio e gostaria de entender como aplicar essa arquitetura de segurança na minha infraestrutura."

gallery:
  - image: "/images/projetos/imunno-system/imunno-hero.png"
    caption: "Visão geral da arquitetura de defesa e contenção do Imunno"
  - image: "/images/projetos/imunno-system/imunno-dashboard.png"
    caption: "Painel de telemetria e estado global da frota de agentes"
  - image: "/images/projetos/imunno-system/imunno-arquitetura.png"
    caption: "Pipeline de dados com gRPC, RabbitMQ e motor de inteligência"
  - image: "/images/projetos/imunno-system/imunno-alerta-tempo-real.png"
    caption: "Detecção instantânea e isolamento silencioso de ameaça zero-day"

problem_description: >
  A maioria das empresas descobre que foi invadida dias ou meses depois do estrago feito. Antivírus e firewalls convencionais dependem de listas de vírus conhecidos. Se um invasor usar uma técnica nova ou uma inteligência artificial rápida, ele passa direto pela porta da frente.


  O Imunno System foi desenhado com outra cabeça: agir como o sistema biológico do corpo humano. Ele não fica esperando ver o vírus na lista. Ele repara no que o processo tá fazendo no computador em tempo real. Se o comportamento for estranho, o Imunno prende o processo numa armadilha invisível e alimenta ele com arquivos falsos. O invasor acha que tá no controle, mas tá só gastando tempo num labirinto sem tocar em nenhum dado de verdade.

technical_details: >
  ### Arquitetura de Defesa e Kernel eBPF


  O Imunno System opera com foco em zero-overhead e contenção determinística de processos maliciosos:


  * **Agente no Kernel (Go + eBPF):** Intercepta chamadas de sistema críticas (`sys_enter_execve`, `sys_enter_openat`) diretamente no anel 0 do Linux. Mede o perfil de consumo energético e faz contenção local sem depender de resposta de rede.


  * **Decepção Ativa HADES:** Quando uma anomalia é confirmada, o processo é enjaulado em cgroups v2 com estrangulamento severo de CPU e memória. As conexões de rede são descartadas silenciosamente via regras de `nftables`, e diretórios sensíveis recebem bind mounts de arquivos falsos (honeyfiles). O atacante continua executando comandos sem perceber o isolamento.


  * **Collector e Orquestrador Central (Go gRPC + RabbitMQ):** Recebe fluxos de telemetria criptografados por mTLS, absorve picos de carga em filas RabbitMQ e correlaciona eventos no TimescaleDB para identificar o paciente zero na árvore de processos.


  * **Motor Evolutivo e Arena Coliseu:** Módulo de Machine Learning (Isolation Forest) integrado a um simulador de reforço, onde modelos adversariais tentam explorar o ambiente para validar a eficácia da contenção e calibrar pesos de detecção.


  * **Registro Oficial:** Software registrado no INPI sob o processo nº 512025006506-0.
---
