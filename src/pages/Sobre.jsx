import React from 'react';
import { MapPin, Sparkles, MessageSquare, CheckCircle2, FileCheck } from 'lucide-react';

export default function Sobre({ profile }) {
  const phone = (profile?.whatsapp_number ? String(profile.whatsapp_number).replace(/\D/g, '') : '') || '5569992782919';
  const avatarUrl = (profile?.avatar_url && !profile.avatar_url.includes('rodrigo-avatar'))
    ? profile.avatar_url
    : '/foto_perfil.jpeg';

  return (
    <div className="portfolio-container" style={{ paddingTop: '2.5rem' }}>
      
      {/* HEADER DA SEÇÃO */}
      <div className="section-head-center" style={{ marginBottom: '3.5rem' }}>
        <span className="section-tag-pill">
          <Sparkles size={14} style={{ display: 'inline', marginRight: '4px' }} />
          Perfil & Atendimento Local
        </span>
        <h1 className="section-title-large">Sobre Rodrigo Freire</h1>
        <p className="section-desc-subtle">
          Serviços de informática, computadores e internet para o pequeno e médio comércio em Porto Velho.
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
            Tecnologias amigáveis e atendimento direto
          </h2>
          <p style={{ fontSize: '1.02rem', lineHeight: '1.7', color: 'var(--text-body)', marginBottom: '1rem' }}>
            Moro em Porto Velho e presto serviços de tecnologia e informática diretamente para empresas e comerciantes da nossa cidade. Atendo tanto presencialmente, indo até a sua loja ou escritório quando necessário, quanto à distância para resolver urgências com agilidade.
          </p>
          <p style={{ fontSize: '1.02rem', lineHeight: '1.7', color: 'var(--text-body)', marginBottom: '1rem' }}>
            Minha formação combina duas áreas complementares: sou graduado em Direito e estou em formação em Análise e Desenvolvimento de Sistemas. Para você que é empresário, essa bagagem jurídica se traduz em vantagens práticas: rigor com contratos, clareza sobre o que está sendo contratado, cumprimento rigoroso de prazos e sigilo absoluto com os dados e informações do seu negócio.
          </p>
          <p style={{ fontSize: '1.02rem', lineHeight: '1.7', color: 'var(--text-body)', marginBottom: '1.25rem' }}>
            Também desenvolvo um sistema próprio de proteção para computadores e servidores com registro oficial no Instituto Nacional da Propriedade Industrial (INPI sob o processo nº 512025006506-0), o que comprova minha dedicação técnica e a seriedade com que conduzo cada trabalho.
          </p>
          <div style={{ padding: '1.25rem 1.5rem', background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.04) 0%, rgba(53, 51, 205, 0.08) 100%)', borderRadius: '16px', border: '1px solid rgba(53, 51, 205, 0.2)' }}>
            <p style={{ fontSize: '1.02rem', lineHeight: '1.7', color: 'var(--text-heading)', margin: 0 }}>
              O que você está comprando de mim são <strong>soluções tecnológicas amigáveis</strong>. Sou empenhado em mudar o paradigma de que tecnologia tem que ser complicada. Por isso, construo e implemento sistemas que conversam fácil com a sua empresa — fáceis de entender e de utilizar por qualquer colaborador, sem atrito. <strong>A simplicidade de sistemas é a bandeira que ergo</strong>.
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
            Sistemas amigáveis e fáceis de operar. Se o software é confuso ou exige treinamento sem fim, ele rouba o seu tempo. Crio soluções que qualquer funcionário aprende em minutos.
          </p>
        </div>

        <div className="service-card-liquid">
          <div className="service-icon-wrapper" style={{ marginBottom: '1rem' }}>
            <MapPin size={22} color="#3533cd" />
          </div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.65rem' }}>Presença Local & Sem Intermediários</h3>
          <p style={{ fontSize: '0.93rem', color: 'var(--text-body)', lineHeight: '1.6', margin: 0 }}>
            Moro aqui e conheço a realidade do comércio de Porto Velho. Você fala direto comigo no WhatsApp e, se o computador do caixa travar ou a internet cair, eu me desloco até o seu balcão para resolver.
          </p>
        </div>

        <div className="service-card-liquid">
          <div className="service-icon-wrapper" style={{ marginBottom: '1rem' }}>
            <FileCheck size={22} color="#3533cd" />
          </div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.65rem' }}>Segurança Contratual & INPI</h3>
          <p style={{ fontSize: '0.93rem', color: 'var(--text-body)', lineHeight: '1.6', margin: 0 }}>
            Formação em Direito e tecnologia própria com registro no INPI. Todos os orçamentos são transparentes antes de iniciar o serviço, com sigilo total dos dados do seu negócio.
          </p>
        </div>

        <div className="service-card-liquid">
          <div className="service-icon-wrapper" style={{ marginBottom: '1rem' }}>
            <CheckCircle2 size={22} color="#3533cd" />
          </div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.65rem' }}>Explicação em Português Claro</h3>
          <p style={{ fontSize: '0.93rem', color: 'var(--text-body)', lineHeight: '1.6', margin: 0 }}>
            Sem palavras difíceis para justificar preço. Explico com clareza o que aconteceu, o que fiz para consertar e como evitar que se repita, para você ter total controle do que está pagando.
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
