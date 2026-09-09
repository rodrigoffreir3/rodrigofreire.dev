# SPEC-SITE-003 — Transformação para Captação de Serviços de TI Autônomos (Porto Velho)

## Contexto e diagnóstico

O site atual (`rodrigofreire.dev`, React + Vite + Tailwind, CMS próprio via
Supabase) está posicionado como catálogo corporativo de uma suíte ERP/PDV
completa: PDV com PIX dinâmico, emissor fiscal integrado à SEFAZ, ponto
eletrônico Portaria 671, comanda digital com KDS, bot de WhatsApp com NLP,
modo offline de contingência. Há FAQ de implantação e metodologia de 4 passos
escritas como se já houvesse operação com clientes.

**Esse produto ainda não existe.** O escopo mais simples dele está, nesta
data, em fase de validação inicial com uma única empreendedora, sem código
escrito. O site vende hoje uma maturidade que o negócio não tem.

Risco real, não estético: se um comerciante local pedir demonstração esta
semana, não há o que mostrar. Isso reproduz, antes mesmo da venda, exatamente
a dor que o contato do Sebrae identificou nos concorrentes locais (promessa
que não se sustenta), no mercado que é o mais sensível a isso.

**Novo objetivo do site**: captar serviços de TI autônomos, avulsos e
pontuais, que Rodrigo consegue entregar hoje, sozinho, sem depender de
nenhum produto inexistente.

## Princípios inegociáveis de linguagem

Estes princípios valem para 100% do texto visível ao público. Qualquer
violação é motivo de rejeição da entrega.

1. **Zero termo técnico que só desenvolvedor entende.** Proibido no texto
   visível: kernel, Ring 0, eBPF, syscall, LSM, API, backend, frontend,
   deploy, container, microsserviço, stack, framework, endpoint, latência,
   overhead, machine learning, NLP, LGPD sem explicação, SaaS, uptime.
   Se um conceito técnico for indispensável, traduzir para consequência:
   não "backup automatizado em nuvem com redundância", e sim "se o
   computador da loja pifar amanhã, seus dados continuam lá".
2. **Todo argumento fecha resolvendo uma dor concreta do empresário.**
   Nunca descrever capacidade técnica sem dizer o que ela evita de prejuízo
   ou o que ela destrava de ganho.
3. **Toda oferta mostra a chance de lucro ou a perda evitada.** Em dinheiro,
   em tempo, ou em cliente perdido — a linguagem que dono de comércio usa
   para decidir.
4. **Nada de "nós", "nossa equipe", "nossa engenharia".** O negócio é uma
   pessoa. Falar na primeira pessoa, com nome e rosto. Em Porto Velho,
   proximidade e acesso direto ao responsável é vantagem competitiva, não
   fraqueza — a dor local documentada é justamente suporte distante e
   impessoal.
5. **Nenhuma promessa de entrega que não exista hoje.** Sem exceção.

## RF-1 (P0) — Remoção do catálogo ERP/PDV do site público

Remover integralmente do site público as 12 ofertas de `DEFAULT_SERVICES`,
os 8 segmentos de `DEFAULT_SEGMENTS`, a metodologia de 4 passos
(`DEFAULT_STEPS`), o FAQ de implantação (`DEFAULT_FAQS`) e a faixa
`DEFAULT_SOLUTIONS_STRIP` — todo o material que descreve o ERP/PDV/fiscal
como produto pronto.

**Não deletar o conteúdo.** Mover o material removido para uma pasta
separada, fora do projeto do site:

```
/home/rodrigo-freire/Downloads/site-catalogo-erp-arquivado/
```

Salvar ali os trechos extraídos de `defaultData.js` em arquivo próprio
(ex: `catalogo-erp-arquivado.js`), preservando a estrutura original, mais
um `README.md` curto explicando: material do catálogo ERP/PDV retirado do
site público em [data], preservado para uso futuro em página ou site
dedicado quando o produto existir de fato. Rodrigo decidirá depois o
destino.

