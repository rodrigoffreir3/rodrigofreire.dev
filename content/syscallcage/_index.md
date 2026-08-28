---
title: "SyscallCage"
description: "Deixe sua IA trabalhar no computador sem medo do que ela pode fazer. Vigilância em tempo real direto no kernel Linux para processos e agentes autônomos."
layout: "project-single"
badge: "Segurança de Baixo Nível & Kernel eBPF"
hero_image: "/images/projetos/syscallcage/syscallcage-hero.png"
github_url: "https://github.com/rodrigoffreir3/syscallcage"
whatsapp_message: "Olá Rodrigo! Vi o SyscallCage no seu portfólio e gostaria de conversar sobre segurança para agentes de IA e aplicações no kernel."

gallery:
  - image: "/images/projetos/syscallcage/syscallcage-hero.png"
    caption: "Visão geral da proteção de processos e agentes de IA"
  - image: "/images/projetos/syscallcage/syscallcage-terminal-doctor.png"
    caption: "Verificação de compatibilidade com syscallcage doctor"
  - image: "/images/projetos/syscallcage/syscallcage-modo-sync.png"
    caption: "Bloqueio preventivo síncrono via BPF LSM em tempo de execução"

problem_description: >
  Você coloca um agente de IA (como Claude Code, Cursor ou um script local) pra programar e rodar comandos na sua máquina. A velocidade impressiona, só que logo bate a preocupação real: e se o modelo ler suas chaves de acesso no arquivo `.env`? E se rodar um comando que apaga dados da empresa? E se mandar seu código pra um servidor desconhecido na internet?


  As soluções comuns hoje tentam trancar tudo dentro de máquinas virtuais pesadas e lentas de configurar. O SyscallCage faz diferente. Ele deixa o agente trabalhar na sua pasta de projeto comum e coloca um segurança discreto no kernel do sistema operacional. Se o processo tentar ler um arquivo proibido ou fazer uma conexão fora da regra, o SyscallCage barra a ação no exato momento da tentativa.

technical_details: >
  ### Engenharia de Contenção em Rust e BPF LSM


  O SyscallCage foi construído em Rust moderno com o framework Aya, atuando na camada mais profunda do sistema operacional:


  * **Bloqueio Síncrono Preventivo (BPF LSM):** Ao contrário de ferramentas reativas que só logam o evento depois que a leitura já aconteceu, o SyscallCage intercepta hooks do Linux Security Module (`lsm_file_open`, `lsm_task_alloc`). A chamada de sistema é negada com `-EPERM` antes de qualquer byte ser lido.


  * **Modo Supervisor (`syscallcage watch`):** Gerencia o ciclo de vida do agente via `fork`/`exec`, anexando proteção instantânea sem precisar caçar o PID manualmente. Em caso de terminação abrupta do supervisor, o processo protegido recebe `SIGTERM` imediato via `PR_SET_PDEATHSIG` para impedir que continue desprotegido.


  * **Geração Automática de Políticas:** Módulo inteligente que grava a atividade normal do agente durante uma sessão de trabalho e gera um arquivo YAML com o princípio do menor privilégio, excluindo automaticamente caminhos sensíveis como chaves SSH e arquivos de ambiente.
---

### Como instalar e testar

Instalação direta com binário compilado e verificado:

```bash
curl -fsSL https://raw.githubusercontent.com/rodrigoffreir3/syscallcage/main/install.sh | sh
```

### Exemplo de uso simples

Você define o que o processo pode tocar em um arquivo YAML enxuto:

```yaml
mode: enforce

filesystem:
  allow_read:
    - "/home/usuario/meu-projeto/**"
  deny_always:
    - "**/.env"
    - "**/.ssh/**"

network:
  allow_domains:
    - "api.anthropic.com"
    - "github.com"
```

E roda o agente com vigilância total desde o primeiro segundo:

```bash
sudo syscallcage watch --policy minha-politica.yaml -- claude-code
```

### Origem e Filosofia

O SyscallCage nasceu da mesma linha de pesquisa do Imunno System. Em vez de confiar em promessas de modelos de linguagem ou em filtros superficiais de prompt, a regra de ouro é simples: a contenção tem que acontecer na física e no silício do kernel.
