import React from 'react';
import { MessageSquare, Mail, ShieldCheck, Sparkles } from 'lucide-react';
import GithubIcon from '../components/GithubIcon';

export default function Contato({ profile }) {
  const whatsappUrl = `https://wa.me/${profile?.whatsapp_number || '5569992782919'}?text=${encodeURIComponent('Olá Rodrigo! Gostaria de solicitar um orçamento para um projeto.')}`;

  return (
    <div className="portfolio-container" style={{ paddingTop: '2.5rem' }}>
      
      {/* HEADER */}
      <div className="section-header-corp" style={{ marginBottom: '3.5rem' }}>
        <div className="corp-badge">
          <Sparkles size={14} />
          <span>Canais de Atendimento</span>
        </div>
        <h2>Contato & Atendimento Direto</h2>
        <p>Tire dúvidas técnicas, solicite propostas para plataformas web, automações de IA ou consultoria de infraestrutura.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
        
        {/* CARD WHATSAPP (CANAL PRINCIPAL) */}
        <div className="service-card-corp" style={{ border: '1px solid var(--primary-border)', background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.8), rgba(30, 58, 138, 0.4))' }}>
          <div className="service-icon-box" style={{ background: 'rgba(37, 211, 102, 0.15)', color: '#25d366', borderColor: 'rgba(37, 211, 102, 0.3)' }}>
            <MessageSquare size={24} />
          </div>
          <div className="corp-badge" style={{ alignSelf: 'flex-start', marginBottom: '0.65rem' }}>Canal Rápido · 24/7</div>
          <h3>WhatsApp Direto</h3>
          <p>Canal prioritário para agendamento de reuniões, alinhamento de escopo e suporte técnico com Rodrigo Freire.</p>
          
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="corp-btn corp-btn-primary"
            style={{ marginTop: 'auto', background: '#25d366', borderColor: '#25d366' }}
          >
            Abrir Conversa no WhatsApp →
          </a>
        </div>

        {/* CARD E-MAIL & GITHUB */}
        <div className="service-card-corp">
          <div className="service-icon-box">
            <Mail size={24} />
          </div>
          <div className="corp-badge" style={{ alignSelf: 'flex-start', marginBottom: '0.65rem' }}>Propostas Formais</div>
          <h3>E-mail & Redes</h3>
          <p>Para envio de editais, termos de confidencialidade (NDA) ou especificações técnicas detalhadas de projetos.</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: 'auto' }}>
            <a
              href={`mailto:${profile?.email || 'contato@rodrigofreire.dev'}`}
              className="corp-btn corp-btn-secondary"
              style={{ justifyContent: 'flex-start' }}
            >
              <Mail size={16} /> {profile?.email || 'contato@rodrigofreire.dev'}
            </a>
            
            {profile?.github_url && (
              <a
                href={profile.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="corp-btn corp-btn-secondary"
                style={{ justifyContent: 'flex-start' }}
              >
                <GithubIcon size={16} /> GitHub (@rodrigoffreir3)
              </a>
            )}
          </div>
        </div>

      </div>

      {/* BANNER DE INFORMAÇÕES DE CREDIBILIDADE */}
      <div className="comparison-card-corp">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <ShieldCheck size={24} style={{ color: '#60a5fa' }} />
          <h4 style={{ margin: 0, fontSize: '1.2rem' }}>Segurança & Sigilo Profissional</h4>
        </div>
        <p style={{ color: 'var(--text-body)', margin: 0, lineHeight: '1.6' }}>
          Todos os projetos, códigos-fonte e dados de negócio dos clientes são protegidos sob rigoroso sigilo e boas práticas de engenharia de software e segurança da informação.
        </p>
      </div>

    </div>
  );
}
