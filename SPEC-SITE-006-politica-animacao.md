# SPEC-SITE-006 — Política de Animação e Micro-interação

- **ID:** SPEC-SITE-006
- **Executor:** Antigravity
- **Depende de:** SPEC-SITE-005 (seção 0 de arquitetura, seção 2 de
  honestidade), SPEC-SITE-005-C (mockup do hero), SPEC-SITE-004
  (performance), BRAND-GUIDE.md

---

## 0. Restrições herdadas

Valem integralmente as restrições da seção 0 do SPEC-SITE-005: código em
`src/pages/` e `src/components/`, **nunca** em `index.html`; **zero
classe utilitária Tailwind**; toda classe e `@keyframes` novo declarado
em `src/global.css` no padrão semântico existente; paleta restrita ao
BRAND-GUIDE.

---

## 1. Princípio que governa este spec

**Toda animação no site precisa comunicar alguma coisa.** Se a resposta
para "o que isso comunica?" for "ficou bonito", a animação não entra.

Justificativa de público: o visitante-alvo é dono de comércio local,
frequentemente acessando por celular em rede instável. Para esse
visitante, profissionalismo se lê como página que carrega rápido, texto
fácil de achar e sistema que responde ao toque — não como quantidade de
efeito visual. Animação em excesso lê como lentidão ou como site
decorativo que não resolve problema.

**Regra de dose:** animação ajuda em quantidade pequena e claramente
proposital, e atrapalha em quantidade alta. Não é escala linear onde
mais é melhor.

---

## 2. RF-1 (P0) — Micro-interação de feedback (obrigatória)

Esta é a única categoria que deve existir em todo o site, sem exceção.
São respostas do sistema à ação do usuário, não enfeite.

Garantir em todos os elementos interativos:

- **Botões:** estado de `hover` (cursor) e de `active`/toque, com
  transição curta (na faixa de 120-200ms). Botão que não responde ao
  toque é o sinal mais comum de site amador.
- **Links:** mudança visual perceptível em `hover` e em `focus` (este
  último obrigatório para navegação por teclado).
- **Campos de formulário:** estado de `focus` visível, e confirmação
  visual clara após envio (o formulário de diagnóstico da Home já
  existe — garantir que dá retorno ao usuário, não fica mudo).
- **Estados de carregamento:** se alguma ação demora (envio de
  formulário), indicar que está acontecendo, em vez de deixar a tela
  parada.

Justificativa: é a mesma filosofia de produto que Rodrigo já aplica em
sistema — o software guia o usuário, não deixa ele adivinhando o que
aconteceu.

---

## 3. RF-2 (P1) — Entrada de seção ao rolar (permitida, com limite)

Permitida como recurso de ritmo de leitura, sinalizando mudança de
assunto entre seções.

**Regras obrigatórias:**

- Efeito sutil: opacidade de 0 para 1 mais deslocamento vertical
  pequeno (até 12px). **PROIBIDO** deslocamento lateral grande, rotação,
  escala, salto ou qualquer efeito chamativo.
- Duração curta, na faixa de 300-500ms.
- **Dispara uma única vez** por sessão de visualização da seção.
  **PROIBIDO** repetir a cada rolagem para cima e para baixo.
- **PROIBIDO** aplicar a conteúdo crítico: título do hero, botão de
  WhatsApp, telefone, formulário de contato. Esses elementos aparecem
  imediatamente, sem depender de animação nenhuma.

---

## 4. RF-3 (P0) — Proibições absolutas

**Loop infinito, apenas no hero.** O mockup do SPEC-SITE-005-C é o único
elemento do site autorizado a rodar em loop contínuo. **PROIBIDO** criar
qualquer outro elemento em loop infinito — dois ou mais elementos em
movimento constante na mesma página competem entre si e nenhum chama
atenção.

**PROIBIDO, em qualquer parte do site:**

- Contador numérico subindo, barra de progresso enchendo, gráfico
  animando, ou qualquer animação que exiba métrica. Além de ruído
  visual, viola a seção 2 do SPEC-SITE-005: sugere dado de operação real
  que não existe.
- Carrossel com rotação automática de conteúdo.
- Animação que atrase a leitura de informação crítica (preço, contato,
  título, botão de ação).
- Efeito de paralaxe no fundo da página.
- Texto sendo digitado caractere por caractere.
- Qualquer biblioteca de animação adicionada como dependência. Todo
  efeito deste spec é alcançável com CSS puro (`transition`,
  `@keyframes`) e, quando necessário para disparo por rolagem,
  `IntersectionObserver` nativo — sem dependência externa.

---

## 5. RF-4 (P0) — Acessibilidade e desempenho

**Movimento reduzido:** um único bloco
`@media (prefers-reduced-motion: reduce)` em `global.css` deve desativar
todas as animações de entrada e o loop do hero, deixando o conteúdo em
estado final visível. Micro-interações de feedback (RF-1) podem ser
mantidas, mas com transição reduzida ou instantânea. Requisito, não
opcional.

**Propriedades animáveis:** animar apenas `opacity` e `transform`.
**PROIBIDO** animar `width`, `height`, `top`, `left`, `margin` ou
`padding` — essas forçam recálculo de layout a cada quadro e travam em
celular modesto, que é exatamente o aparelho do público-alvo.

**Elemento decorativo:** toda animação puramente ilustrativa recebe
`aria-hidden="true"` ou texto alternativo único e curto. Nunca expor
cada bloco animado individualmente ao leitor de tela.

---

## 6. Critérios de aceitação

- **CA-1:** todo botão, link e campo de formulário do site tem estado
  visível de `hover`, `active` e `focus`.
- **CA-2:** o formulário de diagnóstico da Home dá retorno visual claro
  ao usuário após o envio.
- **CA-3:** o mockup do hero é o único elemento em loop infinito no site
  inteiro.
- **CA-4:** nenhum contador, barra de progresso, gráfico animado,
  carrossel automático, paralaxe ou texto digitado caractere a caractere
  existe em qualquer página.
- **CA-5:** nenhuma dependência de biblioteca de animação foi adicionada
  ao `package.json`.
- **CA-6:** com `prefers-reduced-motion: reduce` ativo, nenhuma animação
  de entrada ou loop roda, e todo o conteúdo permanece visível e legível.
- **CA-7:** busca no CSS por animação de `width`, `height`, `top`,
  `left`, `margin` ou `padding` retorna zero ocorrência em regras de
  `transition` ou `@keyframes`.
- **CA-8:** em celular, o título do hero, o botão de WhatsApp e os dados
  de contato aparecem imediatamente, sem depender de animação para
  ficarem visíveis.
- **CA-9:** `npm run build` conclui sem erro e sem aumento perceptível
  no tamanho dos chunks.

---

## 7. Fora de escopo

- O mockup animado do hero em si, já coberto pelo SPEC-SITE-005-C.
- Redesenho visual de qualquer seção — este spec trata apenas de
  movimento e feedback, não de layout ou conteúdo.
- Animação em material fora do site (carrossel de Instagram, vídeo).
