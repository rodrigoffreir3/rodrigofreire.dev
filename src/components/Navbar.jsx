import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useProjects } from '../hooks/useSettings';
import { ChevronDown, MessageSquare, Menu, X } from 'lucide-react';

export default function Navbar({ profile }) {
  const location = useLocation();
  const { projects } = useProjects();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fecha menus ao mudar de rota
  useEffect(() => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;
  const phone = (profile?.whatsapp_number ? String(profile.whatsapp_number).replace(/\D/g, '') : '') || '5569992782919';

  return (
    <header className="header">
      <nav className="header-nav">
        
        {/* LOGO CORPORATIVO COM TITULO E SUBTITULO */}
        <div className="logo">
          <Link
            to="/"
            title="Rodrigo Freire · Início"
            className="logo-link-stacked"
            onClick={() => setMobileMenuOpen(false)}
          >
            <img
              src={profile?.logo_url || "/RODRIGO.FREIRE COLORIDA (800 x 200 px).png"}
              alt="Rodrigo Freire"
              className="navbar-brand-logo-img"
            />
            <span className="logo-subtitle-desc">
              {profile?.tagline || 'Sistemas sob medida para empresas · Porto Velho, RO'}
            </span>
          </Link>
        </div>

        {/* MENU PRINCIPAL DESKTOP */}
        <ul className="menu desktop-menu">
          <li>
            <Link to="/" className={isActive('/') && !location.hash ? 'active' : ''}>Início</Link>
          </li>

          <li>
            <Link to="/#servicos" className={location.hash === '#servicos' ? 'active' : ''}>Quatro pilares</Link>
          </li>

          <li>
            <Link to="/#comparativo" className={location.hash === '#comparativo' ? 'active' : ''}>Comparativo</Link>
          </li>

          <li>
            <Link to="/#como-funciona" className={location.hash === '#como-funciona' ? 'active' : ''}>Como funciona</Link>
          </li>

          <li>
            <Link to="/sobre" className={isActive('/sobre') ? 'active' : ''}>Sobre</Link>
          </li>

          {/* DROPDOWN DE CASES / PROJETOS (CRAWLABLE PELO GOOGLEBOT) */}
          <li
            className="has-dropdown"
            ref={dropdownRef}
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <Link
              to="/projetos"
              className={`dropdown-trigger-btn ${location.pathname.startsWith('/projetos') ? 'active' : ''}`}
              aria-expanded={dropdownOpen}
            >
              Projetos <ChevronDown size={14} className={`dropdown-arrow ${dropdownOpen ? 'rotated' : ''}`} />
            </Link>
            
            <div className={`dropdown-menu-box ${dropdownOpen ? 'is-open' : ''}`}>
              <Link to="/projetos" className="dropdown-link-all" onClick={() => setDropdownOpen(false)}>
                Ver todos os projetos
              </Link>
              <div className="dropdown-divider" />
              {projects.map((proj) => (
                <Link
                  key={proj.id}
                  to={`/projetos/${proj.slug}`}
                  className="dropdown-item-link"
                  onClick={() => setDropdownOpen(false)}
                >
                  <span className="dropdown-item-title">{proj.title}</span>
                </Link>
              ))}
            </div>
          </li>

          <li>
            <Link to="/blog" className={location.pathname.startsWith('/blog') ? 'active' : ''}>Artigos</Link>
          </li>

          <li>
            <Link to="/contato" className={isActive('/contato') ? 'active' : ''}>Contato</Link>
          </li>
        </ul>

        {/* CTA NO HEADER DESKTOP & MOBILE TOGGLE */}
        <div className="header-actions-right">
          <a
            href={`https://wa.me/${phone}?text=${encodeURIComponent('Olá Rodrigo. Sou de uma empresa em Porto Velho e gostaria de solicitar uma avaliação da nossa operação de tecnologia.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="corp-btn-accent header-cta-btn"
            title="Falar no WhatsApp"
          >
            <MessageSquare size={16} /> <span className="header-cta-btn-text">WhatsApp</span>
          </a>

          {/* BOTÃO HAMBURGUER MOBILE */}
          <button
            type="button"
            className="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

      </nav>

      {/* GAVETA / DRAWER MOBILE COM LIQUID GLASS */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          <div className="mobile-drawer-content">
            <Link to="/" className={`mobile-nav-link ${isActive('/') && !location.hash ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
              Início
            </Link>
            <Link to="/#servicos" className={`mobile-nav-link ${location.hash === '#servicos' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
              Quatro pilares
            </Link>
            <Link to="/#comparativo" className={`mobile-nav-link ${location.hash === '#comparativo' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
              Comparativo
            </Link>
            <Link to="/#como-funciona" className={`mobile-nav-link ${location.hash === '#como-funciona' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
              Como funciona
            </Link>
            <Link to="/sobre" className={`mobile-nav-link ${isActive('/sobre') ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
              Sobre
            </Link>
            <Link to="/projetos" className={`mobile-nav-link ${location.pathname.startsWith('/projetos') ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
              Projetos
            </Link>
            <Link to="/blog" className={`mobile-nav-link ${location.pathname.startsWith('/blog') ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
              Artigos
            </Link>
            <Link to="/contato" className={`mobile-nav-link ${isActive('/contato') ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
              Contato
            </Link>

            <div className="mobile-drawer-divider" />

            <a
              href={`https://wa.me/${phone}?text=${encodeURIComponent('Olá Rodrigo. Sou de uma empresa em Porto Velho e gostaria de solicitar uma avaliação da nossa operação de tecnologia.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="corp-btn-accent mobile-drawer-cta"
              onClick={() => setMobileMenuOpen(false)}
            >
              <MessageSquare size={18} /> Conversar no WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
