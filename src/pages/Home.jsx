import React, { useState } from 'react';
import { 
  DEFAULT_SERVICES, 
  DEFAULT_RISKS, 
  DEFAULT_STEPS, 
  DEFAULT_HOME_SETTINGS,
  DEFAULT_FDE_COMPARISON 
} from '../data/defaultData';
import {
  Wrench,
  ShoppingCart,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Gauge,
  MessageSquare,
  ArrowRight,
  ArrowDown,
  MapPin,
  Clock,
  Send,
  Sparkles,
  ShieldAlert,
  AlertOctagon,
  Check,
  XCircle
} from 'lucide-react';
import SEO from '../components/SEO';

const ICON_MAP = {
  Wrench,
  ShoppingCart,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Gauge,
  Clock,
  ShieldAlert,
  AlertOctagon
};

export default function Home({ profile }) {
  const phone = (profile?.whatsapp_number ? String(profile.whatsapp_number).replace(/\D/g, '') : '') || '5569992782919';

  // Formulário de solicitação de avaliação operacional
  const [formData, setFormData] = useState({
    nome: '',
    whatsapp: '',
    empresa: '',
    problema: ''
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const text = `Olá Rodrigo! Vim pelo seu site e gostaria de solicitar uma avaliação operacional:\n\n*Nome:* ${formData.nome}\n*WhatsApp:* ${formData.whatsapp}\n*Empresa/Comércio:* ${formData.empresa || 'Não informado'}\n*O que precisa de atenção:* ${formData.problema}`;
    const targetUrl = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    const win = window.open(targetUrl, '_blank', 'noopener,noreferrer');
    if (!win || win.closed || typeof win.closed === 'undefined') {
      window.location.href = targetUrl;
    }
  };

  const homeJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'Rodrigo Freire — TI Empresarial & Tecnologias Amigáveis',
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
    'description': 'Consultoria e suporte em TI empresarial de alto padrão em Porto Velho - RO. Atendimento ágil, redes seguras, conformidade com a LGPD e desenvolvimento de sistemas sob medida.'
  };

  const heroBadge = DEFAULT_HOME_SETTINGS.hero_badge || 'TI Empresarial de Alto Padrão · Porto Velho';
  const heroTitle = DEFAULT_HOME_SETTINGS.hero_title || 'Sua empresa não pode parar. Cuido da tecnologia para manter sua operação funcionando e seus dados protegidos.';
  const heroDesc = DEFAULT_HOME_SETTINGS.hero_desc || 'Estabilidade para computadores e redes comerciais, rotinas automáticas para eliminar retrabalho em planilhas e presença digital com controle total da sua carteira de clientes. Atendimento direto comigo em Porto Velho ou remoto seguro, com escopo e preço fechados por escrito antes de começar.';
  const heroChips = DEFAULT_HOME_SETTINGS.hero_chips || [
    '✓ Continuidade operacional e dados protegidos',
    '✓ Automação de rotinas manuais da equipe',
    '✓ Plataformas próprias e presença digital',
    '✓ Atendimento direto com o Rodrigo'
  ];
  const heroPrimaryCta = DEFAULT_HOME_SETTINGS.hero_primary_cta || 'Solicitar avaliação da sua operação';
  const heroWhatsappMsg = DEFAULT_HOME_SETTINGS.hero_whatsapp_msg || 'Olá Rodrigo! Gostaria de solicitar uma avaliação da operação de tecnologia da minha empresa.';
  const heroSecondaryCta = DEFAULT_HOME_SETTINGS.hero_secondary_cta || 'Conhecer os 3 pilares de atuação';

  return (
    <div className="home-enterprise-wrapper">
      <SEO
        title="Rodrigo Freire · Engenharia na Linha de Frente (Forward Deployed Engineer) — Porto Velho"
        description="Engenharia de TI na linha de frente da sua empresa em Porto Velho. Atuação direta, automação de processos manuais, estabilidade de caixas e redes comerciais com escopo fechado por escrito."
        canonicalPath="/"
        jsonLd={homeJsonLd}
      />

      {/* ============================================================
         BLOCO 1: ABERTURA (HERO B2B INSTITUCIONAL) — CARRO-CHEFE FDE
         ============================================================ */}
      <section className="corp-hero-enterprise" id="inicio">
        <div className="hero-enterprise-inner" style={{ gridTemplateColumns: '1fr', maxWidth: '940px', margin: '0 auto', textAlign: 'center' }}>
          <div className="hero-enterprise-copy" style={{ alignItems: 'center' }}>
            
            <div className="hero-pill-badge" style={{ margin: '0 auto 1.5rem' }}>
              <Sparkles size={14} />
              <span>{heroBadge}</span>
            </div>

            <h1 className="hero-enterprise-title" style={{ fontSize: 'clamp(2.1rem, 4.5vw, 3.3rem)', lineHeight: '1.2', marginBottom: '1.5rem' }}>
              Um engenheiro dedicado na linha de frente da sua empresa para <span className="highlight-cyan">destravar processos</span> e garantir que sua operação nunca pare.
            </h1>

            <p className="hero-enterprise-desc" style={{ fontSize: '1.16rem', lineHeight: '1.7', maxWidth: '820px', margin: '0 auto 2rem', color: 'var(--text-body)' }}>
              {heroDesc}
            </p>

            <div className="hero-pain-chips-row" style={{ justifyContent: 'center', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
              {heroChips.map((chip, idx) => (
                <span key={idx} className="hero-pain-chip-item">{chip}</span>
              ))}
            </div>

            <div className="hero-actions-row" style={{ justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <a
                href={`https://wa.me/${phone}?text=${encodeURIComponent(heroWhatsappMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="corp-btn-accent"
                style={{ fontSize: '1.05rem', padding: '0.9rem 2rem' }}
              >
                <MessageSquare size={18} /> {heroPrimaryCta}
              </a>

              <a href="#linha-de-frente" className="corp-btn-outline-glass" style={{ fontSize: '1.05rem', padding: '0.9rem 1.8rem' }}>
                {heroSecondaryCta} <ArrowDown size={16} />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================
         SEÇÃO DE RISCOS: O CUSTO DE NÃO AGIR (SPEC-SITE-005 RF-2)
         ============================================================ */}
      <section className="section-risks" id="riscos">
        <div className="section-head-center">
          <span className="section-tag-pill" style={{ color: '#dc2626', borderColor: 'rgba(220, 38, 38, 0.25)', background: 'rgba(220, 38, 38, 0.08)' }}>
            O Custo de Não Agir
          </span>
          <h2 className="section-title-large">Três vulnerabilidades operacionais que sangram caixa antes de você notar</h2>
          <p className="section-desc-subtle">
            Na rotina comercial, o prejuízo raramente avisa com antecedência. Identificar onde a empresa está exposta é o primeiro passo para garantir estabilidade real.
          </p>
        </div>

        <div className="risks-grid">
          {DEFAULT_RISKS.map((risk) => {
            const IconComp = ICON_MAP[risk.icon] || ShieldAlert;
            return (
              <div key={risk.id} className="risk-card">
                <div className="risk-card-header">
                  <div className="risk-card-icon">
                    <IconComp size={22} />
                  </div>
                  <span className="risk-card-tag">{risk.tag}</span>
                </div>
                <h3 className="risk-card-title">{risk.title}</h3>
                <p className="risk-card-text">{risk.description}</p>
                <div className="risk-card-consequence">
                  <strong>Consequência direta: </strong>
                  {risk.consequence}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================
         CARRO-CHEFE: O MODELO DE ENGENHARIA NA LINHA DE FRENTE (FDE)
         ============================================================ */}
      <section className="section-fde-model" id="linha-de-frente">
        <div className="section-head-center">
          <span className="section-tag-pill">
            <Sparkles size={14} style={{ display: 'inline', marginRight: '4px' }} />
            Carro-Chefe · Engenharia na Linha de Frente
          </span>
          <h2 className="section-title-large">
            Por que ter um Engenheiro na Linha de Frente muda o patamar da sua empresa?
          </h2>
          <p className="section-desc-subtle">
            No mercado de tecnologia moderna, <strong>Forward Deployed Engineer</strong> (em tradução livre, <em>"Engenheiro Alocado na Linha de Frente"</em>) é o especialista técnico sênior que sai do isolamento das telas abstratas para atuar diretamente dentro da operação da sua empresa. Veja a diferença prática para o seu negócio:
          </p>
        </div>

        <div className="fde-comparison-grid">
          {/* CARD 1: SUPORTE TRADICIONAL */}
          <div className="fde-card fde-card-traditional">
            <div className="fde-card-header">
              <div className="fde-card-icon traditional">
                <AlertOctagon size={22} />
              </div>
              <span className="fde-card-tag traditional">Suporte Reativo</span>
            </div>
            <h3 className="fde-card-title">O Técnico de Suporte Comum</h3>
            <p className="fde-card-focus">
              "Espera o equipamento queimar ou o sistema cair para tentar consertar."
            </p>
            <div className="fde-points-list">
              <div className="fde-point-item negative">
                <XCircle size={18} className="fde-point-icon" color="#94a3b8" />
                <span>Atuação 100% reativa: só aparece após a pane ou o prejuízo financeiro.</span>
              </div>
              <div className="fde-point-item negative">
                <XCircle size={18} className="fde-point-icon" color="#94a3b8" />
                <span>Limitado a conserto de hardware básico (troca de peças e formatação simples).</span>
              </div>
              <div className="fde-point-item negative">
                <XCircle size={18} className="fde-point-icon" color="#94a3b8" />
                <span>Não entende os fluxos de trabalho da equipe nem sabe criar automações de sistemas.</span>
              </div>
              <div className="fde-point-item negative">
                <XCircle size={18} className="fde-point-icon" color="#94a3b8" />
                <span>Nenhum compromisso formal com a continuidade do seu faturamento.</span>
              </div>
            </div>
            <div className="fde-card-conclusion traditional">
              ⚠️ <strong>Resultado:</strong> Apaga incêndios pontuais, mas a causa raiz continua gerando novas paradas.
            </div>
          </div>

          {/* CARD 2: PROGRAMADOR DISTANTE */}
          <div className="fde-card fde-card-distant">
            <div className="fde-card-header">
              <div className="fde-card-icon distant">
                <Clock size={22} />
              </div>
              <span className="fde-card-tag distant">Desenvolvedor Distante</span>
            </div>
            <h3 className="fde-card-title">A Agência ou Programador Remoto</h3>
            <p className="fde-card-focus">
              "Constrói sistemas fechados sem nunca ter visto a rotina real do seu balcão."
            </p>
            <div className="fde-points-list">
              <div className="fde-point-item negative">
                <XCircle size={18} className="fde-point-icon" color="#d97706" />
                <span>Fica isolado atrás de um monitor sem contato com o chão da sua empresa.</span>
              </div>
              <div className="fde-point-item negative">
                <XCircle size={18} className="fde-point-icon" color="#d97706" />
                <span>Muitas vezes empurra ferramentas complexas que exigem mais digitação manual dos funcionários.</span>
              </div>
              <div className="fde-point-item negative">
                <XCircle size={18} className="fde-point-icon" color="#d97706" />
                <span>Ignora problemas físicos de rede comercial, impressoras fiscais e caixas travando.</span>
              </div>
              <div className="fde-point-item negative">
                <XCircle size={18} className="fde-point-icon" color="#d97706" />
                <span>Atendimento por fila impessoal de tickets (chamados de suporte) que demoram dias para ter retorno.</span>
              </div>
            </div>
            <div className="fde-card-conclusion distant">
              ⏳ <strong>Resultado:</strong> Sistemas caros e distantes da realidade operacional da sua equipe.
            </div>
          </div>

          {/* CARD 3: FORWARD DEPLOYED ENGINEER (RODRIGO FREIRE) */}
          <div className="fde-card fde-card-featured">
            <div className="fde-card-header">
              <div className="fde-card-icon featured">
                <Sparkles size={22} />
              </div>
              <span className="fde-card-tag featured">★ Carro-Chefe · Linha de Frente</span>
            </div>
            <h3 className="fde-card-title" style={{ color: '#000000' }}>
              Engenheiro na Linha de Frente <span style={{ fontSize: '0.82em', color: '#3533cd', display: 'block' }}>(Forward Deployed Engineer)</span>
            </h3>
            <p className="fde-card-focus" style={{ color: '#3533cd', fontWeight: '600' }}>
              "Atuação direta dentro do seu negócio para destravar processos e blindar sua operação."
            </p>
            <div className="fde-points-list">
              <div className="fde-point-item positive">
                <CheckCircle2 size={18} className="fde-point-icon" color="#3533cd" />
                <span><strong>Presença de campo:</strong> diagnóstico e atuação técnica presencial em Porto Velho ou remoto seguro.</span>
              </div>
              <div className="fde-point-item positive">
                <CheckCircle2 size={18} className="fde-point-icon" color="#3533cd" />
                <span><strong>Engenharia de ponta a ponta:</strong> infraestrutura estável + automação de rotinas + conexão entre sistemas.</span>
              </div>
              <div className="fde-point-item positive">
                <CheckCircle2 size={18} className="fde-point-icon" color="#3533cd" />
                <span><strong>Fim do trabalho manual:</strong> rotinas que integram seus sistemas e geram relatórios consolidados em segundos.</span>
              </div>
              <div className="fde-point-item positive">
                <CheckCircle2 size={18} className="fde-point-icon" color="#3533cd" />
                <span><strong>Responsabilidade técnica direta:</strong> escopo fechado por escrito, base jurídica e sigilo estrito de dados sob a LGPD.</span>
              </div>
            </div>
            <div className="fde-card-conclusion featured">
              🛡️ <strong>Resultado:</strong> Operação contínua, equipe produtiva sem retrabalho e faturamento protegido.
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
         BLOCO 2: OS 3 PILARES DE ATUAÇÃO B2B (SPEC-SITE-005 RF-1)
         ============================================================ */}
      <section className="section-services-catalog" id="servicos" style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
        <div className="section-head-center">
          <span className="section-tag-pill">Pilares de Atuação B2B</span>
          <h2 className="section-title-large">Três pilares estruturados para a sua empresa não parar</h2>
          <p className="section-desc-subtle">
            Sem promessas vazias, ferramentas desnecessárias ou mensalidades abusivas. Escopo fechado, método claro e responsabilidade técnica direta sobre a sua operação.
          </p>
        </div>

        <div className="services-catalog-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
          {DEFAULT_SERVICES.map((service) => {
            const IconComponent = ICON_MAP[service.icon] || Wrench;
            const message = service.whatsapp_msg || `Olá Rodrigo! Gostaria de conversar sobre: ${service.title}`;

            return (
              <div key={service.id} className="service-card-liquid" style={{ display: 'flex', flexDirection: 'column' }}>
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

                {/* Gargalo */}
                <div style={{ marginBottom: '0.85rem' }}>
                  <p style={{ fontSize: '0.94rem', color: 'var(--text-body)', lineHeight: '1.6', margin: 0 }}>
                    <strong style={{ color: '#ef4444' }}>O gargalo: </strong>
                    {service.pain}
                  </p>
                </div>

                {/* O que eu assumo */}
                <div style={{ marginBottom: '1rem' }}>
                  <p style={{ fontSize: '0.94rem', color: 'var(--text-body)', lineHeight: '1.6', margin: 0 }}>
                    <strong style={{ color: '#3533cd' }}>O que eu assumo: </strong>
                    {service.solution}
                  </p>
                </div>

                {/* Entregas do Pilar */}
                {service.deliverables && service.deliverables.length > 0 && (
                  <div className="service-deliverables-box">
                    <div className="service-deliverables-title">
                      <Check size={14} /> Entregas incluídas neste pilar:
                    </div>
                    <ul className="service-deliverables-list">
                      {service.deliverables.map((item, idx) => (
                        <li key={idx} className="service-deliverable-item">
                          <CheckCircle2 size={15} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Ganho Concreto */}
                <div style={{ marginTop: 'auto', padding: '0.85rem 1rem', background: 'rgba(53, 51, 205, 0.06)', borderRadius: '12px', border: '1px solid rgba(53, 51, 205, 0.2)', marginBottom: '1.25rem' }}>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-heading)', lineHeight: '1.5', margin: 0 }}>
                    <strong>Resultado prático: </strong>
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
         BLOCO 3: COMPROMISSO & PADRÃO DE ATENDIMENTO
         ============================================================ */}
      <section className="section-pains-container" id="diferenciais" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
        <div className="section-head-center">
          <span className="section-tag-pill">Compromisso & Padrão de Atendimento</span>
          <h2 className="section-title-large">Por que contar com um responsável técnico dedicado gera mais segurança e retorno?</h2>
          <p className="section-desc-subtle">
            Mais do que consertos pontuais quando algo quebra, sua empresa ganha continuidade nas vendas, blindagem jurídica e ferramentas que a equipe opera sem complicação.
          </p>
        </div>

        <div className="pains-grid-cards" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '2.5rem' }}>
          
          <div className="pain-card-item">
            <div className="service-icon-wrapper" style={{ marginBottom: '1rem' }}>
              <Gauge size={22} color="#3533cd" />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.65rem' }}>Fácil de operar no primeiro dia</h3>
            <p style={{ fontSize: '0.92rem', lineHeight: '1.6', color: 'var(--text-body)' }}>
              Elimino telas confusas que exigem semanas de treino. Implemento e oriento sobre ferramentas limpas que qualquer colaborador aprende em poucos minutos, acabando com erros operacionais.
            </p>
          </div>

          <div className="pain-card-item">
            <div className="service-icon-wrapper" style={{ marginBottom: '1rem' }}>
              <Clock size={22} color="#3533cd" />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.65rem' }}>Estabilidade e balcão sem filas</h3>
            <p style={{ fontSize: '0.92rem', lineHeight: '1.6', color: 'var(--text-body)' }}>
              Cliente parado em fila por instabilidade técnica desiste da compra e queima a reputação da loja. Infraestrutura estável destrava caixas PDV (ponto de venda no balcão) e protege seu faturamento diário.
            </p>
          </div>

          <div className="pain-card-item">
            <div className="service-icon-wrapper" style={{ marginBottom: '1rem' }}>
              <ShieldCheck size={22} color="#3533cd" />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.65rem' }}>Blindagem jurídica e LGPD</h3>
            <p style={{ fontSize: '0.92rem', lineHeight: '1.6', color: 'var(--text-body)' }}>
              Formação em Direito somada à tecnologia: garantia de domínio prático da LGPD (Lei Geral de Proteção de Dados, para blindar seu negócio contra vazamentos e multas) e contratos formais com sigilo estrito.
            </p>
          </div>

          <div className="pain-card-item">
            <div className="service-icon-wrapper" style={{ marginBottom: '1rem' }}>
              <MapPin size={22} color="#3533cd" />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.65rem' }}>Atendimento direto comigo em Porto Velho</h3>
            <p style={{ fontSize: '0.92rem', lineHeight: '1.6', color: 'var(--text-body)' }}>
              Moro em Porto Velho e você fala diretamente com quem resolve, sem intermediários nem chamados esquecidos. Atendimento presencial no seu balcão ou acesso remoto imediato e seguro.
            </p>
          </div>

        </div>
      </section>

      {/* ============================================================
         BLOCO 4: MÉTODO EM 4 ETAPAS COM ESCOPO FECHADO (SPEC-SITE-005 RF-4)
         ============================================================ */}
      <section className="section-methodology-bg" id="como-funciona" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
        <div className="methodology-inner">
          <div className="section-head-center">
            <span className="section-tag-pill">Método de Trabalho</span>
            <h2 className="section-title-large">Quatro etapas claras, com escopo e valor fechados antes de começar</h2>
            <p className="section-desc-subtle">
              Processo transparente e previsível: você sabe exatamente o que será feito, o prazo e o investimento antes de qualquer intervenção técnica.
            </p>
          </div>

          <div className="methodology-grid-steps" style={{ marginTop: '3rem' }}>
            {DEFAULT_STEPS.map((step) => (
              <div key={step.number} className="method-step-card">
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
         BLOCO 5: DECISÃO DE NEGÓCIO & AVALIAÇÃO OPERACIONAL (SPEC-SITE-005 RF-5)
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
                Fale diretamente comigo pelo WhatsApp para uma avaliação transparente da sua operação. Identificamos o que precisa de proteção imediata, com escopo e preço fechados por escrito antes de qualquer início.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#000000', fontWeight: '600' }}>
                  <CheckCircle2 size={18} color="#3533cd" /> Avaliação prática de equipamentos, rede e rotinas manuais da equipe
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#000000', fontWeight: '600' }}>
                  <CheckCircle2 size={18} color="#3533cd" /> Escopo fechado e orçamento definido por escrito antes de começar
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#000000', fontWeight: '600' }}>
                  <CheckCircle2 size={18} color="#3533cd" /> Atendimento direto com o Rodrigo em Porto Velho (presencial ou remoto seguro)
                </div>
              </div>
            </div>

            <a
              href={`https://wa.me/${phone}?text=${encodeURIComponent('Olá Rodrigo! Gostaria de solicitar uma avaliação da operação de tecnologia da minha empresa.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="corp-btn-accent"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 1.8rem', width: 'fit-content' }}
            >
              <MessageSquare size={18} /> Solicitar Avaliação da Operação
            </a>
          </div>

          <form onSubmit={handleFormSubmit} className="diagnostic-form-glass">
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', color: 'var(--text-heading)' }}>
              Ou agende uma avaliação da sua operação
            </h3>

            <div className="form-group-item">
              <label className="form-label-corp">Seu Nome</label>
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
              <label className="form-label-corp">Seu WhatsApp com DDD</label>
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
              <label className="form-label-corp">Nome da sua Loja ou Empresa (opcional)</label>
              <input
                type="text"
                value={formData.empresa}
                onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                placeholder="Ex: Comercial Rondônia"
                className="form-input-corp"
              />
            </div>

            <div className="form-group-item">
              <label className="form-label-corp">O que precisa de atenção na sua operação?</label>
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

            <button type="submit" className="corp-btn-accent" style={{ width: '100%', marginTop: '0.5rem', justifyContent: 'center' }}>
              <Send size={16} /> Solicitar Avaliação Operacional
            </button>
          </form>
        </div>
      </section>

    </div>
  );
}
