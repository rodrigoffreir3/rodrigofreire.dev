import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, ArrowRight, Sparkles, MessageSquare, CheckCircle2 } from 'lucide-react';
import GithubIcon from '../components/GithubIcon';
import SEO from '../components/SEO';

export default function ProjectDetail({ projects, profile }) {
  const { slug } = useParams();
  const project = projects?.find(p => p.slug === slug);
  const otherProjects = (projects || []).filter(p => p.slug !== slug).slice(0, 3);
  const phone = (profile?.whatsapp_number ? String(profile.whatsapp_number).replace(/\D/g, '') : '') || '5569992782919';

  if (!project) {
    return (
      <div className="portfolio-container" style={{ textAlign: 'center', padding: '6rem 1.5rem', maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Case não encontrado</h2>
        <p style={{ color: 'var(--text-body)', marginBottom: '2rem' }}>A solução solicitada não existe ou foi atualizada.</p>
        <Link to="/projetos" className="corp-btn-accent">Voltar para Cases de Sucesso</Link>
      </div>
    );
  }

  // Apenas exibe imagem se não for mock/placeholder e for explicitamente definida
  const hasRealCover = project.cover_image && !project.cover_image.includes('placeholder') && !project.cover_image.includes('mock');
  const realGallery = (project.gallery || []).filter(item => item.image && !item.image.includes('placeholder'));

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
        'name': 'Projetos',
        'item': 'https://rodrigofreire.dev.br/projetos'
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': project.title,
        'item': `https://rodrigofreire.dev.br/projetos/${project.slug}`
      }
    ]
  };

  const softwareJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': project.title,
    'description': project.summary,
    'applicationCategory': 'BusinessApplication',
    'operatingSystem': 'Windows, Linux, Web',
    'author': {
      '@type': 'Person',
      'name': 'Rodrigo Freire'
    },
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'BRL'
    }
  };

  return (
    <article className="project-case-page" style={{ maxWidth: '960px', margin: '0 auto', padding: '2.5rem 1.5rem 6rem' }}>
      <SEO
        title={`${project.title} · Rodrigo Freire Tech`}
        description={project.summary}
        canonicalPath={`/projetos/${project.slug}`}
        image={hasRealCover ? project.cover_image : undefined}
        jsonLd={[breadcrumbJsonLd, softwareJsonLd]}
      />
      
      {/* NAVEGAÇÃO DE RETORNO */}
      <div style={{ marginBottom: '1.75rem' }}>
        <Link to="/projetos" className="back-link-corp">
          <ArrowLeft size={16} /> Voltar para projetos
        </Link>
      </div>

      {/* 1. CABEÇALHO DO CASE */}
      <header className="project-case-header" style={{ marginBottom: '3rem' }}>
        <div className="section-tag-pill" style={{ marginBottom: '1rem' }}>
          <span>{project.badge || "Projeto & Engenharia"}</span>
        </div>
        
        <h1 style={{ fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)', fontWeight: '800', lineHeight: '1.2', marginBottom: '1.25rem', color: 'var(--text-heading)' }}>
          {project.title}
        </h1>
        
        <p style={{ fontSize: '1.15rem', color: 'var(--text-body)', lineHeight: '1.65', marginBottom: '2rem' }}>
          {project.summary}
        </p>

        {/* Renderiza imagem apenas se for real e configurada no CMS */}
        {hasRealCover && (
          <div className="project-hero-media" style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 16px 40px rgba(0, 0, 0, 0.12)', marginBottom: '2.5rem' }}>
            <img src={project.cover_image} alt={`${project.title} Preview`} loading="lazy" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
        )}
      </header>

      {/* 2. O PROBLEMA */}
      {project.problem_description && (
        <section className="project-section-box apple-liquid-glass" style={{ padding: '2.2rem', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>O problema</h2>
          <div className="project-prose" style={{ fontSize: '1rem', lineHeight: '1.7', color: 'var(--text-body)' }}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {project.problem_description}
            </ReactMarkdown>
          </div>
        </section>
      )}

      {/* 3. GALERIA (Apenas imagens reais cadastradas pelo CMS) */}
      {realGallery.length > 0 && (
        <section className="project-section-box apple-liquid-glass" style={{ padding: '2.2rem', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.25rem' }}>Telas e registros visuais</h2>
          <div className="gallery-grid-corp" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {realGallery.map((item, idx) => (
              <div key={idx} style={{ borderRadius: '14px', overflow: 'hidden', border: '1px solid var(--color-gray-ui)' }}>
                <img src={item.image} alt={item.caption || "Registro do sistema"} loading="lazy" style={{ width: '100%', height: 'auto', display: 'block' }} />
                {item.caption && (
                  <div style={{ padding: '0.75rem', fontSize: '0.82rem', color: 'var(--text-muted)', background: '#FFFFFF' }}>
                    {item.caption}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. COMO FUNCIONA */}
      {project.technical_details && (
        <section className="project-section-box apple-liquid-glass" style={{ padding: '2.2rem', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Como funciona</h2>
          <div className="project-prose" style={{ fontSize: '1rem', lineHeight: '1.7', color: 'var(--text-body)' }}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {project.technical_details}
            </ReactMarkdown>
          </div>
        </section>
      )}

      {/* 5. TECNOLOGIAS */}
      {project.tags && project.tags.length > 0 && (
        <section className="project-section-box apple-liquid-glass" style={{ padding: '2.2rem', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Tecnologias</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {project.tags.map((t, idx) => (
              <span
                key={idx}
                style={{
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '999px',
                  background: 'rgba(0, 0, 0, 0.06)',
                  color: 'var(--color-brand-ink)'
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* SEÇÃO DE CROSS-LINKING: OUTROS PROJETOS (SEO & AUTORIDADE) */}
      {otherProjects.length > 0 && (
        <section className="related-projects-section" style={{ marginTop: '2.5rem', marginBottom: '3rem', paddingTop: '2.5rem', borderTop: '1px solid rgba(0, 0, 0, 0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="section-tag-pill" style={{ fontSize: '0.75rem', marginBottom: '0.35rem' }}>
                Portfólio técnico
              </span>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--text-heading)', margin: 0 }}>
                Outros projetos desenvolvidos
              </h3>
            </div>
            <Link to="/projetos" className="corp-link-text" style={{ fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              Ver todos os projetos <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {otherProjects.map(op => (
              <Link
                key={op.slug}
                to={`/projetos/${op.slug}`}
                className="service-card-liquid"
                style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', padding: '1.5rem' }}
              >
                <div className="corp-badge" style={{ alignSelf: 'flex-start', marginBottom: '0.75rem', fontSize: '0.72rem' }}>
                  {op.category || 'Tecnologia'}
                </div>
                <h4 style={{ fontSize: '1.05rem', color: 'var(--text-heading)', margin: '0 0 0.5rem', lineHeight: '1.4' }}>
                  {op.title}
                </h4>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-body)', margin: '0 0 1rem', lineHeight: '1.5', flex: 1 }}>
                  {op.summary}
                </p>
                <span style={{ fontSize: '0.84rem', color: 'var(--color-brand-blue)', fontWeight: '600', marginTop: 'auto', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                  Conhecer o case <ArrowRight size={13} />
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 6. BOTÕES DE AÇÃO E GITHUB */}
      <div className="project-pill-actions-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'center', padding: '2rem 0', borderTop: '1px solid var(--color-gray-ui)' }}>
        <a
          href={`https://wa.me/${phone}?text=${encodeURIComponent(`Olá Rodrigo. Vi o projeto "${project.title}" no seu site e gostaria de conversar a respeito.`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="corp-btn-accent"
          style={{ padding: '0.85rem 1.8rem', fontSize: '1rem', borderRadius: '999px' }}
        >
          <MessageSquare size={18} /> Conversar sobre este projeto
        </a>

        {project.github_url && (
          <a
            href={project.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="corp-btn-outline-glass"
            style={{ padding: '0.85rem 1.8rem', fontSize: '0.95rem', borderRadius: '999px', color: 'var(--color-brand-ink) !important', background: 'var(--color-off-white)', borderColor: 'var(--color-brand-ink)' }}
          >
            <GithubIcon size={18} /> GitHub do Projeto
          </a>
        )}
      </div>

    </article>
  );
}
