import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="portfolio-container" style={{ textAlign: 'center', padding: '8rem 1.5rem' }}>
      <div className="glass-panel" style={{ maxWidth: '520px', margin: '0 auto', padding: '3.5rem 2rem' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '18px', background: 'var(--primary-subtle)', border: '1px solid var(--primary-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto', color: '#60a5fa' }}>
          <Compass size={32} />
        </div>
        <h1 style={{ fontSize: '3rem', fontWeight: '800', margin: '0 0 0.5rem 0', color: 'var(--text-heading)' }}>404</h1>
        <h2 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '1rem' }}>Página Não Encontrada</h2>
        <p style={{ color: 'var(--text-body)', lineHeight: '1.6', marginBottom: '2rem' }}>
          A rota solicitada não existe ou foi reestruturada.
        </p>
        <Link to="/" className="corp-btn corp-btn-primary">
          <ArrowLeft size={16} /> Voltar para o Início
        </Link>
      </div>
    </div>
  );
}
