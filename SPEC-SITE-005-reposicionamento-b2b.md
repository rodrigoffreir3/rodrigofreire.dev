# SPEC-SITE-005 — Reposicionamento B2B Institucional

- **ID:** SPEC-SITE-005
- **Executor:** Antigravity
- **Depende de:** SPEC-SITE-003 (regras de linguagem), SPEC-SITE-004 (SEO), BRAND-GUIDE.md

---

## 0. Restrições de arquitetura (ler antes de qualquer coisa)

Estas restrições existem porque uma versão anterior deste spec, gerada por
outra ferramenta, assumiu uma arquitetura que **não é a deste projeto** e
teria quebrado o site.

**0.1.** O conteúdo da home vive em `src/pages/Home.jsx`, renderizado pelo
React. O `index.html` contém apenas `<div id="root"></div>` e o script de
entrada. **PROIBIDO** inserir marcação de seção, hero, card ou CTA dentro
de `index.html` — a única coisa que se edita lá são metatags no `<head>`,
e mesmo assim veja 0.3.

**0.2.** O projeto **não usa classes utilitárias Tailwind**. O Tailwind
consta no `package.json` mas não está conectado ao build (ausente do
`vite.config.js`, não importado em `global.css`) — é dependência morta.
O estilo real são classes semânticas próprias definidas em
`src/global.css` (2.973 linhas), no padrão `hero-enterprise-inner`,
`service-card-liquid`, `corp-btn-accent`. **PROIBIDO** escrever
`className` com utilitários tipo `bg-[#070A0F]`, `lg:col-span-7`,
`text-slate-400`. Toda classe nova precisa ser declarada em
`global.css` seguindo o padrão de nomenclatura já existente.

**0.3.** Título e meta description por página são controlados pelo
componente `src/components/SEO.jsx` (react-helmet-async) e replicados no
build estático por `scripts/generate_seo.js`. **PROIBIDO** editar `<title>`
ou `<meta name="description">` diretamente no `index.html` — isso criaria
duas fontes de verdade conflitantes e anularia o trabalho do SPEC-SITE-004.

**0.4.** O texto visível é majoritariamente alimentado por
`DEFAULT_SERVICES`, `DEFAULT_HOME_SETTINGS` e afins em
`src/data/defaultData.js`, com sobrescrita opcional via Supabase.
Mudança de copy é mudança de **dado**, não de JSX, sempre que o campo já
existir. Só editar `Home.jsx` quando a mudança for estrutural (seção nova,
bloco novo).

**0.5.** Toda cor nova precisa sair do `BRAND-GUIDE.md`
(`#000000`, `#3533cd`, `#FCFCFB`, `#F0EFEA`, `#2C3437`) ou das variáveis
CSS já definidas em `global.css`. **PROIBIDO** introduzir paleta nova
(ex: escala `slate`, `emerald`, `rose`) sem atualizar o BRAND-GUIDE antes.

---

## 1. Diagnóstico

O site hoje comunica **disponibilidade para tarefas pontuais**: socorro
técnico, site, planilha, automação, backup, consultoria — seis itens de
peso visual equivalente, cada um uma tarefa avulsa.

Para o decisor de uma empresa estabelecida, esse formato lê como
prestador generalista contratado por demanda. Ele não delega
infraestrutura, faturamento e dados a um perfil assim. Ele contrata quem
se apresenta como **responsável pela continuidade da operação**.

A competência técnica existe e é superior à média do mercado local. O
problema é de enquadramento da oferta, não de capacidade.

**Correção central:** agrupar os serviços avulsos existentes em três
pilares contratáveis, com escopo, método e compromisso de resposta
declarados.

---

## 2. Limite de honestidade (inegociável)

O SPEC-SITE-003 removeu do site todo serviço que ainda não existia. Este
spec **não pode reintroduzir promessa não lastreada**. Aplicação direta:

- **PROIBIDO** publicar número de SLA (ex: "resposta em 30 minutos"),
  percentual de disponibilidade (ex: "99,98%"), tempo de carregamento
  garantido, ou qualquer métrica de desempenho que não seja hoje
  mensurada e cumprida.
