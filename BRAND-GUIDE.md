# BRAND-GUIDE.md — rodrigofreire.dev

Documento único de referência. Qualquer peça nova (post de blog, carrossel de
Instagram, orçamento em PDF (*Portable Document Format* — formato portátil de documento), mensagem padrão de WhatsApp, nova seção do site)
usa o que está aqui, sem reinventar tom ou visual a cada vez.

---

## 1. Identidade e Filosofia Visual

**Nome de marca:** Rodrigo Freire / rodrigofreire.dev  
**Domínio:** rodrigofreire.dev.br (em propagação de DNS (*Domain Name System* — sistema de resolução de nomes de domínio), substituindo o `.dev`)  
**O que a marca representa:** Atendimento de TI empresarial e suporte de alto impacto direto, local, em Porto Velho, sem intermediários e sem jargão — em contraste com suporte corporativo distante, lento e impessoal que é a dor de mercado identificada na região.  
**Filosofia de Design:** *"Sofisticação é contenção"*. A distinção da marca não vem do acúmulo de efeitos decorativos ou estética chamativa de software (*SaaS techie* — visual espalhafatoso comum em aplicativos comerciais genéricos), mas da precisão tipográfica, do equilíbrio no uso de espaços em branco e da clareza de foco. Cada tela comunica autoridade através da sobriedade.

---

## 2. Cores e Tokens Oficiais

| Uso | Hex | Token no código CSS |
|---|---|---|
| Cor primária (texto de destaque, títulos, botões sólidos) | `#000000` | `--color-brand-primary` / `--text-primary` |
| Cor de destaque/ação (*accent* — links, pontos de foco pontuais) | `#3533cd` | `--corp-accent` / `--accent-blue` |
| Fundo padrão de página (*background*) | `#FCFCFB` | `--corp-bg` / `--bg-light` |
| Fundo alternativo sutil (seções alternadas) | `#F0EFEA` | `--corp-bg-subtle` |
| Superfície de cartões (*cards*) | `#FFFFFF` | `--card-bg` |
| Bordas e divisores estruturais | `rgba(0, 0, 0, 0.08)` | `--corp-border` / `--border-subtle` |
| Texto de corpo e subtítulos | `#2C3437` / `#4B5563` | `--corp-text-muted` / `--text-secondary` |

**Regra de uso:** Preto puro (`#000000`) e Azul Cobalto (`#3533cd`) são as únicas cores essenciais de marca sobre a base clara (`#FCFCFB`). Cores de alerta (vermelho) ou confirmação (verde) são estritamente funcionais de interface (*UI — User Interface* [interface do usuário]), usadas apenas para indicar status ou validações pontuais.

---

## 3. Pesos de Superfície (Sistema de Elevação Editorial)

O design abole sombras pesadas, brilhos plásticos e camadas simuladas de vidro (*glassmorphism* — efeito visual que imita vidro fosco transparente). A hierarquia espacial do projeto é estritamente dividida em três níveis de peso:

| Nível | Função | Características Visuais | Aplicação |
|---|---|---|---|
| **Nível 0: Plano** | Fundo da tela | Cor sólida `#FCFCFB` (ou `#F0EFEA`). Sem borda, sem sombra, sem elevação. | Fundo principal da página, seções abertas. |
| **Nível 1: Cartão** | Contêiner de conteúdo | Fundo branco sólido `#FFFFFF`, borda ultra-fina de `1px solid rgba(0, 0, 0, 0.08)`, sombra sutil `0 1px 2px rgba(0, 0, 0, 0.04)`. Sem transparência, sem desfoque. | Cards de serviços, diagnósticos, depoimentos, formulários. |
| **Nível 2: Destaque** | Ponto focal único | Fundo preto sólido `#000000`, texto claro `#FCFCFB`. Máximo de um elemento por tela visível. | Botão de ação principal (*primary CTA — Call To Action* [chamada principal para ação]), badge de fechamento. |

---

## 4. Regras Estritas de Contenção Visual

Para manter a marca alinhada ao posicionamento executivo e sóbrio, as seguintes proibições são absolutas em qualquer peça ou página:

1. **Sem texto em degradê:** É terminantemente proibido o uso de títulos com gradiente multicolorido ou mascaramento de texto (*background-clip: text* — técnica CSS que aplica degradê recortado às letras). Todos os títulos e textos devem ser apresentados em cor sólida legível (`#000000` ou `#3533cd` para ênfases específicas).
2. **Sem orbs ou animações de fundo em loop:** É proibido inserir esferas luminosas (*orbs*), névoas coloridas ou gradientes pulsantes em rotação no fundo das seções. O fundo deve ser plano, repousante e estável.
3. **Sem efeitos cintilantes (*shimmer*):** Nenhum botão, cartão ou elemento interativo deve emitir reflexos de luz em movimento diagonal (*shimmer* [efeito de brilho cintilante passando pela superfície]) ao passar o cursor do mouse (*hover* [ação de sobrepor o ponteiro]).
4. **Desfoque (*blur*) como exceção absoluta:** O efeito de desfoque translúcido (*backdrop-filter: blur* [filtro de desfoque sobre o fundo]) é restrito unicamente ao cabeçalho fixo (*header* [barra de navegação superior], com desfoque máximo de 12px) para manter legibilidade durante a rolagem. Nenhum card, caixa de diálogo (*modal*) ou botão pode utilizar esse efeito.
5. **Sem elevação agressiva em hover:** Cartões e elementos interativos não devem saltar verticalmente (`transform: translateY`) ou sofrer aumento de escala (`scale`) ao passar o mouse. A interatividade deve ser discreta, limitada a uma transição sutil de borda ou sombra.
6. **Um destaque por tela (*One Hero Highlight*):** No primeiro quadrante visível (*above the fold* [área inicial visível da tela antes de rolar]) e em cada bloco de conteúdo, deve haver no máximo **um** botão de ação sólido escuro. Botões e links secundários devem adotar contorno vazado (*outline* [botão apenas com borda e fundo transparente]) ou estilo de link textual sóbrio com sublinhado sutil.

