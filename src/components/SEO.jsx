import React from 'react';
import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://rodrigofreire.dev.br';
const DEFAULT_TITLE = 'Rodrigo Freire · TI Empresarial de Alto Nível — Porto Velho';
const DEFAULT_DESCRIPTION = 'Consultoria e suporte em TI empresarial de alto padrão em Porto Velho - RO. Atendimento ágil, redes seguras, conformidade com a LGPD (Lei Geral de Proteção de Dados) e desenvolvimento de sistemas sob medida.';
const DEFAULT_IMAGE = `${SITE_URL}/og-default.png`;

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  canonicalPath = '',
  type = 'website',
  image = DEFAULT_IMAGE,
  publishedTime,
  author = 'Rodrigo Freire',
  jsonLd,
}) {
  // Garantir título consistente
  const fullTitle = title ? title : DEFAULT_TITLE;
  
  // Garantir URL canônica absoluta sem barra duplicada
  const cleanPath = canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`;
  const canonicalUrl = `${SITE_URL}${cleanPath === '/' ? '' : cleanPath}`;
  
  // Garantir URL absoluta para a imagem
  const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image.startsWith('/') ? image : `/${image}`}`;

  // Normalizar jsonLd para array
  const jsonLdArray = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook / WhatsApp */}
      <meta property="og:site_name" content="Rodrigo Freire — TI Empresarial" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:locale" content="pt_BR" />

      {/* Article specific Open Graph */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Structured Data (JSON-LD) */}
      {jsonLdArray.map((schema, index) => (
        <script key={`jsonld-${index}`} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
