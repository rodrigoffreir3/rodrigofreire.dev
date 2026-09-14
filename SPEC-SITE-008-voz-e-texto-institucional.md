# SPEC-SITE-008 — Voz, Posicionamento e Texto Institucional

**Versão:** 1.1 (fechada)
**Data:** 14/09/2026
**Autor:** Rodrigo Freire
**Projeto:** rodrigofreire.dev.br (React/Vite — repositório `rodrigofreire.dev`)
**Status:** Aprovada para implementação direta

---

## 0. ESCOPO E PRECEDÊNCIA

### 0.1 O que esta spec governa

Todo texto visível ao público no domínio `rodrigofreire.dev.br`:

| Página | Arquivo | Coberta |
|---|---|---|
| Home | `src/pages/Home.jsx` + `src/data/defaultData.js` | Sim |
| Sobre | `src/pages/Sobre.jsx` | Sim |
| Contato | `src/pages/Contato.jsx` | Sim |
| Projetos (listagem) | `src/pages/Projects.jsx` | Sim |
| Projeto (detalhe) | `src/pages/ProjectDetail.jsx` | Sim |
| Blog (listagem) | `src/pages/Blog.jsx` | Sim |
| Post | `src/pages/BlogPost.jsx` | Sim |
| Erro 404 | `src/pages/NotFound.jsx` | Sim |
| Navegação | `src/components/Navbar.jsx` | Sim |
| Rodapé | `src/components/Footer.jsx` | Sim |
| Metadados de busca | `src/components/SEO.jsx` e chamadas por página | Sim |
| Mensagens padrão de WhatsApp | `defaultData.js` (campos `whatsapp_msg`) | Sim |

### 0.2 O que esta spec NÃO governa

- `templates.rodrigofreire.dev.br` e qualquer template de demonstração. Esse território pertence à SPEC-TEMPLATES-000 e às SPEC-TEMPLATES-001 em diante. Nada aqui se aplica lá.
- Área administrativa (`src/pages/adm/*`), por não ser pública.
- Corpo de artigos do blog já publicados. Artigos seguem a regra de voz própria do BRAND-GUIDE seção 7 (com contrações). Esta spec governa apenas os textos de moldura das páginas de blog (título de seção, subtítulo, estados vazios).

### 0.3 Precedência

Em caso de conflito:

1. Esta SPEC-SITE-008 prevalece sobre o BRAND-GUIDE.md em matéria de **texto institucional**.
2. O BRAND-GUIDE.md prevalece em matéria de **cor, tipografia, elevação e contenção visual**.
3. A SPEC-006 permanece integralmente vigente quanto a animação e comportamento.

**Ressalva expressa ao BRAND-GUIDE seção 7:** a regra de contrações naturais ("tá", "pra", "né") vale para artigos de blog e mensagens de WhatsApp. Ela **não** se aplica a texto institucional do site. Página institucional escreve em português formal e completo. Esta ressalva é decisão fechada, não sugestão.

---

## 1. DECISÕES DE POSICIONAMENTO (FECHADAS)

### RF-1. Identidade substitui cargo

A expressão **"Consultor de Tecnologia e Sistemas na Linha de Frente"** fica **integralmente removida** do site, em todas as suas variações, inclusive nos metadados de busca.

Substituição obrigatória:

| Contexto | Texto oficial |
|---|---|
| Marca | `Rodrigo Freire Tech` |
| Descritor da marca | `Sistemas sob medida para empresas` |
| Descritor com praça | `Sistemas sob medida para empresas · Porto Velho, RO` |
| Papel pessoal, quando necessário nomear | `Fundador e responsável técnico` |

**Proibições permanentes de titulação:**

