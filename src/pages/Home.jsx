import React, { useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  DEFAULT_HOME_OFFERS,
  DEFAULT_STEPS,
  DEFAULT_HOME_SETTINGS,
  DEFAULT_HERO_SLIDES,
  DEFAULT_PROJECTS
} from '../data/defaultData';
import {
  Wrench,
  Layers,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  MessageSquare,
  Send,
  ExternalLink,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import SEO from '../components/SEO';
import HeroCarousel from '../components/HeroMockups/HeroCarousel';
import useScrollReveal from '../hooks/useScrollReveal';
import useTypewriter from '../hooks/useTypewriter';

const ICON_MAP = { Wrench, Layers };

// Projetos em destaque na Home: texto de uma linha. O detalhe fica na página do projeto.
const HOME_PROJECT_LINES = {
  appfitness: 'Plataforma SaaS de treinos, em produção.',
  'imunno-system': 'Defesa autônoma para servidores Linux. Registro de programa de computador no INPI.',
  syscallcage: 'Jaula de segurança open source para agentes de IA, no kernel Linux.'
};
const HOME_PROJECT_SLUGS = ['appfitness', 'imunno-system', 'syscallcage'];

// Vitrine interativa de 5 sistemas sob medida em carrossel
const SHOWCASE_TEMPLATES = [
  {
    id: 'loja',
    tabLabel: 'Loja Online',
    category: 'E-commerce & Catálogo',
    title: 'Lumina Boutique',
    desc: 'Provador virtual, catálogo com fotos reais e fechamento de pedidos direto no WhatsApp.',
    path: '/roupa-feminina',
    iframeSrc: '/templates/roupa-feminina/index.html?embed=hero',
    demoUrl: '/templates/roupa-feminina/',
    highlights: ['Abre rápido no celular', 'Pedido direto no WhatsApp'],
    whatsappMsg: 'Olá Rodrigo. Vi o modelo de Loja Online no seu site e gostaria de uma solução sob medida para o meu comércio.'
  },
  {
    id: 'erp',
    tabLabel: 'ERP Gestão',
    category: 'Gestão & Finanças',
    title: 'Apex Gestão ERP',
    desc: 'Fluxo de caixa diário, faturamento, contas a pagar e receber em uma única tela sem complicação.',
    path: '/erp',
    iframeSrc: '/templates/erp/index.html?embed=hero',
    demoUrl: '/templates/erp/',
    highlights: ['Fluxo de caixa em tempo real', 'Relatório limpo sem burocracia'],
    whatsappMsg: 'Olá Rodrigo. Vi a demonstração de ERP no seu site e gostaria de conversar sobre um sistema de gestão sob medida para a minha empresa.'
  },
  {
    id: 'pdv',
    tabLabel: 'PDV Caixa',
    category: 'Ponto de Venda & Frente de Caixa',
    title: 'Caixa Ágil PDV',
    desc: 'Venda rápida por código de barras, cálculo automático de troco e recebimento via Pix instantâneo.',
    path: '/pdv',
    iframeSrc: '/templates/pdv/index.html?embed=hero',
    demoUrl: '/templates/pdv/',
    highlights: ['Não trava no horário de pico', 'Pix e comprovante em segundos'],
    whatsappMsg: 'Olá Rodrigo. Vi o modelo de Frente de Caixa PDV no seu site e gostaria de um sistema assim para o meu ponto de venda.'
  },
  {
    id: 'os',
    tabLabel: 'Ordem de Serviço',
    category: 'Assistência & Chamados',
    title: 'Oficina & Reparo OS',
    desc: 'Entrada de equipamentos, laudo técnico e envio de orçamento com aprovação direto no WhatsApp.',
    path: '/ordem-servico',
    iframeSrc: '/templates/ordem-servico/index.html?embed=hero',
    demoUrl: '/templates/ordem-servico/',
    highlights: ['Aprovação de orçamento no WhatsApp', 'Histórico completo do aparelho'],
    whatsappMsg: 'Olá Rodrigo. Vi o modelo de Ordem de Serviço no seu site e gostaria de um sistema para a minha assistência/oficina.'
  },
  {
    id: 'agendador',
    tabLabel: 'Agendamento',
    category: 'Salão, Barbearia & Clínica',
    title: 'Agenda Fácil',
    desc: 'O cliente escolhe o serviço e o horário livre sozinho, 24h por dia, com lembrete automático no WhatsApp.',
    path: '/agendador',
    iframeSrc: '/templates/agendador/index.html?embed=hero',
    demoUrl: '/templates/agendador/',
    highlights: ['Reduz faltas com lembretes', 'Cliente agenda sozinho 24h'],
    whatsappMsg: 'Olá Rodrigo. Vi o modelo de Agendamento Online no seu site e gostaria de implementar no meu negócio.'
  }
];

export default function Home({ profile }) {
  useScrollReveal();
  const phone = (profile?.whatsapp_number ? String(profile.whatsapp_number).replace(/\D/g, '') : '') || '5569992782919';

  // Carrossel de Sistemas sob medida da vitrine
  const [currentTemplateIndex, setCurrentTemplateIndex] = useState(0);
  const currentTemplate = SHOWCASE_TEMPLATES[currentTemplateIndex];

  // SPEC-SITE-007: Carrossel de 5 mockups e título sincronizado
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isTextFading, setIsTextFading] = useState(false);
  const activeSlideIndexRef = useRef(activeSlideIndex);
  activeSlideIndexRef.current = activeSlideIndex;

  const heroSlides = DEFAULT_HERO_SLIDES;
  const currentSlide = heroSlides[activeSlideIndex] || heroSlides[0];
  const typedLabel = useTypewriter(currentSlide.label);

  const handleSlideChange = useCallback((newIndex) => {
    if (newIndex === activeSlideIndexRef.current) return;
    setIsTextFading(true);
    setTimeout(() => {
      setActiveSlideIndex(newIndex);
      setIsTextFading(false);
    }, 180);
  }, []);

  // Formulário de solicitação de avaliação operacional
  const [formData, setFormData] = useState({
    nome: '',
    whatsapp: '',
    empresa: '',
    problema: ''
  });
  const [formStatus, setFormStatus] = useState('idle'); // 'idle' | 'sending' | 'success'
  const [submittedWhatsappUrl, setSubmittedWhatsappUrl] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormStatus('sending');
    const text = `Olá Rodrigo! Vim pelo seu site e gostaria de solicitar uma avaliação operacional:\n\n*Nome:* ${formData.nome}\n*WhatsApp:* ${formData.whatsapp}\n*Empresa:* ${formData.empresa}\n*O que precisa de atenção:* ${formData.problema}`;
    const targetUrl = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    setSubmittedWhatsappUrl(targetUrl);

    setTimeout(() => {
      const win = window.open(targetUrl, '_blank', 'noopener,noreferrer');
      if (!win || win.closed || typeof win.closed === 'undefined') {
        window.location.href = targetUrl;
      }
      setFormStatus('success');
    }, 300);
  };

  const homeJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'Rodrigo Freire Tech',
    'image': 'https://rodrigofreire.dev.br/og-default.png',
    'url': 'https://rodrigofreire.dev.br',
    'telephone': '+5569992782919',
    'priceRange': '$$',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Porto Velho',
      'addressRegion': 'RO',
      'addressCountry': 'BR'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': -8.7619,
      'longitude': -63.9039
    },
    'openingHoursSpecification': {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      'opens': '08:00',
      'closes': '18:00'
    },
    'sameAs': [
      'https://github.com/rodrigoffreir3'
    ],
    'description': 'Desenvolvimento de sistemas sob medida, suporte técnico de TI e automação para empresas em Porto Velho, RO.'
  };

  const heroBadge = DEFAULT_HOME_SETTINGS.hero_badge;
  const heroTitle = DEFAULT_HOME_SETTINGS.hero_title;
  const heroDesc = DEFAULT_HOME_SETTINGS.hero_desc;
  const heroChips = DEFAULT_HOME_SETTINGS.hero_chips;
  const heroPrimaryCta = DEFAULT_HOME_SETTINGS.hero_primary_cta;
  const heroWhatsappMsg = DEFAULT_HOME_SETTINGS.hero_whatsapp_msg;
  const heroSecondaryCta = DEFAULT_HOME_SETTINGS.hero_secondary_cta;

  const featuredProjects = HOME_PROJECT_SLUGS
    .map((slug) => DEFAULT_PROJECTS.find((p) => p.slug === slug))
    .filter(Boolean);

  return (
    <div className="home-enterprise-wrapper">
      <SEO
        title="Rodrigo Freire Tech · Sistemas sob medida e suporte de TI — Porto Velho"
        description="Sistemas sob medida, sites, lojas online, automação e suporte técnico de TI para empresas de Porto Velho. Escopo e preço por escrito."
        canonicalPath="/"
        jsonLd={homeJsonLd}
      />

      {/* HERO */}
      <section className="corp-hero-enterprise" id="inicio">
        <div className="hero-enterprise-inner">
          <div className="hero-enterprise-grid">
            <div className="hero-enterprise-copy">

              <div className="hero-pill-badge">
                <Sparkles size={14} />
                <span>{heroBadge}</span>
              </div>

              <h1 className="hero-enterprise-title">
                {heroTitle}
              </h1>

              {/* SPEC-SITE-007 RF-4: linha digitada (apenas no hero) */}
              <div className="hero-typewriter-line" aria-hidden="true">
                <span className="hero-typewriter-prefix">Na prática:</span>{' '}
                <span className="hero-typewriter-text">{typedLabel}</span>
                <span className="hero-typewriter-cursor" />
              </div>

              <p className="hero-enterprise-desc">
                {heroDesc}
              </p>

              {/* SPEC-SITE-007 RF-3: título sincronizado com o slide */}
              <div className={`hero-argument-box ${isTextFading ? 'fading' : ''}`}>
                <h2 className="hero-argument-title">{currentSlide.titulo}</h2>
              </div>

            </div>

            <div className="hero-enterprise-visual">
              <HeroCarousel
                slides={heroSlides}
                activeIndex={activeSlideIndex}
                onSelectIndex={handleSlideChange}
                onSlideChange={handleSlideChange}
              />
            </div>
          </div>

          <div className="hero-enterprise-footer">
            <div className="hero-pain-chips-row">
              {heroChips.map((chip, idx) => (
                <span key={idx} className="hero-pain-chip-item">
                  <CheckCircle2 size={15} color="#3533cd" />
                  <span>{chip}</span>
                </span>
              ))}
            </div>

            <div className="hero-actions-row">
              <a
                href={`https://wa.me/${phone}?text=${encodeURIComponent(heroWhatsappMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="corp-btn-accent"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}
              >
                <MessageSquare size={18} />
                <span>{heroPrimaryCta}</span>
              </a>

              <a
                href="#servicos"
                className="corp-btn-outline-glass"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}
              >
                <span>{heroSecondaryCta}</span>
                <ChevronRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* VITRINE DE SISTEMAS EM CARROSSEL */}
      <section className="section-solutions-showcase" id="solucoes-amigaveis">
        <div className="solutions-showcase-inner">
          <div className="section-head-center">
            <span className="section-tag-pill">
              <Sparkles size={14} style={{ display: 'inline', marginRight: '4px' }} />
              Sistemas sob medida
            </span>
            <h2 className="section-title-large">
              Sistemas amigáveis e fáceis de entender.
            </h2>
            <p className="section-desc-subtle" style={{ maxWidth: '640px', margin: '0.65rem auto 1.5rem', fontSize: '0.94rem', color: 'var(--text-body)', lineHeight: '1.6' }}>
              Teste abaixo as demonstrações reais de sistemas desenvolvidos para atender as rotinas do comércio e de empresas locais:
            </p>
          </div>

          {/* ABAS DO CARROSSEL DE TEMPLATES */}
          <div className="template-carousel-tabs" role="tablist" aria-label="Seletor de Sistemas">
            {SHOWCASE_TEMPLATES.map((tmpl, idx) => (
              <button
                key={tmpl.id}
                type="button"
                role="tab"
                aria-selected={idx === currentTemplateIndex}
                className={`template-tab-pill ${idx === currentTemplateIndex ? 'is-active' : ''}`}
                onClick={() => setCurrentTemplateIndex(idx)}
              >
                <span>{tmpl.tabLabel}</span>
              </button>
            ))}
          </div>

          <div className="template-showcase-card">
            <div className="template-browser-topbar">
              <div className="template-browser-dots">
                <span className="dot dot-red" />
                <span className="dot dot-yellow" />
                <span className="dot dot-green" />
              </div>
              <div className="template-browser-url-pill">
                <span className="url-lock">🔒</span>
                <span className="url-domain">templates.rodrigofreire.dev.br</span>
                <span className="url-path">{currentTemplate.path}</span>
              </div>
              <div className="template-browser-nav-arrows">
                <button
                  type="button"
                  className="browser-nav-arrow-btn"
                  onClick={() => setCurrentTemplateIndex((prev) => (prev > 0 ? prev - 1 : SHOWCASE_TEMPLATES.length - 1))}
                  aria-label="Sistema anterior"
                  title="Sistema anterior"
                >
                  <ChevronLeft size={14} />
                </button>
                <span className="template-counter-indicator">{currentTemplateIndex + 1}/{SHOWCASE_TEMPLATES.length}</span>
                <button
                  type="button"
                  className="browser-nav-arrow-btn"
                  onClick={() => setCurrentTemplateIndex((prev) => (prev < SHOWCASE_TEMPLATES.length - 1 ? prev + 1 : 0))}
                  aria-label="Próximo sistema"
                  title="Próximo sistema"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
              <div className="template-status-pill">
                <span className="status-ping" />
                <span>Demonstração · Ao Vivo</span>
              </div>
            </div>

            <div className="template-viewport-container">
              <iframe
                key={currentTemplate.id}
                src={currentTemplate.iframeSrc}
                title={`Demonstração: ${currentTemplate.title}`}
                className="template-live-iframe"
                loading="lazy"
              />
            </div>

            <div className="template-showcase-footer">
              <div className="template-footer-details">
                <div className="template-tag-category">
                  <Sparkles size={13} style={{ display: 'inline', marginRight: '4px' }} />
                  {currentTemplate.category}
                </div>
                <h3 className="template-footer-title">{currentTemplate.title}</h3>
                <p className="template-footer-desc">
                  {currentTemplate.desc}
                </p>
                <div className="template-footer-highlights">
                  {currentTemplate.highlights.map((h, i) => (
                    <span key={i}><CheckCircle2 size={14} color="#3533cd" /> {h}</span>
                  ))}
                </div>
              </div>

              <div className="template-footer-cta-col">
                <a
                  href={currentTemplate.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="corp-btn-accent"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', padding: '0.85rem 1.6rem', fontSize: '0.92rem' }}
                >
                  <span>Abrir em tela cheia</span>
                  <ExternalLink size={16} />
                </a>
                <a
                  href={`https://wa.me/${phone}?text=${encodeURIComponent(currentTemplate.whatsappMsg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="corp-link-text"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.86rem', marginTop: '0.5rem' }}
                >
                  <MessageSquare size={14} /> Quero um sistema assim
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVIÇOS: DUAS FRENTES */}
      <section className="section-services-catalog scroll-reveal" id="servicos" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>
        <div className="section-head-center">
          <span className="section-tag-pill">Serviços</span>
          <h2 className="section-title-large">O que eu faço</h2>
        </div>

        <div className="services-catalog-grid" style={{ gap: '2rem', marginTop: '2.5rem' }}>
          {DEFAULT_HOME_OFFERS.map((offer) => {
            const IconComponent = ICON_MAP[offer.icon] || Wrench;
            return (
              <div key={offer.id} className="service-card-liquid stagger-card" style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="service-card-header">
                  <div className="service-icon-wrapper">
                    <IconComponent size={22} />
                  </div>
                  <span className="service-card-tag">{offer.tag}</span>
                </div>

                <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'var(--text-heading)' }}>
                  {offer.title}
                </h3>

                <ul className="service-deliverables-list" style={{ marginBottom: '1.25rem' }}>
                  {offer.items.map((item) => (
                    <li key={item} className="service-deliverable-item">
                      <CheckCircle2 size={15} color="#3533cd" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="service-card-footer" style={{ paddingTop: '0.75rem', borderTop: '1px solid var(--color-gray-ui)', marginTop: 'auto' }}>
                  <a
                    href={`https://wa.me/${phone}?text=${encodeURIComponent(offer.whatsapp_msg)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="service-btn-contact"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    Pedir orçamento <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* MÉTODO */}
      <section className="section-methodology-bg scroll-reveal" id="como-funciona" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div className="methodology-inner">
          <div className="section-head-center">
            <span className="section-tag-pill">Como funciona</span>
            <h2 className="section-title-large">Quatro etapas, preço combinado antes.</h2>
          </div>

          <div className="methodology-grid-steps" style={{ marginTop: '2.5rem' }}>
            {DEFAULT_STEPS.map((step) => (
              <div key={step.number} className="method-step-card stagger-card">
                <div className="step-num-badge">{step.number}</div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{step.title}</h3>
                <p style={{ fontSize: '0.93rem', lineHeight: '1.5', color: 'var(--text-body)' }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJETOS EM DESTAQUE */}
      <section className="section-featured-projects scroll-reveal" id="projetos" style={{ paddingTop: '4rem', paddingBottom: '3.5rem', borderTop: '1px solid rgba(0, 0, 0, 0.06)' }}>
        <div className="portfolio-container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div className="section-head-center" style={{ marginBottom: '2.5rem' }}>
            <span className="section-tag-pill">Projetos</span>
            <h2 className="section-title-large">Sistemas que eu construí</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.75rem' }}>
            {featuredProjects.map((proj) => (
              <div key={proj.id} className="service-card-liquid stagger-card" style={{ display: 'flex', flexDirection: 'column', padding: '1.85rem' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.65rem', color: 'var(--text-heading)' }}>
                  <Link to={`/projetos/${proj.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {proj.title}
                  </Link>
                </h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-body)', lineHeight: '1.5', marginBottom: '1.25rem', flex: 1 }}>
                  {HOME_PROJECT_LINES[proj.slug] || proj.summary}
                </p>
                <div className="service-card-footer" style={{ paddingTop: '0.75rem', borderTop: '1px solid var(--color-gray-ui)', marginTop: 'auto' }}>
                  <Link
                    to={`/projetos/${proj.slug}`}
                    className="corp-link-text"
                    style={{ fontSize: '0.86rem', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                  >
                    Ver detalhes <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link
              to="/projetos"
              className="corp-btn-outline-glass"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.8rem', textDecoration: 'none' }}
            >
              <span>Ver todos os projetos</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* CONTATO */}
      <section className="section-diagnostic-contact" id="contato" style={{ paddingTop: '4rem', paddingBottom: '5rem' }}>
        <div className="diagnostic-contact-inner" style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <div className="diagnostic-info-card">
            <div>
              <span className="section-tag-pill">
                <Sparkles size={14} style={{ display: 'inline', marginRight: '4px' }} />
                Contato
              </span>

              <h2 className="section-title-large" style={{ fontSize: 'clamp(1.65rem, 2.3vw, 2.2rem)', lineHeight: '1.25' }}>
                Conta o que você precisa que eu respondo no WhatsApp.
              </h2>

              <p className="diagnostic-statement-accent">
                Atendimento direto comigo, em Porto Velho, presencial ou remoto.
              </p>
            </div>
          </div>

          <form onSubmit={handleFormSubmit} className="diagnostic-form-glass">
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', color: 'var(--text-heading)' }}>
              Solicitar avaliação da sua operação
            </h3>

            {formStatus === 'success' ? (
              <div className="form-feedback-success" role="status" aria-live="polite">
                <CheckCircle2 size={24} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong>Solicitação enviada.</strong>
                  <p>O WhatsApp foi aberto para você confirmar os dados comigo diretamente.</p>
                  {submittedWhatsappUrl && (
                    <a
                      href={submittedWhatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="corp-link-text"
                      style={{ fontSize: '0.86rem', marginTop: '0.45rem', display: 'inline-block', padding: '0.2rem 0' }}
                    >
                      Clique aqui caso o WhatsApp não tenha aberto automaticamente
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setFormStatus('idle');
                      setFormData({ nome: '', whatsapp: '', empresa: '', problema: '' });
                    }}
                    className="corp-btn-outline-glass"
                    style={{ marginTop: '1rem', width: '100%', fontSize: '0.85rem', padding: '0.6rem 1rem' }}
                  >
                    Enviar nova solicitação
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="form-group-item">
                  <label className="form-label-corp">Seu nome</label>
                  <input
                    type="text"
                    required
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    placeholder="Ex: Carlos Oliveira"
                    className="form-input-corp"
                  />
                </div>

                <div className="form-group-item">
                  <label className="form-label-corp">WhatsApp</label>
                  <input
                    type="tel"
                    required
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    placeholder="(69) 99999-9999"
                    className="form-input-corp"
                  />
                </div>

                <div className="form-group-item">
                  <label className="form-label-corp">Nome da sua empresa</label>
                  <input
                    type="text"
                    required
                    value={formData.empresa}
                    onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                    placeholder="Ex: Comercial Rondônia Ltda"
                    className="form-input-corp"
                  />
                </div>

                <div className="form-group-item">
                  <label className="form-label-corp">O que precisa de atenção na sua operação</label>
                  <textarea
                    required
                    rows={3}
                    value={formData.problema}
                    onChange={(e) => setFormData({ ...formData, problema: e.target.value })}
                    placeholder="Ex: Computadores lentos no balcão, perda de tempo com planilhas manuais da equipe, receio de perder dados por falta de backup..."
                    className="form-input-corp"
                    style={{ resize: 'vertical' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className="corp-btn-accent"
                  style={{ width: '100%', marginTop: '0.5rem', justifyContent: 'center' }}
                >
                  <Send size={16} /> {formStatus === 'sending' ? 'Abrindo conversa no WhatsApp...' : 'Enviar mensagem para o WhatsApp'}
                </button>
              </>
            )}
          </form>
        </div>
      </section>

    </div>
  );
}
