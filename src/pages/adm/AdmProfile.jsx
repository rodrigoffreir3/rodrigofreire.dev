import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { User, CheckCircle2, AlertCircle, Save, Phone, Mail, ShieldCheck } from 'lucide-react';
import GithubIcon from '../../components/GithubIcon';
import { DEFAULT_PROFILE } from '../../data/defaultData';

export default function AdmProfile({ profile: initialProfile, setProfile: updateGlobalProfile }) {
  const [profile, setProfile] = useState(initialProfile || DEFAULT_PROFILE);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (initialProfile) {
      setProfile(initialProfile);
    }
  }, [initialProfile]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    setIsError(false);

    try {
      const { error } = await supabase
        .from('profile_settings')
        .upsert({ id: 1, ...profile, updated_at: new Date() });

      if (error) throw error;

      if (updateGlobalProfile) {
        updateGlobalProfile(profile);
      }

      setMessage('Dados de perfil e canais de contato atualizados com sucesso!');
    } catch (err) {
      setIsError(true);
      setMessage('Erro ao salvar: ' + (err.message || 'Verifique sua conexão.'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: '880px' }}>
      
      {/* CABEÇALHO */}
      <div style={{ marginBottom: '2rem' }}>
        <div className="corp-badge" style={{ marginBottom: '0.65rem' }}>
          <User size={14} />
          <span>Informações Pessoais & Contatos</span>
        </div>
        <h2 style={{ fontSize: '1.85rem', fontWeight: '800', margin: '0 0 0.5rem 0' }}>
          Perfil & Credenciais
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '0.95rem', margin: 0 }}>
          Atualize sua biografia, número de WhatsApp para recebimento de propostas e registro do INPI.
        </p>
      </div>

      {/* MENSAGEM */}
      {message && (
        <div style={{
          padding: '1rem 1.25rem',
          borderRadius: '12px',
          backgroundColor: isError ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
          border: `1px solid ${isError ? 'rgba(239, 68, 68, 0.35)' : 'rgba(16, 185, 129, 0.35)'}`,
          color: isError ? '#fca5a5' : '#6ee7b7',
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          marginBottom: '2rem',
          fontWeight: '600'
        }}>
          {isError ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
          <span>{message}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.45rem' }}>Nome Completo</label>
            <input
              type="text"
              required
              value={profile.full_name || ''}
              onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
              style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--glass-border)', color: '#fff' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.45rem' }}>Número de WhatsApp (DDI + DDD + Número)</label>
            <div style={{ position: 'relative' }}>
              <Phone size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#25d366' }} />
              <input
                type="text"
                required
                value={profile.whatsapp_number || ''}
                onChange={(e) => setProfile({ ...profile, whatsapp_number: e.target.value })}
                placeholder="5569992782919"
                style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 40px', borderRadius: '10px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--glass-border)', color: '#fff' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.45rem' }}>E-mail de Contato</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="email"
                value={profile.email || ''}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                placeholder="contato@rodrigofreire.dev"
                style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 40px', borderRadius: '10px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--glass-border)', color: '#fff' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.45rem' }}>Registro de Software no INPI</label>
            <div style={{ position: 'relative' }}>
              <ShieldCheck size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#60a5fa' }} />
              <input
                type="text"
                value={profile.inpi_record || ''}
                onChange={(e) => setProfile({ ...profile, inpi_record: e.target.value })}
                placeholder="INPI Nº 512025006506-0"
                style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 40px', borderRadius: '10px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--glass-border)', color: '#fff' }}
              />
            </div>
          </div>

        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.45rem' }}>Headline / Frase de Impacto</label>
          <input
            type="text"
            value={profile.tagline || ''}
            onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
            style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--glass-border)', color: '#fff' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.45rem' }}>Lead Bio (Exibida no Hero da Home)</label>
          <textarea
            rows={3}
            value={profile.lead_bio || ''}
            onChange={(e) => setProfile({ ...profile, lead_bio: e.target.value })}
            style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--glass-border)', color: '#fff' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.45rem' }}>Biografia Completa (Página Sobre e Home)</label>
          <textarea
            rows={5}
            value={profile.about_text || ''}
            onChange={(e) => setProfile({ ...profile, about_text: e.target.value })}
            style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--glass-border)', color: '#fff' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.45rem' }}>URL da Foto de Perfil / Avatar</label>
            <input
              type="text"
              value={profile.avatar_url || ''}
              onChange={(e) => setProfile({ ...profile, avatar_url: e.target.value })}
              placeholder="Ex: /images/rodrigo-avatar.png"
              style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--glass-border)', color: '#fff' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.45rem' }}>URL do GitHub</label>
            <div style={{ position: 'relative' }}>
              <GithubIcon size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                value={profile.github_url || ''}
                onChange={(e) => setProfile({ ...profile, github_url: e.target.value })}
                placeholder="https://github.com/rodrigoffreir3"
                style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 40px', borderRadius: '10px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--glass-border)', color: '#fff' }}
              />
            </div>
          </div>
        </div>

        <div style={{ marginTop: '1rem', borderTop: '1px solid var(--glass-border)', paddingTop: '1.25rem' }}>
          <button
            type="submit"
            disabled={saving}
            className="corp-btn corp-btn-primary"
            style={{ padding: '0.75rem 2rem' }}
          >
            <Save size={18} />
            <span>{saving ? 'Gravando Informações...' : 'Salvar Perfil'}</span>
          </button>
        </div>

      </form>

    </div>
  );
}