- Proibido o uso de "engenheiro", "engenharia de software" ou qualquer derivação como título pessoal atribuído a Rodrigo. Motivo: título profissional regulamentado. A palavra "engenharia" permanece permitida apenas como **descrição de atividade técnica em projetos** (exemplo aceito: "engenharia de kernel Linux" na ficha do projeto Kernel WSL2), nunca como cargo da pessoa.
- Proibido "analista", "técnico de suporte", "freelancer", "profissional de TI" referindo-se a Rodrigo. Motivo: posicionam como executor subordinado.
- Proibido "agência", "equipe", "nosso time", "nós" no sentido de empresa com múltiplos funcionários. Motivo: falso e destrói o diferencial de atendimento direto. Primeira pessoa do singular é obrigatória quando Rodrigo fala.

### RF-2. Postura de par, não de prestador

Todo texto institucional escreve de empresário para empresário. Aplicação verificável:

- **Proibido** texto que se ofereça a partir de disponibilidade ("estou à disposição", "me chame quando precisar", "conte comigo", "qualquer dúvida estou aqui"). Substituir sempre por afirmação do que é entregue.
- **Proibido** diminutivo, pedido de desculpa antecipado ou hedge ("talvez eu possa", "acredito que consigo", "posso tentar").
- **Obrigatório** que cada bloco de serviço declare o resultado comercial, não a atividade técnica. Formato: o que a empresa ganha vem antes de como é feito.

### RF-3. Comparativo permanece, com a lâmina reposicionada

A seção comparativa é **mantida** e a conclusão é **mantida**: Rodrigo Freire Tech é a opção superior, afirmado sem relativização.

O que muda é o objeto da comparação. Comparam-se **modelos de contratação**, jamais categorias de pessoas.

| Proibido | Obrigatório |
|---|---|
| "O Técnico de Suporte Comum" | "Modelo 1 · Suporte reativo por chamado" |
| "A Agência ou Programador Remoto" | "Modelo 2 · Desenvolvimento remoto por pacote" |
| (coluna própria) | "Modelo 3 · Rodrigo Freire Tech" |

Regras de redação das colunas 1 e 2:

- Descrever **limitação estrutural do arranjo**, nunca incompetência de quem o executa.
- Proibidos os adjetivos: "comum", "isolado", "impessoal", "superficial", "abstrato", "distante", "capacho".
- Cada limitação precisa ser verificável na prática, não uma acusação de caráter.
- A coluna 3 afirma superioridade de forma direta e sem qualificador de modéstia. Proibido "também", "igualmente", "de certa forma".

### RF-4. Correção factual do registro INPI

**Decisão fechada.** Toda ocorrência de "Patente INPI", "Patente", "patenteado" referida ao número 512025006506-0 é substituída por:

```
Registro INPI de Programa de Computador Nº 512025006506-0
```

Forma curta autorizada, quando o espaço não comportar a completa:

```
Registro INPI Nº 512025006506-0
```

Fundamento: o ato registral em questão é registro de programa de computador, regido pela Lei 9.609/98, que protege o software como obra intelectual. Patente de invenção é instituto distinto, regido pela Lei 9.279/96, com exigência de exame de mérito, novidade e atividade inventiva. A imprecisão compromete diretamente o diferencial de rigor jurídico declarado no próprio site, e o registro correto já produz o efeito de credibilidade pretendido sem nenhum custo de impacto.

Arquivos afetados: `src/data/defaultData.js` (campo `badge` do projeto `imunno-system`, campo `inpi_record` do perfil) e qualquer menção em `Sobre.jsx`.

### RF-5. Sem simetria artificial

Confirmada a remoção de estrutura espelhada entre blocos de serviço.

- Proibido que todos os pilares tenham a mesma quantidade de entregáveis. Distribuição obrigatória: Pilar 01 com **4** entregáveis, Pilar 02 com **3**, Pilar 03 com **2**, Pilar 04 com **4**.
- Proibido que todo card tenha exatamente o mesmo conjunto de campos preenchidos.
- Comprimento de parágrafo deve variar visivelmente entre seções.

### RF-6. Controle de repetição lexical

Nenhum termo de marca ou verbo característico pode aparecer mais de **duas vezes** no conjunto de todas as páginas públicas.

Lista sob controle obrigatório, com teto de duas ocorrências cada: `blindar` (e derivados blindagem, blindado), `de ponta a ponta`, `escopo fechado por escrito`, `destravar`, `alto padrão`, `sob medida`, `linha de frente`.

