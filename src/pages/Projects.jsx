import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export default function Projects({ projects }) {
  return (
    <div className="portfolio-container" style={{ paddingTop: '2.5rem' }}>
      
      {/* HEADER DA PÁGINA */}
      <div className="section-header-corp" style={{ marginBottom: '3.5rem' }}>
        <div className="corp-badge">
          <Sparkles size={14} />
          <span>Engenharia & Deep Tech</span>
        </div>
        <h2>Portfólio Completo de Projetos</h2>
        <p>Explore as soluções desenvolvidas em produção, arquiteturas de kernel, plataformas web e observabilidade de inteligência artificial.</p>
      </div>

      {/* GRID DE TODOS OS PROJETOS */}
      <div className="projects-grid-corp" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.75rem' }}>
        {projects.map((proj) => (
          <div key={proj.id} className="project-card-corp">
            <div className="browser-chrome">
              <div className="browser-dots">
                <span className="browser-dot red"></span>
                <span className="browser-dot yellow"></span>
                <span className="browser-dot green"></span>
              </div>
              <span className="browser-url">rodrigofreire.dev/projetos/{proj.slug}</span>
            </div>

            <div className="project-img-box">
              <img src={proj.cover_image || proj.hero_image} alt={proj.title} loading="lazy" />
            </div>

            <div className="project-content-box">
              <div className="corp-badge" style={{ alignSelf: 'flex-start' }}>{proj.badge}</div>
              <h3>{proj.title}</h3>
              <p>{proj.summary}</p>
              
              <div className="project-tags-list">
                {proj.tags?.map((t, idx) => (
                  <span key={idx} className="tech-tag">{t}</span>
                ))}
              </div>

              <Link to={`/projetos/${proj.slug}`} className="corp-btn corp-btn-primary" style={{ marginTop: 'auto' }}>
                Ver Case Técnico Completo →
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
