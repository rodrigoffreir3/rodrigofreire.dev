import React from 'react';
import { Navigate } from 'react-router-dom';
import { useRole } from '../hooks/useRole';

export default function ProtectedRoute({ children }) {
  const { role, loading } = useRole();

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-page)', color: 'var(--color-brand-ink)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '40px', height: '40px', border: '3px solid rgba(0, 0, 0, 0.2)', borderTopColor: 'var(--color-brand-ink)', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 1rem auto' }} />
          <p style={{ color: 'var(--text-body)', fontWeight: '600', fontSize: '0.95rem' }}>Verificando credenciais de acesso...</p>
        </div>
      </div>
    );
  }

  // Se não estiver autenticado como admin/editor, redireciona para login
  if (!role || (role !== 'admin' && role !== 'editor')) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
