import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, CheckCircle } from 'lucide-react';

export default function Projects({ projects = [] }) {
  return (
    <div className="portfolio-container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '3.5rem 1.5rem 6rem' }}>
      
      {/* HEADER DA PÁGINA */}
      <div className="section-head-center">
        <span className="section-tag-pill">
          <Sparkles size={14} style={{ display: 'inline', marginRight: '4px' }} />
          Cases de Sucesso & Resultados Reais
        </span>
        <h1 className="section-title-large">Casos de Sucesso Empresariais</h1>
        <p className="section-desc-subtle">
          Conheça como desenvolvemos soluções práticas para proteger empresas contra perdas, cortar desperdícios de servidores e automatizar processos operacionais com segurança.
        </p>
      </div>

      {/* GRID DE CASES */}
      <div className="services-catalog-grid" style={{ marginTop: '2rem' }}>
        {projects.map((proj) => (
          <div key={proj.id} className="service-card-liquid">
            <div className="service-card-header">
              <span className="service-card-tag">{proj.badge || "Case Corporativo"}</span>
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
                      background: 'rgba(11, 74, 79, 0.06)',
                      color: 'var(--color-dark-teal)'
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            <div className="service-card-footer">
              <span className="service-price-label">Solução Prática</span>
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
