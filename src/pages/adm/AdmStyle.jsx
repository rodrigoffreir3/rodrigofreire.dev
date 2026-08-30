import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import ColorIntensityPicker from '../../components/ColorIntensityPicker';
import { Palette, Sparkles, Layers, Sliders, CheckCircle2, AlertCircle, Save } from 'lucide-react';
import { DEFAULT_HOME_SETTINGS } from '../../data/defaultData';

export default function AdmStyle({ settings: initialSettings, setSettings: updateGlobalSettings }) {
  const [settings, setSettings] = useState(initialSettings || DEFAULT_HOME_SETTINGS);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (initialSettings) {
      setSettings(initialSettings);
    }
  }, [initialSettings]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    setIsError(false);

    try {
      const { error } = await supabase
        .from('home_settings')
        .upsert({ id: 1, ...settings, updated_at: new Date() });

      if (error) {
        throw error;
      }

      if (updateGlobalSettings) {
        updateGlobalSettings(settings);
      }

      setMessage('Configurações visuais salvas e aplicadas com sucesso!');
    } catch (err) {
      setIsError(true);
      setMessage('Erro ao salvar no banco: ' + (err.message || 'Verifique sua conexão.'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: '960px' }}>
      
      {/* CABEÇALHO */}
      <div style={{ marginBottom: '2rem' }}>
        <div className="corp-badge" style={{ marginBottom: '0.65rem' }}>
          <Palette size={14} />
          <span>Editor de Estilo & Canvas</span>
        </div>
        <h2 style={{ fontSize: '1.85rem', fontWeight: '800', margin: '0 0 0.5rem 0' }}>
          Estilo Visual & Fundo da Home
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '0.95rem', margin: 0 }}>
          Combine imagens de fundo, controle stickers/nuvens flutuantes, ajuste o nível de glassmorphism e altere cores com precisão.
        </p>
      </div>

      {/* MENSAGEM DE STATUS */}
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

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* =========================================================================
           1. CAMADA 1: BACKGROUND BASE & OVERLAY
           ========================================================================= */}
        <div className="glass-panel" style={{ padding: '1.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(37, 99, 235, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#60a5fa' }}>
              <Layers size={18} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', margin: 0 }}>
              1. Imagem de Fundo Principal (Background Base)
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
            
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.45rem' }}>
                URL da Imagem de Fundo / Padrão
              </label>
              <input
                type="text"
                value={settings.bg_image_url || ''}
                onChange={(e) => setSettings({ ...settings, bg_image_url: e.target.value })}
                placeholder="Ex: /images/background-pattern.png ou URL externa"
                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--glass-border)', color: '#fff', fontSize: '0.9rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.45rem' }}>
                Modo de Escala / Tamanho
              </label>
              <select
                value={settings.bg_image_size || 'cover'}
                onChange={(e) => setSettings({ ...settings, bg_image_size: e.target.value })}
                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', background: '#0b0f19', border: '1px solid var(--glass-border)', color: '#fff', fontSize: '0.9rem' }}
              >
                <option value="cover">Preenchimento Completo (Cover)</option>
                <option value="contain">Conter Proporcional (Contain)</option>
                <option value="400px">Padrão Repetível (400px)</option>
                <option value="250px">Textura Fina (250px)</option>
                <option value="auto">Automático / Tamanho Real (Auto)</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.45rem' }}>
                Repetição da Imagem
              </label>
              <select
                value={settings.bg_image_repeat || 'no-repeat'}
                onChange={(e) => setSettings({ ...settings, bg_image_repeat: e.target.value })}
                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', background: '#0b0f19', border: '1px solid var(--glass-border)', color: '#fff', fontSize: '0.9rem' }}
              >
                <option value="no-repeat">Sem Repetição (Única)</option>
                <option value="repeat">Repetir em Grade (X e Y)</option>
                <option value="repeat-x">Repetir na Horizontal (X)</option>
                <option value="repeat-y">Repetir na Vertical (Y)</option>
              </select>
            </div>

          </div>

          <ColorIntensityPicker
            label="Cor e Opacidade da Camada de Sobreposição (Overlay Tint)"
            value={settings.overlay_color || 'rgba(9, 13, 22, 0.75)'}
            onChange={(newColor) => setSettings({ ...settings, overlay_color: newColor })}
          />
        </div>

        {/* =========================================================================
           2. CAMADA 2: ELEMENTO DECORATIVO FLUTUANTE (STICKER / PERSONAGEM / PNG)
           ========================================================================= */}
        <div className="glass-panel" style={{ padding: '1.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(96, 165, 250, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#60a5fa' }}>
              <Sparkles size={18} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', margin: 0 }}>
              2. Elemento Decorativo Flutuante (Sticker / PNG)
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
            
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.45rem' }}>
                URL da Imagem Flutuante (PNG com fundo transparente)
              </label>
              <input
                type="text"
                value={settings.hero_char_url || ''}
                onChange={(e) => setSettings({ ...settings, hero_char_url: e.target.value })}
                placeholder="Ex: /images/sticker_nuvem.png ou URL externa"
                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--glass-border)', color: '#fff', fontSize: '0.9rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.45rem' }}>
                Posição na Tela
              </label>
              <select
                value={settings.hero_char_position || 'bottom-right'}
                onChange={(e) => setSettings({ ...settings, hero_char_position: e.target.value })}
                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', background: '#0b0f19', border: '1px solid var(--glass-border)', color: '#fff', fontSize: '0.9rem' }}
              >
                <option value="bottom-right">Inferior Direito (Canto)</option>
                <option value="bottom-left">Inferior Esquerdo (Canto)</option>
                <option value="center-bottom">Centro Inferior</option>
                <option value="top-right">Superior Direito</option>
                <option value="top-left">Superior Esquerdo</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.45rem' }}>
                Tamanho / Largura Máxima
              </label>
              <input
                type="text"
                value={settings.hero_char_size || '380px'}
                onChange={(e) => setSettings({ ...settings, hero_char_size: e.target.value })}
                placeholder="Ex: 380px, 450px, 30vw"
                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--glass-border)', color: '#fff', fontSize: '0.9rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.45rem' }}>
                Opacidade ({Math.round((settings.hero_char_opacity ?? 1) * 100)}%)
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={Math.round((settings.hero_char_opacity ?? 1) * 100)}
                onChange={(e) => setSettings({ ...settings, hero_char_opacity: Number(e.target.value) / 100 })}
                style={{ width: '100%', height: '8px', accentColor: '#3b82f6', marginTop: '0.8rem', cursor: 'pointer' }}
              />
            </div>

          </div>
        </div>

        {/* =========================================================================
           2B. CAMADA SECUNDÁRIA (ex: NUVENS INFERIORES)
           ========================================================================= */}
        <div className="glass-panel" style={{ padding: '1.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(14, 165, 233, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0ea5e9' }}>
              <Layers size={18} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', margin: 0 }}>
              2B. Camada Decorativa de Rodapé (ex: Nuvens / Horizonte)
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.45rem' }}>
                URL da Camada Decorativa de Rodapé (PNG transparente repetível na horizontal)
              </label>
              <input
                type="text"
                value={settings.secondary_bg_url || ''}
                onChange={(e) => setSettings({ ...settings, secondary_bg_url: e.target.value })}
                placeholder="Ex: /images/nuvens_rodape.png"
                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--glass-border)', color: '#fff', fontSize: '0.9rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.45rem' }}>
                Altura da Camada
              </label>
              <input
                type="text"
                value={settings.secondary_bg_size || '300px'}
                onChange={(e) => setSettings({ ...settings, secondary_bg_size: e.target.value })}
                placeholder="Ex: 300px, 40vh"
                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--glass-border)', color: '#fff', fontSize: '0.9rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.45rem' }}>
                Opacidade ({Math.round((settings.secondary_bg_opacity ?? 0.9) * 100)}%)
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={Math.round((settings.secondary_bg_opacity ?? 0.9) * 100)}
                onChange={(e) => setSettings({ ...settings, secondary_bg_opacity: Number(e.target.value) / 100 })}
                style={{ width: '100%', height: '8px', accentColor: '#0ea5e9', marginTop: '0.8rem', cursor: 'pointer' }}
              />
            </div>
          </div>
        </div>

        {/* =========================================================================
           3. CONTROLE DO CONTAINER CENTRAL DE CONTEÚDO & GLASSMORPHISM
           ========================================================================= */}
        <div className="glass-panel" style={{ padding: '1.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
              <Sliders size={18} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', margin: 0 }}>
              3. Delimitação Central & Efeito Glassmorphism
            </h3>
          </div>

          {/* TOGGLE DELIMITAÇÃO EXPLÍCITA VS FLUTUANTE */}
          <div style={{ padding: '1.25rem', borderRadius: '12px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--glass-border)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ fontWeight: '700', fontSize: '1rem', color: '#f8fafc' }}>
                Delimitação com Caixa de Vidro ao Centro
              </div>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: '0.2rem 0 0 0' }}>
                {settings.content_has_border
                  ? "Ativo: O conteúdo central fica dentro de uma caixa com borda e vidro translúcido."
                  : "Desativado: O conteúdo flutua livremente sobre o fundo e as nuvens, sem caixa externa."}
              </p>
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={!!settings.content_has_border}
                onChange={(e) => setSettings({ ...settings, content_has_border: e.target.checked })}
                style={{ width: '22px', height: '22px', accentColor: '#3b82f6', cursor: 'pointer' }}
              />
              <span style={{ fontWeight: '600', color: '#60a5fa' }}>
                {settings.content_has_border ? 'Com Moldura' : 'Sem Moldura'}
              </span>
            </label>
          </div>

          {/* SLIDERS DE VIDRO */}
          {settings.content_has_border && (
            <>
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#cbd5e1' }}>
                    Nível de Desfoque de Vidro (Blur):
                  </label>
                  <span style={{ fontWeight: '700', color: '#60a5fa' }}>{settings.content_blur_level || 20}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="40"
                  value={settings.content_blur_level || 20}
                  onChange={(e) => setSettings({ ...settings, content_blur_level: Number(e.target.value) })}
                  style={{ width: '100%', height: '8px', accentColor: '#3b82f6', cursor: 'pointer' }}
                />
              </div>

              <ColorIntensityPicker
                label="Cor e Transparência do Fundo do Container Central"
                value={settings.content_bg_color || 'rgba(17, 24, 39, 0.62)'}
                onChange={(newColor) => setSettings({ ...settings, content_bg_color: newColor })}
              />

              <ColorIntensityPicker
                label="Cor e Transparência da Borda de Vidro"
                value={settings.content_border_color || 'rgba(255, 255, 255, 0.12)'}
                onChange={(newColor) => setSettings({ ...settings, content_border_color: newColor })}
              />
            </>
          )}
        </div>

        {/* BOTÃO DE SALVAR NO RODAPÉ */}
        <div style={{ position: 'sticky', bottom: '20px', zIndex: 50, background: 'rgba(11, 15, 25, 0.95)', backdropFilter: 'blur(20px)', padding: '1rem 1.5rem', borderRadius: '16px', border: '1px solid var(--primary-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 12px 36px rgba(0,0,0,0.6)' }}>
          <span style={{ fontSize: '0.88rem', color: '#94a3b8' }}>
            As alterações são aplicadas e salvas diretamente no banco.
          </span>

          <button
            type="submit"
            disabled={saving}
            className="corp-btn corp-btn-primary"
            style={{ padding: '0.75rem 2rem' }}
          >
            <Save size={18} />
            <span>{saving ? 'Gravando Alterações...' : 'Salvar Estilo Visual'}</span>
          </button>
        </div>

      </form>

    </div>
  );
}
