import React from 'react';
import { Link } from 'react-router-dom';
import { DEFAULT_SERVICES } from '../data/defaultData';
import { ShieldCheck, Cpu, Cloud, Sparkles, ArrowRight } from 'lucide-react';

export default function Home({ profile, projects, posts }) {
  const featuredProjects = projects.filter(p => p.is_featured);
  const standardProjects = projects.filter(p => !p.is_featured);

  return (
    <div className="portfolio-container">

      {/* ============================================================
         SEÇÃO 1 — HERO EXECUTIVO EM LIQUID GLASS
         ============================================================ */}
      <section className="corp-hero">
        <div className="hero-inner">
          <div className="corp-badge">
            <Sparkles size={14} />
            <span>Consultoria & Engenharia de Software</span>
          </div>
          
          <h1>
            Engenharia de software, inteligência artificial e <span className="highlight-blue">plataformas de alto desempenho</span>
          </h1>
          
          <p className="lead">
            {profile?.lead_bio || "Ajudo empresas e empreendedores a transformar requisitos complexos em plataformas web modernas, automações com IA, aplicativos e infraestruturas seguras e escaláveis."}
          </p>
          
          <div className="hero-actions">
            <a href="#servicos" className="corp-btn corp-btn-primary">Conhecer Serviços</a>
            <a href="#projetos" className="corp-btn corp-btn-secondary">Ver Projetos & Cases</a>
            <a
              href={`https://wa.me/${profile?.whatsapp_number || '5569992782919'}?text=${encodeURIComponent('Olá Rodrigo! Acessei seu site e gostaria de agendar uma reunião sobre um projeto.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="corp-btn corp-btn-secondary"
            >
              Falar no WhatsApp →
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================
         BARRA DE CREDENCIAIS & CONFIANÇA
         ============================================================ */}
      <section className="trust-ribbon">
        <div className="trust-item">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', color: '#60a5fa' }}>
            <ShieldCheck size={20} />
            <div className="trust-title" style={{ margin: 0 }}>Propriedade Intelectual</div>
          </div>
          <p className="trust-desc">{profile?.inpi_record || "Software registrado no INPI sob o nº 512025006506-0"}.</p>
        </div>

        <div className="trust-item">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', color: '#60a5fa' }}>
            <Cpu size={20} />
            <div className="trust-title" style={{ margin: 0 }}>Engenharia de Baixo Nível</div>
          </div>
          <p className="trust-desc">Vigilância e interceptação determinística no Kernel Linux via eBPF e módulos LSM.</p>
        </div>

        <div className="trust-item">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', color: '#60a5fa' }}>
            <Cloud size={20} />
            <div className="trust-title" style={{ margin: 0 }}>Infraestrutura em Nuvem</div>
          </div>
          <p className="trust-desc">Arquiteturas seguras e escaláveis na AWS e Cloudflare com foco em resiliência.</p>
        </div>

        <div className="trust-item">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', color: '#60a5fa' }}>
            <Sparkles size={20} />
            <div className="trust-title" style={{ margin: 0 }}>Inteligência Artificial</div>
          </div>
          <p className="trust-desc">Modelos em produção, automações de atendimento e fine-tuning especializado.</p>
        </div>
      </section>

      {/* ============================================================
         SEÇÃO 2 — SERVIÇOS & SOLUÇÕES
         ============================================================ */}
      <section id="servicos" className="services-section-corp">
        <div className="section-header-corp">
          <div className="corp-badge">Serviços & Soluções</div>
          <h2>O que eu faço pela sua empresa</h2>
          <p>Do desenvolvimento de plataformas web sob medida à automação com inteligência artificial e consultoria técnica especializada.</p>
        </div>

        <div className="services-grid-corp">
          {DEFAULT_SERVICES.map((serv) => (
            <div key={serv.id} className="service-card-corp">
              <div className="service-icon-box">{serv.icon}</div>
              <div className="tech-tag" style={{ alignSelf: 'flex-start', marginBottom: '0.65rem' }}>{serv.tag}</div>
              <h3>{serv.title}</h3>
              <p>{serv.description}</p>
            </div>
          ))}
        </div>

        {/* CARD CONSULTIVO: SITE VS PLATAFORMA WEB */}
        <div className="comparison-card-corp">
          <div className="comparison-header">
            <div className="corp-badge">Orientação ao Cliente</div>
            <h3>Qual é a diferença entre um Site Institucional e uma Plataforma Web?</h3>
            <p style={{ color: 'var(--text-body)', margin: 0 }}>Entenda qual solução faz mais sentido para o momento atual da sua empresa:</p>
          </div>

          <div className="comparison-grid-corp">
            <div className="comparison-box-item">
              <h4>Site Institucional (Vitrine Corporativa)</h4>
              <p>É a porta de entrada da sua marca. Tem como foco apresentar seus serviços, passar credibilidade, divulgar contatos e captar novos clientes que estão pesquisando sobre a sua empresa.</p>
            </div>
            <div className="comparison-box-item">
              <h4>Plataforma Web (Sistema de Operação)</h4>
              <p>É uma ferramenta de trabalho funcional. Usuários fazem login, gerenciam pedidos, agendam horários, acessam relatórios e operam fluxos de dados essenciais para o funcionamento do negócio.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
         SEÇÃO 3 — PROJETOS EM DESTAQUE (CASE STUDIES)
         ============================================================ */}
      <section id="projetos" className="projects-section-corp">
        <div className="section-header-corp">
          <div className="corp-badge">Portfólio & Pesquisa</div>
          <h2>Projetos e Soluções em Destaque</h2>
          <p>Conheça alguns dos sistemas, plataformas e softwares proprietários desenvolvidos em produção.</p>
        </div>

        <div className="projects-grid-corp">
          
          {/* PROJETOS DESTACADOS EM LARGURA TOTAL */}
          {featuredProjects.map((proj) => (
            <div key={proj.id} className="project-card-corp featured-full">
              <div className="project-img-box">
                <img src={proj.cover_image || proj.hero_image} alt={proj.title} loading="lazy" />
              </div>
              <div className="project-content-box">
                <div className="browser-chrome" style={{ margin: '-1.85rem -1.85rem 1.25rem -1.85rem' }}>
                  <div className="browser-dots">
                    <span className="browser-dot red"></span>
                    <span className="browser-dot yellow"></span>
                    <span className="browser-dot green"></span>
                  </div>
                  <span className="browser-url">rodrigofreire.dev/projetos/{proj.slug}</span>
                </div>
                <div className="corp-badge" style={{ alignSelf: 'flex-start' }}>{proj.badge}</div>
                <h3>{proj.title}</h3>
                <p>{proj.summary}</p>
                <div className="project-tags-list">
                  {proj.tags?.map((t, idx) => (
                    <span key={idx} className="tech-tag">{t}</span>
                  ))}
                </div>
                <Link to={`/projetos/${proj.slug}`} className="corp-btn corp-btn-primary" style={{ marginTop: 'auto' }}>
                  Conhecer o Projeto →
                </Link>
              </div>
            </div>
          ))}

          {/* DEMAIS PROJETOS EM GRID PADRÃO */}
          {standardProjects.slice(0, 4).map((proj) => (
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
                <Link to={`/projetos/${proj.slug}`} className="corp-btn corp-btn-secondary" style={{ marginTop: 'auto' }}>
                  Ver Detalhes do Projeto →
                </Link>
              </div>
            </div>
          ))}

        </div>

        <div style={{ textAlign: 'center', marginTop: '1rem', marginBottom: '4.5rem' }}>
          <Link to="/projetos" className="corp-btn corp-btn-secondary">
            Ver Todos os {projects.length} Projetos do Portfólio →
          </Link>
        </div>
      </section>

      {/* ============================================================
         SEÇÃO 4 — SOBRE RODRIGO FREIRE
         ============================================================ */}
      <section id="sobre" className="about-section-corp">
        <div className="about-grid">
          <div className="about-avatar-box">
            {profile?.avatar_url ? (
              <img src={profile.avatar_url} alt={profile.full_name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
            ) : (
              "RF"
            )}
          </div>
          <div className="about-text">
            <div className="corp-badge">Perfil Profissional</div>
            <h3>{profile?.full_name || "Rodrigo Freire"}</h3>
            <p>{profile?.about_text}</p>
            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/sobre" className="corp-btn corp-btn-secondary">
                Ler Trajetória Completa →
              </Link>
              <a
                href={`https://wa.me/${profile?.whatsapp_number || '5569992782919'}?text=${encodeURIComponent('Olá Rodrigo! Gostaria de conversar com você sobre um projeto.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="corp-btn corp-btn-primary"
              >
                Entrar em Contato Direto →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
         SEÇÃO 5 — ARTIGOS RECENTES NO BLOG
         ============================================================ */}
      <section className="blog-section-corp">
        <div className="section-header-corp">
          <div className="corp-badge">Artigos & Publicações</div>
          <h2>Publicações e Conteúdos Recentes</h2>
          <p>Reflexões sobre mercado de tecnologia, arquitetura de sistemas, eficiência de hardware e inteligência artificial.</p>
        </div>

        <div className="blog-grid-corp">
          {posts.slice(0, 3).map((post) => (
            <div key={post.id} className="blog-card-corp">
              <div className="tech-tag" style={{ alignSelf: 'flex-start', marginBottom: '0.6rem' }}>
                {new Date(post.published_at).toLocaleDateString('pt-BR')}
              </div>
              <h4><Link to={`/blog/${post.slug}`}>{post.title}</Link></h4>
              <p>{post.description}</p>
              <Link to={`/blog/${post.slug}`} className="corp-btn corp-btn-secondary" style={{ padding: '0.5rem 1.1rem', fontSize: '0.85rem', marginTop: 'auto', alignSelf: 'flex-start' }}>
                Ler Artigo Completo →
              </Link>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', marginBottom: '4.5rem' }}>
          <Link to="/blog" className="corp-btn corp-btn-secondary">
            Acessar Todas as Publicações do Blog →
          </Link>
        </div>
      </section>

      {/* ============================================================
         BANNER DE CONTATO FINAL (CTA)
         ============================================================ */}
      <section className="cta-banner-corp">
        <div className="corp-badge" style={{ background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)', color: '#ffffff' }}>
          Atendimento Personalizado
        </div>
        <h3>Pronto para tirar o seu projeto do papel?</h3>
        <p>Vamos estruturar a melhor solução tecnológica para a sua empresa, com código profissional, prazo cumprido e suporte dedicado.</p>
        <a
          href={`https://wa.me/${profile?.whatsapp_number || '5569992782919'}?text=${encodeURIComponent('Olá Rodrigo! Gostaria de solicitar uma proposta técnica para o meu projeto.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="corp-btn corp-btn-primary"
          style={{ fontSize: '1.05rem', padding: '0.9rem 2.2rem' }}
        >
          Conversar com Rodrigo no WhatsApp →
        </a>
      </section>

    </div>
  );
}
