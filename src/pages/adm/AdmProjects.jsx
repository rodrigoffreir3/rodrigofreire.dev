import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { FolderGit2, Plus, Edit2, Trash2, CheckCircle2, AlertCircle, Save, X, ExternalLink, Image as ImageIcon } from 'lucide-react';

export default function AdmProjects({ projects, setProjects }) {
  const [editingProject, setEditingProject] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    badge: 'Case Study · Deep Tech',
    summary: '',
    problem_description: '',
    technical_details: '',
    cover_image: '',
    hero_image: '',
    github_url: '',
    live_url: '',
    tags: '',
    is_featured: false,
    display_order: 0
  });

  const handleEdit = (proj) => {
    setIsNew(false);
    setEditingProject(proj);
    setFormData({
      ...proj,
      tags: proj.tags ? proj.tags.join(', ') : ''
    });
    setMessage('');
  };

  const handleNew = () => {
    setIsNew(true);
    setEditingProject({ id: 'new' });
    setFormData({
      title: '',
      slug: '',
      badge: 'Case Study · Deep Tech',
      summary: '',
      problem_description: '',
      technical_details: '',
      cover_image: '',
      hero_image: '',
      github_url: '',
      live_url: '',
      tags: 'React, TypeScript, Go',
      is_featured: false,
      display_order: projects.length + 1
    });
    setMessage('');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    setIsError(false);

    try {
      const payload = {
        title: formData.title,
        slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        badge: formData.badge,
        summary: formData.summary,
        problem_description: formData.problem_description,
        technical_details: formData.technical_details,
        cover_image: formData.cover_image,
        hero_image: formData.hero_image || formData.cover_image,
        github_url: formData.github_url,
        live_url: formData.live_url,
        tags: typeof formData.tags === 'string' ? formData.tags.split(',').map(t => t.trim()).filter(Boolean) : formData.tags,
        is_featured: formData.is_featured,
        display_order: Number(formData.display_order) || 0,
        updated_at: new Date()
      };

      if (isNew) {
        const { data, error } = await supabase
          .from('projects')
          .insert([payload])
          .select()
          .single();

        if (error) throw error;
        setProjects(prev => [...prev, data]);
        setMessage('Projeto cadastrado com sucesso!');
      } else {
        const { error } = await supabase
          .from('projects')
          .update(payload)
          .eq('id', editingProject.id);

        if (error) throw error;
        setProjects(prev => prev.map(p => p.id === editingProject.id ? { ...p, ...payload } : p));
        setMessage('Projeto atualizado com sucesso!');
      }

      setEditingProject(null);
    } catch (err) {
      setIsError(true);
      setMessage('Erro ao salvar projeto: ' + (err.message || 'Verifique sua conexão.'));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este projeto?')) return;

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setProjects(prev => prev.filter(p => p.id !== id));
      setMessage('Projeto excluído com sucesso.');
    } catch (err) {
      alert('Erro ao excluir projeto: ' + err.message);
    }
  };

  return (
    <div style={{ maxWidth: '1080px' }}>
      
      {/* CABEÇALHO */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div className="corp-badge" style={{ marginBottom: '0.65rem' }}>
            <FolderGit2 size={14} />
            <span>Portfólio & Cases</span>
          </div>
          <h2 style={{ fontSize: '1.85rem', fontWeight: '800', margin: 0 }}>Gerenciar Projetos</h2>
        </div>

        {!editingProject && (
          <button
            onClick={handleNew}
            className="corp-btn corp-btn-primary"
            style={{ padding: '0.65rem 1.4rem' }}
          >
            <Plus size={18} /> Novo Projeto
          </button>
        )}
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

      {/* FORMULÁRIO DE EDIÇÃO / CRIAÇÃO */}
      {editingProject ? (
        <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', margin: 0 }}>
              {isNew ? 'Criar Novo Projeto' : `Editar: ${formData.title}`}
            </h3>
            <button
              onClick={() => setEditingProject(null)}
              className="corp-btn corp-btn-secondary"
              style={{ padding: '0.4rem 0.8rem', minHeight: '36px' }}
            >
              <X size={16} /> Cancelar
            </button>
          </div>

          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.45rem' }}>Título do Projeto</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--glass-border)', color: '#fff' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.45rem' }}>Slug da URL (ex: imunno-system)</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="gerado-automaticamente"
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--glass-border)', color: '#fff' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.45rem' }}>Badge / Categoria</label>
                <input
                  type="text"
                  value={formData.badge}
                  onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--glass-border)', color: '#fff' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.45rem' }}>Tags (separadas por vírgula)</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="eBPF, Rust, Cloudflare, React"
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--glass-border)', color: '#fff' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.45rem' }}>Resumo Executivo (Exibido na Home e Cartões)</label>
              <textarea
                rows={3}
                required
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--glass-border)', color: '#fff' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.45rem' }}>O Problema que Resolve (Markdown)</label>
              <textarea
                rows={4}
                value={formData.problem_description}
                onChange={(e) => setFormData({ ...formData, problem_description: e.target.value })}
                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--glass-border)', color: '#fff' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.45rem' }}>Como Funciona por Trás / Arquitetura (Markdown)</label>
              <textarea
                rows={4}
                value={formData.technical_details}
                onChange={(e) => setFormData({ ...formData, technical_details: e.target.value })}
                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--glass-border)', color: '#fff' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.45rem' }}>URL da Imagem de Capa</label>
                <input
                  type="text"
                  value={formData.cover_image}
                  onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
                  placeholder="/images/projetos/imunno-system/imunno-hero.png"
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--glass-border)', color: '#fff' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.45rem' }}>Link do Repositório GitHub</label>
                <input
                  type="text"
                  value={formData.github_url}
                  onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                  placeholder="https://github.com/rodrigoffreir3/..."
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--glass-border)', color: '#fff' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginTop: '0.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.is_featured}
                  onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                  style={{ width: '20px', height: '20px', accentColor: '#3b82f6' }}
                />
                <span style={{ fontWeight: '600', color: '#f8fafc' }}>Destacar em Largura Total na Home</span>
              </label>

              <div>
                <label style={{ fontSize: '0.85rem', color: '#94a3b8', marginRight: '0.5rem' }}>Ordem de Exibição:</label>
                <input
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: Number(e.target.value) })}
                  style={{ width: '80px', padding: '0.4rem 0.6rem', borderRadius: '8px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--glass-border)', color: '#fff' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', borderTop: '1px solid var(--glass-border)', paddingTop: '1.25rem' }}>
              <button
                type="submit"
                disabled={saving}
                className="corp-btn corp-btn-primary"
                style={{ padding: '0.75rem 2rem' }}
              >
                <Save size={18} />
                <span>{saving ? 'Gravando Projeto...' : 'Salvar Projeto'}</span>
              </button>
            </div>

          </form>
        </div>
      ) : null}

      {/* LISTA DE PROJETOS ATUAIS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {projects.map((proj) => (
          <div key={proj.id} className="glass-panel" style={{ padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div style={{ width: '60px', height: '40px', borderRadius: '8px', overflow: 'hidden', background: '#000', flexShrink: 0 }}>
                {proj.cover_image ? (
                  <img src={proj.cover_image} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}><ImageIcon size={18} /></div>
                )}
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '700', margin: 0, color: '#f8fafc' }}>{proj.title}</h4>
                  {proj.is_featured && (
                    <span className="corp-badge" style={{ fontSize: '0.68rem', padding: '0.15rem 0.5rem' }}>Destaque</span>
                  )}
                </div>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>/projetos/{proj.slug}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.65rem' }}>
              <button
                onClick={() => handleEdit(proj)}
                className="corp-btn corp-btn-secondary"
                style={{ padding: '0.45rem 0.95rem', fontSize: '0.82rem', minHeight: '36px' }}
              >
                <Edit2 size={14} /> Editar
              </button>

              <button
                onClick={() => handleDelete(proj.id)}
                className="corp-btn corp-btn-secondary"
                style={{ padding: '0.45rem 0.95rem', fontSize: '0.82rem', minHeight: '36px', borderColor: 'rgba(239, 68, 68, 0.3)', color: '#f87171' }}
              >
                <Trash2 size={14} /> Excluir
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
