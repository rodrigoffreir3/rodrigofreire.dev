import React from 'react';
import { ShieldCheck, Cpu, Code2, Server, Award, Sparkles } from 'lucide-react';

export default function Sobre({ profile }) {
  return (
    <div className="portfolio-container" style={{ paddingTop: '2.5rem' }}>
      
      {/* HEADER DA SEÇÃO */}
      <div className="section-header-corp" style={{ marginBottom: '3.5rem' }}>
        <div className="corp-badge">
          <Sparkles size={14} />
          <span>Perfil & Trajetória</span>
        </div>
        <h2>Sobre Rodrigo Freire</h2>
        <p>Especialista em soluções de tecnologia, automação inteligente e sistemas de alta confiabilidade para empresas.</p>
      </div>

      {/* CARD PRINCIPAL COM FOTO / AVATAR */}
      <div className="about-section-corp" style={{ marginBottom: '3.5rem' }}>
        <div className="about-grid">
          <div className="about-avatar-box">
            {profile?.avatar_url ? (
              <img src={profile.avatar_url} alt={profile.full_name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
            ) : (
              "RF"
            )}
          </div>
          <div className="about-text">
            <div className="corp-badge">Compromisso com Resultados</div>
            <h3>{profile?.full_name || "Rodrigo Freire"}</h3>
            <p>{profile?.about_text || "Com ampla experiência na modernização de processos operacionais e criação de sistemas robustos, desenvolvemos tecnologia que resolve os problemas diários de empresas que buscam reduzir custos, evitar falhas e acelerar vendas."}</p>
          </div>
        </div>
      </div>

      {/* BLOCOS DE PILARES DE ATUAÇÃO */}
      <div className="services-grid-corp" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', marginBottom: '4rem' }}>
        
        <div className="service-card-corp">
          <div className="service-icon-box"><ShieldCheck size={22} /></div>
          <h3>Segurança Operacional & Proteção de Dados</h3>
          <p>Proteção ativa contra perda de informações, fraudes e paradas imprevistas no seu negócio. Autor do sistema de defesa cibernética <strong>Imunno System</strong> registrado no INPI (Processo 512025006506-0).</p>
        </div>

        <div className="service-card-corp">
          <div className="service-icon-box"><Cpu size={22} /></div>
          <h3>Eficiência de Custos & Alta Estabilidade</h3>
          <p>Sistemas desenhados para suportar picos de faturamento sem travar os caixas da sua loja, cortando desperdícios de servidores e garantindo continuidade ininterrupta.</p>
        </div>

        <div className="service-card-corp">
          <div className="service-icon-box"><Code2 size={22} /></div>
          <h3>Sistemas de Gestão & Automação Inteligente</h3>
          <p>Desenvolvimento e implantação de plataformas completas, integração de processos de ponta a ponta e inteligência artificial prática para impulsionar suas vendas e produtividade.</p>
        </div>

      </div>

      {/* CTA DE CONTATO */}
      <section className="cta-banner-corp">
        <div className="corp-badge" style={{ background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)', color: '#ffffff', marginBottom: '0.75rem' }}>
          Agendar Conversa
        </div>
        <h3 style={{ color: '#ffffff' }}>Vamos conversar sobre o seu negócio?</h3>
        <p>Estou à disposição para entender os gargalos da sua operação, identificar oportunidades de automação e propor a solução ideal para o seu crescimento.</p>
        <a
          href={`https://wa.me/${profile?.whatsapp_number || '5569992782919'}?text=${encodeURIComponent('Olá Rodrigo! Gostaria de conversar sobre soluções de tecnologia e automação para minha empresa.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="corp-btn corp-btn-primary"
          style={{ fontSize: '1rem', padding: '0.85rem 2.2rem' }}
        >
          Iniciar Conversa no WhatsApp →
        </a>
      </section>

    </div>
  );
}
