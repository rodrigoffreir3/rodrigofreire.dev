import React from 'react';
import { MessageSquare, Mail, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import GithubIcon from '../components/GithubIcon';
import SEO from '../components/SEO';

export default function Contato({ profile }) {
  const phone = (profile?.whatsapp_number ? String(profile.whatsapp_number).replace(/\D/g, '') : '') || '5569992782919';
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent('Olá Rodrigo. Sou de uma empresa em Porto Velho e gostaria de solicitar uma avaliação da nossa operação de tecnologia.')}`;

  const contactJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    'name': 'Contato direto · Rodrigo Freire Tech — Porto Velho',
    'description': 'Atendimento direto com Rodrigo Freire, fundador da Rodrigo Freire Tech em Porto Velho, RO.',
    'url': 'https://rodrigofreire.dev.br/contato',
    'mainEntity': {
      '@type': 'LocalBusiness',
      'name': 'Rodrigo Freire Tech',
      'telephone': `+${phone}`,
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Porto Velho',
        'addressRegion': 'RO',
        'addressCountry': 'BR'
      }
    }
  };

  return (
    <div className="portfolio-container" style={{ paddingTop: '2.5rem' }}>
      <SEO
        title="Contato direto · Rodrigo Freire Tech — Porto Velho"
        description="Fale diretamente com Rodrigo Freire via WhatsApp ou e-mail. Atendimento comigo, sem fila de chamado, em Porto Velho, RO."
        canonicalPath="/contato"
        jsonLd={contactJsonLd}
      />
      
      {/* HEADER */}
      <div className="section-head-center" style={{ marginBottom: '3.5rem' }}>
        <span className="section-tag-pill">
          Porto Velho · Rondônia
        </span>
        <h1 className="section-title-large">Contato direto</h1>
        <p className="section-desc-subtle">
          Atendimento comigo, sem fila de chamado.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
        
        {/* CARD WHATSAPP (CANAL PRINCIPAL) */}
        <div className="service-card-liquid" style={{ border: '1px solid var(--primary-border)', display: 'flex', flexDirection: 'column' }}>
          <div className="service-icon-wrapper" style={{ background: 'rgba(37, 211, 102, 0.15)', color: '#25d366', borderColor: 'rgba(37, 211, 102, 0.3)' }}>
            <MessageSquare size={24} />
          </div>
          <div className="corp-badge" style={{ alignSelf: 'flex-start', margin: '1rem 0 0.65rem' }}>Canal principal</div>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem', color: 'var(--text-heading)' }}>WhatsApp</h3>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-body)', lineHeight: '1.6', marginBottom: '1.75rem' }}>
            Resposta em horário comercial, de segunda a sexta, das 8h às 18h.
          </p>
          
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="corp-btn-accent"
            style={{ marginTop: 'auto', background: '#25d366', borderColor: '#25d366', justifyContent: 'center', gap: '0.5rem' }}
          >
            <MessageSquare size={16} /> Abrir conversa no WhatsApp <ArrowRight size={16} />
          </a>
        </div>

        {/* CARD E-MAIL & GITHUB */}
        <div className="service-card-liquid" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="service-icon-wrapper">
            <Mail size={24} color="var(--color-brand-ink)" />
          </div>
          <div className="corp-badge" style={{ alignSelf: 'flex-start', margin: '1rem 0 0.65rem' }}>Documentos e propostas</div>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem', color: 'var(--text-heading)' }}>E-mail</h3>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-body)', lineHeight: '1.6', marginBottom: '1.75rem' }}>
            Escopo, prazo e valor enviados por escrito antes de qualquer execução.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: 'auto' }}>
            <a
              href={`mailto:${profile?.email || 'contato@rodrigofreire.dev'}`}
              className="corp-btn-outline-glass"
              style={{ justifyContent: 'flex-start' }}
            >
              <Mail size={16} /> {profile?.email || 'contato@rodrigofreire.dev'}
            </a>
            
            {profile?.github_url && (
              <a
                href={profile.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="corp-btn-outline-glass"
                style={{ justifyContent: 'flex-start' }}
              >
                <GithubIcon size={16} /> GitHub (@rodrigoffreir3)
              </a>
            )}
          </div>
        </div>

      </div>

      {/* BANNER DE INFORMAÇÕES DE CREDIBILIDADE - SIGILO */}
      <div className="service-card-liquid" style={{ padding: '2rem 2.5rem', marginBottom: '4rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <ShieldCheck size={24} style={{ color: 'var(--color-brand-ink)' }} />
          <h4 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--text-heading)' }}>Sigilo</h4>
        </div>
        <p style={{ color: 'var(--text-body)', margin: 0, lineHeight: '1.7', fontSize: '0.98rem' }}>
          Dado de cliente, faturamento e movimentação financeira acessados durante o trabalho são tratados sob cláusula contratual de sigilo, em conformidade com a LGPD.
        </p>
      </div>

    </div>
  );
}

