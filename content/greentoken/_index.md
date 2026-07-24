---
title: "GreenToken"
description: "AI Energy FinOps Observability Agent — Meça o custo real da sua inferência de IA em Watts, Joules e dólares por token."
date: 2026-07-23
layout: "greentoken-landing"
comments: true
menu:
  main:
    name: "GreenToken"
    weight: 20
---

**Meça quanto sua inferência de IA realmente custa — até o nível do token.**

> [!NOTE]
> O GreenToken é um agente de observabilidade de energia e FinOps para workloads de inferência LLM. Deixe seu comentário ou feedback no final desta página na seção de comentários.

```
cost_per_token = (W_cpu + W_dram + W_gpu) × tempo_inferencia / tokens_gerados
```

**Sem throttling. Sem risco para SLA.** O GreenToken **apenas observa e mede** — ele nunca atua sobre os workloads em execução.

---

## 🎯 O Problema

Toda equipe de FinOps acompanha os gastos gerais com nuvem. Quase nenhuma acompanha os gastos de **energia e custo por token** no nível de workload individual. 

A lacuna entre *"pagamos $X/mês por computação com GPU"* e *"o modelo Y custa $Z por 1000 tokens para rodar"* é onde o GreenToken atua.

Ferramentas existentes (Prometheus, DCGM, OpenTelemetry) medem a energia agregada do host. Nenhuma correlaciona `PID → watts_cpu + watts_gpu → tokens_gerados` na granularidade do eBPF. Essa correlação é o diferencial do GreenToken.

---

## 🏗️ Arquitetura

```
┌─────────────────────────────────────────────┐
│  Host Linux (Inference Server)              │
│                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │ RAPL     │  │ NVML     │  │ eBPF     │  │
│  │ CPU+DRAM │  │ GPU      │  │ sched    │  │
│  │ watts    │  │ watts    │  │ windows  │  │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  │
│       └─────────────┴─────────────┘         │
│                     │                       │
│              ┌──────▼──────┐                │
│              │  GreenToken │                │
│              │    Agent    │                │
│              └──────┬──────┘                │
└─────────────────────┼───────────────────────┘
                      │ gRPC stream
              ┌───────▼───────┐
              │  GreenToken   │
              │  Collector    │
              └───────┬───────┘
                      │
          ┌───────────┼───────────┐
          ▼           ▼           ▼
     /metrics      Grafana     CLI report
   (Prometheus)   dashboard   cost/token
```

---

## ⚡ Métricas Exportadas

| Métrica | Descrição |
|---|---|
| `greentoken_watts_cpu` | Watts consumidos pelo pacote CPU (RAPL) por workload |
| `greentoken_watts_dram` | Watts consumidos pela memória DRAM (RAPL) por workload |
| `greentoken_watts_gpu` | Watts consumidos pela GPU (NVML) por workload |
| `greentoken_tokens_total` | Total de tokens gerados pelo workload |
| `greentoken_cost_per_token` | Custo em USD por token (preço de kWh configurável) |
| `greentoken_joules_per_request` | Energia em Joules consumida por requisição |

*Labels:* `workload`, `model`, `pid`, `gpu_index`

---

## 🛡️ Princípios Invioláveis de Design

1. **Observa. Nunca atua.**
   O GreenToken contém zero lógica de throttling, zero escrita em cgroups e zero chamadas `bpf_send_signal`. Ele não afeta a inferência. É uma restrição arquitetural rígida.
2. **Degradação Graciosa.**
   Sem GPU? `W_gpu = 0`, o agente continua. Sem RAPL? `W_cpu = 0`, o agente continua. Sem eBPF? Fallback para o scanner `/proc`. O agente nunca derruba o servidor host.
3. **Prometheus-Native.**
   Saída no formato de exposição padrão do Prometheus. Conecte em qualquer stack Grafana sem integrações customizadas.
4. **Granularidade Atômica.**
   Tracepoints eBPF `sched_switch` correlacionam janelas de energia a PIDs específicos com precisão de microssegundos — e não médias gerais do host.

---

## 📦 Fontes de Tokens (Zero-Trust)

O GreenToken abstrai a contagem de tokens em fontes configuráveis:

- **`prometheus` (Default):** Fonte de verdade. Faz requisição ao endpoint `/metrics` do engine (ex: vLLM) e lê contadores como `vllm:generation_tokens_total`. É a opção recomendada e mais precisa para ambientes de produção sob alta concorrência (validado com 0% de erro).
- **`logsniffer`:** Fallback best-effort para engines que não expõem métricas estruturadas. Acompanha o arquivo de log do engine.
- **`none`:** Desativa a contagem de tokens (o custo e uso de energia ainda serão coletados normalmente).

---

## 🚀 Instalação Rápida

Instalação em um único comando com verificação estrita de checksum SHA256 (Zero-Trust):

```bash
curl -fsSL https://raw.githubusercontent.com/rodrigoffreir3/GreenToken/main/deploy/install.sh | sh
```

Para ambientes com GPUs NVIDIA habilitadas:
```bash
curl -fsSL https://raw.githubusercontent.com/rodrigoffreir3/GreenToken/main/deploy/install.sh | sh -s -- --gpu
```

### Diagnóstico de Ambiente com `greentoken doctor`

Antes de iniciar a coleta em produção, diagnostique seu ambiente:

```bash
greentoken doctor --metrics-url http://localhost:8000/metrics --metrics-name vllm:generation_tokens_total
```

O `doctor` verifica a disponibilidade do RAPL, eBPF/tracing, NVML/GPU, permissões root e conectividade do endpoint `/metrics`, exibindo relatórios de `OK`, `AVISO` ou `FALHA` sem alterar seu sistema.

---

## 📊 Status & Benchmark Validado

No teste de estresse de release **`v0.1.0`** (20 requisições simultâneas com rajada de tokens concorrentes no vLLM):

| Hipótese | Resultado | Status |
|---|---|---|
| **H1** — PID visível via NVML | PID detectado com sucesso | ✅ Passou |
| **H2** — Delta de Watts mensurável | +14–17W acima do idle sob carga | ✅ Passou |
| **H3** — Precisão da contagem de tokens | 0.0% de erro via `/metrics` | ✅ Passou |
| **H4** — Estabilidade de Custo/Token | Variância de 1.8% entre runs | ✅ Passou |

---

## 💻 Código-Fonte & Repositório

O projeto é mantido como código aberto sob a licença **Mozilla Public License 2.0 (MPL-2.0)**.

- **Repositório GitHub:** [github.com/rodrigoffreir3/GreenToken](https://github.com/rodrigoffreir3/GreenToken)
- **Última Release:** [v0.1.0 no GitHub Releases](https://github.com/rodrigoffreir3/GreenToken/releases/tag/v0.1.0)
