# SPEC-SITE-005-B — Reposicionamento da Página Sobre

- **ID:** SPEC-SITE-005-B
- **Executor:** Antigravity
- **Depende de:** SPEC-SITE-005 (seção 0, restrições de arquitetura — valem
  integralmente aqui), SPEC-SITE-003 RF-3 (foto e primeira pessoa),
  BRAND-GUIDE.md

---

## 0. Restrições herdadas (releitura obrigatória)

Todas as restrições da seção 0 do SPEC-SITE-005 valem sem alteração:
conteúdo em `src/pages/Sobre.jsx` e `defaultData.js`, nunca em
`index.html`; **zero classe utilitária Tailwind**; toda classe nova
declarada em `global.css` no padrão semântico existente; paleta restrita
ao BRAND-GUIDE; metatags emitidas apenas por `SEO.jsx`.

Acrescentam-se duas restrições específicas desta página:

**0.1.** A foto real (`/foto_perfil.jpeg`, aplicada pelo SPEC-SITE-003
RF-3) **permanece**. Justificativa: o diferencial declarado do negócio é
atendimento direto e presença local. Rosto identificável sustenta esse
argumento; página sem pessoa nenhuma reproduz a impessoalidade que é
justamente a dor que o serviço promete resolver. Qualquer melhoria nesse
ponto é de qualidade fotográfica, não de remoção.

**0.2.** Nada nesta página pode contradizer o limite de honestidade da
seção 2 do SPEC-SITE-005: sem SLA, sem métrica de desempenho, sem
afirmação de processo ("100% documentado", "auditável") que não seja hoje
praticada e demonstrável.

---

## 1. Diagnóstico

A página Sobre atual cumpre o SPEC-SITE-003: primeira pessoa, foto real,
sem jargão, formação declarada, menção única ao INPI. Está correta e
honesta.

O que falta, no enquadramento B2B do SPEC-SITE-005, é **postura de
responsável técnico**. Hoje a página responde "quem é você". Não responde
as três perguntas que um decisor faz antes de entregar a TI da empresa
dele a alguém:

1. Quem responde por isso quando der problema?
2. Como essa pessoa trata informação sigilosa da minha empresa?
3. Existe método, ou é improviso?

A correção não é reescrever a biografia. É **acrescentar a camada de
compromisso profissional** ao que já está lá.

---

## 2. RF-1 (P0) — Reescrever o texto de apresentação

Ajustar os campos correspondentes em `DEFAULT_PROFILE`
(`tagline`, `lead_bio`, `about_text`) em `src/data/defaultData.js`.

**Deslocamento de eixo:** o texto atual apresenta formação e trajetória.
O texto novo mantém isso, mas subordinado a uma afirmação de
responsabilidade — o que Rodrigo assume perante o negócio do cliente.

Elementos que permanecem, todos verdadeiros e já validados:
- Primeira pessoa do singular, sempre.
- Porto Velho, atendimento local e direto.
- Formação em Análise e Desenvolvimento de Sistemas em andamento e
  formação anterior em Direito — esta última enquadrada pela utilidade
  prática ao cliente: leitura de contrato, cuidado com obrigação
  assumida por escrito.
- Menção única e curta ao sistema próprio de proteção de servidores com
  registro no INPI (processo nº 512025006506-0), sem detalhe técnico e
  sem virar seção.

Elemento novo a incorporar no texto: a ideia de que tecnologia ali é
meio, não fim — o que se protege é o funcionamento e o dado da empresa
do cliente. Escrever isso em linguagem de dono de negócio, não em
linguagem de consultoria.

**Proibições de vocabulário nesta página** (além da lista do
SPEC-SITE-003 CA-1): `Zero Trust`, `SLA`, `NDA`, `governança`,
`privilégio mínimo`, `redundância`, `compliance`, `padrão corporativo`,
`parceiro estratégico`. São termos que o leitor-alvo não usa e que,
no caso de SLA, prometem o que ainda não existe.

---

