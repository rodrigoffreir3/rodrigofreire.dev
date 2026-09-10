# BRAND-GUIDE.md — rodrigofreire.dev

Documento único de referência. Qualquer peça nova (post de blog, carrossel de
Instagram, orçamento em PDF, mensagem padrão de WhatsApp, nova seção do site)
usa o que está aqui, sem reinventar tom ou visual a cada vez.

---

## 1. Identidade

**Nome de marca:** Rodrigo Freire / rodrigofreire.dev
**Domínio:** rodrigofreire.dev.br (em propagação de DNS, substituindo o `.dev`)
**O que a marca representa:** atendimento de TI direto, local, em Porto Velho,
sem intermediário e sem jargão — em contraste com suporte distante e
impessoal que é a dor de mercado já identificada na região.

---

## 2. Cores

| Uso | Hex | Nome no código |
|---|---|---|
| Cor primária (texto de destaque, ícones, base da logo) | `#000000` | `--color-dark-teal` *(nome desatualizado — ver nota técnica no fim)* |
| Cor de destaque/ação (CTA, gradiente da logo, links) | `#3533cd` | `accent_color` |
| Fundo de página | `#FCFCFB` | `bg_page` |
| Fundo alternativo/sutil | `#F0EFEA` | `bg_page_subtle` |
| Texto de título | `#000000` | `text_heading_color` |
| Texto de corpo | `#2C3437` | `text_body_color` |

**Regra de uso:** preto e azul elétrico são as únicas cores de marca. Cor de
alerta (vermelho em "O problema:") e cor de confirmação (verde-água em
destaques de ganho) são cores funcionais de interface, não cores de marca —
não usar fora desse contexto de indicar problema/solução.

---

## 3. Tipografia

**Logo (wordmark e monograma RFD):** fonte Prospec. Uso exclusivo da logo,
como arte vetorizada — não é fonte de leitura corrida do site.

**Títulos do site:** Plus Jakarta Sans.
**Corpo de texto do site:** Inter.
**Trechos de código/monoespaçado:** JetBrains Mono.

**Por que a fonte da logo é diferente da fonte do site:** é escolha correta,
não inconsistência. Prospec tem caráter técnico forte, ótima para símbolo de
marca em tamanho grande; não seria confortável para parágrafo inteiro de
leitura. Manter essa separação.

---

## 4. Logo

**Arquivos atuais:** `/public/images/logo.png` (wordmark horizontal
"rodrigofreire.dev") e `/public/images/logo-rfd.png` (monograma quadrado RFD,
usado como favicon e ícone).

**Regras de uso:**
- Área de respiro mínima ao redor da logo: não encostar texto ou outro
  elemento a menos de metade da altura do "R" inicial.
- Tamanho mínimo legível do wordmark: não reduzir abaixo de ~120px de
  largura — abaixo disso o traço fino da tipografia perde nitidez.
- O monograma RFD é a versão para espaços pequenos (favicon, ícone de app,
  avatar de rede social). Nunca usar o wordmark completo em espaço menor que
  200px de largura — usar o monograma nesse caso.
- Fundo: a logo funciona sobre fundo claro (`#FCFCFB` ou branco). Para fundo
  escuro, gerar variante em cor clara antes de aplicar — não usar a versão
  atual sobre fundo escuro sem ajuste.

---

## 5. Tom de voz

O tom de voz é parte da marca tanto quanto a cor. Regras já validadas nos
textos publicados (blog, site, material comercial):

- **Português coloquial brasileiro**, com contrações naturais (tá, pra, né,
  tô) quando o registro pedir informalidade — não usar em todo contexto, mas
  não evitar por formalidade artificial.
- **Nunca usar travessão como conector de frase.**
- **Evitar transições formulaicas** ("é importante ressaltar", "em suma",
  "cabe destacar").
- **Evitar estrutura de lista/três-partes como muleta** de argumento —
  variar o ritmo da frase e do parágrafo.
- **Abrir pelo problema real de quem lê**, não pela solução ou pelo produto.
- **Para conteúdo comercial (site, WhatsApp, Instagram):** zero termo técnico
  que só desenvolvedor entende. Traduzir toda capacidade técnica em
  consequência prática (dor resolvida, ganho em dinheiro ou tempo).
- **Para conteúdo técnico (blog de deep tech, projetos):** pode e deve usar
  linguagem técnica precisa — o público ali é outro, e simplificar demais
  nesse contexto perde credibilidade com quem entende do assunto.
- **Honestidade acima de venda:** reconhecer quando algo não é necessário
  para o cliente é parte do tom, não exceção a ele — é o que gera confiança
  de longo prazo no mercado local.

---

## 6. Onde essa identidade ainda precisa ser aplicada

Checklist de pontos de contato que reforçam (ou enfraquecem, se
inconsistentes) o reconhecimento de marca:

- [ ] Foto de perfil do Instagram usando o monograma RFD ou a foto real
      (não ambos misturados sem critério)
- [ ] Papel de parede/foto de perfil do WhatsApp Business com a logo
- [ ] Mensagem de saudação automática do WhatsApp Business no mesmo tom de
      voz da seção 5
- [ ] Modelo de orçamento/PDF enviado a cliente, com logo e cores aplicadas
- [ ] Assinatura de e-mail, se usar e-mail comercial
- [ ] Carrosséis de Instagram usando a paleta preto/azul elétrico e a
      tipografia de título consistente com o site

---

## Nota técnica (não afeta o visual, afeta manutenção futura)

A variável CSS `--color-dark-teal` guarda hoje a cor preta (`#000000`), não
mais um tom teal — nome ficou desatualizado de uma paleta anterior. Funciona
sem erro, mas vale renomear para algo como `--color-brand-primary` na
próxima manutenção do código, para não confundir quem mexer no CSS depois
achando que a variável ainda guarda um teal.