Exceção única: `escopo e preço fechados por escrito` pode aparecer **três** vezes, por ser cláusula comercial relevante. Nas demais ocorrências, usar variação de conteúdo, não sinônimo cosmético.

### RF-7. Símbolos decorativos

Removidos integralmente de todo texto institucional: `✦`, `★`, `⚠️`, `✓`, `✗` e qualquer emoji.

Onde a função do símbolo for semântica (lista de entregas, indicação de status), usar componente de ícone do `lucide-react` já presente no projeto, jamais caractere colado no texto.

### RF-8. Parênteses explicativos (regra confirmada e delimitada)

**Mantidos.** Rodrigo explica o vocabulário dele, não o negócio do leitor. A prática é cortesia e permanece.

Três limites de aplicação:

1. **Uma explicação por termo, por página.** Na primeira ocorrência explica, nas seguintes usa direto. Especificamente: a glosa de LGPD aparece **uma única vez** em todo o site, na primeira ocorrência da Home. As demais usam apenas a sigla.
2. **Proibido explicar termo do domínio do cliente.** Um lojista sabe o que é marketplace, fiado, margem, giro de estoque, nota fiscal. Explicar isso ofende. Remover especificamente o parêntese de "marketplaces (shoppings virtuais de terceiros)".
3. **Limite de extensão.** A glosa entre parênteses não ultrapassa 12 palavras. Acima disso, vira frase própria.

---

## 2. REGRAS DE ESCRITA APLICÁVEIS A TODO TEXTO NOVO

### 2.1 Obrigatório

- Português brasileiro formal e completo, sem contração coloquial.
- Título principal de qualquer página com no máximo **14 palavras**.
- Parágrafo institucional com no máximo **3 frases**.
- Toda capacidade técnica declarada acompanhada do ganho comercial correspondente.
- Primeira pessoa do singular quando Rodrigo fala.

### 2.2 Proibido

- Travessão como conector de frase (regra herdada do BRAND-GUIDE, mantida).
- Transição formulaica: "é importante ressaltar", "em suma", "cabe destacar", "vale lembrar", "nesse sentido".
- Superlativo não verificável: "o melhor da região", "líder de mercado", "referência em Porto Velho", "excelência".
- Percentual ou métrica sem origem declarada. Número sem lastro não entra.
- Metáfora de violência ou fisiologia aplicada a negócio: "sangrar caixa", "hemorragia de recursos", "operação na UTI".

### 2.3 Tabela de substituição obrigatória

| Expressão atual | Substituição |
|---|---|
| TI Empresarial de Alto Padrão | Sistemas e infraestrutura para empresas |
| solução de ponta a ponta | do servidor ao balcão |
| blindagem jurídica e LGPD | contrato assinado e sigilo de dados sob a LGPD |
| destravar processos | eliminar o trabalho manual da equipe |
| vulnerabilidades operacionais que sangram caixa | problemas que custam dinheiro todo mês |
| tecnologias amigáveis | sistemas que a equipe aprende a usar no primeiro dia |
| atuação na linha de frente | atendimento presencial em Porto Velho |

---

## 3. TEXTO FINAL POR PÁGINA

O texto abaixo é literal. Copia e aplica. Não reinterpretar, não reescrever, não "melhorar" na implementação.

### 3.1 HOME — Hero

**Badge:**
```
Rodrigo Freire Tech · Porto Velho, RO
```

**H1:**
```
Sistemas sob medida para a sua empresa vender mais.
```

**Linha com efeito digitado (prefixo mantido):**
```
Na prática:
```

**Descrição:**
```
Desenvolvo e mantenho a tecnologia que a sua operação usa todos os dias: sistemas próprios, automação das rotinas manuais da equipe e estabilidade de caixa e rede. Cada projeto começa com escopo e preço fechados por escrito. Quem executa o trabalho é quem atende você depois.
```

