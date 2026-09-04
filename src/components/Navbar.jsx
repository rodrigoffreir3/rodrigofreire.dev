import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useProjects } from '../hooks/useSettings';
import { Moon, Sun, ChevronDown, MessageSquare } from 'lucide-react';

export default function Navbar({ profile }) {
  const location = useLocation();
  const { projects } = useProjects();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  const isActive = (path) => location.pathname === path;
  const phone = profile?.whatsapp_number || '5569992782919';

  return (
    <header className="header">
      <nav className="header-nav">
        
        {/* LOGO CORPORATIVO */}
        <div className="logo">
          <Link to="/" title="Rodrigo Freire Tech · Início">
            <span className="logo-title">{profile?.company_name || profile?.full_name || "Rodrigo Freire Tech"}</span>
            <span className="logo-badge">Soluções & IA</span>
          </Link>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="theme-toggle"
            title="Alternar Tema Claro/Escuro"
            aria-label="Alternar Tema"
          >
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>
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
            <a href="/#ia-spotlight" style={{ color: 'var(--color-dark-teal)', fontWeight: '700' }}>
              Automação com IA ✨
            </a>
          </li>

          <li>
            <a href="/#segmentos">Segmentos</a>
          </li>

          {/* DROPDOWN DE PROJETOS */}
          <li
            className="has-dropdown"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <Link to="/projetos" className={location.pathname.startsWith('/projetos') ? 'active' : ''}>
              Cases <ChevronDown size={14} style={{ display: 'inline', marginLeft: '3px' }} />
            </Link>
            
            {dropdownOpen && (
              <ul className="dropdown-menu">
                <li>
                  <Link to="/projetos" style={{ fontWeight: '700', color: 'var(--color-dark-teal)' }}>
                    ✦ Ver Todos os Cases
                  </Link>
                </li>
                {projects.slice(0, 6).map((proj) => (
                  <li key={proj.id}>
                    <Link to={`/projetos/${proj.slug}`}>
                      {proj.title}
                    </Link>
                  </li>
                ))}
              </ul>
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
        <div className="header-cta-wrapper" style={{ display: 'flex', alignItems: 'center' }}>
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