---

## 5. Tipografia

A tipografia reflete o equilíbrio entre autoridade editorial e clareza técnica contemporânea:

1. **Títulos Principais e Editoriais (Display, H1, H2, Hero, Chamadas Institucionais):**
   - **Família:** `Instrument Serif`, Georgia, serif.
   - **Peso:** 400 (Regular e Itálico para ênfases expressivas pontuais).
   - **Características:** Altura de linha (*line-height*) compacta (1.08 a 1.15) e espaçamento entre letras ligeiramente reduzido (*letter-spacing: -0.01em* a *-0.02em*).

2. **Títulos Secundários, Subtítulos, Corpo de Texto e Interface (H3 a H6, Botões, Badges, Formulários):**
   - **Família:** `Inter`, sans-serif.
   - **Pesos:** 600 (Semibold — para subtítulos de cartões, rótulos e botões) e 400 (Regular — para textos de leitura corrida e parágrafos).
   - **Características:** Altura de linha arejada (1.55 a 1.65) para leitura confortável.

3. **Trechos de Código e Dados Técnicos:**
   - **Família:** `JetBrains Mono`, monospace.
   - **Uso:** Exibição de comandos de terminal, código-fonte e dados técnicos em artigos especializados.

4. **Logo (Wordmark e Monograma RFD):**
   - **Família:** Prospec (arte vetorizada exclusiva da identidade gráfica). Não é utilizada para textos corridos de leitura da interface.

*Nota de padronização:* A família tipográfica *Plus Jakarta Sans* foi integralmente descontinuada do ecossistema do site para garantir pureza e consistência estética.

---

## 6. Logo e Aplicações

**Arquivos principais:** `/public/images/logo.png` (marca nominativa horizontal *wordmark* "rodrigofreire.dev") e `/public/images/logo-rfd.png` (monograma quadrado RFD). Versão em vetor claro: `/public/logo-rfd-white.png`.

**Diretrizes de aplicação:**
- **Área de respiro mínima:** Não posicionar textos ou elementos gráficos a uma distância inferior a metade da altura do "R" inicial da marca.
- **Tamanho mínimo legível:** O logotipo horizontal completo não deve ser reduzido abaixo de 120px de largura.
- **Uso do Monograma:** O monograma RFD destina-se a espaços reduzidos (ícone de favoritos no navegador [*favicon*], ícone de aplicativo, fotos de perfil em redes sociais).
- **Contraste de Fundo:** Utilizar a versão escura da marca sobre a paleta clara padrão (`#FCFCFB` ou branco) e a versão branca (`logo-rfd-white.png`) caso uma área escura delimitada seja empregada (como o rodapé institucional).

---

## 7. Tom de Voz e Comunicação

O tom de voz é parte indissociável da marca:

- **Português brasileiro autêntico e direto**, com contrações naturais (tá, pra, né) quando o contexto solicitar proximidade — sem vulgaridade e sem formalismo acadêmico engessado.
- **Nunca usar travessão como conector de frase.**
- **Evitar transições formulaicas** ("é importante ressaltar", "em suma", "cabe destacar").
- **Evitar estruturas de lista ou três partes como muleta retórica:** Variar o ritmo das frases e parágrafos.
- **Abrir sempre pela dor e pelo impacto comercial real de quem lê**, antes de propor ferramentas ou produtos.
- **Comunicação comercial (site, WhatsApp, redes sociais):** Zero jargão desnecessário de programação. Toda capacidade técnica deve ser explicada pelo benefício tangível (tempo economizado, prevenção de pane, aumento de faturamento, tranquilidade fiscal).
- **Comunicação técnica especializada (artigos de engenharia, projetos de software):** Precisão conceitual rigorosa para transmitir autoridade junto a profissionais de tecnologia.
- **Honestidade e transparência:** Esclarecer com franqueza quando uma tecnologia ou contratação não for necessária para a fase atual da empresa do cliente é princípio central da reputação da marca.

---

## 8. Checklist de Aplicação nos Pontos de Contato

- [x] Eliminação total de degradês em títulos e botões no site (RF-1)
- [x] Correção da dívida de cor residual e renomeação de tokens (RF-2)
- [x] Remoção de orbs animados e efeitos shimmer no CSS global (RF-3)
- [x] Implementação dos 3 pesos de superfície: Plano, Cartão sólido e Destaque único (RF-4)
- [x] Adoção da tipografia editorial Instrument Serif (400) e Inter (400/600) (RF-5)
- [x] Contenção visual com exatamente um destaque sólido por tela (RF-6)
- [ ] Foto de perfil do Instagram e WhatsApp Business padronizada com o monograma RFD
- [ ] Modelo de proposta e orçamento em PDF com layout sóbrio e tipografia alinhada
- [ ] Assinatura de e-mail institucional padronizada