## 3. RF-2 (P0) — Card de compromissos, ao lado da foto

Inserir em `Sobre.jsx` um bloco novo posicionado ao lado da foto em telas
largas e abaixo dela em telas de celular. Conteúdo em `defaultData.js`
(novo export `DEFAULT_COMMITMENTS`), não embutido no JSX.

Quatro compromissos. Cada um é tradução, em linguagem de empresário, de
uma prática que Rodrigo de fato consegue sustentar hoje sozinho:

**1. Nada muda sem plano de volta**
Antes de mexer em qualquer coisa que sua empresa usa pra trabalhar, eu
garanto que dá pra voltar ao estado anterior se algo não sair como
esperado.

**2. O que é da sua empresa fica na sua empresa**
Dado de cliente, faturamento e movimentação que eu acessar pra fazer o
trabalho não sai dali, e isso vai por escrito no contrato, não só na
palavra.

**3. Solução que você consegue manter**
Não uso ferramenta cara ou complicada pra parecer sofisticado. Se depois
precisar de outra pessoa pra mexer, ela vai conseguir entender o que foi
feito.

**4. Quem faz é quem atende**
Não existe fila de atendimento nem alguém que não conhece seu caso. Quem
montou é quem responde quando der problema.

Os textos acima são direção de conteúdo com a voz já definida — o
executor pode ajustar ritmo e pontuação, mas **não pode** trocar o
vocabulário por versão mais técnica nem reintroduzir os termos proibidos
do RF-1.

**Rodapé do card:** apenas `Rodrigo Freire` e a função em texto simples.
Sem selo, sem "padrão corporativo", sem indicador de status inventado.

Classes CSS novas (`about-commitments-card`, `commitment-item`,
`commitment-title`, `commitment-text`) declaradas em `global.css`, no
padrão de nomenclatura já existente, reaproveitando variáveis de cor e
tokens de espaçamento do arquivo.

---

## 4. RF-3 (P2) — Fechamento da página

Encerrar a página Sobre com uma ponte curta para o contato, no mesmo tom
do resto: sem CTA agressivo, sem promessa de prazo. Uma frase
convidando a conversa e o botão de WhatsApp já existente
(`5569992087532`), com o texto pré-preenchido coerente com o
enquadramento de avaliação definido no SPEC-SITE-005 RF-3.

---

## 5. Critérios de aceitação

- **CA-1:** a foto `/foto_perfil.jpeg` continua renderizando na página
  Sobre, em celular e em desktop, com `alt` descritivo — SPEC-SITE-003
  RF-3/CA-4 preservado.
- **CA-2:** nenhuma ocorrência, no texto público da página, de:
  `Zero Trust`, `SLA`, `NDA`, `governança`, `privilégio mínimo`,
  `redundância`, `compliance`, `padrão corporativo`,
  `parceiro estratégico` — nem de qualquer termo da lista do
  SPEC-SITE-003 CA-1.
- **CA-3:** nenhuma afirmação de métrica, prazo de resposta numérico,
  percentual ou processo não praticado ("100% documentado", "auditável").
- **CA-4:** primeira pessoa do singular em toda a página; zero ocorrência
  de "atuamos", "nossa", "nossos".
- **CA-5:** os quatro compromissos vêm de `defaultData.js`; nenhum texto
  de conteúdo embutido diretamente no JSX.
- **CA-6:** nenhuma classe utilitária Tailwind introduzida; toda classe
  referenciada existe declarada em `global.css`.
- **CA-7:** a menção ao INPI permanece em uma frase, sem detalhe técnico
  e sem seção própria.
- **CA-8:** `npm run build` conclui sem erro novo e o pré-render continua
  gerando `/sobre` com metatags próprias.

---

## 6. Fora de escopo

- Substituição ou nova sessão de fotos (decisão de Rodrigo, fora do
  código).
- Alteração das páginas Home, Blog, Projetos ou Contato.
- Página de currículo, timeline de carreira ou lista de tecnologias.
