import React, { useState } from 'react';
import { DEFAULT_SERVICES } from '../data/defaultData';
import {
  Wrench,
  ShoppingCart,
  FileSpreadsheet,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Gauge,
  Code2,
  MessageSquare,
  ArrowRight,
  ArrowDown,
  MapPin,
  Clock,
  Send,
  Sparkles,
  Activity
} from 'lucide-react';
import SEO from '../components/SEO';

const ICON_MAP = {
  Wrench,
  ShoppingCart,
  FileSpreadsheet,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Gauge,
  Code2,
  Activity
};

export default function Home({ profile }) {
  const phone = (profile?.whatsapp_number ? String(profile.whatsapp_number).replace(/\D/g, '') : '') || '5569992782919';

  // Formulário simplificado de contato / socorro
  const [formData, setFormData] = useState({
    nome: '',
    whatsapp: '',
    empresa: '',
    problema: ''
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const text = `Olá Rodrigo! Vim pelo seu site e preciso de ajuda com um problema:\n\n*Nome:* ${formData.nome}\n*WhatsApp:* ${formData.whatsapp}\n*Empresa/Comércio:* ${formData.empresa || 'Não informado'}\n*O que está acontecendo:* ${formData.problema}`;
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
      'https://github.com/rodrigofreiredesouza'
    ],
    'description': 'Consultoria e suporte em TI empresarial de alto nível em Porto Velho - RO. Atendimento ágil, redes seguras, conformidade com a LGPD e desenvolvimento de sistemas sob medida.'
  };

  return (
    <div className="home-enterprise-wrapper">
      <SEO
        title="Rodrigo Freire · TI Empresarial de Alto Nível — Porto Velho"
        description="Consultoria e suporte em TI empresarial de alto padrão em Porto Velho - RO. Atendimento ágil, redes seguras, conformidade com a LGPD e desenvolvimento de sistemas sob medida."
        canonicalPath="/"
        jsonLd={homeJsonLd}
      />

      {/* ============================================================
         BLOCO 1: ABERTURA (ACIMA DA DOBRA) — TI EMPRESARIAL & TECNOLOGIAS AMIGÁVEIS
         ============================================================ */}
      <section className="corp-hero-enterprise" id="inicio">
        <div className="hero-enterprise-inner" style={{ gridTemplateColumns: '1fr', maxWidth: '940px', margin: '0 auto', textAlign: 'center' }}>
          <div className="hero-enterprise-copy" style={{ alignItems: 'center' }}>
            
            <div className="hero-pill-badge" style={{ margin: '0 auto 1.5rem' }}>
              <Sparkles size={14} />
              <span>TI Empresarial de Alto Padrão & Soluções Amigáveis · Porto Velho</span>
            </div>

            <h1 className="hero-enterprise-title" style={{ fontSize: 'clamp(2.1rem, 4.5vw, 3.3rem)', lineHeight: '1.2', marginBottom: '1.5rem' }}>
              Sua empresa não pode parar por falha técnica: implemento <span className="highlight-cyan">TI empresarial ágil e sistemas amigáveis</span> para sua operação nunca travar.
            </h1>

            <p className="hero-enterprise-desc" style={{ fontSize: '1.16rem', lineHeight: '1.7', maxWidth: '820px', margin: '0 auto 2rem', color: 'var(--text-body)' }}>
              Estabilidade técnica para caixas PDV (ponto de venda / balcão da loja), computadores e rede comercial, com conformidade prática com a LGPD (Lei Geral de Proteção de Dados, para blindar seu negócio contra multas e vazamentos) e sistemas simples de operar. Menos atrito técnico, atendimento rápido sem filas e mais lucro no seu caixa — com atendimento empresarial em Porto Velho ou remoto imediato (conexão à distância segura).
            </p>

            <div className="hero-pain-chips-row" style={{ justifyContent: 'center', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
              <span className="hero-pain-chip-item">✓ Estabilidade para caixas PDV e redes</span>
              <span className="hero-pain-chip-item">✓ Sistemas amigáveis que qualquer atendente domina</span>
              <span className="hero-pain-chip-item">✓ Proteção de dados e conformidade LGPD</span>
              <span className="hero-pain-chip-item">✓ Atendimento direto com o Rodrigo</span>
            </div>

            <div className="hero-actions-row" style={{ justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <a
                href={`https://wa.me/${phone}?text=${encodeURIComponent('Olá Rodrigo! Vi seu site e gostaria de conhecer suas soluções de TI empresarial e sistemas amigáveis para a minha empresa.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="corp-btn-accent"
                style={{ fontSize: '1.05rem', padding: '0.9rem 2rem' }}
              >
                <MessageSquare size={18} /> Falar com Rodrigo no WhatsApp
              </a>

              <a href="#servicos" className="corp-btn-outline-glass" style={{ fontSize: '1.05rem', padding: '0.9rem 1.8rem' }}>
                Ver Soluções Empresariais <ArrowDown size={16} />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================
         MANIFESTO DE POSICIONAMENTO: A BANDEIRA DA SIMPLICIDADE
         ============================================================ */}
      <section style={{ padding: '0 1.5rem 3.5rem' }}>
        <div
          style={{
            maxWidth: '1080px',
            margin: '0 auto',
            background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.03) 0%, rgba(53, 51, 205, 0.08) 100%)',
            border: '1px solid rgba(53, 51, 205, 0.18)',
            borderRadius: '24px',
            padding: '2.5rem 2rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '2rem'
          }}
        >
          <div style={{ flex: '1 1 500px' }}>
            <span className="corp-badge" style={{ marginBottom: '0.85rem' }}>
              A Bandeira que Ergo: Simplicidade & Continuidade
            </span>
            <h2 style={{ fontSize: '1.65rem', color: 'var(--text-heading)', marginBottom: '0.85rem', lineHeight: '1.3' }}>
              Tecnologia boa é aquela que conversa fácil com a sua empresa e protege seu faturamento.
            </h2>
            <p style={{ fontSize: '1.02rem', lineHeight: '1.7', color: 'var(--text-body)', margin: 0 }}>
              Quando um caixa trava ou o sistema é confuso, o cliente na fila não culpa o software: ele reclama da sua loja e não volta mais. Sou empenhado em mudar o paradigma de que tecnologia corporativa precisa ser complicada ou custar fortunas em mensalidades. Eu construo e implemento ferramentas intuitivas e suporte de alto padrão, garantindo que sua equipe opere sem atrito, seus dados fiquem protegidos sob a LGPD (Lei Geral de Proteção de Dados) e o lucro entre no caixa todos os dias.
            </p>
          </div>
          <div style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ padding: '0.85rem 1.3rem', background: '#FFFFFF', borderRadius: '14px', border: '1px solid rgba(53, 51, 205, 0.15)', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <CheckCircle2 size={18} color="#3533cd" />
              <span style={{ fontWeight: '600', fontSize: '0.92rem', color: 'var(--text-heading)' }}>Sistemas fáceis de operar no 1º dia</span>
            </div>
            <div style={{ padding: '0.85rem 1.3rem', background: '#FFFFFF', borderRadius: '14px', border: '1px solid rgba(53, 51, 205, 0.15)', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <CheckCircle2 size={18} color="#3533cd" />
              <span style={{ fontWeight: '600', fontSize: '0.92rem', color: 'var(--text-heading)' }}>Estabilidade para caixas PDV e redes</span>
            </div>
            <div style={{ padding: '0.85rem 1.3rem', background: '#FFFFFF', borderRadius: '14px', border: '1px solid rgba(53, 51, 205, 0.15)', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <CheckCircle2 size={18} color="#3533cd" />
              <span style={{ fontWeight: '600', fontSize: '0.92rem', color: 'var(--text-heading)' }}>Conformidade com a LGPD e sem filas</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
         BLOCO 2: O QUE EU RESOLVO (CATÁLOGO DE SOLUÇÕES AMIGÁVEIS)
         ============================================================ */}
      <section className="section-services-catalog" id="servicos" style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
        <div className="section-head-center">
          <span className="section-tag-pill">Soluções Corporativas & Amigáveis</span>
          <h2 className="section-title-large">Sistemas e serviços pensados para sua empresa rodar e lucrar</h2>
          <p className="section-desc-subtle">
            Sem empurrar recursos complicados ou mensalidades abusivas. Soluções estruturadas para falar a mesma língua da sua operação e garantir estabilidade real.
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

                <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'var(--text-heading)' }}>
                  {service.title}
                </h3>

                {/* Dor */}
                <div style={{ marginBottom: '0.85rem' }}>
                  <p style={{ fontSize: '0.94rem', color: 'var(--text-body)', lineHeight: '1.6', margin: 0 }}>
                    <strong style={{ color: '#ef4444' }}>O problema: </strong>
                    {service.pain}
                  </p>
                </div>

                {/* Solução */}
                <div style={{ marginBottom: '1rem' }}>
                  <p style={{ fontSize: '0.94rem', color: 'var(--text-body)', lineHeight: '1.6', margin: 0 }}>
                    <strong style={{ color: '#3533cd' }}>O que eu faço: </strong>
                    {service.solution}
                  </p>
                </div>

                {/* Ganho Concreto */}
                <div style={{ marginTop: 'auto', padding: '0.85rem 1rem', background: 'rgba(53, 51, 205, 0.06)', borderRadius: '12px', border: '1px solid rgba(53, 51, 205, 0.2)', marginBottom: '1.25rem' }}>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-heading)', lineHeight: '1.5', margin: 0 }}>
                    <strong>Ganho concreto: </strong>
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
                    Pedir ajuda com isso <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================
         BLOCO 3: O VALOR DA SIMPLICIDADE & DIFERENCIAIS
         ============================================================ */}
      <section className="section-pains-container" id="diferenciais" style={{ paddingTop: '5rem', paddingBottom: '5rem', background: 'var(--color-off-white)' }}>
        <div className="section-head-center">
          <span className="section-tag-pill">Padrão de Atendimento</span>
          <h2 className="section-title-large">Por que TI empresarial de alto padrão gera mais lucro para sua empresa?</h2>
          <p className="section-desc-subtle">
            Mais do que consertos pontuais, sua empresa ganha continuidade de vendas, proteção jurídica e sistemas que qualquer funcionário opera sem complicação.
          </p>
        </div>

        <div className="pains-grid-cards" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '2.5rem' }}>
          
          <div className="pain-card-item" style={{ borderColor: 'rgba(53, 51, 205, 0.15)', background: '#FFFFFF' }}>
            <div className="service-icon-wrapper" style={{ marginBottom: '1rem' }}>
              <Gauge size={22} color="#3533cd" />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.65rem' }}>Fácil de entender e operar</h3>
            <p style={{ fontSize: '0.92rem', lineHeight: '1.6', color: 'var(--text-body)' }}>
              Mudo o paradigma de telas confusas que exigem semanas de treino. Crio e implemento ferramentas limpas que qualquer funcionário aprende em poucos minutos, eliminando erros no caixa.
            </p>
          </div>

          <div className="pain-card-item" style={{ borderColor: 'rgba(53, 51, 205, 0.15)', background: '#FFFFFF' }}>
            <div className="service-icon-wrapper" style={{ marginBottom: '1rem' }}>
              <Clock size={22} color="#3533cd" />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.65rem' }}>Estabilidade e balcão sem filas</h3>
            <p style={{ fontSize: '0.92rem', lineHeight: '1.6', color: 'var(--text-body)' }}>
              Cliente parado em fila por instabilidade técnica desiste da compra e queima a imagem da loja. Infraestrutura estável destrava caixas PDV (ponto de venda no balcão) e acelera o fechamento diário.
            </p>
          </div>

          <div className="pain-card-item" style={{ borderColor: 'rgba(53, 51, 205, 0.15)', background: '#FFFFFF' }}>
            <div className="service-icon-wrapper" style={{ marginBottom: '1rem' }}>
              <ShieldCheck size={22} color="#3533cd" />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.65rem' }}>Blindagem Jurídica & LGPD</h3>
            <p style={{ fontSize: '0.92rem', lineHeight: '1.6', color: 'var(--text-body)' }}>
              Formação em Direito somada à tecnologia: garantia de domínio prático da LGPD (Lei Geral de Proteção de Dados) para blindar os cadastros da sua empresa contra multas, vazamentos e processos judiciais.
            </p>
          </div>

          <div className="pain-card-item" style={{ borderColor: 'rgba(53, 51, 205, 0.15)', background: '#FFFFFF' }}>
            <div className="service-icon-wrapper" style={{ marginBottom: '1rem' }}>
              <MapPin size={22} color="#3533cd" />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.65rem' }}>Atendimento local e direto comigo</h3>
            <p style={{ fontSize: '0.92rem', lineHeight: '1.6', color: 'var(--text-body)' }}>
              Moro em Porto Velho e você fala diretamente com quem resolve. Em emergências, acesso remoto imediato (conexão segura à distância pelo computador) ou atendimento presencial direto no seu balcão.
            </p>
          </div>

        </div>
      </section>

      {/* ============================================================
         BLOCO 4: COMO FUNCIONA NA PRÁTICA (3 PASSOS HONESTOS)
         ============================================================ */}
      <section className="section-methodology-bg" id="como-funciona" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
        <div className="methodology-inner">
          <div className="section-head-center">
            <span className="section-tag-pill">Sem Burocracia</span>
            <h2 className="section-title-large">Como implementamos soluções simples no seu comércio</h2>
            <p className="section-desc-subtle">
              Três passos diretos e transparentes para transformar sistemas complicados em uma rotina ágil.
            </p>
          </div>

          <div className="methodology-grid-steps" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
            
            <div className="method-step-card" style={{ background: '#FFFFFF', padding: '2rem', borderRadius: '18px' }}>
              <div className="step-num-badge">01</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Diagnóstico da dor real</h3>
              <p style={{ fontSize: '0.93rem', lineHeight: '1.6', color: 'var(--text-body)' }}>
                Você me manda uma mensagem no WhatsApp contando o que trava no seu comércio — seja lentidão no caixa, software confuso ou processos manuais demorados.
              </p>
            </div>

            <div className="method-step-card" style={{ background: '#FFFFFF', padding: '2rem', borderRadius: '18px' }}>
              <div className="step-num-badge">02</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Solução amigável e orçamento claro</h3>
              <p style={{ fontSize: '0.93rem', lineHeight: '1.6', color: 'var(--text-body)' }}>
                Apresento a solução exata para descomplicar a sua rotina, com valor fechado e prazo definido antes de iniciar qualquer trabalho. Sem surpresas na conta.
              </p>
            </div>

            <div className="method-step-card" style={{ background: '#FFFFFF', padding: '2rem', borderRadius: '18px' }}>
              <div className="step-num-badge">03</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Sistema rodando e operação fluida</h3>
              <p style={{ fontSize: '0.93rem', lineHeight: '1.6', color: 'var(--text-body)' }}>
                Coloco o sistema para rodar, oriento sua equipe de forma rápida e testo tudo no dia a dia. Simplicidade prática para a sua empresa lucrar em paz.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================
         BLOCO 5: CHAMADA FINAL & FORMULÁRIO SIMPLIFICADO
         ============================================================ */}
      <section className="section-diagnostic-contact" id="contato" style={{ paddingTop: '5rem', paddingBottom: '6rem' }}>
        <div className="diagnostic-contact-inner" style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <div>
            <span className="section-tag-pill">Soluções Tecnológicas Amigáveis</span>
            <h2 className="section-title-large">Vamos descomplicar a tecnologia da sua empresa hoje?</h2>
            <p className="section-desc-subtle" style={{ marginBottom: '1.75rem' }}>
              Fale diretamente comigo pelo WhatsApp. Conte onde está o gargalo da sua rotina e vamos colocar sistemas fáceis e amigáveis para rodar a favor do seu faturamento.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#000000', fontWeight: '600' }}>
                <CheckCircle2 size={18} color="#3533cd" /> Sistemas amigáveis: fáceis de entender e utilizar
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#000000', fontWeight: '600' }}>
                <CheckCircle2 size={18} color="#3533cd" /> Atendimento em Porto Velho (presencial ou remoto)
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#000000', fontWeight: '600' }}>
                <CheckCircle2 size={18} color="#3533cd" /> A simplicidade de sistemas como bandeira de trabalho
              </div>
            </div>

            <a
              href={`https://wa.me/${phone}?text=${encodeURIComponent('Olá Rodrigo! Vi seu site e gostaria de conversar sobre soluções tecnológicas amigáveis para a minha empresa.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="corp-btn-accent"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 1.8rem' }}
            >
              <MessageSquare size={18} /> Chamar no WhatsApp Agora
            </a>
          </div>

          <form onSubmit={handleFormSubmit} className="diagnostic-form-glass">
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', color: 'var(--text-heading)' }}>
              Ou conte seu gargalo operacional
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
                placeholder="Ex: Mercadinho Avenida"
                className="form-input-corp"
              />
            </div>

            <div className="form-group-item">
              <label className="form-label-corp">O que está acontecendo? (Onde está doendo na operação?)</label>
              <textarea
                required
                rows={3}
                value={formData.problema}
                onChange={(e) => setFormData({ ...formData, problema: e.target.value })}
                placeholder="Ex: Nosso sistema é muito complicado, o caixa trava no meio do expediente e queremos algo mais simples, amigável e rápido..."
                className="form-input-corp"
                style={{ resize: 'vertical' }}
              />
            </div>

            <button type="submit" className="corp-btn-accent" style={{ width: '100%', marginTop: '0.5rem', justifyContent: 'center' }}>
              <Send size={16} /> Solicitar Diagnóstico de Sistema Amigável
            </button>
          </form>
        </div>
      </section>

    </div>
  );
}