**Chips (4, sem símbolo, ícone via lucide-react):**
```
Sistemas, sites e lojas online desenvolvidos sob medida
Automação e inteligência artificial aplicadas às rotinas da equipe
Estabilidade de caixa, rede comercial e dados protegidos
Escopo e preço definidos por escrito antes de começar
```

**CTA primário:**
```
Solicitar avaliação da sua operação
```

**CTA secundário:**
```
Conhecer os quatro pilares de atuação
```

**Mensagem de WhatsApp do CTA primário:**
```
Olá Rodrigo. Sou de uma empresa em Porto Velho e gostaria de solicitar uma avaliação da nossa operação de tecnologia.
```

### 3.2 HOME — Seção de riscos

**Título:**
```
Três problemas que custam dinheiro antes de aparecer no relatório
```

**Risco 01 — título:**
```
Cópia de segurança que nunca foi testada
```
**Risco 01 — descrição:**
```
Backup que nunca foi restaurado não é backup, é suposição. Uma pane de disco ou uma exclusão acidental leva junto anos de histórico de vendas, cadastro de clientes e contas a receber.
```
**Risco 01 — consequência:**
```
Perda definitiva do histórico financeiro e parada imediata da operação.
```

**Risco 02 — título:**
```
Hora de funcionário gasta em digitação
```
**Risco 02 — descrição:**
```
Equipe copiando informação de um sistema para outro todo dia. É lento, custa salário e produz erro de fechamento que ninguém percebe até o mês virar.
```
**Risco 02 — consequência:**
```
Folha de pagamento financiando retrabalho e fechamento atrasado toda semana.
```

**Risco 03 — título:**
```
Sistema fora do ar no horário de pico
```
**Risco 03 — descrição:**
```
Caixa travado e rede oscilando no maior movimento da loja geram fila no balcão, entrega atrasada e cliente que desiste e compra no concorrente.
```
**Risco 03 — consequência:**
```
Faturamento do dia comprometido e desgaste da imagem comercial.
```

### 3.3 HOME — Comparativo de modelos

**Título da seção:**
```
Três formas de resolver tecnologia na sua empresa, e o que muda em cada uma
```

**Cabeçalhos de coluna:**
```
Modelo 1 · Suporte reativo por chamado
Modelo 2 · Desenvolvimento remoto por pacote
Modelo 3 · Rodrigo Freire Tech
```

**Critério: Quando age**
```
Modelo 1: Age depois da falha. O atendimento começa quando o equipamento já parou e o prejuízo do dia já aconteceu.
Modelo 2: Age dentro do escopo contratado. O que está fora do pacote fica sem dono até virar novo orçamento.
Modelo 3: Ajo antes. Conheço a operação por dentro e trato o gargalo enquanto ele ainda é ajuste, não pane.
```

**Critério: Alcance da solução**
```
Modelo 1: Cobre equipamento e rede. Integração entre sistemas e automação de rotina ficam fora do alcance do serviço.
Modelo 2: Cobre o software encomendado. A infraestrutura que sustenta esse software continua sendo problema de outra pessoa.
Modelo 3: Cubro os dois lados. Do servidor ao balcão, com um único responsável pelo conjunto funcionando.
```

**Critério: Conhecimento da rotina**
```
Modelo 1: O atendimento é pontual, então a rotina de fechamento e o fluxo do balcão não entram na conta.
Modelo 2: O trabalho acontece à distância, com o entendimento da operação limitado ao que coube na reunião de levantamento.
Modelo 3: Estou presencialmente na sua operação em Porto Velho. Vejo o fechamento acontecer e projeto o sistema em cima do que realmente ocorre.
```

**Critério: Responsabilidade e contrato**
```
Modelo 1: Sem compromisso formal de continuidade. Cada chamado é uma negociação nova.
Modelo 2: Atendimento por fila de chamados, com prazo de retorno que depende da posição na fila.
Modelo 3: Responsável técnico definido em contrato, com escopo e preço fechados por escrito e cláusula de sigilo sobre os dados da empresa.
```

### 3.4 HOME — Pilares

