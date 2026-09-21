import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, ArrowRight, Calendar, Tag, Share2 } from 'lucide-react';
import SEO from '../components/SEO';

export default function BlogPost({ posts, profile }) {
  const { slug } = useParams();
  const post = posts?.find(p => p.slug === slug);
  const relatedPosts = (posts || []).filter(p => p.slug !== slug).slice(0, 3);

  if (!post) {
    return (
      <div className="portfolio-container" style={{ textAlign: 'center', padding: '6rem 1rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Artigo não encontrado</h2>
        <p style={{ color: 'var(--text-body)', marginBottom: '2rem' }}>O artigo solicitado não existe ou foi removido.</p>
        <Link to="/blog" className="corp-btn corp-btn-primary">Voltar para o Blog</Link>
      </div>
    );
  }

  const shareArticle = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.description,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
    }
  };

  const postCoverUrl = post.cover_image
    ? (post.cover_image.startsWith('http') ? post.cover_image : `https://rodrigofreire.dev.br${post.cover_image.startsWith('/') ? post.cover_image : `/${post.cover_image}`}`)
    : 'https://rodrigofreire.dev.br/og-default.png';

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': post.title,
    'description': post.description,
    'image': postCoverUrl,
    'datePublished': post.published_at,
    'dateModified': post.updated_at || post.published_at,
    'author': {
      '@type': 'Person',
      'name': 'Rodrigo Freire',
      'url': 'https://rodrigofreire.dev.br/sobre'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Rodrigo Freire Tech',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://rodrigofreire.dev.br/og-default.png'
      }
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://rodrigofreire.dev.br/blog/${post.slug}`
    }
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Início',
        'item': 'https://rodrigofreire.dev.br'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Blog',
        'item': 'https://rodrigofreire.dev.br/blog'
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': post.title,
        'item': `https://rodrigofreire.dev.br/blog/${post.slug}`
      }
    ]
  };

  const postSchemas = [articleJsonLd, breadcrumbJsonLd];

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

  return (
    <article className="project-case-page">
      <SEO
        title={`${post.title} · Rodrigo Freire Tech`}
        description={post.description}
        canonicalPath={`/blog/${post.slug}`}
        type="article"
        image={post.cover_image || undefined}
        publishedTime={post.published_at}
        author="Rodrigo Freire"
        jsonLd={postSchemas}
      />
      
      {/* NAVEGAÇÃO DE VOLTA */}
      <div style={{ margin: '1.5rem 0 1rem 0' }}>
        <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', color: 'var(--color-brand-ink)', textDecoration: 'none', fontSize: '0.92rem', fontWeight: '600' }}>
          <ArrowLeft size={16} /> Voltar para artigos
        </Link>
      </div>

      {/* HEADER DO ARTIGO */}
      <header className="project-case-header">
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '1rem' }}>
          <div className="tech-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
            <Calendar size={13} />
            <span>{new Date(post.published_at).toLocaleDateString('pt-BR')}</span>
          </div>

          {post.tags?.map((t, idx) => (
            <span key={idx} className="corp-badge" style={{ fontSize: '0.75rem' }}>
              <Tag size={12} /> {t}
            </span>
          ))}

          <button
            onClick={shareArticle}
            className="tech-tag"
            style={{ marginLeft: 'auto', cursor: 'pointer', background: 'transparent', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
            title="Compartilhar este artigo"
          >
            <Share2 size={13} /> Compartilhar
          </button>
        </div>

        <h1 style={{ fontSize: 'clamp(2rem, 4.5vw, 2.8rem)', lineHeight: '1.2', marginBottom: '1rem' }}>
          {post.title}
        </h1>

        {post.description && (
          <p className="lead" style={{ fontSize: '1.15rem', color: 'var(--text-body)', borderLeft: '3px solid var(--primary)', paddingLeft: '1rem' }}>
            {post.description}
          </p>
        )}

        {post.cover_image && (
          <div className="project-hero-media" style={{ marginTop: '1.5rem', maxHeight: '420px' }}>
            <img src={post.cover_image} alt={post.title} loading="eager" />
          </div>
        )}
      </header>

      {/* CONTEÚDO DO ARTIGO EM MARKDOWN */}
      <section className="project-section-box project-prose" style={{ padding: '3rem 2.5rem' }}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content_markdown}
        </ReactMarkdown>
      </section>

      {/* SEÇÃO DE CROSS-LINKING: ARTIGOS RECOMENDADOS (SEO & AUTORIDADE) */}
      {relatedPosts.length > 0 && (
        <section className="related-articles-section" style={{ marginTop: '3.5rem', paddingTop: '2.5rem', borderTop: '1px solid rgba(0, 0, 0, 0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="section-tag-pill" style={{ fontSize: '0.75rem', marginBottom: '0.35rem' }}>
                Conteúdo complementar
              </span>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--text-heading)', margin: 0 }}>
                Outros artigos recomendados
              </h3>
            </div>
            <Link to="/blog" className="corp-link-text" style={{ fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              Ver todos os artigos <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {relatedPosts.map(rp => (
              <Link
                key={rp.slug}
                to={`/blog/${rp.slug}`}
                className="service-card-liquid"
                style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', padding: '1.5rem' }}
              >
                <div className="tech-tag" style={{ alignSelf: 'flex-start', marginBottom: '0.75rem', fontSize: '0.72rem' }}>
                  {new Date(rp.published_at).toLocaleDateString('pt-BR')}
                </div>
                <h4 style={{ fontSize: '1.05rem', color: 'var(--text-heading)', margin: '0 0 0.5rem', lineHeight: '1.4' }}>
                  {rp.title}
                </h4>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-body)', margin: '0 0 1rem', lineHeight: '1.5', flex: 1 }}>
                  {rp.description}
                </p>
                <span style={{ fontSize: '0.84rem', color: 'var(--color-brand-blue)', fontWeight: '600', marginTop: 'auto', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                  Ler artigo <ArrowRight size={13} />
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* FOOTER DO ARTIGO COM AUTOR E CTA */}
      <section className="cta-banner-corp" style={{ marginTop: '3.5rem' }}>
        <div className="corp-badge" style={{ background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)', color: '#ffffff', marginBottom: '0.75rem' }}>
          Autor · Rodrigo Freire Tech
        </div>
        <h3 style={{ color: '#ffffff' }}>Quer conversar sobre este tema na sua operação?</h3>
        <p>Fale diretamente comigo para entender como aplicar isso na prática da sua empresa.</p>
        <a
          href={`https://wa.me/${(profile?.whatsapp_number ? String(profile.whatsapp_number).replace(/\D/g, '') : '') || '5569992782919'}?text=${encodeURIComponent(`Olá Rodrigo! Li o artigo "${post.title}" no seu blog e gostaria de conversar.`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="corp-btn corp-btn-primary"
          style={{ fontSize: '1rem', padding: '0.85rem 2rem' }}
        >
          Conversar no WhatsApp com Rodrigo
        </a>
      </section>

    </article>
  );
}
