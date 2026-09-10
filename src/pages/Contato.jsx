import React from 'react';
import { MessageSquare, Mail, ShieldCheck, Sparkles, MapPin } from 'lucide-react';
import GithubIcon from '../components/GithubIcon';
import SEO from '../components/SEO';

export default function Contato({ profile }) {
  const phone = (profile?.whatsapp_number ? String(profile.whatsapp_number).replace(/\D/g, '') : '') || '5569992782919';
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent('Olá Rodrigo! Vim pelo seu site e gostaria de conversar sobre um serviço para o meu comércio.')}`;

  const contactJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    'name': 'Contato & Atendimento Direto — Rodrigo Freire',
    'description': 'Canais diretos de atendimento de TI empresarial, suporte técnico emergencial e consultoria em Porto Velho - RO.',
    'url': 'https://rodrigofreire.dev.br/contato',
    'mainEntity': {
      '@type': 'LocalBusiness',
      'name': 'Rodrigo Freire — TI Empresarial',
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
        title="Contato & Atendimento Direto · Rodrigo Freire — Porto Velho"
        description="Fale diretamente com Rodrigo Freire via WhatsApp ou e-mail para suporte de TI empresarial, manutenção de servidores e consultoria em Porto Velho."
        canonicalPath="/contato"
        jsonLd={contactJsonLd}
      />
      
      {/* HEADER */}
      <div className="section-head-center" style={{ marginBottom: '3.5rem' }}>
        <span className="section-tag-pill">
          <Sparkles size={14} style={{ display: 'inline', marginRight: '4px' }} />
          Canais de Atendimento
        </span>
        <h1 className="section-title-large">Contato & Atendimento Direto</h1>
        <p className="section-desc-subtle">
          Tire dúvidas, peça um orçamento sem compromisso ou chame para resolver um problema no computador, impressora ou sistema da sua empresa em Porto Velho.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
        
        {/* CARD WHATSAPP (CANAL PRINCIPAL) */}
        <div className="service-card-liquid" style={{ border: '1px solid var(--primary-border)', display: 'flex', flexDirection: 'column' }}>
          <div className="service-icon-wrapper" style={{ background: 'rgba(37, 211, 102, 0.15)', color: '#25d366', borderColor: 'rgba(37, 211, 102, 0.3)' }}>
            <MessageSquare size={24} />
          </div>
          <div className="corp-badge" style={{ alignSelf: 'flex-start', margin: '1rem 0 0.65rem' }}>Resposta Rápida</div>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem', color: 'var(--text-heading)' }}>WhatsApp Direto</h3>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-body)', lineHeight: '1.6', marginBottom: '1.75rem' }}>
            Canal prioritário para tirar dúvidas, pedir orçamento ou solicitar socorro técnico para o seu comércio diretamente com Rodrigo Freire.
          </p>
          
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="corp-btn-accent"
            style={{ marginTop: 'auto', background: '#25d366', borderColor: '#25d366', justifyContent: 'center' }}
          >
            <MessageSquare size={16} /> Abrir Conversa no WhatsApp →
          </a>
        </div>

        {/* CARD E-MAIL & GITHUB */}
        <div className="service-card-liquid" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="service-icon-wrapper">
            <Mail size={24} color="var(--color-dark-teal)" />
          </div>
          <div className="corp-badge" style={{ alignSelf: 'flex-start', margin: '1rem 0 0.65rem' }}>Documentos & Propostas</div>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem', color: 'var(--text-heading)' }}>E-mail & Redes</h3>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-body)', lineHeight: '1.6', marginBottom: '1.75rem' }}>
            Para envio de notas, contratos, termos de prestação de serviços ou orçamentos formais por escrito.
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

      {/* BANNER DE INFORMAÇÕES DE CREDIBILIDADE */}
      <div className="service-card-liquid" style={{ padding: '2rem 2.5rem', marginBottom: '4rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <ShieldCheck size={24} style={{ color: 'var(--color-dark-teal)' }} />
          <h4 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--text-heading)' }}>Compromisso, Segurança & Sigilo</h4>
        </div>
        <p style={{ color: 'var(--text-body)', margin: 0, lineHeight: '1.7', fontSize: '0.98rem' }}>
          Todos os dados, arquivos e sistemas da sua empresa são tratados com sigilo profissional absoluto, responsabilidade e respeito ao seu negócio.
        </p>
      </div>

    </div>
  );
}