**Título da seção:**
```
Quatro pilares de atuação
```

**PILAR 01**
```
Tag: PILAR 01 · CONTINUIDADE
Título: Continuidade da operação
Foco: A empresa não para e o dado não se perde.
```
Descrição:
```
Quando o computador do caixa trava no pico do movimento, a impressora para de emitir cupom ou a internet comercial oscila, o prejuízo é imediato: fila de cliente, equipe sob pressão e venda que não acontece. Assumo a responsabilidade técnica pela infraestrutura, com atendimento presencial em Porto Velho ou por acesso remoto (conexão segura ao computador à distância), sempre com prazo de retorno acordado por escrito. As rotinas de cópia de segurança são testadas com restauração real, protegendo cadastro e histórico financeiro em conformidade com a LGPD (Lei Geral de Proteção de Dados, que define como dados de clientes devem ser guardados e tratados).
```
Entregáveis (4):
```
Rotina automática de cópia de segurança com teste periódico de restauração real
Manutenção preventiva de computadores, rede comercial e servidores
Atendimento a falhas com prazo de retorno acordado em contrato
Inventário do que a empresa possui hoje, entregue por escrito
```
Ganho:
```
Caixa e computadores estáveis no horário de maior movimento, histórico financeiro recuperável e um responsável direto quando algo sai do esperado.
```

**PILAR 02**
```
Tag: PILAR 02 · AUTOMAÇÃO
Título: Automação e integração de processos
Foco: Devolver à equipe as horas gastas em digitação.
```
Descrição:
```
Sua equipe perde horas copiando dado de um sistema para outro e conferindo relatório à mão. Conecto os sistemas que hoje não conversam entre si e crio rotinas que geram o consolidado sozinhas, em segundos.
```
Entregáveis (3):
```
Integração entre os sistemas operacionais e financeiros que hoje funcionam isolados
Substituição de controles manuais e planilhas paralelas por rotina automática
Relatório consolidado gerado sem ninguém precisar montar toda semana
```
Ganho:
```
Horas de trabalho manual devolvidas para atendimento e venda, com o erro de digitação eliminado na origem.
```

**PILAR 03**
```
Tag: PILAR 03 · PLATAFORMAS
Título: Plataformas e presença digital própria
Foco: Vender com margem cheia e manter a carteira de clientes.
```
Descrição:
```
Vender apenas por rede social ou por marketplace deixa o negócio exposto a comissão alta, mudança de algoritmo e perda de contato com quem já comprou. Desenvolvo site institucional e loja online próprios, rápidos e integrados ao WhatsApp e aos canais que a empresa já usa. Também presto orientação técnica independente na escolha de sistemas de mercado, sem empurrar ferramenta cara que a sua fase não pede.
```
Entregáveis (2):
```
Site institucional ou loja online própria, desenvolvida sob medida para o seu segmento
Orientação técnica independente na escolha e implantação de sistemas de terceiros
```
Ganho:
```
Venda direta com margem cheia, base de clientes própria para recompra e credibilidade para fechar negócio de valor maior.
```

### 3.5 HOME — Pilar 04 (inteligência artificial)

Este pilar é irmão dos três anteriores, com o mesmo peso visual e a mesma estrutura de card. Não é seção avulsa.

**PILAR 04**
```
Tag: PILAR 04 · INTELIGÊNCIA ARTIFICIAL
Título: Inteligência artificial aplicada à rotina da empresa
Foco: A tecnologia é sua aliada, não sua concorrente.
```

Descrição:
```
A maior parte das empresas que tenta usar inteligência artificial desiste pelo mesmo motivo: ligou a ferramenta e pediu para ela resolver. Sem conhecer o catálogo, o preço e as exceções comerciais da casa, ela inventa informação, promete prazo fora da realidade e perde o fio em tarefa mais longa. Empresa grande resolve isso colocando equipe técnica dentro da operação por algumas semanas, até a ferramenta estar ajustada à rotina real. Faço exatamente esse trabalho, na escala do comércio de Porto Velho, aplicado a tarefa com nome e resultado medido.
```

