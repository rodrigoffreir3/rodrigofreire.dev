import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

export default function Projects({ projects = [] }) {
  const sortedProjects = [...projects].sort((a, b) => (a.display_order || 99) - (b.display_order || 99));

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
      }
    ]
  };

  return (
    <div className="portfolio-container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '3.5rem 1.5rem 6rem' }}>
      <SEO
        title="Projetos e sistemas desenvolvidos · Rodrigo Freire Tech"
        description="Conheça os projetos e sistemas desenvolvidos por Rodrigo Freire: tecnologia própria, pesquisa aplicada e produto em operação real."
        canonicalPath="/projetos"
        jsonLd={breadcrumbJsonLd}
      />
      
      {/* HEADER DA PÁGINA */}
      <div className="section-head-center">
        <span className="section-tag-pill">
          Portfólio & Engenharia
        </span>
        <h1 className="section-title-large">Projetos e sistemas desenvolvidos</h1>
        <p className="section-desc-subtle">
          Tecnologia própria, pesquisa aplicada e produto em operação real.
        </p>
      </div>

      {/* MOLDURA DE ENQUADRAMENTO OBRIGATÓRIA (SPEC-SITE-008 3.10) */}
      <div style={{
        maxWidth: '840px',
        margin: '2rem auto 2.5rem',
        padding: '1.25rem 1.5rem',
        background: 'rgba(53, 51, 205, 0.04)',
        borderLeft: '4px solid var(--color-brand-ink)',
        borderRadius: '0 12px 12px 0'
      }}>
        <p style={{ margin: 0, fontSize: '0.96rem', lineHeight: '1.65', color: 'var(--text-body)' }}>
          Esta seção reúne o que construo no limite técnico: pesquisa publicada, tecnologia registrada e sistema em produção. Não é o que a maioria das empresas contrata no dia a dia, e está aqui por outro motivo. É a prova de que o mesmo cuidado aplicado nesses projetos entra no sistema simples que roda no seu balcão.
        </p>
      </div>

      {/* GRID DE CASES */}
      <div className="services-catalog-grid" style={{ marginTop: '2rem' }}>
        {sortedProjects.map((proj) => (
          <div key={proj.id} className="service-card-liquid">
            <div className="service-card-header">
              <span className="service-card-tag">{proj.badge || "Projeto & Engenharia"}</span>
            </div>

            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{proj.title}</h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-body)', lineHeight: '1.6', marginBottom: '1.5rem', flex: 1 }}>
              {proj.summary}
            </p>
            
            {proj.tags && proj.tags.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
                {proj.tags.map((t, idx) => (
                  <span
                    key={idx}
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '999px',
                      background: 'rgba(0, 0, 0, 0.06)',
                      color: 'var(--color-brand-ink)'
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            <div className="service-card-footer">
              <span className="service-price-label">Engenharia & Código</span>
              <Link to={`/projetos/${proj.slug}`} className="service-btn-contact">
                Conhecer detalhes <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