- **PROIBIDO** exibir painel, gráfico ou widget simulando monitoramento
  em tempo real de cliente. Não há cliente em produção. Isso é cenário
  fictício apresentado como operação real.
- **PROIBIDO** usar primeira pessoa do plural ("atuamos", "nossa
  metodologia"). O CA-6 do SPEC-SITE-003 exige primeira pessoa do
  singular em todo o site. Autoridade aqui vem de método declarado, não
  de fingir equipe.
- **PERMITIDO** declarar compromisso de processo que Rodrigo consegue
  cumprir sozinho hoje: prazo de retorno acordado por escrito, escopo
  fechado antes de iniciar, relatório do que foi feito ao final.

Um compromisso modesto e cumprido constrói mais autoridade que um número
inflado que não sobrevive à primeira cobrança.

---

## 3. RF-1 (P0) — Reagrupar serviços em três pilares

Reescrever `DEFAULT_SERVICES` em `src/data/defaultData.js`: os seis
serviços avulsos passam a ser três pilares, cada um com um conjunto de
entregas nomeadas.

**Pilar 01 — Continuidade e Sustentação**
Reúne: socorro técnico, backup, manutenção de rede e computadores.
Enquadramento: manter a operação funcionando e os dados protegidos.
Entregas a listar: rotina de backup com teste real de restauração;
manutenção preventiva de computadores, rede e servidor; atendimento a
falha com prazo de retorno acordado em contrato.

**Pilar 02 — Automação e Integração**
Reúne: automação de tarefa repetitiva, organização de planilha.
Enquadramento: eliminar trabalho manual que consome hora de funcionário.
Entregas a listar: integração entre sistemas que hoje não conversam;
substituição de controle manual em planilha por rotina automática;
relatório gerado sozinho, sem alguém montar toda semana.

**Pilar 03 — Plataformas e Presença Digital**
Reúne: criação de site, loja online, consultoria de implantação de
sistema de terceiro.
Enquadramento: onde a venda acontece e onde a empresa é verificada.
Entregas a listar: site ou loja própria; integração com o canal de venda
já usado; apoio na escolha e implantação de sistema de terceiro.

**Regras de escrita de cada pilar** (herdadas do SPEC-SITE-003, valem
integralmente): zero jargão de desenvolvedor; cada entrega termina em
consequência prática (dinheiro, tempo ou cliente); primeira pessoa do
singular.

**Campo novo:** cada pilar recebe `focus` — uma linha curta fechando em
resultado de negócio (ex: "Foco: a operação não para e o dado não se
perde"). Se `DEFAULT_SERVICES` não tiver esse campo, adicionar.

---

## 4. RF-2 (P0) — Seção de risco antes da seção de solução

Inserir em `Home.jsx` uma seção nova, posicionada **entre o hero e a
seção de pilares**, nomeando o custo de não agir. Três cartões.

O conteúdo de cada cartão vai em `defaultData.js` (novo export
`DEFAULT_RISKS`), não embutido no JSX.

1. **Dado sem cópia testada** — backup que nunca foi restaurado não é
   backup. Pane de disco, exclusão acidental ou invasão levam junto
   histórico de venda, cadastro de cliente e contas a receber.
2. **Hora de funcionário em trabalho manual** — equipe copiando
   informação entre planilha e sistema. Lento, caro, e errado de vez em
   quando, do jeito que erro manual costuma ser.
3. **Sistema fora do ar em horário de pico** — prejuízo imediato no
   faturamento, atraso de entrega e desgaste com o cliente que voltaria.

Classes CSS novas necessárias (`section-risks`, `risk-card`,
`risk-card-icon`, `risk-card-title`, `risk-card-text`) devem ser
declaradas em `global.css`, no padrão de nomenclatura já existente,
reaproveitando as variáveis de cor e os tokens de espaçamento do arquivo.

---

## 5. RF-3 (P1) — Reescrever o hero

Alterar os campos correspondentes em `DEFAULT_HOME_SETTINGS`.

- **Título:** deslocar de "resolvo seu problema técnico" para
  "sua operação continua funcionando". Tom institucional, sem jargão,
  primeira pessoa. Referência de direção, não texto literal a copiar:
  *"Sua empresa não pode parar. Cuido da parte de tecnologia pra que ela
  não pare."*
- **Subtítulo:** uma frase nomeando os três pilares em linguagem de
  empresário, sem os títulos formais.
- **Selos do hero:** os atuais chips de dor continuam, mas reescritos
  como área de atuação, não como tarefa avulsa. **Sem número, sem
  percentual, sem métrica** (ver seção 2).
- **Botão primário:** trocar o texto para algo que enquadre a conversa
  como avaliação, não como pedido de orçamento — direção: "Solicitar
  avaliação da sua operação". O número de WhatsApp permanece
  `5569992087532`; apenas o texto pré-preenchido da mensagem muda,
  refletindo o novo enquadramento.

---

## 6. RF-4 (P1) — Seção de método, em quatro etapas

Substituir o bloco atual de três passos por quatro etapas, em
`DEFAULT_STEPS` (ou export novo, se o nome estiver ocupado).

1. **Avaliação** — conversa e levantamento do que existe hoje:
   equipamento, sistema, onde o dado está, o que é manual.
2. **Prioridade** — o que resolver primeiro, em ordem de risco e de
   retorno, com escopo e preço fechados por escrito antes de começar.
3. **Execução** — implementação do que foi acordado, com explicação em
   português do que está sendo feito e por quê.
4. **Acompanhamento** — o que fica sob manutenção contínua e o que é
   entrega única encerrada.

Sem promessa de tempo de resposta numérico. O compromisso declarado é
**escopo e preço fechados antes de começar**, que é real e verificável.

---

## 7. RF-5 (P2) — Ajuste de tom no CTA final

Reescrever o bloco de encerramento da home para fechar em decisão de
negócio, não em oferta de serviço. Direção: o custo de descobrir a
vulnerabilidade no dia em que ela vira prejuízo. Mantém o formulário de
diagnóstico já existente e o botão de WhatsApp — muda só o texto de
enquadramento.

---

## 8. Critérios de aceitação

- **CA-1:** `index.html` permanece sem qualquer marcação de conteúdo no
  `<body>` além de `<div id="root"></div>` e o script de entrada; `<title>`
  e `<meta name="description">` continuam sendo emitidos por `SEO.jsx`.
- **CA-2:** nenhuma classe utilitária Tailwind foi introduzida em
  `src/pages/` ou `src/components/`. Verificação: buscar padrões
  `bg-[#`, `lg:col-span-`, `text-slate-` — zero ocorrência.
- **CA-3:** toda classe CSS nova referenciada no JSX existe declarada em
  `global.css`. Verificação: nenhum elemento renderiza sem estilo.
- **CA-4:** nenhuma página pública exibe número de SLA, percentual de
  disponibilidade, métrica de desempenho ou painel simulando operação em
  tempo real.
- **CA-5:** nenhuma ocorrência de primeira pessoa do plural
  ("atuamos", "nossa", "nossos") no texto público — CA-6 do
  SPEC-SITE-003 preservado.
- **CA-6:** nenhum termo da lista de proibição do SPEC-SITE-003
  reintroduzido — CA-1 daquele spec preservado.
- **CA-7:** os seis serviços anteriores estão integralmente absorvidos
  pelos três pilares; nenhuma capacidade real foi perdida na
  reorganização.
- **CA-8:** `npm run build` conclui sem erro e sem aviso novo; o
  pré-render continua gerando as 21 páginas com metatags próprias.
- **CA-9:** cada pilar e cada cartão de risco tem, no texto, uma
  consequência concreta (dinheiro, tempo ou cliente) — nenhum descreve
  apenas capacidade técnica.

---

## 9. Fora de escopo

- Migração para Tailwind ou qualquer refatoração do `global.css`.
- Criação de página de planos com preço público.
- Alteração das páginas Sobre, Blog, Projetos ou Contato.
- Qualquer conteúdo sobre o ERP/PDV, que segue arquivado conforme
  SPEC-SITE-003 RF-1.