Entregáveis (4):
```
Triagem automática das mensagens de WhatsApp, com encaminhamento por assunto e urgência
Resumo automático de pedido e consulta de catálogo e preço pela equipe de balcão
Regras escritas de limite, definindo o que a ferramenta responde sozinha e o que passa por você antes
Período de acompanhamento presencial definido em contrato, até a equipe operar sem apoio
```

Ganho:
```
Horas de atendimento repetitivo devolvidas à equipe, com a ferramenta trabalhando dentro da política comercial que você definiu e sem inventar o que não sabe.
```

**Mensagem de WhatsApp do pilar:**
```
Olá Rodrigo. Gostaria de conversar sobre aplicar inteligência artificial na rotina da minha empresa.
```

**Regra de redação obrigatória para este pilar:** proibido vender "implementação de inteligência artificial" no abstrato. Toda oferta nomeia a tarefa que passa a ser resolvida. A tecnologia aparece como meio, nunca como produto.

### 3.6 HOME — Método

**Título:**
```
Quatro etapas, com escopo e valor definidos antes de começar
```

Etapas (conteúdo mantido, títulos confirmados):
```
01 · Avaliação — Levantamento prático do que a empresa tem hoje: equipamento, rede comercial, onde o dado está guardado e quais tarefas ainda são manuais.
02 · Prioridade — Definição do que resolver primeiro, por ordem de risco e de retorno. O escopo e o preço são fechados por escrito antes de qualquer execução.
03 · Execução — Implementação do que foi acordado, com explicação em português claro do que está sendo feito e por quê.
04 · Acompanhamento — Entrega testada na rotina real, com distinção explícita entre o que fica sob manutenção contínua e o que é entrega única concluída.
```

### 3.7 HOME — Formulário

**Título:**
```
Solicitar avaliação da sua operação
```
**Campos (rótulos):**
```
Seu nome
WhatsApp
Nome da empresa (opcional)
O que precisa de atenção na sua operação
```
**Botão:**
```
Enviar solicitação
```
**Sucesso:**
```
Solicitação enviada. O WhatsApp foi aberto para você confirmar os dados comigo diretamente.
```

### 3.8 SOBRE

**Título:**
```
Sobre Rodrigo Freire
```
**Tagline:**
```
Fundador da Rodrigo Freire Tech · Porto Velho, RO
```
**Bio de abertura:**
```
Construo e mantenho os sistemas que empresas de Porto Velho usam para trabalhar todos os dias. Sistema sob medida, automação de rotina manual e a infraestrutura que sustenta os dois, com um único responsável técnico pelo conjunto.
```
**Texto principal (3 parágrafos, sem simetria):**
```
Moro em Porto Velho e atendo comércio e empresa daqui. Trabalho com a operação por dentro: entendo como o fechamento acontece, onde a equipe perde tempo e o que trava no horário de pico, e construo a partir disso. O que entrego é sistema que a pessoa da ponta consegue operar, não software que impressiona em apresentação e atrapalha na rotina.

Minha formação soma duas áreas que produzem garantia concreta para quem contrata. Sou graduado em Direito e curso Análise e Desenvolvimento de Sistemas. A base jurídica se traduz em cuidado com o que vai por escrito no contrato, leitura atenta de termo de terceiro e tratamento rigoroso de informação sigilosa e dado de cliente sob a LGPD. Também desenvolvi tecnologia própria de proteção de servidores, com Registro INPI de Programa de Computador Nº 512025006506-0.

Tecnologia aqui é meio, não fim. O que importa é a equipe ter ferramenta que funciona no primeiro dia, o caixa não travar na hora da venda e existir um responsável definido para atender quando algo sair do esperado.
```
**Título dos compromissos:**
```
Compromissos de atuação
```
**Subtítulo dos compromissos:**
```
O que assumo perante a sua empresa em cada projeto:
```

Compromissos (conteúdo mantido, títulos confirmados):
```
01 · Nada muda sem plano de volta
02 · O que é da sua empresa fica na sua empresa
03 · Solução que você consegue manter
04 · Quem faz é quem atende
```

