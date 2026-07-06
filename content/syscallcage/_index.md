---
title: "SyscallCage"
description: "Deixe sua IA trabalhar sozinha no seu computador, sem medo do que ela pode fazer. Vigilância em tempo real no kernel Linux para agentes autônomos."
date: 2026-07-06
layout: "syscallcage-landing"
menu:
  main:
    name: "SyscallCage"
    weight: 10
---

## O problema

Você usa um agente de IA que edita arquivos e roda comandos sozinho... e se ele deletar seu banco de dados ou enviar suas chaves de API para um servidor estranho por engano? 

O SyscallCage resolve isso observando o que o agente faz, direto no kernel Linux (usando eBPF), e parando o processo no milissegundo em que ele tenta violar uma regra de segurança.

O SyscallCage não isola o agente em uma máquina virtual lenta. Ele deixa o agente trabalhar exatamente onde ele já estava trabalhando — e observa, no nível mais fundo do sistema, se algo passa da linha. É a diferença entre trancar alguém numa sala vazia versus ter um segurança de confiança olhando o que a pessoa faz na sala de sempre. O resultado prático: você não perde velocidade nem muda seu fluxo de trabalho para ganhar segurança.

## O que o SyscallCage faz

* **Vigilância em tempo real**: Monitora todas as chamadas de sistema (syscalls) realizadas pelo agente e por qualquer subprocesso que ele criar.
* **Isolamento e Controle de Acesso**: Bloqueia de forma síncrona (usando BPF LSM) tentativas não autorizadas de:
  * Ler ou modificar arquivos sensíveis (como chaves SSH, `.env`, arquivos de senhas).
  * Executar comandos proibidos (como shell interativo, `rm -rf` amplo).
  * Acessar redes ou domínios não permitidos (zero trust para conexão de saída).
* **Bloqueio Síncrono e Fallback Reativo**: Escolhe automaticamente o melhor modo suportado pelo seu kernel Linux:
  * **Modo Síncrono (BPF LSM - Recomendado)**: A violação é negada no próprio kernel, retornando `-EACCES` nativamente para o processo.
  * **Modo Reativo (Tracepoints + Kprobes)**: Em kernels sem BPF LSM, o monitor monitora o comportamento e mata o processo instantaneamente com `SIGKILL` em caso de infração.

## Como instalar

> [!NOTE]
> O instalador rápido automatizado (`curl -fsSL https://syscallcage.dev/install.sh | sh`) estará disponível assim que o domínio de distribuição for publicado. Por enquanto, a instalação recomendada é compilando o projeto a partir do código-fonte:

```bash
# 1. Clone o repositório oficial
git clone https://github.com/rodrigoffreir3/syscallcage.git
cd syscallcage

# 2. Compile o bytecode eBPF e o userspace CLI
cargo build --release

# 3. Mova os executáveis para o seu diretório local de binários
mkdir -p ~/.local/bin
cp target/release/syscallcage target/bpfel-unknown-none/release/syscallcage-ebpf ~/.local/bin/
```

Depois de instalar, verifique se o seu ambiente Linux está pronto para rodar o SyscallCage:

```bash
syscallcage doctor
```

## Como usar

Primeiro, escreva um arquivo pequeno YAML descrevendo a política de segurança (`sua-politica.yaml`):

```yaml
mode: enforce

filesystem:
  allow_read:
    - "/home/usuario/projeto/**"
  deny_always:
    - "**/.env"
    - "**/.ssh/**"

network:
  allow_domains:
    - "api.openai.com"
    - "github.com"
```

Depois, aponte o SyscallCage para o PID do seu agente de IA:

```bash
sudo syscallcage --pid <PID-do-agente> --policy sua-politica.yaml
```

Pronto. O SyscallCage fica vigiando silenciosamente até o agente terminar a tarefa de forma segura.

### Não sabe quais regras declarar?

Deixe o SyscallCage descobrir sozinho através de uma sessão real de observação:

```bash
sudo syscallcage --pid <PID> --policy configs/observar.yaml --log-file sessao.jsonl
# deixe seu agente executar as ações normalmente...
syscallcage generate-policy --from-log sessao.jsonl --output minha-politica.yaml
```

O gerador cria uma política mínima e segura automaticamente, deixando fora por padrão qualquer arquivo de configuração sensível ou comando hostil detectado.

## Código-fonte

Todo o código é livre, aberto e documentado:
* [SyscallCage no GitHub](https://github.com/rodrigoffreir3/syscallcage)
