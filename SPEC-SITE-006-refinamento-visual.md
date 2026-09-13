# SPEC-SITE-006 — Refinamento visual: de "SaaS techie" para sóbrio e editorial

Spec derivado de auditoria de design do site, do `global.css` e dos 30 slides
de carrossel em `instagram-posts/`. Cobre **apenas linguagem visual**: cor,
tipografia, peso de superfície, hierarquia e consistência com o
`BRAND-GUIDE.md`. Não altera copy, arquitetura de informação, rotas, SEO nem
dados.

## Diagnóstico que originou o spec

O posicionamento declarado é engenharia de software de alto nível, com
elegância e sofisticação. O vocabulário visual implementado é o oposto:
`--glass-crystal-*` aplicado como padrão em 12 famílias de card, orbs
animados em blur de 85px no fundo de toda página, `shimmer glint` percorrendo
cards no hover, títulos em gradiente com `-webkit-text-fill-color:
transparent` e `translateY(-4px)` em cada superfície. Esse conjunto é o
repertório de template SaaS genérico e é o que lê como "TI", não como
autoridade técnica.

Diretriz geral para todas as ações abaixo: **sofisticação é contenção**. Um
elemento de destaque por tela, hierarquia por tamanho e espaço, não por
efeito.

---

## RF-1 (P0) — Eliminar títulos em gradiente

Hoje o gradiente preto→azul com clip de texto aparece em
`.hero-enterprise-title .highlight-cyan`, `.step-num-badge` e em toda headline
dos carrosséis. É o marcador visual mais forte de amadorismo no site e está
repetido em praticamente todas as telas.

**Ação:** remover clip de texto em gradiente de todo título. Título em
`#000000` sólido. Onde havia necessidade de destacar um trecho, o trecho vai
em `#3533cd` sólido — e **no máximo um trecho por tela**.

Arquivos: `src/global.css` (buscar `-webkit-background-clip: text` e
`-webkit-text-fill-color: transparent`) e `scripts/generate_carousels.py`.

**Critério de aceitação:** `grep -n "background-clip: text" src/global.css`
retorna zero ocorrências, e nenhuma página tem mais de um trecho de headline
em azul.

## RF-2 (P0) — Corrigir a dívida da paleta antiga (teal residual)

O `BRAND-GUIDE.md` declara preto + azul elétrico como as únicas cores de
marca, mas o CSS ainda carrega dezenas de `rgba(11, 74, 79, ...)` (teal da
paleta anterior) em bordas, sombras, badges, `.corp-btn-secondary`,
`.corp-badge`, `.dropdown-*`, `.strip-item-chip`, `.pricing-badge-pill` e
outros. Também há `rgba(0, 168, 150, ...)` em `.tech-tag` e
`.hero-security-status-badge`. Resultado: a paleta na tela não é a paleta
documentada — há verde-esverdeado em elementos de interface.

**Ação:**
1. Substituir todo `rgba(11, 74, 79, α)` por `rgba(0, 0, 0, α)` e todo
   `rgba(0, 168, 150, α)` por `rgba(53, 51, 205, α)`, mantendo o alfa.
2. Renomear as variáveis desatualizadas conforme a nota técnica do
   BRAND-GUIDE: `--color-dark-teal` → `--color-brand-ink`,
   `--color-cyan-teal` / `--color-cyan-neon` → `--color-brand-blue`,
   `--color-night-blue` → `--color-brand-ink`. Atualizar todas as referências
   em `src/global.css` e nos `.jsx`.
3. Remover `--brand-gradient` e `--brand-gradient-hover` do uso em texto;
   manter apenas onde há fundo sólido de botão (ver RF-4).

**Critério de aceitação:** `grep -rn "11, 74, 79\|168, 150\|dark-teal\|cyan-teal\|cyan-neon\|night-blue" src/`
retorna zero ocorrências.

## RF-3 (P0) — Remover os orbs animados e o shimmer de hover

`.apple-ambient-container` com quatro `.apple-ambient-orb` (720–850px, blur
85px, animações de 22–28s) e o pseudo-elemento `::after` de shimmer aplicado
a 14 seletores de card são movimento permanente e brilho decorativo. Custam
performance em mobile e leem como efeito de template.

**Ação:**
1. Remover `.apple-ambient-container`, `.apple-ambient-orb`, `.orb-primary`,
   `.orb-secondary`, `.orb-accent`, `.orb-warm` e os `@keyframes floatOrb1–4`.
   Remover também o componente que os monta (`MultiLayerCanvas.jsx`, se for
   sua única função — verificar antes).
   Nota: `.orb-warm` usa laranja/rosa (`rgba(251, 146, 60)`,
   `rgba(244, 63, 94)`), cores que não existem na marca — isso sai junto.
