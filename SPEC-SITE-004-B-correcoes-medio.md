# SPEC-SITE-004-B — Correções de Prioridade Média (Revisão Adversarial)

Mini-spec derivado da revisão adversarial do SPEC-SITE-004. Cobre apenas os
achados 🟡 (médio) — o 🔴 crítico (redirect do pages.dev) foi resolvido
manualmente via Bulk Redirect no painel da Cloudflare, fora do código.

## RF-1 (P1) — Eliminar duplicidade de fonte de verdade do blog

`content/posts/*.md` (10 arquivos) não são lidos por nenhum componente do
site — a fonte real e única é `DEFAULT_POSTS` em `src/data/defaultData.js`
(17 entradas). Isso é risco de manutenção: editar um `.md` não muda nada no
site, sem aviso de erro.

**Ação:** escolher uma das duas, não manter as duas:
- **Opção A (mais simples, recomendada agora):** apagar `content/posts/` do
  repositório, arquivando o conteúdo removido em
  `/home/rodrigo-freire/Downloads/content-posts-arquivado/` com um
  `README.md` explicando que a fonte real do blog é `defaultData.js`, e a
  data do arquivamento.
- **Opção B (maior, fora deste mini-spec):** migrar o site para ler os
  posts a partir dos arquivos `.md` (parseando frontmatter), tornando
  `content/posts/` a fonte real. Só vale o investimento se o fluxo de
  escrever posts em arquivo markdown for mais confortável que editar
  `defaultData.js` — decisão de Rodrigo, não técnica.

**Critério de aceitação:** `grep -r "content/posts"` no código-fonte não
retorna nenhum import ativo (Opção A) ou todos os posts exibidos vêm
comprovadamente dos arquivos `.md` (Opção B) — nunca as duas fontes
coexistindo sem uso definido.

## RF-2 (P1) — Imagem de capa por post, saindo do fallback genérico

Hoje 0 de 17 posts têm `cover_image` preenchido — todos usam
`og-default.png`. Compartilhar dois posts diferentes gera o mesmo card
visual nos dois.

**Ação:** gerar (ou pedir para o agente gerar, via prompt de imagem) uma
arte de capa 1200×630px por post, seguindo a paleta do `BRAND-GUIDE.md`
(preto + azul elétrico `#3533cd`), com o título do post em destaque —
mesmo template visual repetido, só o texto/tema mudando, para manter
consistência de marca entre os posts (mesma lógica dos templates de
Instagram já definidos).

Priorizar os posts com intenção comercial primeiro (os que já usam
linguagem sem jargão, ex: "Vendendo bem no Instagram, ainda preciso de
site?"), depois os técnicos de deep tech.

**Critério de aceitação:** cada post em `DEFAULT_POSTS` tem `cover_image`
preenchido com uma imagem própria; testar preview de Open Graph em pelo
menos 3 posts diferentes e confirmar que cada um mostra imagem distinta.

## RF-3 (P2) — Generalizar o schema FAQPage

O `FAQPage` JSON-LD está implementado com `if (post.slug === '...')`
hardcoded em `BlogPost.jsx`, específico para um único post. Não escala:
cada novo post em formato pergunta-resposta exigiria nova edição de código.

**Ação:** mover o conteúdo de FAQ para um campo de dado no próprio post,
ex: adicionar campo opcional `faq: [{ question, answer }, ...]` em cada
entrada de `DEFAULT_POSTS`. `BlogPost.jsx` passa a gerar o schema
`FAQPage` automaticamente sempre que o post tiver esse campo preenchido,
sem checar slug específico nenhum.

**Critério de aceitação:** remover o post de FAQ do `defaultData.js`
temporariamente (teste) faz o schema sumir automaticamente do HTML
gerado, sem precisar tocar em `BlogPost.jsx` — prova de que a lógica é
genérica, não amarrada a um slug.

## Fora de escopo deste mini-spec

- Migração de framework (SSR/SSG completo) — já registrado como fora de
  escopo no SPEC-SITE-004 original.
- Qualquer novo conteúdo de post — este spec cobre estrutura/dado, não
  redação de artigo novo.
