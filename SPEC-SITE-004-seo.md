# SPEC-SITE-004 — SEO Técnico, Social e Otimização para Respostas de IA (GEO)

## Contexto e diagnóstico

O site (`rodrigofreire.dev.br`, React + Vite, renderização 100% client-side,
sem SSR/SSG) hoje tem:

- Um único `<title>` e uma única `<meta description>` fixos no `index.html`,
  compartilhados por Home, Sobre, cada post de blog e cada projeto.
- Nenhum `robots.txt`, nenhum `sitemap.xml`.
- Nenhuma tag Open Graph ou Twitter Card — links compartilhados em
  WhatsApp/Instagram mostram sempre o mesmo card genérico, nunca o título
  real do post.
- Nenhum dado estruturado (JSON-LD).
- Nenhuma URL canônica declarada.
- **`rodrigofreire.pages.dev` continua servindo o mesmo conteúdo do domínio
  novo, sem redirecionamento** — Google pode interpretar como conteúdo
  duplicado e diluir o valor de indexação entre os dois domínios em vez de
  concentrar tudo no domínio definitivo.
- Chunk de build acima de 1MB (`vendor-markdown`), sinalizado pelo próprio
  aviso do Vite — afeta tempo de carregamento, que é fator de ranqueamento.

**Objetivo deste spec**: cobrir SEO tradicional (Google), SEO social (preview
de link), dado estruturado, performance de carregamento, e o campo emergente
de **otimização para motores de resposta de IA (GEO/AEO)** — ChatGPT,
Perplexity, Claude e assistentes de busca por IA citando ou resumindo o
conteúdo do site em resposta a pergunta do usuário.

**Limite honesto a declarar**: nenhuma técnica garante que uma IA vá citar o
site — isso depende também de decisão do provedor da IA, não é 100%
controlável como SEO tradicional. O que este spec garante é remover toda
barreira técnica que impediria isso de acontecer, e maximizar a chance dentro
do que é possível hoje.

---

## RF-1 (P0) — `robots.txt` e `sitemap.xml`

**`robots.txt`** na raiz do site, permitindo explicitamente:
- Crawlers de busca tradicionais (Googlebot, Bingbot).
- **Crawlers de IA**, nome por nome, sem bloqueio: `GPTBot` (OpenAI),
  `ChatGPT-User`, `ClaudeBot` e `anthropic-ai` (Anthropic), `PerplexityBot`,
  `Google-Extended` (permite uso do conteúdo em produtos de IA do Google
  além da busca tradicional), `CCBot` (Common Crawl, usado para treinar
  vários modelos).
- Apontar para o `sitemap.xml`.
- Bloquear apenas rotas administrativas (`/adm`, `/login`).

**`sitemap.xml`** gerado dinamicamente a partir dos dados reais do site
(`DEFAULT_PROJECTS`, `DEFAULT_POSTS`/conteúdo de `content/posts/`), incluindo:
Home, Sobre, Contato, `/blog`, cada `/blog/:slug`, `/projetos`, cada
`/projetos/:slug`. Cada entrada com `lastmod` correto (data do post) e
`changefreq` apropriado (`weekly` para blog, `monthly` para páginas fixas).

Gerar o sitemap em tempo de build (script Node rodando após `vite build`,
integrado ao `npm run build`), não manualmente — evita ficar desatualizado
quando novo post for publicado.

## RF-2 (P0) — Meta tags dinâmicas por página

Instalar `react-helmet-async`. Cada página declara seu próprio conjunto de
tags, substituindo o bloco fixo do `index.html`:

- `<title>` único por página, com padrão `[Título específico] · Rodrigo
  Freire — Porto Velho` para páginas comerciais, e `[Título do post] ·
  Blog Rodrigo Freire` para posts.
- `<meta name="description">` única por página — para posts, usar o campo
  `description` já existente no frontmatter dos arquivos em `content/posts/`
  (já escrito para vários posts, ex: `agi-didatico.md`) em vez de escrever
  de novo.
