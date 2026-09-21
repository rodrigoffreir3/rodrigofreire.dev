import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { DEFAULT_PROJECTS, DEFAULT_POSTS, DEFAULT_PROFILE } from '../src/data/defaultData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.resolve(ROOT_DIR, 'dist');
const PUBLIC_DIR = path.resolve(ROOT_DIR, 'public');

const SITE_URL = 'https://rodrigofreire.dev.br';
const DEFAULT_IMAGE = `${SITE_URL}/og-default.png`;

// 1. GERAR SITEMAP.XML
function generateSitemap() {
  console.log('📄 Gerando sitemap.xml...');
  const today = new Date().toISOString().split('T')[0];

  const staticPages = [
    { loc: `${SITE_URL}/`, changefreq: 'weekly', priority: '1.0', lastmod: today },
    { loc: `${SITE_URL}/sobre`, changefreq: 'monthly', priority: '0.8', lastmod: today },
    { loc: `${SITE_URL}/contato`, changefreq: 'monthly', priority: '0.8', lastmod: today },
    { loc: `${SITE_URL}/projetos`, changefreq: 'monthly', priority: '0.8', lastmod: today },
    { loc: `${SITE_URL}/blog`, changefreq: 'weekly', priority: '0.9', lastmod: today }
  ];

  const projectPages = DEFAULT_PROJECTS.map(proj => ({
    loc: `${SITE_URL}/projetos/${proj.slug}`,
    changefreq: 'monthly',
    priority: '0.8',
    lastmod: today
  }));

  const blogPages = DEFAULT_POSTS.map(post => ({
    loc: `${SITE_URL}/blog/${post.slug}`,
    changefreq: 'weekly',
    priority: '0.8',
    lastmod: today
  }));

  const allUrls = [...staticPages, ...projectPages, ...blogPages];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), xml, 'utf8');
  if (fs.existsSync(DIST_DIR)) {
    fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), xml, 'utf8');
  }
  console.log(`✅ sitemap.xml gerado com sucesso contendo ${allUrls.length} rotas!`);
}

