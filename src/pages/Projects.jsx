import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

export default function Projects({ projects = [] }) {
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
        title="Projetos & Engenharia de Sistemas · Rodrigo Freire — Porto Velho"
        description="Conheça os sistemas desenvolvidos por Rodrigo Freire: segurança da informação, patentes no INPI, ferramentas para comércio e computação científica."
        canonicalPath="/projetos"
        jsonLd={breadcrumbJsonLd}
      />
      
      {/* HEADER DA PÁGINA */}
      <div className="section-head-center">
        <span className="section-tag-pill">
          <Sparkles size={14} style={{ display: 'inline', marginRight: '4px' }} />
          Pesquisa, Engenharia & Sistemas
        </span>
        <h1 className="section-title-large">Projetos & Cases Desenvolvidos</h1>
        <p className="section-desc-subtle">
          Conheça sistemas de segurança, ferramentas open source e projetos desenvolvidos por mim para proteção de computadores, pesquisa científica e automação.
        </p>
      </div>

      {/* GRID DE CASES */}
      <div className="services-catalog-grid" style={{ marginTop: '2rem' }}>
        {projects.map((proj) => (
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
                Conhecer Detalhes <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
