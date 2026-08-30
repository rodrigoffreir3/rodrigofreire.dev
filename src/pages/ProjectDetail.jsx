import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, ExternalLink, Sparkles } from 'lucide-react';
import GithubIcon from '../components/GithubIcon';

export default function ProjectDetail({ projects, profile }) {
  const { slug } = useParams();
  const project = projects.find(p => p.slug === slug);

  if (!project) {
    return (
      <div className="portfolio-container" style={{ textAlign: 'center', padding: '6rem 1rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Projeto não encontrado</h2>
        <p style={{ color: 'var(--text-body)', marginBottom: '2rem' }}>O projeto solicitado não existe ou foi movido.</p>
        <Link to="/projetos" className="corp-btn corp-btn-primary">Voltar para Projetos</Link>
      </div>
    );
  }

  const heroImg = project.hero_image || project.cover_image;

  return (
    <article className="project-case-page">
      
      {/* NAVEGAÇÃO DE VOLTA */}
      <div style={{ margin: '1.5rem 0 1rem 0' }}>
        <Link to="/projetos" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', color: '#60a5fa', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '600' }}>
          <ArrowLeft size={16} /> Voltar para todos os projetos
        </Link>
      </div>

      {/* 1. HEADER DO CASE STUDY */}
      <header className="project-case-header">
        <div className="corp-badge" style={{ marginBottom: '0.85rem' }}>
          <Sparkles size={14} />
          <span>{project.badge || "Case Study · Engenharia de Software"}</span>
        </div>
        
        <h1>{project.title}</h1>
        
        <p className="lead">{project.summary}</p>

        {heroImg && (
          <div className="project-hero-media">
            <img src={heroImg} alt={`${project.title} Preview`} loading="eager" />
          </div>
        )}
      </header>

      {/* 2. O PROBLEMA QUE RESOLVE */}
      {project.problem_description && (
        <section className="project-section-box">
          <div className="corp-badge" style={{ marginBottom: '0.6rem' }}>Contexto & Desafio</div>
          <h2>O Problema que Resolve</h2>
          <div className="project-prose">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {project.problem_description}
            </ReactMarkdown>
          </div>
        </section>
      )}

      {/* 3. GALERIA DE TELAS */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="project-section-box">
          <div className="corp-badge" style={{ marginBottom: '0.6rem' }}>Galeria do Sistema</div>
          <h2>Telas e Registros Visuais</h2>
          <div className="gallery-grid-corp">
            {project.gallery.map((item, idx) => (
              <div key={idx} className="gallery-item-corp">
                <img src={item.image} alt={item.caption || "Captura de tela"} loading="lazy" />
                {item.caption && (
                  <div className="gallery-caption-corp">{item.caption}</div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. COMO FUNCIONA POR TRÁS (DEEP TECH & ARQUITETURA) */}
      {project.technical_details && (
        <section className="project-section-box">
          <div className="corp-badge" style={{ marginBottom: '0.6rem' }}>Arquitetura & Engenharia</div>
          <h2>Como Funciona por Trás</h2>
          <div className="project-prose">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {project.technical_details}
            </ReactMarkdown>
          </div>
        </section>
      )}

      {/* 5. CTA EXECUTIVO */}
      <section className="cta-banner-corp" style={{ marginTop: '3.5rem' }}>
        <div className="corp-badge" style={{ background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)', color: '#ffffff', marginBottom: '0.75rem' }}>
          Soluções Sob Medida
        </div>
        <h3 style={{ color: '#ffffff' }}>Gostou desta solução e quer aplicar no seu negócio?</h3>
        <p>Entre em contato diretamente para conversarmos sobre requisitos, prazos e arquitetura para a sua empresa.</p>
        
        <div className="hero-actions" style={{ justifyContent: 'center', marginTop: '1.5rem' }}>
          <a
            href={`https://wa.me/${profile?.whatsapp_number || '5569992782919'}?text=${encodeURIComponent(`Olá Rodrigo! Vi o projeto ${project.title} no seu site e gostaria de tirar algumas dúvidas.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="corp-btn corp-btn-primary"
            style={{ background: '#2563eb', borderColor: '#2563eb' }}
          >
            Conversar no WhatsApp →
          </a>

          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="corp-btn corp-btn-secondary"
            >
              <GithubIcon size={16} /> Ver Código no GitHub ↗
            </a>
          )}
        </div>
      </section>

    </article>
  );
}
