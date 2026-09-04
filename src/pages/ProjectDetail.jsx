import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, Sparkles, MessageSquare, CheckCircle2 } from 'lucide-react';
import GithubIcon from '../components/GithubIcon';

export default function ProjectDetail({ projects, profile }) {
  const { slug } = useParams();
  const project = projects.find(p => p.slug === slug);
  const phone = profile?.whatsapp_number || '5569992782919';

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

  return (
    <article className="project-case-page" style={{ maxWidth: '960px', margin: '0 auto', padding: '2.5rem 1.5rem 6rem' }}>
      
      {/* NAVEGAÇÃO DE RETORNO */}
      <div style={{ marginBottom: '1.75rem' }}>
        <Link to="/projetos" className="back-link-corp">
          <ArrowLeft size={16} /> Voltar para todos os cases
        </Link>
      </div>

      {/* 1. CABEÇALHO DO CASE */}
      <header className="project-case-header" style={{ marginBottom: '3rem' }}>
        <div className="section-tag-pill" style={{ marginBottom: '1rem' }}>
          <Sparkles size={14} style={{ display: 'inline', marginRight: '5px' }} />
          <span>{project.badge || "Case de Sucesso Corporativo"}</span>
        </div>
        
        <h1 style={{ fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)', fontWeight: '800', lineHeight: '1.2', marginBottom: '1.25rem', color: 'var(--text-heading)' }}>
          {project.title}
        </h1>
        
        <p style={{ fontSize: '1.15rem', color: 'var(--text-body)', lineHeight: '1.65', marginBottom: '2rem' }}>
          {project.summary}
        </p>

        {/* Renderiza imagem apenas se for real e configurada no CMS */}
        {hasRealCover && (
          <div className="project-hero-media" style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 16px 40px rgba(11, 74, 79, 0.12)', marginBottom: '2.5rem' }}>
            <img src={project.cover_image} alt={`${project.title} Preview`} style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
        )}
      </header>

      {/* 2. O DESAFIO DO NEGÓCIO */}
      {project.problem_description && (
        <section className="project-section-box apple-liquid-glass" style={{ padding: '2.2rem', marginBottom: '2.5rem' }}>
          <div className="section-tag-pill" style={{ marginBottom: '0.75rem' }}>O Desafio Empresarial</div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Qual dor de gestão esse projeto elimina?</h2>
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
          <div className="section-tag-pill" style={{ marginBottom: '0.75rem' }}>Demonstração Visual</div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.25rem' }}>Telas e Fluxo da Operação</h2>
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

      {/* 4. COMO ESTA SOLUÇÃO ATUA NA PRÁTICA */}
      {project.technical_details && (
        <section className="project-section-box apple-liquid-glass" style={{ padding: '2.2rem', marginBottom: '3rem' }}>
          <div className="section-tag-pill" style={{ marginBottom: '0.75rem' }}>Metodologia & Aplicação</div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Como Funciona na Prática da Empresa</h2>
          <div className="project-prose" style={{ fontSize: '1rem', lineHeight: '1.7', color: 'var(--text-body)' }}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {project.technical_details}
            </ReactMarkdown>
          </div>
        </section>
      )}

      {/* 5. BOTÕES PÍLULA DE AÇÃO E GITHUB (SEM BLOCO PESADO) */}
      <div className="project-pill-actions-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'center', padding: '2rem 0', borderTop: '1px solid var(--color-gray-ui)' }}>
        <a
          href={`https://wa.me/${phone}?text=${encodeURIComponent(`Olá! Gostei muito do case "${project.title}" e gostaria de conversar sobre minhas ideias para a minha empresa.`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="corp-btn-accent"
          style={{ padding: '0.85rem 1.8rem', fontSize: '1rem', borderRadius: '999px' }}
        >
          <MessageSquare size={18} /> Me fale sobre suas ideias
        </a>

        {project.github_url && (
          <a
            href={project.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="corp-btn-outline-glass"
            style={{ padding: '0.85rem 1.8rem', fontSize: '0.95rem', borderRadius: '999px', color: 'var(--color-dark-teal) !important', background: 'var(--color-off-white)', borderColor: 'var(--color-dark-teal)' }}
          >
            <GithubIcon size={18} /> GitHub do Projeto
          </a>
        )}
      </div>

    </article>
  );
}
