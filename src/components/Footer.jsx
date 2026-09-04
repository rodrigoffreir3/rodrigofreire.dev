import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, MessageSquare, ExternalLink } from 'lucide-react';

export default function Footer({ profile }) {
  const currentYear = new Date().getFullYear();
  const phone = profile?.whatsapp_number || '5569992782919';
  const company = profile?.company_name || profile?.full_name || "Rodrigo Freire Tech";

  return (
    <footer className="corp-footer">
      <div className="footer-inner-grid">
        
        {/* COLUNA 1: EMPRESA & BIO */}
        <div className="footer-col">
          <h4 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#FFFFFF', marginBottom: '0.85rem' }}>
            {company}
          </h4>
          <p style={{ fontSize: '0.9rem', color: 'rgba(248, 250, 252, 0.72)', lineHeight: '1.65', marginBottom: '1.25rem' }}>
            Software de gestão empresarial integrado, frente de caixa com PIX e inteligência artificial aplicada ao atendimento e automação de rotinas.
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 0.75rem', background: 'rgba(0, 245, 212, 0.1)', border: '1px solid rgba(0, 245, 212, 0.3)', borderRadius: '999px', color: '#00F5D4', fontSize: '0.75rem', fontWeight: '700' }}>
            <ShieldCheck size={14} />
            <span>{profile?.inpi_record || "Software Registrado no INPI"}</span>
          </div>
        </div>

        {/* COLUNA 2: PRINCIPAIS SOLUÇÕES */}
        <div className="footer-col">
          <h4>Soluções</h4>
          <ul className="footer-links-list">
            <li><a href="/#catalogo">Sistema ERP Integrado</a></li>
            <li><a href="/#catalogo">Frente de Caixa (PDV com PIX)</a></li>
            <li><a href="/#catalogo">Emissor Fiscal (NF-e/NFC-e)</a></li>
            <li><a href="/#ia-spotlight">WhatsApp Bot com IA (NLP)</a></li>
            <li><a href="/#catalogo">Gestão de Estoque & Balanço</a></li>
            <li><a href="/#catalogo">Comanda Digital Food Service</a></li>
          </ul>
        </div>

        {/* COLUNA 3: INSTITUCIONAL */}
        <div className="footer-col">
          <h4>Institucional</h4>
          <ul className="footer-links-list">
            <li><Link to="/">Início</Link></li>
            <li><Link to="/projetos">Cases de Sucesso</Link></li>
            <li><Link to="/blog">Blog & Artigos</Link></li>
            <li><Link to="/sobre">Sobre a Empresa</Link></li>
            <li><Link to="/contato">Contato & Suporte</Link></li>
          </ul>
        </div>

        {/* COLUNA 4: CONTATO DIRETO */}
        <div className="footer-col">
          <h4>Atendimento</h4>
          <p style={{ fontSize: '0.88rem', color: 'rgba(248, 250, 252, 0.7)', lineHeight: '1.6', marginBottom: '1rem' }}>
            Fale diretamente com nossos consultores para agendar um diagnóstico da sua operação.
          </p>
          <a
            href={`https://wa.me/${phone}?text=${encodeURIComponent('Olá! Vim pelo site da RF Tech e gostaria de tirar uma dúvida.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="corp-btn-accent"
            style={{ fontSize: '0.85rem', padding: '0.65rem 1.25rem' }}
          >
            <MessageSquare size={16} /> WhatsApp Comercial
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
