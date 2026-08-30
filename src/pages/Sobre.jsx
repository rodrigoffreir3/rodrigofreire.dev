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
        <p>Desenvolvedor de software, pesquisador em deep tech e especialista em sistemas críticos de alto rendimento.</p>
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
            <div className="corp-badge">Visão de Engenharia</div>
            <h3>{profile?.full_name || "Rodrigo Freire"}</h3>
            <p>{profile?.about_text}</p>
          </div>
        </div>
      </div>

      {/* BLOCOS DE PILARES DE ATUAÇÃO */}
      <div className="services-grid-corp" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', marginBottom: '4rem' }}>
        
        <div className="service-card-corp">
          <div className="service-icon-box"><ShieldCheck size={22} /></div>
          <h3>Propriedade Intelectual & Defesa</h3>
          <p>Autor do <strong>Imunno System</strong>, arquitetura de defesa cibernética e sistema imunológico para servidores registrada no INPI (Processo 512025006506-0).</p>
        </div>

        <div className="service-card-corp">
          <div className="service-icon-box"><Cpu size={22} /></div>
          <h3>Engenharia de Kernel & eBPF</h3>
          <p>Desenvolvimento em baixo nível no Linux Kernel (Ring 0), sondas eBPF para observabilidade física, medição termodinâmica (RAPL/NVML) e módulos LSM de contenção.</p>
        </div>

        <div className="service-card-corp">
          <div className="service-icon-box"><Code2 size={22} /></div>
          <h3>Plataformas Web & Nuvem</h3>
          <p>Construção de aplicações completas em React, TypeScript, Go e Python, com foco em arquitetura limpa, latência mínima e escalabilidade na AWS e Cloudflare.</p>
        </div>

      </div>

      {/* CTA DE CONTATO */}
      <section className="cta-banner-corp">
        <div className="corp-badge" style={{ background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)', color: '#ffffff', marginBottom: '0.75rem' }}>
          Agendar Reunião
        </div>
        <h3 style={{ color: '#ffffff' }}>Vamos conversar sobre o seu projeto?</h3>
        <p>Estou à disposição para analisar requisitos técnicos, dimensionar arquiteturas e estruturar sistemas com rigor e pontualidade.</p>
        <a
          href={`https://wa.me/${profile?.whatsapp_number || '5569992782919'}?text=${encodeURIComponent('Olá Rodrigo! Gostaria de agendar uma reunião técnica para conversar sobre uma solução.')}`}
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
