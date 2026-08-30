import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useProjects } from '../hooks/useSettings';
import { Moon, Sun, ChevronDown } from 'lucide-react';

export default function Navbar({ profile }) {
  const location = useLocation();
  const { projects } = useProjects();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="header">
      <nav className="header-nav">
        
        {/* LOGO CORPORATIVO */}
        <div className="logo">
          <Link to="/" title="Rodrigo Freire · Início">
            <span className="logo-title">{profile?.full_name || "Rodrigo Freire"}</span>
            <span className="logo-badge">Software & Consultoria</span>
          </Link>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="theme-toggle"
            title="Alternar Tema Claro/Escuro"
            aria-label="Alternar Tema"
          >
            {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
          </button>
        </div>

        {/* MENU PRINCIPAL */}
        <ul className="menu">
          <li>
            <Link to="/" className={isActive('/') ? 'active' : ''}>Início</Link>
          </li>

          {/* DROPDOWN DE PROJETOS */}
          <li
            className="has-dropdown"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <Link to="/projetos" className={location.pathname.startsWith('/projetos') ? 'active' : ''}>
              Projetos <ChevronDown size={14} style={{ display: 'inline', marginLeft: '3px' }} />
            </Link>
            
            {dropdownOpen && (
              <ul className="dropdown-menu">
                <li>
                  <Link to="/projetos" style={{ fontWeight: '700', color: '#60a5fa' }}>
                    ✦ Ver Todos os Projetos
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
            <Link to="/sobre" className={isActive('/sobre') ? 'active' : ''}>Sobre</Link>
          </li>

          <li>
            <Link to="/contato" className={isActive('/contato') ? 'active' : ''}>Contato</Link>
          </li>
        </ul>

      </nav>
    </header>
  );
}
