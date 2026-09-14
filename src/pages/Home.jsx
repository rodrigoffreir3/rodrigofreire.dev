import React, { useState, useCallback, useRef } from 'react';
import { 
  DEFAULT_SERVICES, 
  DEFAULT_RISKS, 
  DEFAULT_STEPS, 
  DEFAULT_HOME_SETTINGS,
  DEFAULT_FDE_COMPARISON,
  DEFAULT_HERO_SLIDES 
} from '../data/defaultData';
import {
  Wrench,
  ShoppingCart,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Database,
  ArrowRight,
  ArrowDown,
  Sparkles,
  Layers,
  BarChart3,
  Server,
  Network,
  Cpu,
  ShieldAlert,
  Gauge,
  Workflow,
  MapPin,
  MessageSquare,
  AlertOctagon,
  Check,
  XCircle,
  Send,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import SEO from '../components/SEO';
import HeroCarousel from '../components/HeroMockups/HeroCarousel';
import useScrollReveal from '../hooks/useScrollReveal';
import useTypewriter from '../hooks/useTypewriter';

const ICON_MAP = {
  Wrench,
  ShoppingCart,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Database,
  Layers,
  BarChart3,
  Server,
  Network,
  Cpu
};

export default function Home({ profile }) {
  useScrollReveal();
  const phone = (profile?.whatsapp_number ? String(profile.whatsapp_number).replace(/\D/g, '') : '') || '5569992782919';

  // SPEC-SITE-007: Carrossel de 5 mockups e textos sincronizados
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
    const text = `Olá Rodrigo! Vim pelo seu site e gostaria de solicitar uma avaliação operacional:\n\n*Nome:* ${formData.nome}\n*WhatsApp:* ${formData.whatsapp}\n*Empresa/Comércio:* ${formData.empresa || 'Não informado'}\n*O que precisa de atenção:* ${formData.problema}`;
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
    'description': 'Desenvolvimento de sistemas sob medida, automação de processos e infraestrutura de tecnologia para empresas em Porto Velho, RO.'
  };

  const heroBadge = DEFAULT_HOME_SETTINGS.hero_badge || 'Rodrigo Freire Tech · Porto Velho, RO';
  const heroTitle = DEFAULT_HOME_SETTINGS.hero_title || 'Sistemas sob medida para a sua empresa vender mais.';
  const heroDesc = DEFAULT_HOME_SETTINGS.hero_desc || 'Desenvolvo e mantenho a tecnologia que a sua operação usa todos os dias: sistemas próprios, automação das rotinas manuais da equipe e estabilidade de caixa e rede. Cada projeto começa com escopo e preço fechados por escrito. Quem executa o trabalho é quem atende você depois.';
  const heroChips = DEFAULT_HOME_SETTINGS.hero_chips || [
    'Sistemas, sites e lojas online desenvolvidos sob medida',
    'Automação e inteligência artificial aplicadas às rotinas da equipe',
    'Estabilidade de caixa, rede comercial e dados protegidos',
    'Escopo e preço definidos por escrito antes de começar'
  ];
  const heroPrimaryCta = DEFAULT_HOME_SETTINGS.hero_primary_cta || 'Solicitar avaliação da sua operação';
  const heroWhatsappMsg = DEFAULT_HOME_SETTINGS.hero_whatsapp_msg || 'Olá Rodrigo. Sou de uma empresa em Porto Velho e gostaria de solicitar uma avaliação da nossa operação de tecnologia.';
  const heroSecondaryCta = DEFAULT_HOME_SETTINGS.hero_secondary_cta || 'Conhecer os quatro pilares de atuação';

  return (
    <div className="home-enterprise-wrapper">
      <SEO
        title="Rodrigo Freire Tech · Sistemas sob medida para empresas — Porto Velho"
        description="Desenvolvimento de sistemas, sites e lojas online sob medida, automação de rotinas manuais e estabilidade de caixa e rede para empresas de Porto Velho. Escopo e preço fechados por escrito."
        canonicalPath="/"
        jsonLd={homeJsonLd}
      />

      {/* ============================================================
         BLOCO 1: ABERTURA (HERO B2B INSTITUCIONAL) — CARRO-CHEFE
         ============================================================ */}
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

              {/* SPEC-SITE-007 RF-4: Linha com efeito digitado (typewriter) */}
              <div className="hero-typewriter-line" aria-hidden="true">
                <span className="hero-typewriter-prefix">Na prática:</span>{' '}
                <span className="hero-typewriter-text">{typedLabel}</span>
                <span className="hero-typewriter-cursor" />
              </div>

              <p className="hero-enterprise-desc">
                {heroDesc}
              </p>

              {/* SPEC-SITE-007 RF-3: Bloco de Argumento Comercial Sincronizado */}
              <div className={`hero-argument-box ${isTextFading ? 'fading' : ''}`}>
                <div className="hero-argument-header">
                  <span className="hero-argument-tag">{currentSlide.label}</span>
                  <h2 className="hero-argument-title">{currentSlide.titulo}</h2>
                </div>
                <p className="hero-argument-desc">{currentSlide.texto}</p>
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

          {/* Rodapé do Hero: Chips operacionais e Botões de Ação (Sempre após as animações) */}
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

      {/* ============================================================
         VITRINE: EXEMPLOS DE SOLUÇÕES AMIGÁVEIS QUE RESOLVEM PROBLEMAS
         ============================================================ */}
      <section className="section-solutions-showcase" id="solucoes-amigaveis">
        <div className="solutions-showcase-inner">
          <div className="section-head-center">
            <span className="section-tag-pill">
              <Sparkles size={14} style={{ display: 'inline', marginRight: '4px' }} />
              Soluções Digitais sob Medida · Varejo & Vendas
            </span>
            <h2 className="section-title-large">
              Exemplos de Soluções amigáveis que resolvem problemas
            </h2>
            <p className="section-desc-subtle">
              Interfaces modernas de altíssimo impacto visual, carregamento instantâneo e navegação intuitiva, projetadas para reter a atenção do cliente e conectar seu público diretamente ao WhatsApp da equipe comercial.
            </p>
          </div>

          {/* MOLDURA DE NAVEGADOR COM O PRIMEIRO TEMPLATE EMBARCADO */}
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
                <span className="url-path">/roupa-feminina</span>
              </div>
              <div className="template-status-pill">
                <span className="status-ping" />
                <span>Template 01 · No Ar</span>
              </div>
            </div>

            <div className="template-viewport-container">
              <iframe
                src="/templates/roupa-feminina/index.html?embed=hero"
                title="Demonstração do Template 01: Lumina Boutique - Moda Feminina"
                className="template-live-iframe"
                loading="lazy"
              />
            </div>

            <div className="template-showcase-footer">
              <div className="template-footer-details">
                <div className="template-tag-category">
                  <Sparkles size={13} style={{ display: 'inline', marginRight: '4px' }} />
                  E-commerce & Varejo de Moda
                </div>
                <h3 className="template-footer-title">Lumina Boutique & Atelier · Vitrine Digital 360°</h3>
                <p className="template-footer-desc">
                  Provador virtual interativo com rotação de manequins (frente e costas), detalhamento de tecidos nobres, valores claros e canal direto de atendimento via WhatsApp. Sem códigos pesados de terceiros, com abertura imediata no celular.
                </p>
                <div className="template-footer-highlights">
                  <span><CheckCircle2 size={14} color="#3533cd" /> Carregamento em menos de 1 segundo</span>
                  <span><CheckCircle2 size={14} color="#3533cd" /> Sem bibliotecas pesadas de animação</span>
                  <span><CheckCircle2 size={14} color="#3533cd" /> 100% responsivo para smartphone</span>
                </div>
              </div>

              <div className="template-footer-cta-col">
                <a
                  href="https://templates-rodrigofreire-dev.rodrigo-freire1040z.workers.dev/roupa-feminina/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="corp-btn-accent"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', padding: '0.85rem 1.6rem', fontSize: '0.92rem' }}
                >
                  <span>Abrir Demonstração Completa</span>
                  <ExternalLink size={16} />
                </a>
                <a
                  href={`https://wa.me/${phone}?text=${encodeURIComponent('Olá Rodrigo. Vi o template de Loja de Roupa Feminina no seu site e gostaria de uma solução sob medida para o meu negócio.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="corp-link-text"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.86rem', marginTop: '0.5rem' }}
                >
                  <MessageSquare size={14} /> Solicitar solução sob medida
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
         SEÇÃO DE RISCOS: TRÊS PROBLEMAS QUE CUSTAM DINHEIRO (SPEC-SITE-008 Seção 3.2)
         ============================================================ */}
      <section className="section-risks scroll-reveal" id="riscos">
        <div className="section-head-center">
          <span className="section-tag-pill" style={{ color: '#dc2626', borderColor: 'rgba(220, 38, 38, 0.25)', background: 'rgba(220, 38, 38, 0.08)' }}>
            Problemas Operacionais
          </span>
          <h2 className="section-title-large">Três problemas que custam dinheiro antes de aparecer no relatório</h2>
          <p className="section-desc-subtle">
            Na rotina comercial, o prejuízo raramente avisa com antecedência. Identificar onde a empresa está exposta é o primeiro passo para garantir estabilidade real.
          </p>
        </div>

        <div className="risks-grid">
          {DEFAULT_RISKS.map((risk) => {
            const IconComp = ICON_MAP[risk.icon] || ShieldAlert;
            return (
              <div key={risk.id} className="risk-card stagger-card">
                <div className="risk-card-header">
                  <div className="risk-card-icon">
                    <IconComp size={22} />
                  </div>
                  <span className="risk-card-tag">{risk.tag}</span>
                </div>
                <h3 className="risk-card-title">{risk.title}</h3>
                <p className="risk-card-text">{risk.description}</p>
                <div className="risk-card-consequence">
                  <strong>Consequência: </strong>
                  {risk.consequence}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================
         COMPARATIVO DE MODELOS DE CONTRATAÇÃO (SPEC-SITE-008 Seção 3.3)
         ============================================================ */}
      <section className="section-fde-model scroll-reveal" id="modelos">
        <div className="section-head-center">
          <span className="section-tag-pill">
            <Sparkles size={14} style={{ display: 'inline', marginRight: '4px' }} />
            Modelos de Contratação
          </span>
          <h2 className="section-title-large">
            Três formas de resolver tecnologia na sua empresa, e o que muda em cada uma
          </h2>
          <p className="section-desc-subtle">
            Entenda como cada modelo de contratação atua na prática e a diferença para a estabilidade da sua operação:
          </p>
        </div>

        <div className="fde-comparison-grid">
          {/* MODELO 1: SUPORTE REATIVO */}
          <div className="fde-card fde-card-traditional stagger-card">
            <div className="fde-card-header">
              <div className="fde-card-icon traditional">
                <AlertOctagon size={22} />
              </div>
              <span className="fde-card-tag traditional">Modelo 1</span>
            </div>
            <h3 className="fde-card-title">Modelo 1 · Suporte reativo por chamado</h3>
            <p className="fde-card-focus">
              "Age depois da falha. O atendimento começa quando o equipamento já parou e o prejuízo do dia já aconteceu."
            </p>
            <div className="fde-points-list">
              <div className="fde-point-item negative">
                <XCircle size={18} className="fde-point-icon" color="#94a3b8" />
                <span><strong>Alcance da solução:</strong> Cobre equipamento e rede. Integração entre sistemas e automação de rotina ficam fora do alcance do serviço.</span>
              </div>
              <div className="fde-point-item negative">
                <XCircle size={18} className="fde-point-icon" color="#94a3b8" />
                <span><strong>Conhecimento da rotina:</strong> O atendimento é pontual, então a rotina de fechamento e o fluxo do balcão não entram na conta.</span>
              </div>
              <div className="fde-point-item negative">
                <XCircle size={18} className="fde-point-icon" color="#94a3b8" />
                <span><strong>Responsabilidade e contrato:</strong> Sem compromisso formal de continuidade. Cada chamado é uma negociação nova.</span>
              </div>
            </div>
          </div>

          {/* MODELO 2: DESENVOLVIMENTO REMOTO */}
          <div className="fde-card fde-card-distant stagger-card">
            <div className="fde-card-header">
              <div className="fde-card-icon distant">
                <Clock size={22} />
              </div>
              <span className="fde-card-tag distant">Modelo 2</span>
            </div>
            <h3 className="fde-card-title">Modelo 2 · Desenvolvimento remoto por pacote</h3>
            <p className="fde-card-focus">
              "Age dentro do escopo contratado. O que está fora do pacote fica sem dono até virar novo orçamento."
            </p>
            <div className="fde-points-list">
              <div className="fde-point-item negative">
                <XCircle size={18} className="fde-point-icon" color="#d97706" />
                <span><strong>Alcance da solução:</strong> Cobre o software encomendado. A infraestrutura que sustenta esse software continua sendo problema de outra pessoa.</span>
              </div>
              <div className="fde-point-item negative">
                <XCircle size={18} className="fde-point-icon" color="#d97706" />
                <span><strong>Conhecimento da rotina:</strong> O trabalho acontece à distância, com o entendimento da operação limitado ao que coube na reunião de levantamento.</span>
              </div>
              <div className="fde-point-item negative">
                <XCircle size={18} className="fde-point-icon" color="#d97706" />
                <span><strong>Responsabilidade e contrato:</strong> Atendimento por fila de chamados, com prazo de retorno que depende da posição na fila.</span>
              </div>
            </div>
          </div>

          {/* MODELO 3: RODRIGO FREIRE TECH */}
          <div className="fde-card fde-card-featured stagger-card">
            <div className="fde-card-header">
              <div className="fde-card-icon featured">
                <Sparkles size={22} />
              </div>
              <span className="fde-card-tag featured">Modelo 3</span>
            </div>
            <h3 className="fde-card-title" style={{ color: '#000000' }}>
              Modelo 3 · Rodrigo Freire Tech
            </h3>
            <p className="fde-card-focus" style={{ color: '#3533cd', fontWeight: '600' }}>
              "Ajo antes. Conheço a operação por dentro e trato o gargalo enquanto ele ainda é ajuste, não pane."
            </p>
            <div className="fde-points-list">
              <div className="fde-point-item positive">
                <CheckCircle2 size={18} className="fde-point-icon" color="#3533cd" />
                <span><strong>Alcance da solução:</strong> Cubro os dois lados. Do servidor ao balcão, com um único responsável pelo conjunto funcionando.</span>
              </div>
              <div className="fde-point-item positive">
                <CheckCircle2 size={18} className="fde-point-icon" color="#3533cd" />
                <span><strong>Conhecimento da rotina:</strong> Estou presencialmente na sua operação em Porto Velho. Vejo o fechamento acontecer e projeto o sistema em cima do que realmente ocorre.</span>
              </div>
              <div className="fde-point-item positive">
                <CheckCircle2 size={18} className="fde-point-icon" color="#3533cd" />
                <span><strong>Responsabilidade e contrato:</strong> Responsável técnico definido em contrato, com escopo e preço fechados por escrito e cláusula de sigilo sobre os dados da empresa.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
         QUATRO PILARES DE ATUAÇÃO (SPEC-SITE-008 Seções 3.4 e 3.5)
         ============================================================ */}
      <section className="section-services-catalog scroll-reveal" id="servicos" style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
        <div className="section-head-center">
          <span className="section-tag-pill">Pilares de Atuação</span>
          <h2 className="section-title-large">Quatro pilares de atuação</h2>
          <p className="section-desc-subtle">
            Cada pilar responde por uma frente da sua empresa, com entregáveis claros, escopo fechado e ganho comercial medido.
          </p>
        </div>

        <div className="services-catalog-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
          {DEFAULT_SERVICES.map((service) => {
            const IconComponent = ICON_MAP[service.icon] || Wrench;
            const message = service.whatsapp_msg || `Olá Rodrigo. Gostaria de solicitar uma avaliação para ${service.title}.`;

            return (
              <div key={service.id} className="service-card-liquid stagger-card" style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="service-card-header">
                  <div className="service-icon-wrapper">
                    <IconComponent size={22} />
                  </div>
                  <span className="service-card-tag">{service.tag}</span>
                </div>

                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.85rem', color: 'var(--text-heading)' }}>
                  {service.title}
                </h3>

                {service.focus && (
                  <div className="service-focus-badge">
                    <Sparkles size={15} />
                    <span>{service.focus}</span>
                  </div>
                )}

                <p style={{ fontSize: '0.94rem', color: 'var(--text-body)', lineHeight: '1.6', marginBottom: '1.25rem' }}>
                  {service.description}
                </p>

                {service.deliverables && service.deliverables.length > 0 && (
                  <div className="service-deliverables-box" style={{ marginBottom: '1.25rem' }}>
                    <div className="service-deliverables-title" style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--color-brand-ink)', marginBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Check size={14} /> Entregáveis incluídos:
                    </div>
                    <ul className="service-deliverables-list">
                      {service.deliverables.map((item, idx) => (
                        <li key={idx} className="service-deliverable-item">
                          <CheckCircle2 size={15} color="#3533cd" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div style={{ marginTop: 'auto', padding: '0.85rem 1rem', background: 'rgba(53, 51, 205, 0.06)', borderRadius: '12px', border: '1px solid rgba(53, 51, 205, 0.2)', marginBottom: '1.25rem' }}>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-heading)', lineHeight: '1.5', margin: 0 }}>
                    <strong>Ganho: </strong>
                    {service.gain}
                  </p>
                </div>

                <div className="service-card-footer" style={{ paddingTop: '0.75rem', borderTop: '1px solid var(--color-gray-ui)' }}>
                  <a
                    href={`https://wa.me/${phone}?text=${encodeURIComponent(message)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="service-btn-contact"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    Solicitar avaliação deste pilar <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================
         BLOCO 4: MÉTODO EM 4 ETAPAS (SPEC-SITE-008 Seção 3.6)
         ============================================================ */}
      <section className="section-methodology-bg scroll-reveal" id="como-funciona" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
        <div className="methodology-inner">
          <div className="section-head-center">
            <span className="section-tag-pill">Método de Trabalho</span>
            <h2 className="section-title-large">Quatro etapas, com escopo e valor definidos antes de começar</h2>
            <p className="section-desc-subtle">
              Processo transparente e previsível: você sabe exatamente o que será feito, o prazo e o investimento antes de qualquer intervenção técnica.
            </p>
          </div>

          <div className="methodology-grid-steps" style={{ marginTop: '3rem' }}>
            {DEFAULT_STEPS.map((step) => (
              <div key={step.number} className="method-step-card stagger-card">
                <div className="step-num-badge">{step.number}</div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{step.title}</h3>
                <p style={{ fontSize: '0.93rem', lineHeight: '1.6', color: 'var(--text-body)' }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
         BLOCO 5: DECISÃO DE NEGÓCIO & FORMULÁRIO (SPEC-SITE-008 Seção 3.7)
         ============================================================ */}
      <section className="section-diagnostic-contact" id="contato" style={{ paddingTop: '5rem', paddingBottom: '6rem' }}>
        <div className="diagnostic-contact-inner" style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <div className="diagnostic-info-card">
            <div>
              <span className="section-tag-pill">Decisão de Continuidade & Risco</span>
              <h2 className="section-title-large" style={{ fontSize: 'clamp(1.75rem, 2.5vw, 2.25rem)' }}>
                Descobrir uma vulnerabilidade no dia da pane custa muito mais caro que prevenir.
              </h2>
              <p className="section-desc-subtle" style={{ marginBottom: '1.75rem' }}>
                Fale diretamente comigo pelo WhatsApp para uma avaliação transparente da sua operação. Identificamos o que precisa de atenção imediata, com escopo e orçamento definidos antes de qualquer início.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#000000', fontWeight: '600' }}>
                  <CheckCircle2 size={18} color="#3533cd" /> Avaliação prática de equipamentos, rede e rotinas manuais da equipe
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#000000', fontWeight: '600' }}>
                  <CheckCircle2 size={18} color="#3533cd" /> Escopo definido e orçamento por escrito antes de começar
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#000000', fontWeight: '600' }}>
                  <CheckCircle2 size={18} color="#3533cd" /> Atendimento direto com o Rodrigo em Porto Velho (presencial ou remoto seguro)
                </div>
              </div>
            </div>

            <a
              href={`https://wa.me/${phone}?text=${encodeURIComponent('Olá Rodrigo. Sou de uma empresa em Porto Velho e gostaria de solicitar uma avaliação da nossa operação de tecnologia.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="corp-btn-outline-glass"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 1.8rem', width: 'fit-content' }}
            >
              <MessageSquare size={18} /> Solicitar avaliação da sua operação
            </a>
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
                  <label className="form-label-corp">Nome da empresa (opcional)</label>
                  <input
                    type="text"
                    value={formData.empresa}
                    onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                    placeholder="Ex: Comercial Rondônia"
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
                  <Send size={16} /> {formStatus === 'sending' ? 'Preparando conversa no WhatsApp...' : 'Enviar solicitação'}
                </button>
              </>
            )}
          </form>
        </div>
      </section>

    </div>
  );
}
