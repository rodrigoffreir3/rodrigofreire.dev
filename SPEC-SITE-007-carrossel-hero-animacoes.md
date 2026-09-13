# SPEC-SITE-007 — Carrossel de Mockups no Hero e Animações Complementares

- **ID:** SPEC-SITE-007
- **Executor:** Antigravity
- **Depende de:** SPEC-SITE-005 (arquitetura e honestidade),
  SPEC-SITE-005-C (mockup de loja online, que este spec expande),
  SPEC-SITE-006 (política de animação — **este spec emenda o RF-3**),
  SPEC-SITE-004 (performance e pré-renderização), BRAND-GUIDE.md

---

## 0. Restrições herdadas (inegociáveis)

Valem integralmente: código em `src/pages/` e `src/components/`,
**nunca** em `index.html`; **zero classe utilitária Tailwind**; toda
classe e `@keyframes` declarado em `src/global.css` no padrão semântico
existente; paleta restrita ao BRAND-GUIDE (`#000000`, `#3533cd`,
`#FCFCFB`, `#F0EFEA`, `#2C3437`); **nenhuma biblioteca de animação ou de
carrossel** pode ser adicionada ao `package.json`.

---

## 1. Emenda formal ao SPEC-SITE-006 RF-3

O SPEC-SITE-006 RF-3 proíbe "carrossel com rotação automática de
conteúdo". Essa proibição permanece válida para carrossel **decorativo**
(imagens intercambiáveis sem argumento próprio).

**Exceção autorizada, exclusiva do hero:** o carrossel definido neste
spec é permitido porque cada item carrega um argumento comercial
distinto — não é o mesmo conteúdo em roupagem diferente, é cinco
propostas de valor diferentes. O carrossel **é** o conteúdo.

Essa exceção vale **apenas** para o hero da Home. Nenhum outro carrossel
automático é autorizado em nenhuma outra parte do site.

---

## 2. Objetivo

Transformar o mockup único do hero (SPEC-SITE-005-C) em um carrossel de
cinco mockups animados, cada um acompanhado de texto próprio que
argumenta o valor daquele tipo de entrega.

**Mensagem a transmitir:** Rodrigo constrói sites, lojas online e
sistemas — modernos, dinâmicos e bem-acabados. O carrossel é a prova
visual disso; o texto sincronizado é o argumento comercial de cada um.

---

## 3. RF-1 (P0) — Os cinco mockups

Criar `src/components/HeroMockups/`, com um componente por mockup mais
um componente de carrossel que os orquestra.

Todos seguem as mesmas regras visuais do SPEC-SITE-005-C: moldura de
janela de navegador (ou de aplicativo/celular, conforme o caso),
blocos entrando em sequência escalonada, azul de destaque (`#3533cd`)
apenas em pontos de ação, ícones de placeholder no lugar de imagem real.

**Mockup 1 — Loja online** (já existe, SPEC-SITE-005-C; reaproveitar)
Cabeçalho com logo e carrinho → vitrine com botão "Comprar" → grade de
três produtos → rodapé de checkout com cadeado e "Finalizar pedido".

**Mockup 2 — Site institucional**
Moldura de navegador. Blocos em sequência: cabeçalho com logo e menu de
quatro itens → faixa de destaque com título, subtítulo e botão de ação →
faixa de três blocos de serviço com ícone → bloco de rodapé com contato.
Estética mais sóbria que a da loja: menos cor de destaque, mais espaço
em branco.

**Mockup 3 — PDV (ponto de venda)**
Moldura de aplicativo em tela cheia, sem barra de navegador. Blocos:
cabeçalho com nome do estabelecimento fictício e indicador de caixa
aberto → grade de botões de produto (6 blocos com ícone) → coluna
lateral de comanda com três linhas de item e uma linha de total (bloco
gráfico, **sem número**) → botão grande de finalizar venda.

**Mockup 4 — Automação de WhatsApp**
Moldura de celular (retrato). Blocos entrando como bolhas de conversa em
sequência alternada: mensagem recebida (cliente, alinhada à esquerda) →
resposta automática (alinhada à direita, na cor de destaque) → mensagem
recebida → resposta com três blocos de opção rápida → indicador de
"digitando" com três pontos. As bolhas contêm **linhas de texto
simuladas** (blocos arredondados), não texto legível.

**Mockup 5 — Sistema ERP**
Moldura de navegador. Blocos: barra lateral de menu com cinco itens →
cabeçalho de painel → linha de quatro cartões de indicador (ícone +
linhas simuladas, **sem número nem gráfico**) → tabela com cabeçalho e
quatro linhas de dado simulado (blocos) → botão de ação no topo direito.

---

## 4. RF-2 (P0) — Comportamento do carrossel

**Rotação:** troca automática a cada 7 segundos, em loop circular
infinito (após o quinto, volta ao primeiro). Cada mockup tem tempo de
completar sua animação de entrada antes da troca.