function escapeAttr(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function formatInline(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

// CONVERSOR SIMPLES DE MARKDOWN PARA HTML SEMÂNTICO (SEO)
function markdownToSimpleHtml(markdown) {
  if (!markdown) return '';
  
  let text = markdown;

  // Imagens
  text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<p><img src="$2" alt="$1" style="max-width:100%;height:auto;border-radius:8px;margin:1rem 0;" /></p>');

  // Blocos de código
  text = text.replace(/```[a-zA-Z0-9_-]*\n([\s\S]*?)```/g, (match, code) => {
    return `<pre style="background:#1e1e1e;color:#f0f0f0;padding:1rem;border-radius:6px;overflow-x:auto;"><code>${escapeHtml(code.trim())}</code></pre>`;
  });

  const lines = text.split('\n');
  const htmlParts = [];
  let inList = false;
  let inOrderedList = false;
  let inBlockquote = false;
  let blockquoteBuffer = [];

  function flushBlockquote() {
    if (inBlockquote) {
      htmlParts.push(`<blockquote style="border-left:4px solid #3533cd;padding-left:1rem;color:#555;margin:1rem 0;"><p>${blockquoteBuffer.join(' ')}</p></blockquote>`);
      blockquoteBuffer = [];
      inBlockquote = false;
    }
  }

  function flushList() {
    if (inList) {
      htmlParts.push('</ul>');
      inList = false;
    }
    if (inOrderedList) {
      htmlParts.push('</ol>');
      inOrderedList = false;
    }
  }

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();

    if (!line) {
      flushBlockquote();
      flushList();
      continue;
    }

    // Pular divisores de tabela Markdown (|---|---|)
    if (/^\|[\s\-:|]+\|$/.test(line)) {
      continue;
    }

    // Linhas de tabela simples
    if (line.startsWith('|') && line.endsWith('|')) {
      flushBlockquote();
      flushList();
      const cells = line.slice(1, -1).split('|').map(c => c.trim());
      const isHeader = i + 1 < lines.length && /^\|[\s\-:|]+\|$/.test(lines[i + 1].trim());
      const tag = isHeader ? 'th' : 'td';
      const rowHtml = `<tr>${cells.map(c => `<${tag} style="border:1px solid #ddd;padding:8px 12px;text-align:left;">${formatInline(c)}</${tag}>`).join('')}</tr>`;
      htmlParts.push(rowHtml);
      continue;
    }

    // Citações (Blockquotes)
    if (line.startsWith('>')) {
      flushList();
      inBlockquote = true;
      blockquoteBuffer.push(formatInline(line.replace(/^>\s*/, '')));
      continue;
    } else {
      flushBlockquote();
    }

    // Títulos
    if (line.startsWith('#### ')) {
      flushList();
      htmlParts.push(`<h4 style="margin-top:1.5rem;margin-bottom:0.5rem;color:#111;">${formatInline(line.slice(5))}</h4>`);
      continue;
    }
    if (line.startsWith('### ')) {
      flushList();
      htmlParts.push(`<h3 style="margin-top:1.75rem;margin-bottom:0.5rem;color:#111;">${formatInline(line.slice(4))}</h3>`);
      continue;
    }
    if (line.startsWith('## ')) {
      flushList();
      htmlParts.push(`<h2 style="margin-top:2rem;margin-bottom:0.75rem;color:#000;">${formatInline(line.slice(3))}</h2>`);
      continue;
    }
    if (line.startsWith('# ')) {
      flushList();
      htmlParts.push(`<h1 style="margin-top:1rem;margin-bottom:1rem;color:#000;">${formatInline(line.slice(2))}</h1>`);
      continue;
    }

    // Listas não ordenadas
    if (line.startsWith('- ') || line.startsWith('* ')) {
      if (inOrderedList) {
        htmlParts.push('</ol>');
        inOrderedList = false;
      }
      if (!inList) {
        htmlParts.push('<ul style="margin:1rem 0;padding-left:1.5rem;">');
        inList = true;
      }
      htmlParts.push(`<li style="margin-bottom:0.35rem;">${formatInline(line.slice(2))}</li>`);
      continue;
    }

    // Listas numeradas
    const olMatch = line.match(/^(\d+)\.\s+(.*)/);
    if (olMatch) {
      if (inList) {
        htmlParts.push('</ul>');
        inList = false;
      }
      if (!inOrderedList) {
        htmlParts.push('<ol style="margin:1rem 0;padding-left:1.5rem;">');
        inOrderedList = true;
      }
      htmlParts.push(`<li style="margin-bottom:0.35rem;">${formatInline(olMatch[2])}</li>`);
      continue;
    }

    flushList();

    // HTML já montado (pre ou tabela)
    if (line.startsWith('<pre>') || line.startsWith('</pre>') || line.startsWith('<tr>') || line.startsWith('<p><img')) {
      htmlParts.push(line);
      continue;
    }

    if (line === '---' || line === '***') {
      htmlParts.push('<hr style="margin:2rem 0;border:0;border-top:1px solid #eee;" />');
      continue;
    }

    // Parágrafo comum
    htmlParts.push(`<p style="margin-bottom:1.15rem;line-height:1.75;">${formatInline(line)}</p>`);
  }

  flushBlockquote();
  flushList();

  return htmlParts.join('\n');
}

// WRAPPER SEMÂNTICO COM CABEÇALHO, NAVEGAÇÃO E RODAPÉ PARA CRAWLERS
function wrapPrerenderedContent(contentHtml) {
  return `
    <div class="prerendered-wrapper" style="min-height:100vh;background:#FCFCFB;color:#2C3437;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,sans-serif;">
      <header class="prerender-header" style="max-width:1040px;margin:0 auto;padding:1.5rem 1.25rem;border-bottom:1px solid rgba(0,0,0,0.08);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;">
        <a href="/" style="font-weight:700;font-size:1.15rem;color:#000000;text-decoration:none;letter-spacing:-0.02em;">Rodrigo Freire Tech</a>
        <nav aria-label="Navegação Principal" style="display:flex;gap:1.5rem;align-items:center;font-size:0.95rem;">
          <a href="/" style="color:#2C3437;text-decoration:none;">Início</a>
          <a href="/sobre" style="color:#2C3437;text-decoration:none;">Sobre</a>
          <a href="/projetos" style="color:#2C3437;text-decoration:none;">Projetos</a>
          <a href="/blog" style="color:#2C3437;text-decoration:none;">Blog</a>
          <a href="/contato" style="color:#3533cd;text-decoration:none;font-weight:600;">Contato</a>
        </nav>
      </header>
      <div class="prerendered-content" style="max-width:880px;margin:0 auto;padding:2.5rem 1.25rem;line-height:1.75;">
        ${contentHtml}
      </div>
      <footer class="prerender-footer" style="max-width:1040px;margin:3.5rem auto 0;padding:2.5rem 1.25rem;border-top:1px solid rgba(0,0,0,0.08);text-align:center;font-size:0.875rem;color:#666;">
        <p style="margin:0 0 0.5rem;font-weight:500;color:#333;">Rodrigo Freire Tech · Porto Velho, RO · Sistemas sob medida, estabilidade e automação</p>
        <p style="margin:0 0 1rem;">Atendimento direto com o responsável técnico pelo WhatsApp: +55 (69) 99278-2919</p>
        <p style="margin:0;"><a href="/" style="color:#3533cd;text-decoration:none;">Início</a> · <a href="/sobre" style="color:#3533cd;text-decoration:none;">Sobre</a> · <a href="/projetos" style="color:#3533cd;text-decoration:none;">Projetos</a> · <a href="/blog" style="color:#3533cd;text-decoration:none;">Blog</a> · <a href="/contato" style="color:#3533cd;text-decoration:none;">Contato</a></p>
      </footer>
    </div>
  `;
}

// 2. HELPER PARA INJETAR METATAGS ESTÁTICAS E CORPO NO HTML (CA-2 / CA-3)
function injectMetaTags(htmlTemplate, {
  title,
  description,
  canonicalUrl,
  ogType = 'website',
  imageUrl = DEFAULT_IMAGE,
  publishedTime,
  author = 'Rodrigo Freire',
  jsonLdList = [],
  bodyHtml = ''
}) {
  let html = htmlTemplate;
  const safeTitle = escapeHtml(title);
  const safeTitleAttr = escapeAttr(title);
  const safeDescAttr = escapeAttr(description);

  // Substituir Title
  html = html.replace(/<title>.*?<\/title>/s, `<title>${safeTitle}</title>`);

  // Substituir Meta Title
  html = html.replace(/<meta\s+name=["']title["'].*?>/s, `<meta name="title" content="${safeTitleAttr}" />`);

  // Substituir Meta Description
  html = html.replace(/<meta\s+name=["']description["'].*?>/s, `<meta name="description" content="${safeDescAttr}" />`);

  // Substituir Canonical
  html = html.replace(/<link\s+rel=["']canonical["'].*?>/s, `<link rel="canonical" href="${canonicalUrl}" />`);

  // Substituir Open Graph
  html = html.replace(/<meta\s+property=["']og:title["'].*?>/s, `<meta property="og:title" content="${safeTitleAttr}" />`);
  html = html.replace(/<meta\s+property=["']og:description["'].*?>/s, `<meta property="og:description" content="${safeDescAttr}" />`);
  html = html.replace(/<meta\s+property=["']og:url["'].*?>/s, `<meta property="og:url" content="${canonicalUrl}" />`);
  html = html.replace(/<meta\s+property=["']og:type["'].*?>/s, `<meta property="og:type" content="${ogType}" />`);
  html = html.replace(/<meta\s+property=["']og:image["'].*?>/s, `<meta property="og:image" content="${imageUrl}" />`);

  // Artigos
  if (ogType === 'article') {
    if (publishedTime && !html.includes('article:published_time')) {
      html = html.replace('</head>', `    <meta property="article:published_time" content="${publishedTime}" />\n  </head>`);
    }
    if (author && !html.includes('article:author')) {
      html = html.replace('</head>', `    <meta property="article:author" content="${author}" />\n  </head>`);
    }
  }

  // Substituir Twitter Cards
  html = html.replace(/<meta\s+name=["']twitter:title["'].*?>/s, `<meta name="twitter:title" content="${safeTitleAttr}" />`);
  html = html.replace(/<meta\s+name=["']twitter:description["'].*?>/s, `<meta name="twitter:description" content="${safeDescAttr}" />`);
  html = html.replace(/<meta\s+name=["']twitter:image["'].*?>/s, `<meta name="twitter:image" content="${imageUrl}" />`);
  html = html.replace(/<meta\s+name=["']twitter:url["'].*?>/s, `<meta name="twitter:url" content="${canonicalUrl}" />`);

  // Injetar JSON-LD
  if (jsonLdList && jsonLdList.length > 0) {
    const scripts = jsonLdList.map(ld => `    <script type="application/ld+json">\n${JSON.stringify(ld, null, 2)}\n    </script>`).join('\n');
    html = html.replace('</head>', `${scripts}\n  </head>`);
  }

  // Injetar Corpo Semântico Prerenderizado no <div id="root"></div>
  if (bodyHtml) {
    const wrapped = wrapPrerenderedContent(bodyHtml);
    html = html.replace(/<div\s+id=["']root["']>\s*<\/div>/, `<div id="root">\n${wrapped}\n</div>`);
  }

  return html;
}

// 3. PRERENDER DE ROTAS ESTÁTICAS PARA CRAWLERS
function prerenderRoutes() {
  console.log('🚀 Pré-renderizando metatags e corpo semântico para crawlers (Googlebot/WhatsApp)...');

  const baseHtmlPath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(baseHtmlPath)) {
    console.warn('⚠️ dist/index.html não encontrado. Rode vite build primeiro.');
    return;
  }

  const baseHtml = fs.readFileSync(baseHtmlPath, 'utf8');

  // HOME SCHEMAS
  const homeWebsiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'Rodrigo Freire Tech',
    'alternateName': ['rodrigofreire.dev.br', 'Rodrigo Freire'],
    'url': `${SITE_URL}/`
  };

  const homeLocalBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'Rodrigo Freire Tech',
    'image': DEFAULT_IMAGE,
    'logo': `${SITE_URL}/icon-512.png`,
    'url': SITE_URL,
    'telephone': '+5569992782919',
    'priceRange': '$$',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Porto Velho',
      'addressRegion': 'RO',
      'addressCountry': 'BR'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': -8.7619,
      'longitude': -63.9039
    },
    'description': 'Desenvolvimento de sistemas sob medida, automação de processos e infraestrutura de tecnologia para empresas em Porto Velho, RO.'
  };

  const homeBodyHtml = `
    <main>
      <section class="hero-summary" style="margin-bottom:3rem;">
        <p style="font-size:0.875rem;font-weight:700;color:#3533cd;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.75rem;">Rodrigo Freire Tech · Porto Velho, RO</p>
        <h1 style="font-size:2.4rem;color:#000;margin:0 0 1.25rem;line-height:1.2;letter-spacing:-0.02em;">Sistemas sob medida para a sua empresa vender mais.</h1>
        <p style="font-size:1.15rem;color:#444;line-height:1.65;margin-bottom:1.75rem;">Desenvolvo e mantenho a tecnologia que a sua operação usa todos os dias: sistemas próprios, automação das rotinas manuais da equipe e estabilidade de caixa e rede. Cada projeto começa com escopo e preço fechados por escrito. Quem executa o trabalho é quem atende você depois.</p>
        <p><a href="/contato" style="background:#3533cd;color:#fff;padding:0.85rem 1.6rem;border-radius:6px;text-decoration:none;font-weight:600;display:inline-block;">Solicitar avaliação da sua operação &rarr;</a></p>
      </section>

      <section class="featured-articles" style="margin-top:3.5rem;">
        <div style="border-bottom:2px solid #eee;padding-bottom:0.75rem;margin-bottom:1.5rem;">
          <h2 style="font-size:1.6rem;color:#000;margin:0 0 0.4rem;">Análises Técnicas e Artigos</h2>
          <p style="font-size:0.95rem;color:#666;margin:0;">Pesquisa aplicada, arquitetura de sistemas e tecnologia para empresas em Porto Velho.</p>
        </div>
        <div style="display:flex;flex-direction:column;gap:1.5rem;">
          ${DEFAULT_POSTS.map(p => `
            <article style="padding-bottom:1.5rem;border-bottom:1px solid #f0f0f0;">
              <h3 style="font-size:1.25rem;margin:0 0 0.4rem;"><a href="/blog/${p.slug}" style="color:#000;text-decoration:none;">${escapeHtml(p.title)}</a></h3>
              <p style="font-size:0.85rem;color:#888;margin:0 0 0.5rem;"><time datetime="${p.published_at}">${p.published_at}</time> · Autor: Rodrigo Freire</p>
              <p style="font-size:0.98rem;color:#444;line-height:1.6;margin:0 0 0.6rem;">${escapeHtml(p.description)}</p>
              <a href="/blog/${p.slug}" style="color:#3533cd;font-weight:600;font-size:0.92rem;text-decoration:none;">Ler artigo completo &rarr;</a>
            </article>
          `).join('')}
        </div>
      </section>

      <section class="featured-projects" style="margin-top:3.5rem;">
        <div style="border-bottom:2px solid #eee;padding-bottom:0.75rem;margin-bottom:1.5rem;">
          <h2 style="font-size:1.6rem;color:#000;margin:0 0 0.4rem;">Projetos de Engenharia & Sistemas</h2>
          <p style="font-size:0.95rem;color:#666;margin:0;">Tecnologia própria, pesquisa aplicada e produtos em operação real.</p>
        </div>
        <div style="display:flex;flex-direction:column;gap:1.5rem;">
          ${DEFAULT_PROJECTS.map(proj => `
            <article style="padding-bottom:1.5rem;border-bottom:1px solid #f0f0f0;">
              <h3 style="font-size:1.25rem;margin:0 0 0.4rem;"><a href="/projetos/${proj.slug}" style="color:#000;text-decoration:none;">${escapeHtml(proj.title)}</a></h3>
              ${proj.badge ? `<p style="font-size:0.85rem;color:#3533cd;font-weight:600;margin:0 0 0.5rem;">${escapeHtml(proj.badge)}</p>` : ''}
              <p style="font-size:0.98rem;color:#444;line-height:1.6;margin:0 0 0.6rem;">${escapeHtml(proj.summary)}</p>
              <a href="/projetos/${proj.slug}" style="color:#3533cd;font-weight:600;font-size:0.92rem;text-decoration:none;">Ver documentação técnica &rarr;</a>
            </article>
          `).join('')}
        </div>
      </section>
    </main>
  `;

  const homeHtml = injectMetaTags(baseHtml, {
    title: 'Rodrigo Freire Tech · Sistemas sob medida para empresas — Porto Velho',
    description: 'Desenvolvimento de sistemas, sites e lojas online sob medida, automação de rotinas manuais e estabilidade de caixa e rede para empresas de Porto Velho. Escopo e preço fechados por escrito.',
    canonicalUrl: `${SITE_URL}/`,
    jsonLdList: [homeWebsiteJsonLd, homeLocalBusinessJsonLd],
    bodyHtml: homeBodyHtml
  });
  fs.writeFileSync(baseHtmlPath, homeHtml, 'utf8');

  // ROTAS ESTÁTICAS
  const pages = [
    {
      dir: 'sobre',
      title: 'Sobre Rodrigo Freire · Fundador da Rodrigo Freire Tech',
      description: 'Construo e mantenho os sistemas que empresas de Porto Velho usam para trabalhar todos os dias. Sistema sob medida, automação de rotina manual e a infraestrutura que sustenta os dois, com um único responsável técnico pelo conjunto.',
      canonicalUrl: `${SITE_URL}/sobre`,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Person',
        'name': 'Rodrigo Freire',
        'jobTitle': 'Fundador e responsável técnico',
        'description': 'Fundador e responsável técnico da Rodrigo Freire Tech em Porto Velho, RO. Formação em Direito e Análise de Sistemas, registro INPI e foco em estabilidade, automação e proteção de dados.',
        'url': `${SITE_URL}/sobre`,
        'image': `${SITE_URL}/foto_perfil.jpeg`,
        'address': {
          '@type': 'PostalAddress',
          '@addressLocality': 'Porto Velho',
          '@addressRegion': 'RO',
          '@addressCountry': 'BR'
        }
      },
      bodyHtml: `
        <main>
          <div style="margin-bottom:2rem;">
            <p style="font-size:0.85rem;color:#888;margin-bottom:0.5rem;"><a href="/" style="color:#666;text-decoration:none;">Início</a> &gt; <span>Sobre</span></p>
            <h1 style="font-size:2.2rem;color:#000;margin:0 0 1rem;line-height:1.25;">Sobre Rodrigo Freire · Fundador da Rodrigo Freire Tech</h1>
            <p style="font-size:1.15rem;color:#333;font-weight:600;line-height:1.6;margin-bottom:1.5rem;padding:1rem;background:#f8f9fa;border-left:4px solid #3533cd;">Construo e mantenho os sistemas que empresas de Porto Velho usam para trabalhar todos os dias. Sistema sob medida, automação de rotina manual e a infraestrutura que sustenta os dois, com um único responsável técnico pelo conjunto.</p>
          </div>
          <div class="about-text" style="line-height:1.8;">
            ${markdownToSimpleHtml(DEFAULT_PROFILE.about_text)}
          </div>
          <div style="margin-top:2.5rem;padding:1.5rem;background:#f9f9f9;border-radius:8px;border:1px solid #eee;">
            <h2 style="font-size:1.3rem;margin-top:0;color:#000;">Registro de Propriedade Intelectual & Formação</h2>
            <p><strong>Registro INPI de Programa de Computador:</strong> Nº 512025006506-0.</p>
            <p><strong>Formação:</strong> Graduado em Direito e cursando Análise e Desenvolvimento de Sistemas.</p>
            <p style="margin-bottom:0;"><a href="/contato" style="color:#3533cd;font-weight:600;text-decoration:none;">Fale diretamente comigo para avaliar a tecnologia da sua empresa &rarr;</a></p>
          </div>
        </main>
      `
    },
    {
      dir: 'contato',
      title: 'Contato direto · Rodrigo Freire Tech — Porto Velho',
      description: 'Fale diretamente com Rodrigo Freire via WhatsApp ou e-mail. Atendimento comigo, sem fila de chamado, em Porto Velho, RO.',
      canonicalUrl: `${SITE_URL}/contato`,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        'name': 'Contato direto · Rodrigo Freire Tech — Porto Velho',
        'url': `${SITE_URL}/contato`
      },
      bodyHtml: `
        <main>
          <div style="margin-bottom:2rem;">
            <p style="font-size:0.85rem;color:#888;margin-bottom:0.5rem;"><a href="/" style="color:#666;text-decoration:none;">Início</a> &gt; <span>Contato</span></p>
            <h1 style="font-size:2.2rem;color:#000;margin:0 0 1rem;line-height:1.25;">Contato direto · Rodrigo Freire Tech — Porto Velho</h1>
            <p style="font-size:1.15rem;color:#333;line-height:1.6;">Fale diretamente com Rodrigo Freire via WhatsApp ou e-mail. Atendimento comigo, sem fila de chamado, em Porto Velho, RO.</p>
          </div>
          <div style="display:flex;flex-direction:column;gap:1.25rem;margin-top:1.5rem;">
            <div style="padding:1.5rem;border:1px solid #e0e0e0;border-radius:8px;background:#fff;">
              <h2 style="margin:0 0 0.5rem;font-size:1.2rem;color:#000;">WhatsApp Direto</h2>
              <p style="margin:0 0 0.75rem;color:#555;">Atendimento ágil para empresas em Porto Velho e região:</p>
              <a href="https://wa.me/5569992782919" target="_blank" rel="noopener noreferrer" style="color:#3533cd;font-weight:700;font-size:1.15rem;text-decoration:none;">+55 (69) 99278-2919</a>
            </div>
            <div style="padding:1.5rem;border:1px solid #e0e0e0;border-radius:8px;background:#fff;">
              <h2 style="margin:0 0 0.5rem;font-size:1.2rem;color:#000;">E-mail Corporativo</h2>
              <p style="margin:0 0 0.75rem;color:#555;">Para envio de propostas, RFPs e documentações técnicas:</p>
              <a href="mailto:contato@rodrigofreire.dev" style="color:#3533cd;font-weight:700;font-size:1.15rem;text-decoration:none;">contato@rodrigofreire.dev</a>
            </div>
          </div>
        </main>
      `
    },
    {
      dir: 'projetos',
      title: 'Projetos e sistemas desenvolvidos · Rodrigo Freire Tech',
      description: 'Conheça os projetos e sistemas desenvolvidos por Rodrigo Freire: tecnologia própria, pesquisa aplicada e produto em operação real.',
      canonicalUrl: `${SITE_URL}/projetos`,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Início', 'item': `${SITE_URL}/` },
          { '@type': 'ListItem', 'position': 2, 'name': 'Projetos', 'item': `${SITE_URL}/projetos` }
        ]
      },
      bodyHtml: `
        <main>
          <div style="margin-bottom:2rem;">
            <p style="font-size:0.85rem;color:#888;margin-bottom:0.5rem;"><a href="/" style="color:#666;text-decoration:none;">Início</a> &gt; <span>Projetos</span></p>
            <h1 style="font-size:2.2rem;color:#000;margin:0 0 0.75rem;line-height:1.25;">Projetos e Sistemas Desenvolvidos · Rodrigo Freire Tech</h1>
            <p style="font-size:1.1rem;color:#555;">Conheça os projetos e sistemas desenvolvidos por Rodrigo Freire: tecnologia própria, pesquisa aplicada e produto em operação real.</p>
          </div>
          <div class="projects-list" style="display:flex;flex-direction:column;gap:2rem;">
            ${DEFAULT_PROJECTS.map(p => `
              <article style="padding-bottom:1.75rem;border-bottom:1px solid #eee;">
                <h2 style="font-size:1.4rem;margin:0 0 0.4rem;"><a href="/projetos/${p.slug}" style="color:#000;text-decoration:none;">${escapeHtml(p.title)}</a></h2>
                ${p.badge ? `<p style="font-size:0.85rem;color:#3533cd;font-weight:600;margin:0 0 0.5rem;">${escapeHtml(p.badge)}</p>` : ''}
                <p style="font-size:1rem;color:#444;line-height:1.6;margin:0 0 0.75rem;">${escapeHtml(p.summary)}</p>
                <a href="/projetos/${p.slug}" style="color:#3533cd;font-weight:600;text-decoration:none;">Ver documentação técnica &rarr;</a>
              </article>
            `).join('\n')}
          </div>
        </main>
      `
    },
    {
      dir: 'blog',
      title: 'Artigos · Rodrigo Freire Tech',
      description: 'Notas sobre engenharia, tecnologia aplicada a negócio e o que observo no mercado.',
      canonicalUrl: `${SITE_URL}/blog`,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Início', 'item': `${SITE_URL}/` },
          { '@type': 'ListItem', 'position': 2, 'name': 'Artigos', 'item': `${SITE_URL}/blog` }
        ]
      },
      bodyHtml: `
        <main>
          <div style="margin-bottom:2rem;">
            <p style="font-size:0.85rem;color:#888;margin-bottom:0.5rem;"><a href="/" style="color:#666;text-decoration:none;">Início</a> &gt; <span>Blog</span></p>
            <h1 style="font-size:2.2rem;color:#000;margin:0 0 0.75rem;line-height:1.25;">Artigos sobre Engenharia e Tecnologia</h1>
            <p style="font-size:1.1rem;color:#555;">Notas sobre engenharia de software, estabilidade operacional, IA aplicada e o que observo no mercado comercial.</p>
          </div>
          <div class="posts-list" style="display:flex;flex-direction:column;gap:2rem;">
            ${DEFAULT_POSTS.map(p => `
              <article style="padding-bottom:1.75rem;border-bottom:1px solid #eee;">
                <h2 style="font-size:1.4rem;margin:0 0 0.4rem;"><a href="/blog/${p.slug}" style="color:#000;text-decoration:none;">${escapeHtml(p.title)}</a></h2>
                <p style="font-size:0.85rem;color:#888;margin:0 0 0.5rem;"><time datetime="${p.published_at}">${p.published_at}</time> · Autor: Rodrigo Freire</p>
                <p style="font-size:1rem;color:#444;line-height:1.6;margin:0 0 0.75rem;">${escapeHtml(p.description)}</p>
                <a href="/blog/${p.slug}" style="color:#3533cd;font-weight:600;text-decoration:none;">Ler artigo completo &rarr;</a>
              </article>
            `).join('\n')}
          </div>
        </main>
      `
    }
  ];

  for (const page of pages) {
    const pageDir = path.join(DIST_DIR, page.dir);
    if (!fs.existsSync(pageDir)) fs.mkdirSync(pageDir, { recursive: true });
    const rendered = injectMetaTags(baseHtml, {
      title: page.title,
      description: page.description,
      canonicalUrl: page.canonicalUrl,
      jsonLdList: page.jsonLd ? [page.jsonLd] : [],
      bodyHtml: page.bodyHtml
    });
    fs.writeFileSync(path.join(pageDir, 'index.html'), rendered, 'utf8');
    fs.writeFileSync(path.join(DIST_DIR, `${page.dir}.html`), rendered, 'utf8');
  }

  // PROJETOS DINÂMICOS
  for (const proj of DEFAULT_PROJECTS) {
    const projDir = path.join(DIST_DIR, 'projetos', proj.slug);
    if (!fs.existsSync(projDir)) fs.mkdirSync(projDir, { recursive: true });

    const projCover = proj.cover_image && !proj.cover_image.includes('placeholder')
      ? (proj.cover_image.startsWith('http') ? proj.cover_image : `${SITE_URL}${proj.cover_image}`)
      : DEFAULT_IMAGE;

    const otherProjects = DEFAULT_PROJECTS
      .filter(p => p.slug !== proj.slug)
      .slice(0, 3);

    const projBodyHtml = `
      <main>
        <header style="margin-bottom:2.5rem;">
          <p style="font-size:0.85rem;color:#888;margin-bottom:0.5rem;">
            <a href="/" style="color:#666;text-decoration:none;">Início</a> &gt; 
            <a href="/projetos" style="color:#666;text-decoration:none;">Projetos</a> &gt; 
            <span>${escapeHtml(proj.title)}</span>
          </p>
          <h1 style="font-size:2.3rem;color:#000;margin:0 0 0.75rem;line-height:1.25;">${escapeHtml(proj.title)}</h1>
          ${proj.badge ? `<p style="font-size:0.95rem;color:#3533cd;font-weight:600;margin:0 0 1rem;">${escapeHtml(proj.badge)}</p>` : ''}
          <div style="font-size:1.15rem;color:#2C3437;line-height:1.65;font-weight:500;padding:1.25rem;background:#f8f9fa;border-left:4px solid #3533cd;border-radius:4px;margin-bottom:1.25rem;">
            ${escapeHtml(proj.summary)}
          </div>
          ${proj.tags && proj.tags.length > 0 ? `
            <p style="font-size:0.875rem;color:#555;margin:0;">
              <strong>Tecnologias:</strong> ${proj.tags.map(t => escapeHtml(t)).join(', ')}
            </p>
          ` : ''}
        </header>

        <section class="problem-description" style="margin-top:2.5rem;">
          <h2 style="font-size:1.45rem;color:#000;margin-bottom:1rem;border-bottom:1px solid #eee;padding-bottom:0.5rem;">O Problema Operacional & Desafio</h2>
          <div style="font-size:1.05rem;line-height:1.8;">
            ${markdownToSimpleHtml(proj.problem_description)}
          </div>
        </section>

        <section class="technical-details" style="margin-top:2.5rem;">
          <h2 style="font-size:1.45rem;color:#000;margin-bottom:1rem;border-bottom:1px solid #eee;padding-bottom:0.5rem;">Arquitetura & Engenharia Técnica</h2>
          <div style="font-size:1.05rem;line-height:1.8;">
            ${markdownToSimpleHtml(proj.technical_details)}
          </div>
        </section>

        <section class="other-projects" style="margin-top:3.5rem;padding-top:2rem;border-top:1px solid #eee;">
          <h2 style="font-size:1.4rem;color:#000;margin-bottom:1.25rem;">Outros Projetos Desenvolvidos</h2>
          <ul style="list-style:none;padding:0;">
            ${otherProjects.map(op => `
              <li style="margin-bottom:1.25rem;">
                <h3 style="font-size:1.15rem;margin:0 0 0.3rem;"><a href="/projetos/${op.slug}" style="color:#000;text-decoration:none;">${escapeHtml(op.title)}</a></h3>
                <p style="font-size:0.92rem;color:#555;margin:0 0 0.4rem;">${escapeHtml(op.summary)}</p>
                <a href="/projetos/${op.slug}" style="color:#3533cd;font-weight:600;font-size:0.875rem;text-decoration:none;">Ver documentação técnica &rarr;</a>
              </li>
            `).join('')}
          </ul>
        </section>

        <section class="project-contact" style="margin-top:3rem;padding:1.5rem;background:#f9f9f9;border-radius:8px;border:1px solid #eee;">
          <h3 style="margin-top:0;font-size:1.2rem;color:#000;">Sistemas e Engenharia para a sua Empresa</h3>
          <p style="font-size:0.95rem;color:#444;line-height:1.6;">Desenvolvo sistemas sob medida com garantia de estabilidade, segurança e suporte técnico direto para empresas em Porto Velho, RO.</p>
          <p style="margin-bottom:0;"><a href="/contato" style="color:#3533cd;font-weight:600;text-decoration:none;">Solicitar avaliação da operação da sua empresa &rarr;</a></p>
        </section>
      </main>
    `;

    const rendered = injectMetaTags(baseHtml, {
      title: `${proj.title} · Rodrigo Freire Tech`,
      description: proj.summary,
      canonicalUrl: `${SITE_URL}/projetos/${proj.slug}`,
      imageUrl: projCover,
      jsonLdList: [
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Início', 'item': `${SITE_URL}/` },
            { '@type': 'ListItem', 'position': 2, 'name': 'Projetos', 'item': `${SITE_URL}/projetos` },
            { '@type': 'ListItem', 'position': 3, 'name': proj.title, 'item': `${SITE_URL}/projetos/${proj.slug}` }
          ]
        },
        {
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          'name': proj.title,
          'description': proj.summary,
          'applicationCategory': 'BusinessApplication',
          'operatingSystem': 'Windows, Linux, Web',
          'author': {
            '@type': 'Person',
            'name': 'Rodrigo Freire'
          }
        }
      ],
      bodyHtml: projBodyHtml
    });
    fs.writeFileSync(path.join(projDir, 'index.html'), rendered, 'utf8');
    fs.writeFileSync(path.join(DIST_DIR, 'projetos', `${proj.slug}.html`), rendered, 'utf8');
  }

  // BLOG POSTS (RF-2, RF-3, CA-2, CA-3)
  for (const post of DEFAULT_POSTS) {
    const postDir = path.join(DIST_DIR, 'blog', post.slug);
    if (!fs.existsSync(postDir)) fs.mkdirSync(postDir, { recursive: true });

    const postCover = post.cover_image && !post.cover_image.includes('placeholder')
      ? (post.cover_image.startsWith('http') ? post.cover_image : `${SITE_URL}${post.cover_image}`)
      : DEFAULT_IMAGE;

    const relatedPosts = DEFAULT_POSTS
      .filter(p => p.slug !== post.slug)
      .slice(0, 3);

    const postBodyHtml = `
      <article>
        <header style="margin-bottom:2.5rem;">
          <p style="font-size:0.85rem;color:#888;margin-bottom:0.5rem;">
            <a href="/" style="color:#666;text-decoration:none;">Início</a> &gt; 
            <a href="/blog" style="color:#666;text-decoration:none;">Blog</a> &gt; 
            <span>${escapeHtml(post.title)}</span>
          </p>
          <h1 style="font-size:2.3rem;color:#000;margin:0 0 1rem;line-height:1.25;">${escapeHtml(post.title)}</h1>
          <p style="font-size:0.9rem;color:#666;margin-bottom:1.25rem;">
            <time datetime="${post.published_at}">${post.published_at}</time> · 
            <span>Autor: Rodrigo Freire</span>
            ${post.tags && post.tags.length > 0 ? ` · Tags: ${post.tags.map(t => escapeHtml(t)).join(', ')}` : ''}
          </p>
          <div style="font-size:1.15rem;color:#2C3437;line-height:1.65;font-weight:500;padding:1.25rem;background:#f8f9fa;border-left:4px solid #3533cd;border-radius:4px;">
            ${escapeHtml(post.description)}
          </div>
        </header>

        <div class="article-body" style="font-size:1.08rem;line-height:1.8;">
          ${markdownToSimpleHtml(post.content_markdown)}
        </div>

        ${post.faq && Array.isArray(post.faq) && post.faq.length > 0 ? `
        <section class="article-faq" style="margin-top:3rem;padding-top:2rem;border-top:1px solid #eee;">
          <h2 style="font-size:1.45rem;color:#000;margin-bottom:1.5rem;">Perguntas Frequentes (FAQ)</h2>
          ${post.faq.map(item => `
            <div style="margin-bottom:1.5rem;">
              <h3 style="font-size:1.15rem;color:#111;margin:0 0 0.4rem;">${escapeHtml(item.question)}</h3>
              <p style="color:#444;margin:0;line-height:1.6;">${escapeHtml(item.answer)}</p>
            </div>
          `).join('')}
        </section>
        ` : ''}

        <section class="related-posts" style="margin-top:3.5rem;padding-top:2rem;border-top:1px solid #eee;">
          <h2 style="font-size:1.4rem;color:#000;margin-bottom:1.25rem;">Artigos Relacionados</h2>
          <ul style="list-style:none;padding:0;">
            ${relatedPosts.map(rp => `
              <li style="margin-bottom:1.25rem;">
                <h3 style="font-size:1.15rem;margin:0 0 0.3rem;"><a href="/blog/${rp.slug}" style="color:#000;text-decoration:none;">${escapeHtml(rp.title)}</a></h3>
                <p style="font-size:0.92rem;color:#555;margin:0 0 0.4rem;">${escapeHtml(rp.description)}</p>
                <a href="/blog/${rp.slug}" style="color:#3533cd;font-weight:600;font-size:0.875rem;text-decoration:none;">Ler artigo completo &rarr;</a>
              </li>
            `).join('')}
          </ul>
        </section>

        <section class="author-box" style="margin-top:3rem;padding:1.5rem;background:#f9f9f9;border-radius:8px;border:1px solid #eee;">
          <h3 style="margin-top:0;font-size:1.2rem;color:#000;">Sobre o Autor</h3>
          <p style="font-size:0.95rem;color:#444;line-height:1.6;"><strong>Rodrigo Freire</strong> é fundador da Rodrigo Freire Tech em Porto Velho, RO. Formado em Direito, graduando em Análise e Desenvolvimento de Sistemas e titular do Registro INPI de Programa de Computador Nº 512025006506-0. Atua diretamente na engenharia de sistemas, automação e infraestrutura para empresas locais.</p>
          <p style="margin-bottom:0;"><a href="/contato" style="color:#3533cd;font-weight:600;text-decoration:none;">Precisa de sistemas e tecnologia confiável para a sua empresa? Fale diretamente comigo &rarr;</a></p>
        </section>
      </article>
    `;

    const postSchemas = [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        'headline': post.title,
        'description': post.description,
        'image': postCover,
        'datePublished': post.published_at,
        'dateModified': post.updated_at || post.published_at,
        'author': {
          '@type': 'Person',
          'name': 'Rodrigo Freire',
          'url': `${SITE_URL}/sobre`
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'Rodrigo Freire Tech',
          'logo': {
            '@type': 'ImageObject',
            'url': DEFAULT_IMAGE
          }
        },
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': `${SITE_URL}/blog/${post.slug}`
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Início', 'item': `${SITE_URL}/` },
          { '@type': 'ListItem', 'position': 2, 'name': 'Artigos', 'item': `${SITE_URL}/blog` },
          { '@type': 'ListItem', 'position': 3, 'name': post.title, 'item': `${SITE_URL}/blog/${post.slug}` }
        ]
      }
    ];

    if (post.faq && Array.isArray(post.faq) && post.faq.length > 0) {
      postSchemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': post.faq.map(item => ({
          '@type': 'Question',
          'name': item.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': item.answer
          }
        }))
      });
    }

    const rendered = injectMetaTags(baseHtml, {
      title: `${post.title} · Rodrigo Freire Tech`,
      description: post.description,
      canonicalUrl: `${SITE_URL}/blog/${post.slug}`,
      ogType: 'article',
      imageUrl: postCover,
      publishedTime: post.published_at,
      author: 'Rodrigo Freire',
      jsonLdList: postSchemas,
      bodyHtml: postBodyHtml
    });
    fs.writeFileSync(path.join(postDir, 'index.html'), rendered, 'utf8');
    fs.writeFileSync(path.join(DIST_DIR, 'blog', `${post.slug}.html`), rendered, 'utf8');
  }

  console.log(`✅ Pré-renderização concluída: ${pages.length + DEFAULT_PROJECTS.length + DEFAULT_POSTS.length} páginas com corpo semântico, links internos, Open Graph e JSON-LD!`);
}

// 4. GARANTIR ARQUIVOS ESTÁTICOS NO DIST
function copyStaticFiles() {
  console.log('📂 Copiando robots.txt, llms.txt, _redirects e 404.html para dist/ ...');
  
  const filesToCopy = ['robots.txt', 'llms.txt', '_redirects', 'og-default.png'];
  for (const f of filesToCopy) {
    const src = path.join(PUBLIC_DIR, f);
    const dest = path.join(DIST_DIR, f);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
    }
  }

  // 404.html fallback para Cloudflare
  const indexSrc = path.join(DIST_DIR, 'index.html');
  const fallback404 = path.join(DIST_DIR, '404.html');
  if (fs.existsSync(indexSrc)) {
    fs.copyFileSync(indexSrc, fallback404);
  }
  console.log('✅ Arquivos estáticos copiados com sucesso para dist/ !');
}

// EXECUÇÃO
generateSitemap();
prerenderRoutes();
copyStaticFiles();
