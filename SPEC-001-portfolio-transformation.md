# SPEC-001 — Transformação do blog em site portfólio (rodrigofreire.dev)

## Como este documento está organizado

Primeiro o contexto e as decisões de arquitetura (o "porquê"), depois os
requisitos funcionais numerados (RF), o manifesto de imagens, as diretrizes
de conteúdo, os requisitos não-funcionais, e por fim os critérios de aceite
(CA) que servem de checklist de Definição de Pronto. Decisões que dependem
de você estão marcadas explicitamente como **DECISÃO ABERTA** e precisam de
resposta antes do Antigravity começar a implementação, para não gerar
retrabalho.

Repositório afetado: `rodrigofreire.dev` (atualmente site Hugo com tema
PaperMod, blog técnico + seções syscallcage/greentoken).

---

## 1. Contexto

O site hoje é um blog técnico. O objetivo é transformá-lo num **site
portfólio**: a home page passa a apresentar você, seus serviços e seus
projetos, com linguagem acessível para leigo em tecnologia. O blog não
desaparece, apenas deixa de ser a porta de entrada e vira uma aba própria.

Projetos que ganham página dedicada (aba), todos com o mesmo padrão
estrutural de página, variando apenas destaque e tamanho na home:

| Projeto | Destaque na home | Repositório fonte |
|---|---|---|
| Imunno System | **Principal** (posição 1, imagens maiores) | `imunno-system` |
| MakerLabs (renomear para CreareLabs no lançamento) | **Secundário** (posição 2, mesmo padrão visual do Imunno, um degrau abaixo) | `Maker-Lab-PaaS` |
| SysCallCage | Padrão | `syscallcage` |
| Kernel WSL2 BPF Plus | Padrão, página própria (ver RF-6) | origem documentada em `syscallcage/docs/WSL_BPF_LSM_Decision.md`, mas com vitrine standalone |
| GreenToken | Padrão | `GreenToken` |
| AppFitness | Padrão | `AppFitness` |

**Ordem entre os projetos de destaque padrão** (SysCallCage, Kernel WSL2
BPF Plus, GreenToken, AppFitness) não importa, conforme especificado por
você.

---

## 2. Decisão de arquitetura técnica

### 2.1 Stack: manter Hugo estático, não migrar para framework com backend

**Decisão: manter Hugo.** Justificativa direta contra seus próprios
princípios de desenvolvimento:

- **Simplicidade e complexidade justificada**: um site portfólio é, por
  natureza, conteúdo majoritariamente estático (texto, imagem, links).
  Migrar para React/Next só para replicar uma estética visual (Liquid
  Glass) é complexidade não justificada — CSS puro reproduz os mesmos
  tokens sem framework de aplicação nenhum.
- **Manutenibilidade**: Hugo já está no ar, você já o mantém, e build
  estático não acumula dívida técnica de dependência (sem `node_modules`
  para o site em si, sem breaking changes de framework).
- **Segurança zero trust**: site 100% estático não tem superfície de
  ataque de backend (sem API própria, sem sessão, sem banco).

O padrão visual "Liquid Glass" do AppFitness (`tokens.css`, `.glass`,
`.specular`) é **CSS puro com backdrop-filter** — não depende de React.
Será portado como um arquivo `assets/css/tokens.css` no Hugo, reutilizando
as mesmas variáveis.

### 2.2 Banco de dados: não é necessário

Confirmado: sem banco de dados. Contato acontece via WhatsApp (RF-3.1),
não via formulário próprio, então não existe nenhum dado de lead a
persistir. Contador de views/analytics, se um dia fizer sentido, resolve
com ferramenta de analytics estático (Plausible, Umami, Cloudflare Web
Analytics), sem banco relacional.

### 2.3 Hospedagem

Mantém o que já está configurado (`baseURL` aponta para Cloudflare Pages).
Nenhuma mudança necessária aqui.

---

## 3. Arquitetura de informação

### 3.1 Navegação principal (nav bar)

```
Início | Projetos ▾ | Blog | Serviços | Sobre
```

Onde "Projetos ▾" é um menu suspenso com as 6 abas de projeto (Imunno
System, CreareLabs, SysCallCage, Kernel WSL2 BPF Plus, GreenToken,
AppFitness). Cada uma com URL própria:

- `/syscallcage/` e `/greentoken/` — **mantidas exatamente como estão
  hoje**, sem alteração de path, para não perder SEO já indexado.
- `/imunno-system/`, `/creare-labs/`, `/kernel-wsl2-bpf-plus/`,
  `/appfitness/` — URLs novas, criadas do zero para este portfólio.