Ajustar `Home.jsx` e demais páginas para não importar nem referenciar o
conteúdo removido, sem deixar seção vazia ou import quebrado.

## RF-2 (P0) — Nova Home: serviços que existem hoje

A Home passa a comunicar disponibilidade para trabalho técnico pontual,
não catálogo de produto. Estrutura:

**Bloco 1 — Abertura (acima da dobra).**
Abre pela dor, não pela oferta. Uma frase que o comerciante local reconhece
como a vida dele, seguida da proposta em linguagem direta e de um único
botão de ação (WhatsApp). Sem jargão, sem nome de tecnologia.
Referência de tom (o agente deve escrever a versão final, não copiar):
"Seu sistema travou, o computador do caixa não liga, ou aquele problema
que ninguém resolve já virou rotina? Eu atendo aqui em Porto Velho, falo
direto com você, sem call center e sem chamado que some."

**Bloco 2 — O que eu resolvo.**
Entre 4 e 6 serviços que Rodrigo entrega hoje sem depender de produto
inexistente. Cada card com: nome em linguagem de leigo, a dor que resolve,
e o ganho concreto (dinheiro, tempo ou cliente que deixa de ser perdido).
Categorias sugeridas, a serem refinadas por Rodrigo antes da publicação:
- Socorro técnico e resolução de problema pontual em computador/rede/sistema
- Site ou página de vendas para quem hoje só tem rede social
- Automação de tarefa repetitiva que hoje é feita na mão
- Organização de planilha e controle que só uma pessoa da empresa sabe mexer
- Configuração e manutenção de computador, rede e backup do negócio
- Ajuda para escolher e implantar sistema de terceiro (sem vender o próprio)

Regra de escrita de cada card: uma frase de dor, uma frase de solução,
uma frase de ganho. Nada além disso.

**Bloco 3 — Por que eu, e não o suporte que você já tentou.**
Aqui entra o diferencial real e verdadeiro, sem inventar: atendimento
direto com a pessoa que faz o trabalho, resposta rápida, presença local
em Porto Velho, e compromisso de explicar em português o que está sendo
feito e por quê. Fechar com o ganho: menos tempo parado, menos dependência
de terceiro que não retorna.

**Bloco 4 — Como funciona na prática.**
Três passos honestos e curtos, sem inventar metodologia corporativa:
conversa no WhatsApp para entender o problema → orçamento claro antes de
começar, sem surpresa → resolução com explicação do que foi feito.

**Bloco 5 — Chamada final.**
Botão de WhatsApp. Reaproveitar o formulário de diagnóstico já existente
em `Home.jsx` (que monta mensagem e abre `wa.me`), reescrevendo os campos
para o novo contexto de serviço avulso — remover o campo de segmento
herdado do ERP e simplificar para nome, WhatsApp e descrição livre do
problema.

## RF-3 (P0) — Reescrita da página Sobre, com foto real

Reescrever `src/pages/Sobre.jsx` na primeira pessoa, com foto.

**Foto de perfil**: o arquivo está em
`/home/rodrigo-freire/Downloads/foto_perfil.jpeg`.
Copiar para `public/foto_perfil.jpeg` no projeto do site e referenciar
como `/foto_perfil.jpeg`. Aplicar no topo da página Sobre, como retrato
circular ou em moldura suave, alinhado ao lado do texto de apresentação
em telas largas e acima do texto em telas de celular. Incluir atributo
`alt` descritivo ("Rodrigo Freire, profissional de TI em Porto Velho").

**Texto**: primeira pessoa, sem "nossa equipe". Conteúdo permitido, tudo
verdadeiro e verificável:
- Quem é, que é de Porto Velho, que atende localmente.
- Formação em andamento em Análise e Desenvolvimento de Sistemas e
  formação anterior em Direito — mencionar sem jargão, como sinal de
  seriedade e de leitura de contrato, que é vantagem prática para o
  cliente.
