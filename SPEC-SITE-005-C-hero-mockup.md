# SPEC-SITE-005-C — Mockup Animado no Hero da Home

- **ID:** SPEC-SITE-005-C
- **Executor:** Antigravity
- **Depende de:** SPEC-SITE-005 (seção 0 de arquitetura e seção 2 de
  honestidade — valem integralmente), SPEC-SITE-004 (performance),
  BRAND-GUIDE.md

---

## 0. Restrições herdadas

Todas as restrições da seção 0 do SPEC-SITE-005 continuam valendo:
conteúdo e marcação em `src/pages/Home.jsx`, **nunca** em `index.html`;
**zero classe utilitária Tailwind**; toda classe nova declarada em
`src/global.css` no padrão semântico já existente (`hero-enterprise-inner`,
`service-card-liquid`, etc.); paleta restrita ao BRAND-GUIDE.

---

## 1. Objetivo

Substituir o elemento visual do lado direito do hero (coluna secundária)
por uma animação de mockup de loja online se montando bloco a bloco, em
loop.

**Justificativa:** o hero hoje afirma competência. O mockup **mostra** o
tipo de entrega, reforçando o Pilar 03 (Plataformas e Presença Digital)
definido no SPEC-SITE-005. Mostrar vale mais que afirmar em página de
conversão.

**Por que não foto:** foto posada gerada por IA cai em zona de "quase
real", e contradiz o diferencial de pessoa real e acessível que o negócio
comunica. A foto real de Rodrigo já cumpre esse papel na página Sobre —
não precisa ser duplicada no hero em versão artificial.

---

## 2. RF-1 (P0) — Implementar o mockup animado

Criar o componente do mockup em `src/components/HeroMockup.jsx`,
importado por `Home.jsx` na coluna visual do hero.

**Estrutura visual, de cima para baixo:**

1. Barra de janela de navegador: três círculos e barra de endereço com
   o texto `sualoja.com.br`.
2. Cabeçalho da loja: bloco de logo na cor de destaque, dois itens de
   menu neutros, ícone de carrinho.
3. Bloco de vitrine: título, subtítulo, botão "Comprar" na cor de
   destaque, e um retângulo de imagem com ícone de placeholder.
4. Grade de três cartões de produto: ícone de placeholder, linha de
   nome, linha de preço na cor de destaque.
5. Rodapé de checkout: ícone de cadeado com "Pagamento seguro" e botão
   "Finalizar pedido" na cor primária.

**Animação:** cada bloco entra com opacidade de 0 para 1 e deslocamento
vertical sutil (10px de baixo para cima), em sequência escalonada por
`animation-delay`. Ciclo completo de aproximadamente 6 segundos, em loop
infinito, com os blocos desaparecendo ao final antes de recomeçar.

**Implementação obrigatoriamente em CSS puro** (`@keyframes` +
`animation-delay` escalonado). **PROIBIDO** usar JavaScript de animação,
biblioteca de animação, vídeo, GIF ou imagem gerada — o objetivo é custo
de carregamento praticamente nulo, preservando o trabalho de performance
do SPEC-SITE-004 RF-7.

---

## 3. RF-2 (P0) — Acessibilidade

**Movimento reduzido:** incluir bloco
`@media (prefers-reduced-motion: reduce)` que desativa a animação e
deixa todos os blocos visíveis em estado final estático. Requisito, não
opcional.

**Leitor de tela:** o mockup é decorativo/ilustrativo. Marcar o
contêiner com `aria-hidden="true"`, ou fornecer um texto alternativo
único e curto descrevendo o que é (ex: "ilustração de uma loja online
sendo montada"). Não expor cada bloco individualmente ao leitor de tela.

---

## 4. RF-3 (P0) — Limite de honestidade

Herda integralmente a seção 2 do SPEC-SITE-005. Aplicação específica
aqui:

- O nome no navegador é genérico e fictício (`sualoja.com.br`).
  **PROIBIDO** usar nome, marca, logo ou domínio de cliente real ou de
  empresa existente.
- Produtos representados por ícone de placeholder, sem foto de produto
  real, sem nome de marca.
- **PROIBIDO** exibir número, métrica, valor de venda, contador ou
  qualquer dado que sugira operação real de cliente. As linhas de preço
  são blocos gráficos sem texto numérico.
- O mockup é ilustração do tipo de entrega, não captura de tela de
  trabalho entregue.

---

## 5. RF-4 (P1) — Cor e responsividade

**Cor:** usar exclusivamente a paleta do BRAND-GUIDE. O azul de destaque
(`#3533cd`) aparece apenas nos pontos de ação (logo, botão comprar,
linhas de preço), nunca espalhado pelo mockup — princípio de acento
único já definido no BRAND-GUIDE. Estrutura e texto usam as variáveis de
cor neutras já existentes em `global.css`.

**Responsividade:** em telas de celular, o mockup deve reduzir
proporcionalmente ou ser ocultado se comprometer a legibilidade do texto
do hero — prioridade é sempre o título e o botão de ação, nunca a
ilustração. A grade de três produtos pode cair para dois ou um em
largura reduzida.

---

## 6. Critérios de aceitação

- **CA-1:** o mockup renderiza no hero da Home, na coluna visual, com os
  cinco blocos entrando em sequência escalonada e reiniciando em loop.
- **CA-2:** nenhum JavaScript de animação, biblioteca de animação,
  vídeo, GIF ou arquivo de imagem foi adicionado ao projeto para esta
  funcionalidade — verificação: nenhuma dependência nova no
  `package.json`, nenhum asset novo em `public/`.
- **CA-3:** `npm run build` conclui sem erro e sem aumento perceptível
  do tamanho dos chunks em relação ao build anterior.
- **CA-4:** com `prefers-reduced-motion: reduce` ativo no sistema
  operacional, a animação não roda e todos os blocos aparecem em estado
  final visível.
- **CA-5:** nenhum nome de empresa real, marca, logo de terceiro,
  número, métrica ou valor aparece no mockup.
- **CA-6:** nenhuma classe utilitária Tailwind introduzida; toda classe
  referenciada existe declarada em `global.css` no padrão semântico do
  projeto.
- **CA-7:** em largura de celular, o título e o botão de ação do hero
  permanecem legíveis e acima da dobra — o mockup não os empurra para
  fora da tela.

---

## 7. Fora de escopo

- Alteração do texto do hero (coberto pelo SPEC-SITE-005 RF-3).
- Qualquer animação em outras seções da Home.
- Versão interativa do mockup (clique, hover que altera estado) — o
  elemento é ilustrativo e passivo.
