import React from 'react';
import { Navigate } from 'react-router-dom';
import { useRole } from '../hooks/useRole';

export default function ProtectedRoute({ children }) {
  const { role, loading } = useRole();

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#090d16', color: '#60a5fa', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '40px', height: '40px', border: '3px solid rgba(59, 130, 246, 0.2)', borderTopColor: '#3b82f6', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 1rem auto' }} />
          <p>Verificando credenciais de acesso...</p>
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