Sem aba "Contato" própria: contato acontece via WhatsApp flutuante
(RF-3.1), disponível em todas as páginas, não por formulário.

### 3.2 Blog

Sai da home, vira aba própria `/blog/`. Os posts existentes
(`content/posts/*.md`) são movidos sem alteração de conteúdo, apenas de
navegação.

---

## 4. Sistema de design — Liquid Glass portado do AppFitness

### RF-1 — Portar tokens visuais

Criar `assets/css/tokens.css` no site portfólio replicando as variáveis
de `AppFitness/frontend/src/styles/tokens.css`: paleta pastel ambiente,
`--glass-bg`/`--glass-border`/`--glass-blur`/`--glass-shadow`, radii,
tipografia (`Instrument Serif` para display, `Geist` para texto).

**Accent confirmado: `sky`** (`--accent: #9ec4ee; --accent-ink: #0f2c4a;
--accent-soft: #d6e7fa;`), já existente como variante pronta no
`tokens.css` original — não precisa criar variante nova, só ativar
`data-accent="sky"` no `<html>` do site portfólio.

### RF-2 — Componentes estruturais equivalentes

Portar como *partials* Hugo (não componentes React) os três blocos
estruturais do AppFitness:
- `.glass` / `.glass-strong` / `.glass-subtle` (painéis translúcidos)
- `.specular` (reflexo superior sutil)
- Um partial `ambient.html` equivalente ao `<Ambient />` do AppFitness:
  orbs pastel desfocados fixos no fundo, atrás do conteúdo, sem
  interferir no scroll.

### CA-1 (visual)
Abrir a home no navegador: fundo com orbs pastel desfocados visíveis,
painéis com efeito vidro fosco (`backdrop-filter` funcionando, não caindo
para fallback opaco), tipografia servindo o display em Instrument Serif e
corpo em Geist. Mobile (375–390px): nenhum elemento estourando a largura
da tela.

---

## 5. Requisitos funcionais — Home page

### RF-3.1 — Botão de contato via WhatsApp (substitui formulário)

