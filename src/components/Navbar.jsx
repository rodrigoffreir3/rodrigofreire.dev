import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useProjects } from '../hooks/useSettings';
import { ChevronDown, MessageSquare } from 'lucide-react';

export default function Navbar({ profile }) {
  const location = useLocation();
  const { projects } = useProjects();
  const [dropdownOpen, setDropdownOpen] = useState(false);
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

  // Fecha dropdown ao mudar de rota
  useEffect(() => {
    setDropdownOpen(false);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;
  const phone = profile?.whatsapp_number || '5569992782919';

  return (
    <header className="header">
      <nav className="header-nav">
        
        {/* LOGO CORPORATIVO COM TITULO E SUBTITULO */}
        <div className="logo">
          <Link to="/" title="Rodrigo Freire Tech · Início" className="logo-link-stacked">
            <span className="logo-title-main">Rodrigo Freire Tech</span>
            <span className="logo-subtitle-desc">Desenvolvimento de Sistemas e Automações com Inteligência Artificial</span>
          </Link>
        </div>

        {/* MENU PRINCIPAL */}
        <ul className="menu">
          <li>
            <Link to="/" className={isActive('/') ? 'active' : ''}>Início</Link>
          </li>

          <li>
            <a href="/#catalogo">Soluções & ERP</a>
          </li>

          <li>
            <a href="/#ia-spotlight" className="menu-ia-link">
              Automação com IA ✨
            </a>
          </li>

          <li>
            <a href="/#segmentos">Segmentos</a>
          </li>

          {/* DROPDOWN DE CASES / PROJETOS */}
          <li
            className="has-dropdown"
            ref={dropdownRef}
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              type="button"
              className={`dropdown-trigger-btn ${location.pathname.startsWith('/projetos') ? 'active' : ''}`}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-expanded={dropdownOpen}
            >
              Cases <ChevronDown size={14} className={`dropdown-arrow ${dropdownOpen ? 'rotated' : ''}`} />
            </button>
            
            {dropdownOpen && (
              <div className="dropdown-menu-box">
                <Link to="/projetos" className="dropdown-link-all">
                  ✦ Ver Todos os Cases de Sucesso
                </Link>
                <div className="dropdown-divider" />
                {projects.slice(0, 6).map((proj) => (
                  <Link
                    key={proj.id}
                    to={`/projetos/${proj.slug}`}
                    className="dropdown-item-link"
                  >
                    <span className="dropdown-item-title">{proj.title}</span>
                    {proj.badge && <span className="dropdown-item-badge">{proj.badge}</span>}
                  </Link>
                ))}
              </div>
            )}
          </li>

          <li>
            <Link to="/blog" className={location.pathname.startsWith('/blog') ? 'active' : ''}>Blog</Link>
          </li>

          <li>
            <Link to="/contato" className={isActive('/contato') ? 'active' : ''}>Contato</Link>
          </li>
        </ul>

        {/* CTA NO HEADER */}
        <div className="header-cta-wrapper">
          <a
            href={`https://wa.me/${phone}?text=${encodeURIComponent('Olá! Vim pelo site da RF Tech e gostaria de agendar um diagnóstico.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="corp-btn-accent"
            style={{ padding: '0.55rem 1.15rem', fontSize: '0.85rem' }}
          >
            <MessageSquare size={15} /> WhatsApp
          </a>
        </div>

      </nav>
    </header>
  );
}