- Que desenvolve um sistema próprio de proteção de servidores com
  registro no INPI (processo nº 512025006506-0) — mencionar como sinal
  de competência técnica e seriedade, **em uma frase**, sem detalhe
  técnico e sem virar seção. O leitor-alvo não precisa entender o que é,
  precisa entender que a pessoa é séria.
- Fechar com o compromisso de atendimento direto e explicação em
  português.

Proibido nesta página: qualquer termo da lista do princípio 1, e qualquer
afirmação de experiência corporativa ou de equipe que não exista.

## RF-4 (P1) — Blog: separar o público técnico do público comercial

Os artigos atuais (segurança em profundidade, decepção em kernel, análise
de campanha de malware) são bons, mas falam com pesquisador de segurança,
não com o dono de comércio que o site agora quer atrair.

Ação: manter o blog acessível, mas **retirar os posts técnicos da Home**.
A Home não deve exibir chamada para esses artigos. O link para o blog
permanece na navegação, para quem procurar.

Se houver interesse futuro em blog voltado ao público comercial, os temas
seriam do tipo "o que fazer antes de trocar o sistema da sua loja" — fora
do escopo deste spec.

## RF-5 (P1) — Imunno em página própria, fora da vitrine comercial

O Imunno System e o SysCallCage saem da narrativa de venda de serviço e
passam a viver na seção de projetos (`/projetos`), que já existe. A Home
de serviços não os apresenta como prova de competência espalhada pelo
texto — apenas a menção única e curta permitida na página Sobre (RF-3).

Motivo: misturar produto de pesquisa em segurança com oferta de serviço
de TI local confunde o visitante sobre o que está sendo oferecido hoje.

## RF-6 (P2) — Imagens de apoio

Se o agente julgar necessário gerar imagem de apoio para os blocos da nova
Home, gerar com prompt preciso, em estilo fotográfico realista, sem texto
embutido na imagem, sem pessoa identificável, e coerente com o contexto
local (pequeno comércio brasileiro: balcão de loja, cozinha de restaurante,
mesa de escritório pequeno). Salvar em `public/` e referenciar por caminho
absoluto a partir da raiz.

Não gerar imagem para a seção Sobre — ali usa-se a foto real (RF-3).

## Critérios de aceitação

- **CA-1**: nenhuma página pública contém qualquer termo da lista de
  proibição do princípio 1. Verificação por busca textual no build final.
- **CA-2**: nenhuma página pública descreve ERP, PDV, emissor fiscal,
  ponto eletrônico, comanda digital ou bot de WhatsApp como serviço
  disponível.
- **CA-3**: o conteúdo removido está integralmente preservado em
  `/home/rodrigo-freire/Downloads/site-catalogo-erp-arquivado/`, com
  README explicativo, e o site compila (`npm run build`) sem import
  quebrado nem seção vazia.
- **CA-4**: a foto `/home/rodrigo-freire/Downloads/foto_perfil.jpeg` está
  copiada para `public/` e renderiza corretamente na página Sobre, em
  telas de celular e de computador.
- **CA-5**: cada serviço da nova Home tem, no texto, uma dor identificável
  e um ganho concreto (dinheiro, tempo ou cliente). Nenhum card descreve
  apenas capacidade técnica.
- **CA-6**: o site inteiro fala na primeira pessoa. Nenhuma ocorrência de
  "nossa equipe", "nossa engenharia" ou equivalente no texto público.
- **CA-7**: a Home não exibe chamada para os artigos técnicos do blog.

## Fora de escopo

- Criação do site ou página dedicada ao catálogo ERP/PDV (o material fica
  arquivado, decisão de destino é posterior).
- Qualquer alteração no CMS administrativo (`/adm`) além do necessário
  para não quebrar com a remoção de conteúdo.
- Blog voltado ao público comercial.
