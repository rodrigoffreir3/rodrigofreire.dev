import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock } from 'lucide-react';

export default function Footer({ profile }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="corp-footer" style={{ borderTop: '1px solid var(--glass-border)', padding: '3.5rem 1.5rem 2.5rem 1.5rem', background: 'rgba(9, 13, 22, 0.85)', backdropFilter: 'blur(20px)', marginTop: '4rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2.5rem', marginBottom: '2.5rem' }}>
        
        {/* COLUNA 1: MARCA & BIO */}
        <div>
          <h4 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '0.65rem' }}>
            {profile?.full_name || "Rodrigo Freire"}
          </h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-body)', lineHeight: '1.6', marginBottom: '1rem' }}>
            {profile?.tagline || "Engenharia de software, inteligência artificial e plataformas de alto desempenho."}
          </p>
          <div className="corp-badge" style={{ fontSize: '0.75rem' }}>
            <ShieldCheck size={14} />
            <span>{profile?.inpi_record || "INPI Nº 512025006506-0"}</span>
          </div>
        </div>

        {/* COLUNA 2: NAVEGAÇÃO RÁPIDA */}
        <div>
          <h5 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-heading)', marginBottom: '0.85rem' }}>Navegação</h5>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li><Link to="/" style={{ color: 'var(--text-body)', textDecoration: 'none', fontSize: '0.9rem' }}>Início</Link></li>
            <li><Link to="/projetos" style={{ color: 'var(--text-body)', textDecoration: 'none', fontSize: '0.9rem' }}>Portfólio de Projetos</Link></li>
            <li><Link to="/blog" style={{ color: 'var(--text-body)', textDecoration: 'none', fontSize: '0.9rem' }}>Blog & Publicações</Link></li>
            <li><Link to="/sobre" style={{ color: 'var(--text-body)', textDecoration: 'none', fontSize: '0.9rem' }}>Sobre Rodrigo Freire</Link></li>
            <li><Link to="/contato" style={{ color: 'var(--text-body)', textDecoration: 'none', fontSize: '0.9rem' }}>Contato & Orçamentos</Link></li>
          </ul>
        </div>

        {/* COLUNA 3: CONTATO DIRETO */}
        <div>
          <h5 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-heading)', marginBottom: '0.85rem' }}>Atendimento Executivo</h5>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-body)', lineHeight: '1.6', marginBottom: '0.75rem' }}>
            Pronto para conversar sobre requisitos técnicos, prazos e arquitetura.
          </p>
          <a
            href={`https://wa.me/${profile?.whatsapp_number || '5569992782919'}?text=${encodeURIComponent('Olá Rodrigo! Acessei seu site e gostaria de agendar uma reunião.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="corp-btn corp-btn-primary"
            style={{ fontSize: '0.85rem', padding: '0.55rem 1.25rem', minHeight: '40px' }}
          >
            Falar no WhatsApp →
          </a>
        </div>

      </div>

      {/* LINHA INFERIOR COM COPYRIGHT E ACESSO AO CMS */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
          © {currentYear} {profile?.full_name || "Rodrigo Freire"}. Todos os direitos reservados.
        </p>

        {/* Link discreto para o CMS Administrativo */}
        <Link
          to="/adm"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'none' }}
          title="Acesso ao Painel CMS Administrativo"
        >
          <Lock size={12} />
          <span>Painel CMS</span>
        </Link>
      </div>
    </footer>
  );
}
