import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, MessageSquare } from 'lucide-react';

export default function Footer({ profile }) {
  const currentYear = new Date().getFullYear();
  const phone = (profile?.whatsapp_number ? String(profile.whatsapp_number).replace(/\D/g, '') : '') || '5569992782919';
  const company = "Rodrigo Freire Tech";

  return (
    <footer className="corp-footer">
      <div className="footer-inner-grid">
        
        {/* COLUNA 1: PERFIL & BIO */}
        <div className="footer-col">
          <div style={{ marginBottom: '1.25rem' }}>
            <img
              src={profile?.logo_dark_url || "/RODRIGO.FREIRE BRANCA (800 x 200 px).png"}
              alt="Rodrigo Freire Tech"
              loading="lazy"
              style={{ height: '32px', width: 'auto', display: 'block' }}
            />
          </div>
          <p style={{ fontSize: '0.9rem', color: 'rgba(248, 250, 252, 0.72)', lineHeight: '1.65', marginBottom: '1.25rem' }}>
            Sistemas sob medida, automação de processos e infraestrutura para empresas em Porto Velho, RO. Atendimento presencial e compromisso direto por escrito.
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 0.75rem', background: 'rgba(53, 51, 205, 0.15)', border: '1px solid rgba(53, 51, 205, 0.4)', borderRadius: '999px', color: '#6866ff', fontSize: '0.75rem', fontWeight: '700' }}>
            <ShieldCheck size={14} />
            <span>{profile?.inpi_record || "Registro INPI de Programa de Computador Nº 512025006506-0"}</span>
          </div>
        </div>

        {/* COLUNA 2: QUATRO PILARES */}
        <div className="footer-col">
          <h4>Quatro pilares</h4>
          <ul className="footer-links-list">
            <li><Link to="/#servicos">Continuidade da operação</Link></li>
            <li><Link to="/#servicos">Automação e integração</Link></li>
            <li><Link to="/#servicos">Plataformas e presença digital</Link></li>
            <li><Link to="/#servicos">Inteligência artificial</Link></li>
            <li><Link to="/#riscos">Prevenção de riscos</Link></li>
          </ul>
        </div>

        {/* COLUNA 3: NAVEGAÇÃO */}
        <div className="footer-col">
          <h4>Navegação</h4>
          <ul className="footer-links-list">
            <li><Link to="/">Início</Link></li>
            <li><Link to="/#comparativo">Comparativo</Link></li>
            <li><Link to="/#como-funciona">Como funciona</Link></li>
            <li><Link to="/sobre">Sobre</Link></li>
            <li><Link to="/projetos">Projetos</Link></li>
            <li><Link to="/blog">Artigos</Link></li>
            <li><Link to="/contato">Contato direto</Link></li>
          </ul>
        </div>

        {/* COLUNA 4: ATENDIMENTO */}
        <div className="footer-col">
          <h4>Atendimento</h4>
          <p style={{ fontSize: '0.88rem', color: 'rgba(248, 250, 252, 0.7)', lineHeight: '1.6', marginBottom: '1rem' }}>
            Fale diretamente comigo pelo WhatsApp para uma avaliação da sua operação de tecnologia em Porto Velho.
          </p>
          <a
            href={`https://wa.me/${phone}?text=${encodeURIComponent('Olá Rodrigo. Sou de uma empresa em Porto Velho e gostaria de solicitar uma avaliação da nossa operação de tecnologia.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="corp-btn-accent"
            style={{ fontSize: '0.85rem', padding: '0.65rem 1.25rem' }}
          >
            <MessageSquare size={16} /> Conversar no WhatsApp
          </a>
        </div>

      </div>

      {/* LINHA INFERIOR */}
      <div className="footer-bottom-row">
        <p style={{ margin: 0 }}>
          © {currentYear} {company}. Todos os direitos reservados.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          {/* Link discreto para o CMS Administrativo */}
          <Link
            to="/adm"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: 'rgba(248, 250, 252, 0.45)', fontSize: '0.78rem' }}
            title="Acesso Administrativo ao CMS"
          >
            <Lock size={12} />
            <span>Painel CMS</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