**Transição entre mockups:** deslizamento lateral (`transform:
translateX`) combinado com `opacity`, duração de 400-500ms. O mockup que
sai desliza para um lado, o que entra vem do outro. Direção consistente
(sempre o mesmo sentido) — **PROIBIDO** alternar direção aleatoriamente.

**Controle manual obrigatório:** cinco indicadores clicáveis (pontos ou
traços) abaixo do mockup, permitindo saltar direto para qualquer item. O
indicador do item ativo é visualmente distinto.

**Pausa obrigatória:** a rotação automática pausa quando o ponteiro do
mouse está sobre o carrossel, e permanece pausada após qualquer
interação manual do usuário (clique em indicador), retomando apenas se
ele sair da área. Usuário que assumiu o controle não tem o conteúdo
trocado embaixo dele.

**Acessibilidade:** os indicadores são `<button>` reais, navegáveis por
teclado, com `aria-label` descrevendo o destino ("ver exemplo de loja
online"). O contêiner do carrossel recebe `aria-live="polite"` para que
a troca seja anunciada, e cada mockup ilustrativo recebe
`aria-hidden="true"` (a informação está no texto sincronizado do RF-3,
não no desenho).

---

## 5. RF-3 (P0) — Texto sincronizado com cada mockup

Ao lado do carrossel (coluna de texto do hero), um bloco de argumento
troca junto com o mockup, sempre em sincronia.

**Conteúdo em `defaultData.js`** (novo export `DEFAULT_HERO_SLIDES`),
nunca embutido no JSX. Cada item: `id`, `label` (para o efeito digitado
do RF-4), `titulo`, `texto`.

Direção de conteúdo por item — linguagem sem jargão, primeira pessoa,
fechando em ganho concreto, conforme SPEC-SITE-003:

**Site institucional** — autoridade e credibilidade. O cliente que vai
fechar negócio maior procura seu nome antes. Site próprio é o que
confirma que a empresa é séria, e trabalha junto com o que você já
publica nas redes.

**Loja online** — venda maior e cliente que volta. Fecha venda de valor
mais alto, você controla o que aparece e para quem, guarda o contato de
quem comprou, e não paga comissão de plataforma sobre cada pedido.

**PDV** — venda registrada sem travar a fila. Registro rápido no balcão,
sem menu dentro de menu, com o dado do dia organizado sozinho ao final
do expediente.

**Automação de WhatsApp** — cliente respondido na hora. Resposta
imediata fora do horário e enquanto ninguém pode atender, mantendo a
conversa andando até alguém assumir, em vez de deixar o cliente
esperando e procurar outro.

**Sistema ERP** — tudo no mesmo lugar. Estoque, venda e cadastro
conversando entre si, sem precisar juntar informação na mão em planilha
separada.

**Transição do texto:** desaparece e reaparece (`opacity` + deslocamento
vertical de até 12px), 300ms, sincronizado com a troca do mockup.
**PROIBIDO** deslizamento lateral no texto — apenas o mockup desliza.

---

## 6. RF-4 (P1) — Efeito digitado, escopo definido

**PROIBIDO no `<h1>` do hero.** O título principal permanece estático e
completo no DOM, sempre — o pré-renderizador do SPEC-SITE-004 precisa
encontrá-lo preenchido no HTML bruto, e leitor de tela precisa lê-lo de
uma vez. Isso não é negociável.

**Local 1 (P1) — linha de rótulo do hero.** Logo acima ou abaixo do
`<h1>`, uma linha curta com prefixo fixo e palavra digitada variável,
sincronizada com o carrossel: prefixo estático (ex: "Eu construo") mais
o `label` do item ativo sendo digitado caractere a caractere, apagado, e
substituído pelo próximo na troca. Esse elemento é criado inteiramente
por JavaScript **em adição** ao conteúdo estático, nunca substituindo
texto que precise existir no HTML pré-renderizado, e recebe
`aria-hidden="true"`.

**Local 2 (P2) — máximo dois pontos adicionais no site.** Permitido
aplicar o mesmo efeito em, no máximo, duas outras linhas curtas ao longo
das demais páginas, espaçadas (nunca duas na mesma seção, nunca duas
visíveis ao mesmo tempo na tela). Sempre em linha secundária, nunca em
título, nunca em conteúdo crítico (contato, preço, botão de ação).

**Regras do efeito:** velocidade de digitação entre 60-90ms por
caractere; pausa de 1,5-2s com a palavra completa antes de apagar;
apagamento mais rápido que a digitação; cursor piscante opcional.
Desativado por completo sob `prefers-reduced-motion`, exibindo apenas a
primeira palavra de forma estática.

---

## 7. RF-5 (P1) — Entrada de seção ao rolar

Cada seção principal da Home (riscos, pilares, método, CTA final) entra
com `opacity` de 0 para 1 mais deslocamento vertical de até 12px,
duração 400ms, disparada por `IntersectionObserver` nativo quando a
seção atinge 15% de visibilidade.

**Dispara uma única vez** por sessão de visualização. **PROIBIDO**
repetir ao rolar de volta.

**PROIBIDO** aplicar ao hero (que já está visível no carregamento) e a
qualquer conteúdo crítico: título do hero, botão de WhatsApp, telefone,
formulário de contato.

---

## 8. RF-6 (P1) — Entrada escalonada dos cartões

Dentro de cada seção que contém cartões (riscos, pilares, método), os
cartões entram em sequência escalonada após a seção se tornar visível,
com atraso incremental de 80-120ms entre cada um.

**Efeito:** `opacity` mais deslocamento vertical pequeno (até 10px) e,
opcionalmente, `transform: scale` partindo de 0,97. **PROIBIDO**
rotação, deslizamento lateral, salto ou escala partindo de valor menor
que 0,95.

Dispara uma vez, junto com a seção que os contém.

---

## 9. RF-7 (P0) — Limites técnicos que valem para tudo neste spec

**Propriedades animáveis:** apenas `opacity` e `transform`, conforme
SPEC-SITE-006 RF-4. **PROIBIDO** animar `width`, `height`, `top`,
`left`, `margin` ou `padding`.

**Honestidade (SPEC-SITE-005 seção 2):** nenhum mockup exibe número,
valor monetário, métrica, percentual, nome de empresa real, marca ou
domínio existente. Todo dado dentro dos mockups é bloco gráfico
simulado. Nomes fictícios genéricos apenas (`sualoja.com.br`,
"Loja Modelo").

**Movimento reduzido:** um único bloco
`@media (prefers-reduced-motion: reduce)` desativa a rotação automática
do carrossel (exibindo o primeiro item estático, com os indicadores
manuais ainda funcionais), o efeito digitado, a entrada de seção e a
entrada de cartões — tudo em estado final visível.

**Desempenho:** os cinco mockups são construídos com marcação e CSS,
sem imagem, sem vídeo, sem SVG externo, sem biblioteca. Apenas o mockup
ativo precisa estar animando; os inativos não devem executar animação em
segundo plano.

**Responsividade:** em largura de celular, o carrossel reduz
proporcionalmente e os indicadores permanecem tocáveis (área mínima de
44×44px). Se o conjunto comprometer a legibilidade do hero, o carrossel
cede espaço — **nunca** o título ou o botão de ação.

---

## 10. Critérios de aceitação

- **CA-1:** os cinco mockups renderizam corretamente e o carrossel
  alterna entre eles em loop circular, com transição lateral consistente.
- **CA-2:** o texto do hero troca em sincronia com o mockup ativo, sem
  defasagem, e todo o conteúdo vem de `DEFAULT_HERO_SLIDES` em
  `defaultData.js`.
- **CA-3:** inspecionando o HTML pré-renderizado (`view-source` de
  `dist/index.html`), o `<h1>` do hero aparece completo e preenchido —
  CA-2 do SPEC-SITE-004 preservado.
- **CA-4:** a rotação pausa com o ponteiro sobre o carrossel e após
  clique em qualquer indicador.
- **CA-5:** os indicadores são `<button>` navegáveis por teclado, com
  `aria-label` descritivo, e recebem estado de `focus` visível.
- **CA-6:** com `prefers-reduced-motion: reduce` ativo, nenhuma rotação
  automática, digitação ou animação de entrada ocorre, e todo o conteúdo
  permanece visível e legível.
- **CA-7:** nenhum número, valor, métrica, marca real ou domínio
  existente aparece em qualquer um dos cinco mockups.
- **CA-8:** nenhuma dependência nova no `package.json`; nenhum arquivo
  de imagem, vídeo ou SVG novo em `public/`.
- **CA-9:** busca no CSS por `transition` ou `@keyframes` animando
  `width`, `height`, `top`, `left`, `margin` ou `padding` retorna zero
  ocorrência.
- **CA-10:** o efeito digitado aparece em no máximo três pontos do site
  inteiro (hero mais dois), nunca dois visíveis simultaneamente na tela,
  e nunca em `<h1>` ou conteúdo crítico.
- **CA-11:** nenhuma classe utilitária Tailwind introduzida; toda classe
  referenciada existe declarada em `global.css`.
- **CA-12:** `npm run build` conclui sem erro e o pré-render continua
  gerando as 21 páginas com metatags próprias.
- **CA-13:** em celular, título do hero e botão de ação permanecem
  legíveis e acima da dobra.

---

## 11. Fora de escopo

- Alteração do texto do `<h1>` do hero (SPEC-SITE-005 RF-3).
- Carrossel automático em qualquer outra parte do site — a exceção da
  seção 1 é exclusiva do hero.
- Versão interativa dos mockups (clique que navega dentro do mockup).
- Animação em material fora do site.
