import React from 'react';
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Palette, FolderGit2, FileText, User, LogOut, Eye, ShieldAlert, Sparkles } from 'lucide-react';

export default function AdmDashboard({ profile }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#070a12', color: '#f8fafc' }}>
      
      {/* BARRA SUPERIOR DO PAINEL CMS */}
      <header style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', background: 'rgba(11, 15, 25, 0.95)', backdropFilter: 'blur(20px)', padding: '0.85rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '800', fontSize: '0.9rem' }}>
            RF
          </div>
          <div>
            <div style={{ fontWeight: '800', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <span>CMS Painel de Controle</span>
              <span className="corp-badge" style={{ fontSize: '0.68rem', padding: '0.15rem 0.5rem' }}>Pro</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{profile?.full_name || 'Rodrigo Freire'}</span>
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
            style={{ fontSize: '0.82rem', padding: '0.45rem 0.95rem', minHeight: '36px', borderColor: 'rgba(239, 68, 68, 0.3)', color: '#f87171' }}
            title="Encerrar Sessão"
          >
            <LogOut size={14} /> Sair
          </button>
        </div>
      </header>

      {/* CORPO COM MENU LATERAL E CONTEÚDO */}
      <div style={{ display: 'flex', flex: 1, maxWidth: '1440px', width: '100%', margin: '0 auto' }}>
        
        {/* NAVEGAÇÃO LATERAL DO CMS */}
        <aside style={{ width: '260px', borderRight: '1px solid rgba(255, 255, 255, 0.08)', padding: '1.75rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', flexShrink: 0 }}>
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b', fontWeight: '700', padding: '0 0.75rem 0.5rem 0.75rem', letterSpacing: '0.05em' }}>
            Módulos do CMS
          </div>

          <NavLink
            to="/adm/estilo"
            className={({ isActive }) => `adm-nav-link ${isActive ? 'active' : ''}`}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              borderRadius: '12px',
              color: isActive ? '#60a5fa' : '#94a3b8',
              backgroundColor: isActive ? 'rgba(37, 99, 235, 0.15)' : 'transparent',
              border: `1px solid ${isActive ? 'rgba(59, 130, 246, 0.35)' : 'transparent'}`,
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '0.92rem',
              transition: 'all 0.15s ease'
            })}
          >
            <Palette size={18} />
            <span>Estilo Visual & Fundo</span>
          </NavLink>

          <NavLink
            to="/adm/projetos"
            className={({ isActive }) => `adm-nav-link ${isActive ? 'active' : ''}`}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              borderRadius: '12px',
              color: isActive ? '#60a5fa' : '#94a3b8',
              backgroundColor: isActive ? 'rgba(37, 99, 235, 0.15)' : 'transparent',
              border: `1px solid ${isActive ? 'rgba(59, 130, 246, 0.35)' : 'transparent'}`,
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '0.92rem',
              transition: 'all 0.15s ease'
            })}
          >
            <FolderGit2 size={18} />
            <span>Gerenciar Projetos</span>
          </NavLink>

          <NavLink
            to="/adm/posts"
            className={({ isActive }) => `adm-nav-link ${isActive ? 'active' : ''}`}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              borderRadius: '12px',
              color: isActive ? '#60a5fa' : '#94a3b8',
              backgroundColor: isActive ? 'rgba(37, 99, 235, 0.15)' : 'transparent',
              border: `1px solid ${isActive ? 'rgba(59, 130, 246, 0.35)' : 'transparent'}`,
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '0.92rem',
              transition: 'all 0.15s ease'
            })}
          >
            <FileText size={18} />
            <span>Artigos do Blog</span>
          </NavLink>

          <NavLink
            to="/adm/perfil"
            className={({ isActive }) => `adm-nav-link ${isActive ? 'active' : ''}`}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              borderRadius: '12px',
              color: isActive ? '#60a5fa' : '#94a3b8',
              backgroundColor: isActive ? 'rgba(37, 99, 235, 0.15)' : 'transparent',
              border: `1px solid ${isActive ? 'rgba(59, 130, 246, 0.35)' : 'transparent'}`,
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '0.92rem',
              transition: 'all 0.15s ease'
            })}
          >
            <User size={18} />
            <span>Perfil & Contatos</span>
          </NavLink>
        </aside>

        {/* ÁREA PRINCIPAL DO SUB-MÓDULO */}
        <main style={{ flex: 1, padding: '2rem 2.5rem', overflowY: 'auto' }}>
          <Outlet />
        </main>

      </div>

    </div>
  );
}