### 3.9 CONTATO

**Título:**
```
Contato direto
```
**Subtítulo:**
```
Atendimento comigo, sem fila de chamado.
```
**Blocos:**
```
WhatsApp — Canal principal. Resposta em horário comercial, de segunda a sexta, das 8h às 18h.
Documentos e propostas — Escopo, prazo e valor enviados por escrito antes de qualquer execução.
Sigilo — Dado de cliente, faturamento e movimentação financeira acessados durante o trabalho são tratados sob cláusula contratual de sigilo, em conformidade com a LGPD.
```

### 3.10 PROJETOS (listagem)

**Título:**
```
Projetos e sistemas desenvolvidos
```
**Subtítulo:**
```
Tecnologia própria, pesquisa aplicada e produto em operação real.
```

**Regra de moldura obrigatória:** esta página apresenta trabalho de profundidade técnica (kernel, eBPF, medição energética) para um público diferente do restante do site. Ela recebe um parágrafo de enquadramento no topo, com este texto exato:

```
Esta seção reúne o que construo no limite técnico: pesquisa publicada, tecnologia registrada e sistema em produção. Não é o que a maioria das empresas contrata no dia a dia, e está aqui por outro motivo. É a prova de que o mesmo cuidado aplicado nesses projetos entra no sistema simples que roda no seu balcão.
```

**Regra de ordenação obrigatória.** A ordem atual abre com o projeto de menor legibilidade comercial. Inverter para que o visitante encontre primeiro o que ele consegue avaliar sozinho.

Novo `display_order`:

```
1 · AppFitness            (produto em operação, com usuários reais)
2 · CreareLabs            (plataforma visual, demonstrável em tela)
3 · Imunno System         (tecnologia própria com registro INPI)
4 · SysCallCage           (open source)
5 · GreenToken            (pesquisa publicada)
6 · Kernel WSL2 BPF Plus  (engenharia de kernel)
```

Nenhum projeto é removido. O que muda é a ordem de encontro.

### 3.11 PROJETO (detalhe)

**Rótulos de seção padronizados:**
```
O problema
Como funciona
Tecnologias
```
**Badge do Imunno System (corrigido por RF-4):**
```
Defesa autônoma no kernel · Registro INPI de Programa de Computador Nº 512025006506-0
```

### 3.12 BLOG

**Título:**
```
Artigos
```
**Subtítulo:**
```
Notas sobre engenharia, tecnologia aplicada a negócio e o que observo no mercado.
```
**Estado vazio:**
```
Nenhum artigo corresponde aos filtros selecionados.
```

### 3.13 ERRO 404

**Título:**
```
Página não encontrada
```
**Texto:**
```
O endereço acessado não existe ou foi movido.
```
**Ação:**
```
Voltar para a página inicial
```

### 3.14 METADADOS DE BUSCA

**Home — title:**
```
Rodrigo Freire Tech · Sistemas sob medida para empresas — Porto Velho
```
**Home — description:**
```
Desenvolvimento de sistemas, sites e lojas online sob medida, automação de rotinas manuais e estabilidade de caixa e rede para empresas de Porto Velho. Escopo e preço fechados por escrito.
```
**Sobre — title:**
```
Sobre Rodrigo Freire · Fundador da Rodrigo Freire Tech
```
**Projetos — title:**
```
Projetos e sistemas desenvolvidos · Rodrigo Freire Tech
```
**Contato — title:**
```
Contato direto · Rodrigo Freire Tech — Porto Velho
```

**JSON-LD (`homeJsonLd`) — campos alterados:**
```
name: Rodrigo Freire Tech
description: Desenvolvimento de sistemas sob medida, automação de processos e infraestrutura de tecnologia para empresas em Porto Velho, RO.
```

---

## 4. CRITÉRIOS DE ACEITAÇÃO

Verificação objetiva antes de considerar a spec implementada.

