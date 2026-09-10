import React from 'react';
import { MapPin, Sparkles, MessageSquare, CheckCircle2, FileCheck } from 'lucide-react';
import SEO from '../components/SEO';

export default function Sobre({ profile }) {
  const phone = (profile?.whatsapp_number ? String(profile.whatsapp_number).replace(/\D/g, '') : '') || '5569992782919';
  const avatarUrl = (profile?.avatar_url && !profile.avatar_url.includes('rodrigo-avatar'))
    ? profile.avatar_url
    : '/foto_perfil.jpeg';

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    'name': 'Rodrigo Freire',
    'jobTitle': 'Especialista em TI Empresarial e Desenvolvedor de Software',
    'description': 'Profissional de TI empresarial de alto nível em Porto Velho - RO, bacharel em Direito e graduando em Análise e Desenvolvimento de Sistemas (ADS). Criador de sistemas patenteados no INPI.',
    'url': 'https://rodrigofreire.dev.br/sobre',
    'image': 'https://rodrigofreire.dev.br/foto_perfil.jpeg',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Porto Velho',
      'addressRegion': 'RO',
      'addressCountry': 'BR'
    },
    'sameAs': [
      'https://github.com/rodrigofreiredesouza'
    ],
    'knowsAbout': [
      'TI Empresarial',
      'Segurança da Informação',
      'LGPD',
      'Desenvolvimento de Software',
      'Propriedade Intelectual (INPI)'
    ]
  };

  return (
    <div className="portfolio-container" style={{ paddingTop: '2.5rem' }}>
      <SEO
        title="Sobre Rodrigo Freire · TI Empresarial & Inovação — Porto Velho"
        description="Conheça Rodrigo Freire: formação em Direito e Análise de Sistemas, patente no INPI e foco em TI empresarial de alto nível e conformidade com a LGPD em Porto Velho."
        canonicalPath="/sobre"
        jsonLd={personJsonLd}
      />
      
      {/* HEADER DA SEÇÃO */}
      <div className="section-head-center" style={{ marginBottom: '3.5rem' }}>
        <span className="section-tag-pill">
          <Sparkles size={14} style={{ display: 'inline', marginRight: '4px' }} />
          Perfil & Atendimento Local
        </span>
        <h1 className="section-title-large">Sobre Rodrigo Freire</h1>
        <p className="section-desc-subtle">
          TI empresarial de alto padrão, conformidade com a LGPD e tecnologias amigáveis para empresas em Porto Velho.
        </p>
      </div>

      {/* CARD PRINCIPAL COM FOTO REAL E APRESENTAÇÃO PESSOAL */}
      <div
        className="service-card-liquid"
        style={{
          padding: '2.5rem',
          marginBottom: '3.5rem',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: '2.5rem',
          alignItems: 'center'
        }}
      >
        {/* Moldura da Foto Circular */}
        <div
          style={{
            flex: '0 0 auto',
            width: '220px',
            height: '220px',
            margin: '0 auto',
            borderRadius: '50%',
            overflow: 'hidden',
            boxShadow: '0 16px 36px rgba(53, 51, 205, 0.22), 0 0 0 6px rgba(53, 51, 205, 0.08)',
            border: '3px solid #3533cd'
          }}
        >
          <img
            src={avatarUrl}
            alt="Rodrigo Freire, profissional de TI em Porto Velho"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/foto_perfil.jpeg';
            }}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              borderRadius: '50%'
            }}
          />
        </div>

        {/* Texto de Apresentação */}
        <div style={{ flex: '1 1 340px' }}>
          <div className="corp-badge" style={{ marginBottom: '0.85rem' }}>
            Porto Velho · Rondônia
          </div>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--text-heading)', marginBottom: '1rem' }}>
            TI empresarial, tecnologias amigáveis e atendimento direto
          </h2>
          <p style={{ fontSize: '1.02rem', lineHeight: '1.7', color: 'var(--text-body)', marginBottom: '1rem' }}>
            Moro em Porto Velho e presto serviços de tecnologia empresarial, estabilidade de caixas PDV (ponto de venda no balcão) e desenvolvimento de sistemas diretamente para empresas e comerciantes da nossa cidade. Atendo tanto presencialmente na sua empresa quanto via acesso remoto imediato (conexão segura à distância pelo computador) para resolver urgências com agilidade.
          </p>
          <p style={{ fontSize: '1.02rem', lineHeight: '1.7', color: 'var(--text-body)', marginBottom: '1rem' }}>
            Minha formação combina duas áreas complementares que raramente andam juntas: sou graduado em Direito e estou em formação em Análise e Desenvolvimento de Sistemas (ADS). Para você que é empresário, essa bagagem jurídica e técnica se traduz em vantagens práticas e de alto nível: <strong>domínio prático da LGPD (Lei Geral de Proteção de Dados, para blindar seu negócio contra vazamentos e autuações)</strong>, contratos 100% transparentes, rigor em prazos acordados e sigilo profissional absoluto com as informações da sua empresa.
          </p>
          <p style={{ fontSize: '1.02rem', lineHeight: '1.7', color: 'var(--text-body)', marginBottom: '1.25rem' }}>
            Também desenvolvo tecnologia própria com registro oficial no Instituto Nacional da Propriedade Industrial (INPI sob o processo nº 512025006506-0), o que comprova minha capacidade técnica e o compromisso sério com cada solução implementada.
          </p>
          <div style={{ padding: '1.25rem 1.5rem', background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.04) 0%, rgba(53, 51, 205, 0.08) 100%)', borderRadius: '16px', border: '1px solid rgba(53, 51, 205, 0.2)' }}>
            <p style={{ fontSize: '1.02rem', lineHeight: '1.7', color: 'var(--text-heading)', margin: 0 }}>
              O que você contrata de mim é <strong>estabilidade técnica e tecnologias amigáveis</strong>. Sou empenhado em mudar o paradigma de que tecnologia corporativa precisa ser complicada. Construo e implemento ferramentas que conversam fácil com a sua empresa — fáceis de operar por qualquer atendente, sem atrito. <strong>A simplicidade de sistemas é a bandeira que ergo</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* BLOCOS DE COMPROMISSOS DE ATUAÇÃO */}
      <div className="services-catalog-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.75rem', marginBottom: '4rem' }}>
        
        <div className="service-card-liquid">
          <div className="service-icon-wrapper" style={{ marginBottom: '1rem' }}>
            <Sparkles size={22} color="#3533cd" />
          </div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.65rem' }}>A Bandeira da Simplicidade</h3>
          <p style={{ fontSize: '0.93rem', color: 'var(--text-body)', lineHeight: '1.6', margin: 0 }}>
            Sistemas amigáveis e fáceis de operar. Se o software exige treinamento sem fim, ele rouba o seu tempo. Crio soluções que qualquer funcionário aprende em minutos.
          </p>
        </div>

        <div className="service-card-liquid">
          <div className="service-icon-wrapper" style={{ marginBottom: '1rem' }}>
            <MapPin size={22} color="#3533cd" />
          </div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.65rem' }}>Presença Local & Sem Intermediários</h3>
          <p style={{ fontSize: '0.93rem', color: 'var(--text-body)', lineHeight: '1.6', margin: 0 }}>
            Moro aqui e conheço a realidade do comércio de Porto Velho. Você fala direto comigo no WhatsApp e, se o caixa PDV (ponto de venda) travar ou a rede oscilar, atendo imediatamente à distância ou vou até o seu balcão.
          </p>
        </div>

        <div className="service-card-liquid">
          <div className="service-icon-wrapper" style={{ marginBottom: '1rem' }}>
            <FileCheck size={22} color="#3533cd" />
          </div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.65rem' }}>Segurança Contratual, INPI & LGPD</h3>
          <p style={{ fontSize: '0.93rem', color: 'var(--text-body)', lineHeight: '1.6', margin: 0 }}>
            Graduação em Direito somada à tecnologia: domínio da LGPD (Lei Geral de Proteção de Dados) para blindar seu negócio, contratos transparentes e tecnologia registrada no INPI.
          </p>
        </div>

        <div className="service-card-liquid">
          <div className="service-icon-wrapper" style={{ marginBottom: '1rem' }}>
            <CheckCircle2 size={22} color="#3533cd" />
          </div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.65rem' }}>Explicação em Português Claro</h3>
          <p style={{ fontSize: '0.93rem', color: 'var(--text-body)', lineHeight: '1.6', margin: 0 }}>
            Sem jargões para justificar preço. Quando um termo técnico em inglês for indispensável, explico entre parênteses o que ele significa para você ter total controle do que está contratando.
          </p>
        </div>

      </div>

      {/* CTA DE CONTATO */}
      <section className="diagnostic-contact-inner" style={{ background: 'var(--glass-crystal-bg)', border: '1px solid var(--glass-crystal-border)', borderRadius: '24px', padding: '3rem 2rem', textAlign: 'center', maxWidth: '840px', margin: '0 auto 4rem' }}>
        <div className="corp-badge" style={{ margin: '0 auto 1rem' }}>
          Atendimento Direto
        </div>
        <h3 style={{ fontSize: '1.8rem', color: 'var(--text-heading)', marginBottom: '1rem' }}>
          Precisa destravar um computador ou rotina no seu comércio?
        </h3>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-body)', maxWidth: '640px', margin: '0 auto 2rem', lineHeight: '1.6' }}>
          Fale diretamente comigo pelo WhatsApp. Conte o que está acontecendo e eu respondo com a solução mais rápida para a sua empresa não ficar parada.
        </p>
        <a
          href={`https://wa.me/${phone}?text=${encodeURIComponent('Olá Rodrigo! Li sua apresentação no site e gostaria de conversar sobre um serviço para o meu comércio.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="corp-btn-accent"
          style={{ fontSize: '1rem', padding: '0.9rem 2.2rem', display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}
        >
          <MessageSquare size={18} /> Falar com Rodrigo no WhatsApp →
        </a>
      </section>

    </div>
  );
}
