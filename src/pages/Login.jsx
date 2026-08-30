import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Lock, Mail, KeyRound, AlertCircle, ArrowLeft, ShieldCheck } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        throw error;
      }

      if (data?.session) {
        navigate('/adm');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Credenciais inválidas. Verifique seu e-mail e senha.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
      <div className="glass-panel" style={{ maxWidth: '440px', width: '100%', padding: '2.5rem 2rem' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'var(--primary-subtle)', border: '1px solid var(--primary-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto', color: '#60a5fa' }}>
            <Lock size={26} />
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: '800', margin: '0 0 0.4rem 0' }}>Painel Administrativo</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-body)', margin: 0 }}>Autenticação segura do CMS de Rodrigo Freire</p>
        </div>

        {errorMsg && (
          <div style={{ padding: '0.85rem 1rem', borderRadius: '10px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#fca5a5', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.45rem', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-light)' }}>
              E-mail de Administrador
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="email"
                required
                placeholder="seu-email@dominio.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 40px',
                  borderRadius: '10px',
                  border: '1px solid var(--glass-border)',
                  background: 'rgba(0, 0, 0, 0.4)',
                  color: '#ffffff',
                  fontSize: '0.95rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.45rem', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-light)' }}>
              Senha de Acesso
            </label>
            <div style={{ position: 'relative' }}>
              <KeyRound size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 40px',
                  borderRadius: '10px',
                  border: '1px solid var(--glass-border)',
                  background: 'rgba(0, 0, 0, 0.4)',
                  color: '#ffffff',
                  fontSize: '0.95rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="corp-btn corp-btn-primary"
            style={{ width: '100%', marginTop: '0.5rem', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Validando credenciais...' : 'Acessar CMS →'}
          </button>

        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center', borderTop: '1px solid var(--glass-border)', paddingTop: '1.25rem' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)', fontSize: '0.85rem', textDecoration: 'none' }}>
            <ArrowLeft size={14} /> Voltar para o site público
          </Link>
        </div>

      </div>
    </div>
  );
}