**CA-1 · Titulação**
- [ ] `grep -ri "linha de frente" src/` retorna zero ocorrência em arquivo público
- [ ] `grep -ri "consultor" src/` retorna zero ocorrência referida a Rodrigo
- [ ] Nenhuma ocorrência de "engenheiro" como cargo pessoal

**CA-2 · Registro INPI**
- [ ] `grep -ri "patente" src/` retorna zero ocorrência
- [ ] Toda menção ao número 512025006506-0 usa a forma definida em RF-4

**CA-3 · Símbolos**
- [ ] Zero ocorrência de `✦ ★ ⚠️ ✓ ✗` ou emoji em string de texto

**CA-4 · Repetição**
- [ ] Nenhum termo da lista de RF-6 excede duas ocorrências no conjunto das páginas públicas
- [ ] `escopo e preço fechados por escrito` não excede três ocorrências
- [ ] A glosa de LGPD aparece uma única vez em todo o site

**CA-5 · Simetria**
- [ ] Pilar 01 com 4 entregáveis, Pilar 02 com 3, Pilar 03 com 2, Pilar 04 com 4

**CA-5.1 · Pilar 04**
- [ ] Renderizado com o mesmo componente e o mesmo peso visual dos outros três
- [ ] Nenhuma oferta de inteligência artificial declarada sem nomear a tarefa correspondente
- [ ] Título da seção e CTA secundário do hero dizem "quatro pilares"

**CA-5.2 · Ordenação de projetos**
- [ ] `display_order` conforme a tabela de 3.10
- [ ] Parágrafo de enquadramento presente no topo da listagem

**CA-6 · Extensão**
- [ ] H1 da Home com no máximo 14 palavras
- [ ] Nenhum parágrafo institucional com mais de 3 frases
- [ ] Nenhuma glosa entre parênteses com mais de 12 palavras

**CA-7 · Comparativo**
- [ ] Cabeçalhos nomeiam modelo, não categoria de pessoa
- [ ] Zero ocorrência dos adjetivos vetados em RF-3
- [ ] A coluna 3 afirma superioridade sem qualificador de modéstia

**CA-8 · Voz**
- [ ] Zero contração coloquial em texto institucional
- [ ] Zero travessão usado como conector
- [ ] Zero expressão de disponibilidade passiva conforme RF-2
- [ ] Primeira pessoa do singular em toda fala de Rodrigo

**CA-9 · Substituições**
- [ ] Toda linha da tabela 2.3 aplicada, sem exceção pendente

**CA-10 · Leitura em celular**
- [ ] Hero completo legível em viewport de 360px sem corte
- [ ] H1 ocupando no máximo 4 linhas em 360px

---

## 5. DECISÕES TOMADAS NA REVISÃO 1.1

**5.1 Inteligência artificial vira pilar.** A pendência registrada na versão 1.0 está resolvida. A seção deixa de ser bloco avulso e passa a Pilar 04, com entregáveis, ganho declarado e mensagem de WhatsApp própria, em pé de igualdade com os outros três.

**5.2 O H1 carrega a oferta, não a tese.** A frase "a tecnologia é sua aliada, não sua concorrente" foi retirada do título principal e realocada como foco do Pilar 04. Fundamento: no hero ela chega antes da pergunta que responde, e exige que o leitor compre uma premissa sobre tecnologia antes de entender o que está sendo oferecido. Dentro do Pilar 04, o receio já está na mesa e a frase trabalha.

**5.3 Projetos permanecem.** A hipótese de remover a página foi descartada. A profundidade técnica exposta ali é o que sustenta o preço praticado e separa a marca de prestador de serviço genérico. O ajuste é de ordem de leitura, não de conteúdo.

---

## 6. PENDÊNCIA REMANESCENTE

Preço. Nenhum dos quatro pilares declara faixa de valor, e o Pilar 04 introduz um formato novo (acompanhamento por período determinado) que torna a ausência mais visível.

Decisão fora do escopo desta spec: publicar faixa inicial, publicar apenas o formato de cobrança sem valor, ou manter tudo sob orçamento. Registrada para não se perder.
