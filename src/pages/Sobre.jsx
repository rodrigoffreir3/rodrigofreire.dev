import React from 'react';
import { MapPin, Sparkles, MessageSquare } from 'lucide-react';
import SEO from '../components/SEO';
import { DEFAULT_PROFILE, DEFAULT_COMMITMENTS } from '../data/defaultData';

export default function Sobre({ profile }) {
  const currentProfile = profile || DEFAULT_PROFILE;
  const phone = (currentProfile?.whatsapp_number ? String(currentProfile.whatsapp_number).replace(/\D/g, '') : '') || '5569992782919';
  const avatarUrl = (currentProfile?.avatar_url && !currentProfile.avatar_url.includes('rodrigo-avatar'))
    ? currentProfile.avatar_url
    : '/foto_perfil.jpeg';

  const aboutText = currentProfile?.about_text || DEFAULT_PROFILE.about_text;
  const aboutParagraphs = aboutText.split('\n\n');

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    'name': 'Rodrigo Freire',
    'jobTitle': 'Forward Deployed Engineer & Responsável Técnico de TI Empresarial',
    'description': 'Engenheiro de TI na linha de frente (Forward Deployed Engineer) e continuidade operacional em Porto Velho - RO. Formação em Direito e Análise de Sistemas, patente no INPI e foco em estabilidade, automação e proteção de dados.',
    'url': 'https://rodrigofreire.dev.br/sobre',
    'image': 'https://rodrigofreire.dev.br/foto_perfil.jpeg',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Porto Velho',
      'addressRegion': 'RO',
      'addressCountry': 'BR'
    },
    'sameAs': [
      'https://github.com/rodrigoffreir3'
    ],
    'knowsAbout': [
      'Forward Deployed Engineering',
      'Engenharia na Linha de Frente',
      'TI Empresarial',
      'Continuidade Operacional',
      'Automação de Processos',
      'Proteção de Dados e LGPD',
      'Redes Comerciais e Servidores'
    ]
  };

  return (
    <div className="portfolio-container" style={{ paddingTop: '2.5rem' }}>
      <SEO
        title="Sobre Rodrigo Freire · Engenharia na Linha de Frente (Forward Deployed Engineer) — Porto Velho"
        description="Conheça Rodrigo Freire: Forward Deployed Engineer em Porto Velho, formação em Direito e Análise de Sistemas, patente no INPI e foco em TI empresarial, automação e continuidade operacional."
        canonicalPath="/sobre"
        jsonLd={personJsonLd}
      />
      
      {/* HEADER DA SEÇÃO */}
      <div className="section-head-center" style={{ marginBottom: '3rem' }}>
        <span className="section-tag-pill">
          <Sparkles size={14} style={{ display: 'inline', marginRight: '4px' }} />
          Perfil & Responsabilidade Técnica
        </span>
        <h1 className="section-title-large">Sobre Rodrigo Freire</h1>
        <p className="section-desc-subtle">
          Engenharia de TI na linha de frente, estabilidade operacional e compromisso direto com a continuidade da sua empresa em Porto Velho.
        </p>
      </div>

      {/* SEÇÃO 1: APRESENTAÇÃO INSTITUCIONAL & RESPONSABILIDADE TÉCNICA (RF-1) */}
      <div className="about-presentation-card">
        <div className="corp-badge" style={{ marginBottom: '1rem' }}>
          Porto Velho · Rondônia
        </div>
        <h2 className="about-presentation-title">
          Responsabilidade técnica para sua empresa operar com estabilidade e dados protegidos
        </h2>
        {aboutParagraphs.map((paragraph, index) => (
          <p key={index} className="about-presentation-text">
            {paragraph}
          </p>
        ))}
      </div>

      {/* SEÇÃO 2: FOTO & CARD DE COMPROMISSOS DE ATUAÇÃO (RF-2) */}
      <div className="about-commitments-section">
        {/* Moldura da Foto Real */}
        <div className="about-photo-wrapper">
          <div className="about-photo-frame">
            <img
              src={avatarUrl}
              alt="Rodrigo Freire, Forward Deployed Engineer de TI em Porto Velho"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/foto_perfil.jpeg';
              }}
              className="about-photo-img"
            />
          </div>
          <h3 className="about-photo-name">Rodrigo Freire</h3>
          <div className="about-photo-role">Forward Deployed Engineer · TI Empresarial</div>
          <div className="about-photo-location">
            <MapPin size={15} color="#3533cd" /> Porto Velho · Rondônia
          </div>
        </div>

        {/* Card de Compromissos */}
        <div className="about-commitments-card">
          <div className="commitments-card-header">
            <h3>Compromissos de Atuação</h3>
            <p>O que assumo perante a sua empresa em cada atendimento e projeto:</p>
          </div>

          <div className="commitments-list">
            {DEFAULT_COMMITMENTS.map((item) => (
              <div key={item.id} className="commitment-item">
                <h4 className="commitment-title">
                  {item.number}. {item.title}
                </h4>
                <p className="commitment-text">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="commitments-card-footer">
            <span className="commitments-card-footer-name">Rodrigo Freire</span>
            <span className="commitments-card-footer-role">Responsável Técnico · TI Empresarial</span>
          </div>
        </div>
      </div>

      {/* SEÇÃO 3: FECHAMENTO & CONTATO DIRETO (RF-3) */}
      <section className="diagnostic-contact-inner" style={{ background: 'var(--glass-crystal-bg)', border: '1px solid var(--glass-crystal-border)', borderRadius: '24px', padding: '3rem 2rem', textAlign: 'center', maxWidth: '840px', margin: '0 auto 4rem' }}>
        <div className="corp-badge" style={{ margin: '0 auto 1rem' }}>
          Atendimento Direto em Porto Velho
        </div>
        <h3 style={{ fontSize: '1.8rem', color: 'var(--text-heading)', marginBottom: '1rem' }}>
          Vamos avaliar a operação de tecnologia da sua empresa?
        </h3>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-body)', maxWidth: '640px', margin: '0 auto 2rem', lineHeight: '1.6' }}>
          Fale diretamente comigo pelo WhatsApp para uma avaliação transparente do que precisa de atenção e proteção na sua rotina comercial, com escopo e preço fechados por escrito antes de qualquer início.
        </p>
        <a
          href={`https://wa.me/${phone}?text=${encodeURIComponent('Olá Rodrigo! Li sua apresentação no site e gostaria de solicitar uma avaliação da operação de tecnologia da minha empresa.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="corp-btn-accent"
          style={{ fontSize: '1rem', padding: '0.9rem 2.2rem', display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}
        >
          <MessageSquare size={18} /> Solicitar Avaliação da Operação
        </a>
      </section>

    </div>
  );
}
