import React from 'react';
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Palette, FolderGit2, FileText, User, LogOut, Eye } from 'lucide-react';

export default function AdmDashboard({ profile }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="adm-layout">
      
      {/* BARRA SUPERIOR DO PAINEL CMS */}
      <header className="adm-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'linear-gradient(90deg, #000000 0%, #3533cd 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: '800',
            fontSize: '0.85rem',
            boxShadow: '0 4px 12px rgba(53, 51, 205, 0.3)'
          }}>
            RFD
          </div>
          <div>
            <div style={{ fontWeight: '800', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--text-heading)' }}>
              <span>CMS Painel de Controle</span>
              <span className="corp-badge" style={{ fontSize: '0.68rem', padding: '0.15rem 0.5rem' }}>Pro</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{profile?.full_name || 'Rodrigo Freire'}</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="corp-btn corp-btn-secondary"
            style={{ fontSize: '0.82rem', padding: '0.45rem 0.95rem', minHeight: '36px' }}
          >
            <Eye size={14} /> Ver Site Ao Vivo ↗
          </Link>

          <button
            onClick={handleLogout}
            className="corp-btn corp-btn-secondary"
            style={{ fontSize: '0.82rem', padding: '0.45rem 0.95rem', minHeight: '36px', borderColor: 'rgba(239, 68, 68, 0.3)', color: '#ef4444' }}
            title="Encerrar Sessão"
          >
            <LogOut size={14} /> Sair
          </button>
        </div>
      </header>

      {/* CORPO COM MENU LATERAL E CONTEÚDO */}
      <div className="adm-body-wrapper">
        
        {/* NAVEGAÇÃO LATERAL DO CMS */}
        <aside className="adm-sidebar">
          <div className="adm-sidebar-title">
            Módulos do CMS
          </div>

          <NavLink
            to="/adm/estilo"
            className={({ isActive }) => `adm-nav-link ${isActive ? 'active' : ''}`}
          >
            <Palette size={18} />
            <span>Estilo Visual & Fundo</span>
          </NavLink>

          <NavLink
            to="/adm/projetos"
            className={({ isActive }) => `adm-nav-link ${isActive ? 'active' : ''}`}
          >
            <FolderGit2 size={18} />
            <span>Gerenciar Projetos</span>
          </NavLink>

          <NavLink
            to="/adm/posts"
            className={({ isActive }) => `adm-nav-link ${isActive ? 'active' : ''}`}
          >
            <FileText size={18} />
            <span>Artigos do Blog</span>
          </NavLink>

          <NavLink
            to="/adm/perfil"
            className={({ isActive }) => `adm-nav-link ${isActive ? 'active' : ''}`}
          >
            <User size={18} />
            <span>Perfil & Contatos</span>
          </NavLink>
        </aside>

        {/* ÁREA PRINCIPAL DO SUB-MÓDULO */}
        <main className="adm-main-view">
          <Outlet />
        </main>

      </div>

    </div>
  );
}
