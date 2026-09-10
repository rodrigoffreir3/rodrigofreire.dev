import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, MessageSquare } from 'lucide-react';

export default function Footer({ profile }) {
  const currentYear = new Date().getFullYear();
  const phone = (profile?.whatsapp_number ? String(profile.whatsapp_number).replace(/\D/g, '') : '') || '5569992782919';
  const company = profile?.full_name || "Rodrigo Freire";

  return (
    <footer className="corp-footer">
      <div className="footer-inner-grid">
        
        {/* COLUNA 1: PERFIL & BIO */}
        <div className="footer-col">
          <div style={{ background: 'rgba(255, 255, 255, 0.07)', padding: '0.45rem 0.85rem', borderRadius: '10px', display: 'inline-block', marginBottom: '1rem', border: '1px solid rgba(53, 51, 205, 0.3)' }}>
            <img
              src="/icon-512.png"
              alt="RODRIGOFREIRE.DEV"
              loading="lazy"
              style={{ height: '28px', width: 'auto', display: 'block' }}
            />
          </div>
          <p style={{ fontSize: '0.9rem', color: 'rgba(248, 250, 252, 0.72)', lineHeight: '1.65', marginBottom: '1.25rem' }}>
            Serviços de informática, computadores e internet para comércios e empresas em Porto Velho. Atendimento direto e suporte presencial no seu estabelecimento.
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 0.75rem', background: 'rgba(53, 51, 205, 0.15)', border: '1px solid rgba(53, 51, 205, 0.4)', borderRadius: '999px', color: '#6866ff', fontSize: '0.75rem', fontWeight: '700' }}>
            <ShieldCheck size={14} />
            <span>{profile?.inpi_record || "Registro INPI Nº 512025006506-0"}</span>
          </div>
        </div>

        {/* COLUNA 2: O QUE EU RESOLVO */}
        <div className="footer-col">
          <h4>O que eu resolvo</h4>
          <ul className="footer-links-list">
            <li><Link to="/#servicos">Socorro técnico e computadores</Link></li>
            <li><Link to="/#servicos">Site de vendas próprio</Link></li>
            <li><Link to="/#servicos">Modernização da operação</Link></li>
            <li><Link to="/#servicos">Automação de tarefas manuais</Link></li>
            <li><Link to="/#servicos">Cópia de segurança (Backup)</Link></li>
            <li><Link to="/#servicos">Soluções sob medida</Link></li>
          </ul>
        </div>

        {/* COLUNA 3: NAVEGAÇÃO */}
        <div className="footer-col">
          <h4>Navegação</h4>
          <ul className="footer-links-list">
            <li><Link to="/">Início</Link></li>
            <li><Link to="/#diferenciais">Diferenciais</Link></li>
            <li><Link to="/#como-funciona">Como funciona</Link></li>
            <li><Link to="/sobre">Sobre Rodrigo Freire</Link></li>
            <li><Link to="/projetos">Cases de Sucesso</Link></li>
            <li><Link to="/blog">Blog & Artigos</Link></li>
            <li><Link to="/contato">Contato Direto</Link></li>
          </ul>
        </div>

        {/* COLUNA 4: CONTATO DIRETO */}
        <div className="footer-col">
          <h4>Atendimento</h4>
          <p style={{ fontSize: '0.88rem', color: 'rgba(248, 250, 252, 0.7)', lineHeight: '1.6', marginBottom: '1rem' }}>
            Fale diretamente comigo pelo WhatsApp para tirar dúvidas ou pedir um orçamento sem compromisso para o seu comércio.
          </p>
          <a
            href={`https://wa.me/${phone}?text=${encodeURIComponent('Olá Rodrigo! Vim pelo seu site e gostaria de tirar uma dúvida.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="corp-btn-accent"
            style={{ fontSize: '0.85rem', padding: '0.65rem 1.25rem' }}
          >
            <MessageSquare size={16} /> WhatsApp Direto
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
