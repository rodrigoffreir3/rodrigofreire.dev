---
title: "Kernel WSL2 BPF Plus"
description: "Kernel Linux customizado para Windows (WSL2) com suporte avançado a BPF LSM compilado direto da árvore oficial da Microsoft."
layout: "project-single"
badge: "Sistemas & Compilação de Kernel"
hero_image: "/images/projetos/kernel-wsl2-bpf-plus/kernel-hero.png"
github_url: "https://github.com/rodrigoffreir3/syscallcage/blob/main/docs/WSL_BPF_LSM_Decision.md"
whatsapp_message: "Olá Rodrigo! Vi o projeto do Kernel WSL2 BPF Plus no seu portfólio e gostaria de tirar dúvidas sobre compilação e segurança no kernel."

gallery:
  - image: "/images/projetos/kernel-wsl2-bpf-plus/kernel-hero.png"
    caption: "Kernel Linux customizado rodando com integração nativa no Windows 11"
  - image: "/images/projetos/kernel-wsl2-bpf-plus/kernel-doctor-lsm-ativo.png"
    caption: "Confirmação do módulo de segurança BPF ativo em /sys/kernel/security/lsm"
  - image: "/images/projetos/kernel-wsl2-bpf-plus/kernel-build-terminal.png"
    caption: "Pipeline de compilação determinística com clang e ferramentas de build"

problem_description: >
  Muita gente usa Windows no dia a dia pela conveniência dos programas de trabalho, mas precisa do ambiente Linux pra programar. A Microsoft criou o WSL2 pra unir os dois mundos, só que o kernel Linux que vem instalado de fábrica vem com limitações. A principal delas é que os recursos mais modernos de segurança e bloqueio preventivo (chamados de BPF LSM) vêm desabilitados de propósito.


  Isso significa que quem desenvolve ferramentas de defesa, antivírus de comportamento ou sistemas de vigilância de processos ficava preso: ou usava máquinas virtuais pesadas que deixavam a máquina lenta, ou não conseguia testar os bloqueios preventivos.


  Este projeto nasceu originalmente como parte do desenvolvimento do [SysCallCage](/syscallcage/), quando surgiu a necessidade de testar a contenção preventiva direto no Windows. Em vez de aceitar a limitação, criei um processo de compilação limpo e auditável que gera um kernel completo com todas as travas de segurança ativas, mantendo o Windows rápido e sem perda de desempenho.

technical_details: >
  ### Engenharia de Kernel e Resolução no BPF Verifier


  A criação do Kernel Plus exigiu ajustes finos na árvore oficial do kernel Linux da Microsoft (`WSL2-Linux-Kernel`):


  * **Configurações de Compilação Habilitadas:** Inclusão de `CONFIG_BPF_LSM=y`, `CONFIG_LSM="landlock,lockdown,yama,integrity,apparmor,bpf"` e geração de metadados de tipo `CONFIG_DEBUG_INFO_BTF=y` para viabilizar Co-Re (Compile Once, Run Everywhere).


  * **Superação do Desafio do Verifier:** Durante a anexação do hook `lsm_file_open`, o verificador de bytecode do kernel rejeitava o ponteiro de arquivo por inconsistência de offset na `struct file`. O ajuste técnico permitiu ler o caminho do arquivo de forma segura e determinística sem quebrar a validação estática do kernel.


  * **Integração sem Fricção no Windows:** O binário gerado (`vmlinux`) é configurado de forma declarativa no arquivo `%USERPROFILE%\.wslconfig`, permitindo alternar entre o kernel oficial e o customizado em segundos com `wsl --shutdown`.


  * **Filosofia de Segurança Auditável:** O projeto documenta a receita completa de compilação para que qualquer engenheiro compile sua própria imagem a partir da fonte oficial, sem a necessidade de confiar em binários fechados de terceiros.
---