2. Remover o bloco de `::after` de shimmer (`transparent → rgba(255,255,255,.35)
   → transparent`, `skewX(-20deg)`, `left: -130% → 150%`) e todos os seletores
   `:hover::after` associados.
3. Fundo de página passa a ser `--bg-page` (`#FCFCFB`) sólido, com
   `--bg-page-subtle` (`#F0EFEA`) usado para separar seções quando
   necessário. Máximo dois fundos na página inteira.

**Critério de aceitação:** nenhuma animação roda em loop infinito na home
com a página parada; `grep -n "floatOrb\|skewX(-20deg)" src/global.css`
retorna zero.

## RF-4 (P1) — Glass como exceção, não como padrão

Hoje `--glass-crystal-*` é o fundo de `.pain-card-item`, `.method-step-card`,
`.service-card-liquid`, `.segment-card-item`, `.pricing-base-card`,
`.faq-item-accordion`, `.diagnostic-info-card`, `.diagnostic-form-glass`,
`.hero-visual-card`, `.kpi-card`, chips, pills e botões. Quando toda
superfície é vidro translúcido com especular, nada tem destaque.

**Ação:** definir um sistema de **três pesos de superfície** e mapear cada
componente a exatamente um:

| Peso | Tratamento | Onde usar |
|---|---|---|
| Nível 0 — plano | fundo `--bg-page`, sem borda, sem sombra | seções, blocos de texto corrido, FAQ |
| Nível 1 — cartão | fundo `#FFFFFF`, borda `1px solid rgba(0,0,0,0.08)`, sem sombra ou sombra `0 1px 2px rgba(0,0,0,0.04)`, raio `--radius-md` | cards de serviço, dores, segmentos, passos de metodologia |
| Nível 2 — destaque | fundo `#000000`, texto `#FCFCFB`, sem borda | **um** bloco por página: o CTA principal |

Remover `backdrop-filter` de todos os cards. O único uso legítimo de blur que
permanece é o `.header` sticky (blur discreto, ≤12px, sem `saturate`).

Hover de card: apenas mudança de cor de borda para `rgba(0,0,0,0.18)`. Sem
`translateY`, sem `scale`, sem mudança de sombra.

**Critério de aceitação:** `grep -c "backdrop-filter" src/global.css` cai para
no máximo 2 ocorrências (header, prefixado + sem prefixo); nenhum card tem
`transform` no `:hover`.

## RF-5 (P1) — Tipografia: introduzir a serifada editorial

Plus Jakarta Sans + Inter são corretas e sem personalidade. A logo `R.F` é uma
serifada de alto contraste — é o ativo mais elegante da marca e o site não
conversa com ela em nenhum ponto. Uma serifada display nos títulos resolve ao
mesmo tempo elegância e coerência de marca.

**Ação:**
1. Adicionar **Instrument Serif** (Google Fonts, regular 400 + italic) como
   `--font-display`, aplicada a: `h1`, `h2` e títulos de seção
   (`.hero-enterprise-title`, `.section-title-large`, `.ai-spotlight-copy h2`,
   `.cta-banner-corp h3`).
   Peso 400, `letter-spacing: -0.01em`, `line-height: 1.08` em tamanho
   display. Serifada de alto contraste **não** leva peso 700 nem
   `letter-spacing` negativo agressivo — o `-0.035em` atual sai.
2. `h3`, `h4`, labels, badges, botões e navegação continuam em **Inter**
   (semibold 600), não em Plus Jakarta Sans. Remover Plus Jakarta Sans do
   projeto — dois sans concorrentes no mesmo sistema não somam nada.
3. Corpo de texto: Inter 400, `line-height: 1.65` (já está correto).
4. Atualizar a seção 3 do `BRAND-GUIDE.md` com o novo par tipográfico.

Alternativa, se Instrument Serif ficar frágil em headline de 3 linhas:
**Newsreader** 400 — mesma família de intenção editorial, contraste menor,
mais robusta em texto longo. Escolher uma das duas, não misturar.

**Critério de aceitação:** nenhuma referência a `Plus Jakarta Sans` no
projeto; `h1`/`h2` renderizam na serifada em peso 400; par tipográfico
documentado no BRAND-GUIDE.

## RF-6 (P1) — Hierarquia: um destaque por tela

