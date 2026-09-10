import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { DEFAULT_PROJECTS, DEFAULT_POSTS } from '../src/data/defaultData.js';

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
    priority: '0.7',
    lastmod: today
  }));

  const blogPages = DEFAULT_POSTS.map(post => ({
    loc: `${SITE_URL}/blog/${post.slug}`,
    changefreq: 'weekly',
    priority: '0.8',
    lastmod: post.published_at || today
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

// 2. HELPER PARA INJETAR METATAGS ESTÁTICAS NO HTML (CA-2 / CA-3)
function injectMetaTags(htmlTemplate, {
  title,
  description,
  canonicalUrl,
  ogType = 'website',
  imageUrl = DEFAULT_IMAGE,
  publishedTime,
  author = 'Rodrigo Freire',
  jsonLdList = []
}) {
  let html = htmlTemplate;

  // Substituir Title
  html = html.replace(/<title>.*?<\/title>/s, `<title>${title}</title>`);

  // Substituir Meta Title
  html = html.replace(/<meta\s+name=["']title["'].*?>/s, `<meta name="title" content="${title}" />`);

  // Substituir Meta Description
  html = html.replace(/<meta\s+name=["']description["'].*?>/s, `<meta name="description" content="${description}" />`);

  // Substituir Canonical
  html = html.replace(/<link\s+rel=["']canonical["'].*?>/s, `<link rel="canonical" href="${canonicalUrl}" />`);

  // Substituir Open Graph
  html = html.replace(/<meta\s+property=["']og:title["'].*?>/s, `<meta property="og:title" content="${title}" />`);
  html = html.replace(/<meta\s+property=["']og:description["'].*?>/s, `<meta property="og:description" content="${description}" />`);
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
  html = html.replace(/<meta\s+name=["']twitter:title["'].*?>/s, `<meta name="twitter:title" content="${title}" />`);
  html = html.replace(/<meta\s+name=["']twitter:description["'].*?>/s, `<meta name="twitter:description" content="${description}" />`);
  html = html.replace(/<meta\s+name=["']twitter:image["'].*?>/s, `<meta name="twitter:image" content="${imageUrl}" />`);
  html = html.replace(/<meta\s+name=["']twitter:url["'].*?>/s, `<meta name="twitter:url" content="${canonicalUrl}" />`);

  // Injetar JSON-LD
  if (jsonLdList && jsonLdList.length > 0) {
    const scripts = jsonLdList.map(ld => `    <script type="application/ld+json">\n${JSON.stringify(ld, null, 2)}\n    </script>`).join('\n');
    html = html.replace('</head>', `${scripts}\n  </head>`);
  }

  return html;
}

// 3. PRERENDER DE ROTAS ESTÁTICAS PARA CRAWLERS
function prerenderRoutes() {
  console.log('🚀 Pré-renderizando metatags estáticas para crawlers (WhatsApp/Googlebot)...');

  const baseHtmlPath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(baseHtmlPath)) {
    console.warn('⚠️ dist/index.html não encontrado. Rode vite build primeiro.');
    return;
  }

  const baseHtml = fs.readFileSync(baseHtmlPath, 'utf8');

  // HOME
  const homeJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'Rodrigo Freire — TI Empresarial & Tecnologias Amigáveis',
    'image': DEFAULT_IMAGE,
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
    'description': 'Consultoria e suporte em TI empresarial de alto padrão em Porto Velho - RO. Atendimento ágil, redes seguras, conformidade com a LGPD e desenvolvimento de sistemas sob medida.'
  };

  const homeHtml = injectMetaTags(baseHtml, {
    title: 'Rodrigo Freire · TI Empresarial de Alto Nível — Porto Velho',
    description: 'Consultoria e suporte em TI empresarial de alto padrão em Porto Velho - RO. Atendimento ágil, redes seguras, conformidade com a LGPD e desenvolvimento de sistemas sob medida.',
    canonicalUrl: `${SITE_URL}/`,
    jsonLdList: [homeJsonLd]
  });
  fs.writeFileSync(baseHtmlPath, homeHtml, 'utf8');

  // ROTAS ESTÁTICAS
  const pages = [
    {
      dir: 'sobre',
      title: 'Sobre Rodrigo Freire · TI Empresarial & Inovação — Porto Velho',
      description: 'Conheça Rodrigo Freire: formação em Direito e Análise de Sistemas, patente no INPI e foco em TI empresarial de alto nível e conformidade com a LGPD em Porto Velho.',
      canonicalUrl: `${SITE_URL}/sobre`,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Person',
        'name': 'Rodrigo Freire',
        'jobTitle': 'Especialista em TI Empresarial e Desenvolvedor de Software',
        'description': 'Profissional de TI empresarial de alto nível em Porto Velho - RO, bacharel em Direito e graduando em Análise e Desenvolvimento de Sistemas (ADS). Criador de sistemas patenteados no INPI.',
        'url': `${SITE_URL}/sobre`,
        'image': `${SITE_URL}/foto_perfil.jpeg`,
        'address': {
          '@type': 'PostalAddress',
          'addressLocality': 'Porto Velho',
          'addressRegion': 'RO',
          'addressCountry': 'BR'
        }
      }
    },
    {
      dir: 'contato',
      title: 'Contato & Atendimento Direto · Rodrigo Freire — Porto Velho',
      description: 'Fale diretamente com Rodrigo Freire via WhatsApp ou e-mail para suporte de TI empresarial, manutenção de servidores e consultoria em Porto Velho.',
      canonicalUrl: `${SITE_URL}/contato`,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        'name': 'Contato & Atendimento Direto — Rodrigo Freire',
        'url': `${SITE_URL}/contato`
      }
    },
    {
      dir: 'projetos',
      title: 'Projetos & Engenharia de Sistemas · Rodrigo Freire — Porto Velho',
      description: 'Conheça os sistemas desenvolvidos por Rodrigo Freire: segurança da informação, patentes no INPI, ferramentas para comércio e computação científica.',
      canonicalUrl: `${SITE_URL}/projetos`,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Início', 'item': `${SITE_URL}/` },
          { '@type': 'ListItem', 'position': 2, 'name': 'Projetos', 'item': `${SITE_URL}/projetos` }
        ]
      }
    },
    {
      dir: 'blog',
      title: 'Blog & Publicações Técnicas · Rodrigo Freire — Porto Velho',
      description: 'Artigos e análises sobre TI empresarial, conformidade com a LGPD, inteligência artificial, arquitetura de sistemas e segurança da informação.',
      canonicalUrl: `${SITE_URL}/blog`,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Início', 'item': `${SITE_URL}/` },
          { '@type': 'ListItem', 'position': 2, 'name': 'Blog', 'item': `${SITE_URL}/blog` }
        ]
      }
    }
  ];

  for (const page of pages) {
    const pageDir = path.join(DIST_DIR, page.dir);
    if (!fs.existsSync(pageDir)) fs.mkdirSync(pageDir, { recursive: true });
    const rendered = injectMetaTags(baseHtml, {
      title: page.title,
      description: page.description,
      canonicalUrl: page.canonicalUrl,
      jsonLdList: page.jsonLd ? [page.jsonLd] : []
    });
    fs.writeFileSync(path.join(pageDir, 'index.html'), rendered, 'utf8');
  }

  // PROJETOS DINÂMICOS
  for (const proj of DEFAULT_PROJECTS) {
    const projDir = path.join(DIST_DIR, 'projetos', proj.slug);
    if (!fs.existsSync(projDir)) fs.mkdirSync(projDir, { recursive: true });

    const projCover = proj.cover_image && !proj.cover_image.includes('placeholder')
      ? (proj.cover_image.startsWith('http') ? proj.cover_image : `${SITE_URL}${proj.cover_image}`)
      : DEFAULT_IMAGE;

    const rendered = injectMetaTags(baseHtml, {
      title: `${proj.title} · Rodrigo Freire — Porto Velho`,
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
      ]
    });
    fs.writeFileSync(path.join(projDir, 'index.html'), rendered, 'utf8');
  }

  // BLOG POSTS (RF-2, RF-3, CA-2, CA-3)
  for (const post of DEFAULT_POSTS) {
    const postDir = path.join(DIST_DIR, 'blog', post.slug);
    if (!fs.existsSync(postDir)) fs.mkdirSync(postDir, { recursive: true });

    const postCover = post.cover_image && !post.cover_image.includes('placeholder')
      ? (post.cover_image.startsWith('http') ? post.cover_image : `${SITE_URL}${post.cover_image}`)
      : DEFAULT_IMAGE;

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
          'name': 'Rodrigo Freire — TI Empresarial',
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
          { '@type': 'ListItem', 'position': 2, 'name': 'Blog', 'item': `${SITE_URL}/blog` },
          { '@type': 'ListItem', 'position': 3, 'name': post.title, 'item': `${SITE_URL}/blog/${post.slug}` }
        ]
      }
    ];

    if (post.slug === 'vendo-bem-instagram-preciso-site') {
      postSchemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'Vendo bem no Instagram, ainda preciso de um site próprio?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Se você vende apenas para clientes recorrentes que já confiam no direct, pode não precisar no início. Porém, um site próprio é indispensável para passar credibilidade a novos clientes que pesquisam no Google antes de compras de maior valor, atender a exigências fiscais/cadastrais e manter sua base de contatos protegida sem depender exclusivamente dos algoritmos das redes sociais.'
            }
          },
          {
            '@type': 'Question',
            'name': 'Quando vale a pena criar um site para quem já vende em redes sociais?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Vale a pena quando clientes perguntam por um site antes de fechar compras maiores, quando há percepção de clientes que somem antes do pagamento por falta de confiança, ou quando o lojista deseja alcançar novos públicos fora da sua rede atual com controle total da carteira de clientes.'
            }
          }
        ]
      });
    }

    const rendered = injectMetaTags(baseHtml, {
      title: `${post.title} · Blog Rodrigo Freire`,
      description: post.description,
      canonicalUrl: `${SITE_URL}/blog/${post.slug}`,
      ogType: 'article',
      imageUrl: postCover,
      publishedTime: post.published_at,
      author: 'Rodrigo Freire',
      jsonLdList: postSchemas
    });
    fs.writeFileSync(path.join(postDir, 'index.html'), rendered, 'utf8');
  }

  console.log(`✅ Pré-renderização concluída: ${pages.length + DEFAULT_PROJECTS.length + DEFAULT_POSTS.length} páginas com tags Open Graph e JSON-LD nativas!`);
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