- `<link rel="canonical">` apontando para a URL definitiva em
  `https://rodrigofreire.dev.br/...` em toda página, inclusive quando
  acessada por qualquer outro domínio/subdomínio (resolve também parte do
  RF-6).

## RF-3 (P0) — Open Graph e Twitter Card por página

Para cada página, via o mesmo `react-helmet-async` do RF-2:

- `og:title`, `og:description`, `og:type` (`website` para páginas
  institucionais, `article` para posts), `og:url` (canônica), `og:image`.
- `twitter:card` (`summary_large_image`), `twitter:title`,
  `twitter:description`, `twitter:image`.
- Para posts (`og:type=article`): incluir também `article:published_time`
  (data do frontmatter) e `article:author`.

**Imagem de Open Graph**: cada post precisa de uma imagem de capa
(1200×630px, proporção recomendada pelas próprias redes). Posts que não
têm `cover_image` definida usam uma imagem padrão do site (gerar uma arte
genérica de capa, no padrão visual preto/azul elétrico do `BRAND-GUIDE.md`,
com o nome do blog — não deixar nenhum post sem imagem de prévia).

## RF-4 (P1) — Dado estruturado (JSON-LD)

Adicionar blocos `<script type="application/ld+json">` via
`react-helmet-async`:

- **`LocalBusiness`** na Home: nome, endereço/região (Porto Velho, RO),
  telefone/WhatsApp, tipo de serviço, área de atuação. Isso é o que mais
  importa para aparecer em busca local ("TI Porto Velho", "conserto de
  computador Porto Velho") e no Google Maps/pacote local.
- **`Article`** em cada post de blog: título, autor (`Rodrigo Freire`),
  data de publicação, imagem, descrição.
- **`Person`** na página Sobre: nome, ocupação, região, link para
  LinkedIn/GitHub.
- **`BreadcrumbList`** em posts e projetos, refletindo a hierarquia
  Home → Blog → Post.
- **`FAQPage`**, quando aplicável: posts escritos em formato de
  pergunta-resposta (como o de "Vendendo bem no Instagram, ainda preciso de
  site?") se beneficiam de marcação de FAQ, que é também o tipo de dado
  estruturado que motores de resposta de IA mais reaproveitam diretamente.

## RF-5 (P1) — Otimização para motores de resposta de IA (GEO/AEO)

Além do RF-1 (liberar os crawlers de IA) e do RF-4 (`FAQPage`), medidas
específicas para aumentar a chance de o conteúdo ser resumido ou citado por
IA:

- **Criar `llms.txt` na raiz do site** — padrão emergente, análogo ao
  `robots.txt`, que lista de forma objetiva do que trata o site e aponta
  para o conteúdo mais importante (Home, posts principais, Sobre), em texto
  simples e direto, pensado para ser lido por um modelo de IA, não por
  humano navegando visualmente.
- **Parágrafo de resposta direta no início de cada post.** Motores de
  resposta de IA favorecem conteúdo que responde a pergunta do título já
  nas primeiras linhas, de forma objetiva, antes de entrar em nuance — sem
  abandonar o estilo de escrita já estabelecido, apenas garantir que a
  resposta direta apareça cedo no texto, não só ao final.
- **Hierarquia clara de cabeçalhos (`h1`, `h2`, `h3`)** em vez de negrito
  simulando título — já majoritariamente seguido nos posts existentes,
  manter como regra para os novos.
- **Sinal de autoria e credibilidade (E-E-A-T)**: nome do autor visível em
  cada post (já presente em parte dos posts como "Por Rodrigo Freire"),
  mais o `Person`/`Article` schema do RF-4, que reforça o mesmo sinal de
  forma estruturada.

## RF-6 (P0) — Corrigir duplicidade do `pages.dev`

`rodrigofreire.pages.dev` está servindo o mesmo conteúdo do domínio
definitivo sem redirecionar. Duas correções complementares:

- **Redirecionamento real**: configurar redirecionamento 301 de
  `rodrigofreire.pages.dev` para `rodrigofreire.dev.br`, usando o recurso de
  Bulk Redirect da Cloudflare (nível de conta, não precisa estar no mesmo
  projeto Pages) ou arquivo `_redirects` na raiz do build, conforme suportado
  pela documentação de Custom Domains do Cloudflare Pages.
- **Canônica como rede de segurança**: mesmo com o redirecionamento
  funcionando, a tag `<link rel="canonical">` do RF-2 já aponta sempre para
  `rodrigofreire.dev.br`, garantindo que, mesmo que algum crawler acesse via
  `pages.dev` antes do redirecionamento propagar, o sinal de qual é a URL
  "de verdade" já está declarado no HTML.

## RF-7 (P1) — Performance de carregamento (Core Web Vitals)

Tempo de carregamento é fator de ranqueamento direto no Google, e afeta
também a disposição de motores de IA em processar a página.

- Resolver o aviso já emitido pelo próprio build (`vendor-markdown` acima de
  1MB): usar `import()` dinâmico para carregar o editor/renderizador de
  markdown apenas nas páginas que precisam dele (`Blog`, `BlogPost`, área
  administrativa), em vez de incluir no bundle principal carregado em toda
  página, incluindo a Home.
- Adicionar `loading="lazy"` em imagens abaixo da dobra (cards de serviço,
  imagens de post) que ainda não tenham esse atributo.
- Validar as métricas reais depois de implementado, via PageSpeed
  Insights/Lighthouse, para as rotas Home, um post de blog e um projeto.

## RF-8 (P2) — Palavra-chave local nos títulos, sem forçar

Para posts com intenção comercial (não os técnicos de deep tech), garantir
que título ou descrição contenha naturalmente um termo de busca local
("Porto Velho", "seu comércio", "loja online") — já é prática seguida no
post "Vendendo bem no Instagram, ainda preciso de site?", manter como
padrão para os próximos, sem forçar termo de forma artificial que quebre a
qualidade do texto.

---

## Critérios de aceitação

- **CA-1**: `robots.txt` acessível em `/robots.txt`, permitindo
  explicitamente todos os crawlers de IA listados no RF-1, e `sitemap.xml`
  acessível em `/sitemap.xml`, contendo todas as rotas públicas com
  `lastmod` correto.
- **CA-2**: inspecionando o HTML retornado (view-source, não o DOM após
  JavaScript) de qualquer post de blog, o `<title>` e a `<meta
  description>` são específicos daquele post, não o texto genérico do site.
- **CA-3**: compartilhar a URL de um post no WhatsApp ou testar em uma
  ferramenta de preview de Open Graph mostra título, descrição e imagem
  específicos do post, não o card genérico do site.
- **CA-4**: cada post de blog e a Home contêm bloco JSON-LD válido
  (validável na ferramenta de teste de dados estruturados do Google), sem
  erro de schema.
- **CA-5**: `rodrigofreire.pages.dev` redireciona (HTTP 301) para
  `rodrigofreire.dev.br` em qualquer rota testada.
- **CA-6**: `llms.txt` acessível em `/llms.txt`, com conteúdo objetivo
  descrevendo o site e linkando para o conteúdo principal.
- **CA-7**: `npm run build` não emite mais o aviso de chunk acima de 1MB
  para `vendor-markdown`.
- **CA-8**: toda imagem de card/post abaixo da dobra tem `loading="lazy"`.

## Fora de escopo

- Migração para framework com SSR/SSG (Next.js, Astro, etc.). É a solução
  estruturalmente mais forte para SEO de SPA, mas é reescrita de projeto
  inteiro — fica registrada aqui como opção futura caso o volume de tráfego
  orgânico justifique o investimento, não como parte deste spec.
- Link building externo, guest post, ou qualquer estratégia de SEO fora do
  próprio site (é trabalho de conteúdo/relacionamento, não de código).
- Garantia de citação por qualquer IA específica — depende de decisão do
  provedor, fora do controle técnico deste spec.