Portar o `WhatsAppButton.tsx` do AppFitness como partial Hugo puro
(HTML/CSS, sem framework): botão flutuante fixo no canto inferior direito,
visível em todas as páginas do site (home, projetos, blog), linkando para
`wa.me/<seu número>` com mensagem pré-preenchida (a mensagem pode variar
por página — ex: na página do Imunno System, preencher algo como "Vi o
Imunno System no seu portfólio e quero saber mais").

### RF-3 — Seção "Sobre mim" (hero)

Bloco no topo com: foto (você vai fornecer depois), texto de apresentação
curto (você vai fornecer depois), em um `.glass-strong` sobre o ambient.
Layout deve funcionar com placeholder enquanto foto/texto não chegam —
não travar a implementação esperando esses dois itens.

### RF-4 — Seção "O que eu faço" (serviços)

Lista dos serviços, cada um com: título simples, 1–2 frases em linguagem
leiga, sem jargão técnico não explicado. Serviços a listar:

1. Criação de sites
2. Tráfego orgânico e pago
3. Aplicativos para celular
4. Sistemas para computador (Mac, Windows, Linux)
5. Plataformas web (com explicação da diferença entre "site" e
   "plataforma web" em linguagem cotidiana — ver RF-5)
6. Automação com inteligência artificial
7. Montagem de infraestrutura de servidores
8. Configuração de servidores em nuvem
9. Fine-tuning (treinamento específico de IA)
10. Automação de WhatsApp
11. Consultoria de compra de tecnologia (computador, placa de vídeo,
    RAM, processador, impressora, modelo de IA a usar)

Cada item é um card `.glass` dentro de um grid responsivo (3 colunas
desktop → 1 coluna mobile, mesmo padrão de grid que o
`design-decisions/landing.md` do AppFitness já usa para pilares e
depoimentos).

### RF-5 — Explicação "site vs. plataforma web"

Dentro do item 5 da lista de serviços, ou logo abaixo dela, um bloco
específico que explica a diferença com exemplo do cotidiano. Exemplo de
referência (a ser escrito no tom final pelo Antigravity, seguindo o guia
anti-IA):

> Site: um cartão de visita digital. A pessoa lê, vê seus contatos, sai.
> Plataforma web: um espaço que a pessoa usa — faz login, agenda um
> horário, acompanha um pedido, guarda informação. É a diferença entre
> uma vitrine e uma loja que você entra e circula dentro.

Isso é exemplo de tom, não copy final — o texto definitivo é
responsabilidade do Antigravity ao implementar, seguindo o documento
`ANTI_IA_DETECTION_TECHNIQUE.md`.

### RF-6 — Seção "Projetos" (mini-cards)

Abaixo dos serviços, uma seção com uma mini-apresentação de cada projeto:
imagem prévia + texto em linguagem não técnica explicando o que o
sistema faz e por que foi criado.

Regras de destaque (herdadas do padrão `.glass` + tamanho):

- **Imunno System**: card de largura cheia ou 2 colunas, imagem maior,
  texto mais longo (3–4 frases), posição 1.
- **CreareLabs**: mesmo padrão visual do Imunno (card grande), um
  degrau abaixo em ordem, posição 2.
- **SysCallCage, GreenToken, AppFitness**: cards padrão, menores,
  1 coluna cada em grid, ordem entre eles é livre.

Cada mini-card linka para a página completa do projeto (`/imunno-system/`,
etc).

**Kernel WSL2 BPF Plus tem página própria** (`/kernel-wsl2-bpf-plus/`),
com o mesmo padrão estrutural das demais (RF-7), e ganha mini-card
próprio na home junto aos outros projetos de destaque padrão. É feito
técnico standalone (recompilar o kernel do WSL2 com `CONFIG_BPF_LSM`
habilitado do zero, coisa que quase ninguém faz), merece vitrine própria,
não só rodapé de outro projeto.

Dentro da própria página do Kernel WSL2 BPF Plus, a seção "O problema que
resolve" (item 2 do RF-7) deve mencionar, para contexto, que ele nasceu
como parte do desenvolvimento do SysCallCage — com link direto para
`/syscallcage/` — já que foi lá que a necessidade surgiu. A relação é
contada como origem, não como subordinação: o Kernel WSL2 BPF Plus é
projeto de vitrine própria que referencia de onde veio.

---

## 6. Requisitos funcionais — Páginas de projeto

### RF-7 — Padrão estrutural único

Todas as 6 páginas de projeto (Imunno, CreareLabs, SysCallCage, Kernel
WSL2 BPF Plus, GreenToken, AppFitness) seguem o mesmo layout estrutural
(mesmo partial Hugo, dados diferentes):

1. Hero do projeto: nome, uma frase de resumo, imagem principal
2. "O problema que resolve" — em linguagem leiga
3. Galeria de imagens (ver manifesto de imagens, seção 7)
4. "Como funciona por trás" — aqui pode ter mais profundidade técnica
   que o resto do site, é a seção que interessa a quem quer avaliar
   sua capacidade técnica de verdade (recrutador técnico, investidor,
   outro dev)
5. Call-to-action final (contato / ver no GitHub, quando aplicável)

`greentoken` e `syscallcage` já têm `_index.md` com conteúdo — o
conteúdo existente é preservado e reorganizado dentro do novo layout,
não descartado.

### CA-2
Cada uma das 6 páginas de projeto carrega sem erro 404, usa o mesmo
partial de layout (verificável no código-fonte gerado), e mantém as
imagens nos tamanhos corretos por breakpoint. O botão de WhatsApp
(RF-3.1) aparece fixo em todas elas, inclusive no blog.

---

## 7. Manifesto de imagens

Estrutura de pastas a ser criada em `static/images/projetos/`:

```
static/images/projetos/
├── imunno-system/
│   ├── imunno-hero.png              (imagem principal, grande, usada na home E no topo da página)
│   ├── imunno-dashboard.png
│   ├── imunno-arquitetura.png
│   └── imunno-alerta-tempo-real.png
├── creare-labs/
│   ├── creare-hero.png
│   ├── creare-simulador.png
│   ├── creare-comissionamento-esp32.png
│   └── creare-editor-blocos.png
├── syscallcage/
│   ├── syscallcage-hero.png
│   ├── syscallcage-terminal-doctor.png
│   └── syscallcage-modo-sync.png
├── kernel-wsl2-bpf-plus/
│   ├── kernel-hero.png
│   ├── kernel-doctor-lsm-ativo.png
│   └── kernel-build-terminal.png
├── greentoken/
│   ├── greentoken-hero.png
│   ├── greentoken-dashboard-metrica.png
│   └── greentoken-grafico-consumo.png
└── appfitness/
    ├── appfitness-hero.png
    ├── appfitness-landing-mobile.png
    └── appfitness-dashboard-treinador.png
```

Regras de nomenclatura: sempre `{slug-do-projeto}-{descricao-curta}.png`,
minúsculo, sem espaço (hífen), sem acento. Você fica responsável por
substituir cada arquivo pelo print correspondente, mantendo exatamente
esses nomes — o site já lê essas imagens pelo nome fixo, não precisa
alterar código para trocar imagem.

**DECISÃO ABERTA 5**: a lista acima é um ponto de partida razoável (3–4
imagens por projeto). Se algum projeto tiver print que não se encaixa em
nenhuma dessas categorias, me avise e criamos nome adicional antes de
você tirar o print, para já nascer com convenção certa.

---

## 8. Diretrizes de conteúdo (copy)

### RF-8 — Linguagem leiga obrigatória fora da seção técnica

Toda a home page, a seção de serviços, e as seções 1–3 e 5 de cada
página de projeto (hero, problema, galeria, CTA) devem ser escritas sem
jargão técnico não explicado. Teste prático: um empresário de cidade
pequena sem nenhuma bagagem de TI precisa entender o que você faz e por
que isso ajuda ele, lendo uma vez.

A seção 4 ("Como funciona por trás") de cada projeto é a exceção
deliberada — ali pode ter profundidade técnica real, porque o público
dessa seção específica é diferente (recrutador técnico, dev, investidor
técnico).

### RF-9 — Aplicar a técnica anti-detecção de IA

Todo o texto novo escrito para este site (home, serviços, descrições de
projeto em linguagem leiga) deve seguir
`ANTI_IA_DETECTION_TECHNIQUE.md`: sem travessão como conector, sem
transição formulaica, com contração natural do PT-BR, parágrafos
assimétricos, abertura pela dor/curiosidade do leitor. A seção técnica
("como funciona por trás") pode ser mais direta e estruturada, já que ali
precisão técnica pesa mais que naturalidade estilística (mesma exceção
que o próprio guia já prevê para spec/documentação técnica).

---

## 9. Requisitos não-funcionais

### RF-10 — Performance
Lighthouse mobile ≥ 90 em Performance. Imagens servidas em formato
otimizado (Hugo image processing nativo: `webp` com fallback, resize
automático por breakpoint).

### RF-11 — SEO
Cada página de projeto com meta title/description próprios, Open Graph
image (usar a imagem `-hero` de cada projeto). Sitemap.xml gerado
automaticamente (Hugo já faz isso nativamente).

### RF-12 — Acessibilidade
Contraste de texto sobre `.glass` deve passar WCAG AA mesmo com o efeito
de transparência (testar com o `--ink-1`/`--ink-2` do token portado,
que já foi desenhado para isso no AppFitness).

### RF-13 — Mobile-first
Breakpoint de referência: 375–390px (mesmo critério usado no AppFitness).
Grids de 3 colunas caem para 1 coluna no mobile.

---

## 10. Testes e qualidade (princípios do Rodrigo aplicados)

- **Legibilidade e clean code**: partials Hugo nomeados por função
  (`project-card.html`, `service-item.html`, `ambient.html`), não por
  posição na página.
- **Erro nunca silencioso**: se uma imagem do manifesto (seção 7) não
  existir no build, o build deve **falhar visivelmente** (ou logar aviso
  claro), nunca renderizar `<img>` quebrada silenciosamente sem
  indicação no terminal de build.
- **Não quebrar o que já funciona**: `/syscallcage/` e `/greentoken/`
  devem continuar acessíveis durante toda a migração — a troca é
  incremental, não all-or-nothing.
- **Teste E2E**: checklist manual mínimo antes de considerar pronto —
  navegar home → cada aba de projeto → blog → formulário de contato
  (envio de teste real) → verificar em mobile real (não só DevTools).

---

## 11. Decisões já confirmadas por Rodrigo

1. Contato via WhatsApp flutuante (RF-3.1), sem formulário, sem banco.
2. `/syscallcage/` e `/greentoken/` mantêm URL atual; os outros 4
   projetos ganham URL nova própria.
3. Accent color: `sky`.
4. Kernel WSL2 BPF Plus tem página própria, referenciando o SysCallCage
   como origem, mas com vitrine independente.
5. Manifesto de imagens da seção 7 aceito como ponto de partida —
   ajustes pontuais são esperados durante a implementação, não é
   necessário fechar 100% antes de começar.

## 12. Fora de escopo desta spec (Fase 2, se fizer sentido depois)

- Blog com sistema de busca/filtro por tag
- Contador de views público por post
- Dashboard próprio de analytics (fica com Cloudflare/Plausible por ora)
- Renomeação efetiva de MakerLabs para CreareLabs no código/repositório
  (a spec já usa o nome novo na UI do site, mas a migração do
  repositório em si é tarefa separada, fora do escopo deste site)