Consequência direta de RF-1 e RF-4, verificada tela por tela. Regra: cada
página tem **um** elemento de maior peso visual (o CTA de nível 2), e todo o
resto é hierarquizado por tamanho de tipo e espaço em branco.

**Ação:** revisar `src/pages/Home.jsx`, `Sobre.jsx`, `Contato.jsx`,
`Projects.jsx` e `Blog.jsx` e reduzir a competição visual:
- Máximo um botão em fundo sólido por seção. Os demais viram link de texto
  com underline no hover.
- `.hero-pain-chips-row`, `.solutions-strip-bar` e `.hero-metrics-bar`
  competem entre si no primeiro scroll — manter no máximo dois desses três
  elementos acima da dobra.
- `.hero-visual-card` (mockup de cockpit com KPIs e dots de janela): decidir
  se permanece. Se permanecer, vai como Nível 1 sem glass; o simulador de
  janela com `dot-red/yellow/green` é clichê de landing page e pode sair.

**Critério de aceitação:** contagem manual — no primeiro viewport da home
existe exatamente um botão de fundo sólido.

## RF-7 (P2) — Padronizar os carrosséis de Instagram

Em `instagram-posts/` há 30 slides gerados por `scripts/generate_carousels.py`
com dois problemas de consistência:

1. **Fórmula repetida:** 100% dos slides usam "linha 1 preta / linha 2 azul"
   na headline. Repetida 30 vezes, deixa de ser design e vira template.
2. **Fundo alternando** claro e escuro entre posts sem critério editorial,
   o que dispersa reconhecimento de marca no feed.
3. **Capas com o terço superior vazio**, ocupado apenas por degradê.

**Ação:**
1. Aplicar RF-1 aqui também: headline sólida, destaque em azul apenas quando
   a frase realmente pede ênfase — não por padrão em toda segunda linha.
2. Definir **um** fundo padrão para todos os posts (recomendação: claro
   `#FCFCFB`, que é o fundo da marca e destaca melhor o preto/azul); reservar
   o escuro para uma categoria editorial específica e declarada (ex.: apenas
   posts do blog técnico).
3. Capa: subir o bloco de título para ocupar o terço superior ou centralizar
   verticalmente o conjunto badge + título + subtítulo. Nenhum slide entrega
   um terço de área vazia sem função.
4. Aplicar a serifada de RF-5 nos títulos dos slides.

**Critério de aceitação:** regerar os 30 slides pelo script e confirmar que
nenhum tem área vazia superior a ~20% da altura e que o fundo é consistente
dentro da categoria definida.

## RF-8 (P2) — Atualizar o BRAND-GUIDE como fonte de verdade

O guia descreve uma marca mais sóbria do que o código implementa. Depois de
RF-1 a RF-7, o guia precisa registrar as decisões novas, senão a próxima peça
reintroduz o que este spec removeu.

**Ação:** adicionar ao `BRAND-GUIDE.md`:
- Seção "Pesos de superfície" com a tabela de três níveis de RF-4.
- Regra explícita: sem gradiente em texto; sem animação de fundo em loop; sem
  shimmer; blur apenas no header.
- Par tipográfico atualizado (RF-5).
- Regra de um destaque por tela (RF-6).
- Regra de fundo único para carrosséis (RF-7).

**Critério de aceitação:** o guia, lido isoladamente, é suficiente para
produzir uma peça nova sem reintroduzir nenhum dos itens removidos.

---

## Ordem de execução recomendada

RF-2 → RF-1 → RF-3 → RF-4 → RF-5 → RF-6 → RF-7 → RF-8.

RF-2 primeiro porque limpa a base de cor sobre a qual todo o resto opera;
RF-8 por último porque registra o resultado final.

Cada RF é um commit isolado, com screenshot antes/depois da home em desktop e
mobile.

## Fora de escopo

- Reescrita de copy. O tom de voz do site e dos carrosséis está correto e é o
  maior diferencial da marca — não mexer.
- Arquitetura de informação, rotas, SEO, `defaultData.js`, Supabase, área
  administrativa.
- Nova logo ou redesenho de marca. A logo atual é o ativo mais forte; o spec
  aproxima o site dela, não o contrário.
- Migração de framework.

## Risco conhecido

RF-3 e RF-4 removem a maior parte do efeito visual do site ao mesmo tempo. Na
primeira visualização o resultado vai parecer "vazio" comparado ao atual —
esse é o efeito esperado, e é o que diferencia contenção de ausência de
design. A correção certa se ainda ficar frio não é devolver glass e gradiente,
é aumentar escala tipográfica, espaço em branco e qualidade de imagem.
