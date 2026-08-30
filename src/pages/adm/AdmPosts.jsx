import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import MDEditor from '@uiw/react-md-editor';
import { FileText, Plus, Edit2, Trash2, CheckCircle2, AlertCircle, Save, X, Eye } from 'lucide-react';

export default function AdmPosts({ posts, setPosts }) {
  const [editingPost, setEditingPost] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    content_markdown: '',
    cover_image: '',
    tags: '',
    is_published: true
  });

  const handleEdit = (post) => {
    setIsNew(false);
    setEditingPost(post);
    setFormData({
      ...post,
      tags: post.tags ? post.tags.join(', ') : ''
    });
    setMessage('');
  };

  const handleNew = () => {
    setIsNew(true);
    setEditingPost({ id: 'new' });
    setFormData({
      title: '',
      slug: '',
      description: '',
      content_markdown: '## Introdução\n\nEscreva seu artigo aqui com suporte a Markdown, tabelas e trechos de código...',
      cover_image: '',
      tags: 'Inteligência Artificial, Engenharia de Software',
      is_published: true
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
        description: formData.description,
        content_markdown: formData.content_markdown,
        cover_image: formData.cover_image,
        tags: typeof formData.tags === 'string' ? formData.tags.split(',').map(t => t.trim()).filter(Boolean) : formData.tags,
        is_published: formData.is_published,
        published_at: formData.published_at || new Date().toISOString(),
        updated_at: new Date()
      };

      if (isNew) {
        const { data, error } = await supabase
          .from('posts')
          .insert([payload])
          .select()
          .single();

        if (error) throw error;
        setPosts(prev => [data, ...prev]);
        setMessage('Artigo publicado com sucesso!');
      } else {
        const { error } = await supabase
          .from('posts')
          .update(payload)
          .eq('id', editingPost.id);

        if (error) throw error;
        setPosts(prev => prev.map(p => p.id === editingPost.id ? { ...p, ...payload } : p));
        setMessage('Artigo atualizado com sucesso!');
      }

      setEditingPost(null);
    } catch (err) {
      setIsError(true);
      setMessage('Erro ao salvar artigo: ' + (err.message || 'Verifique sua conexão.'));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este artigo do blog?')) return;

    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setPosts(prev => prev.filter(p => p.id !== id));
      setMessage('Artigo excluído com sucesso.');
    } catch (err) {
      alert('Erro ao excluir artigo: ' + err.message);
    }
  };

  return (
    <div style={{ maxWidth: '1080px' }}>
      
      {/* CABEÇALHO */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div className="corp-badge" style={{ marginBottom: '0.65rem' }}>
            <FileText size={14} />
            <span>Blog & Publicações</span>
          </div>
          <h2 style={{ fontSize: '1.85rem', fontWeight: '800', margin: 0 }}>Gerenciar Artigos</h2>
        </div>

        {!editingPost && (
          <button
            onClick={handleNew}
            className="corp-btn corp-btn-primary"
            style={{ padding: '0.65rem 1.4rem' }}
          >
            <Plus size={18} /> Novo Artigo
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

      {/* FORMULÁRIO DE EDIÇÃO COM EDITOR MARKDOWN */}
      {editingPost ? (
        <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', margin: 0 }}>
              {isNew ? 'Escrever Novo Artigo' : `Editar: ${formData.title}`}
            </h3>
            <button
              onClick={() => setEditingPost(null)}
              className="corp-btn corp-btn-secondary"
              style={{ padding: '0.4rem 0.8rem', minHeight: '36px' }}
            >
              <X size={16} /> Cancelar
            </button>
          </div>

          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.45rem' }}>Título do Artigo</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--glass-border)', color: '#fff' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.45rem' }}>Slug da URL</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="gerado-automaticamente"
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--glass-border)', color: '#fff' }}
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.45rem' }}>Resumo do Artigo (Exibido nas Listagens)</label>
                <textarea
                  rows={2}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--glass-border)', color: '#fff' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.45rem' }}>Tags (separadas por vírgula)</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="IA, Hardware, Kernel, Carreira"
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--glass-border)', color: '#fff' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.45rem' }}>URL da Imagem de Capa</label>
                <input
                  type="text"
                  value={formData.cover_image}
                  onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
                  placeholder="/images/projetos/greentoken/greentoken-hero.png"
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--glass-border)', color: '#fff' }}
                />
              </div>
            </div>

            {/* EDITOR MARKDOWN RICO */}
            <div data-color-mode="dark" style={{ marginTop: '0.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.45rem' }}>Conteúdo em Markdown</label>
              <MDEditor
                value={formData.content_markdown}
                onChange={(val) => setFormData({ ...formData, content_markdown: val || '' })}
                height={420}
                preview="live"
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', borderTop: '1px solid var(--glass-border)', paddingTop: '1.25rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.is_published}
                  onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                  style={{ width: '20px', height: '20px', accentColor: '#3b82f6' }}
                />
                <span style={{ fontWeight: '600', color: '#f8fafc' }}>Publicar Imediatamente no Blog</span>
              </label>

              <button
                type="submit"
                disabled={saving}
                className="corp-btn corp-btn-primary"
                style={{ padding: '0.75rem 2rem' }}
              >
                <Save size={18} />
                <span>{saving ? 'Gravando Artigo...' : 'Salvar Artigo'}</span>
              </button>
            </div>

          </form>
        </div>
      ) : null}

      {/* LISTA DE ARTIGOS DO BLOG */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {posts.map((post) => (
          <div key={post.id} className="glass-panel" style={{ padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '700', margin: 0, color: '#f8fafc' }}>{post.title}</h4>
                <span className="corp-badge" style={{ fontSize: '0.68rem', padding: '0.15rem 0.5rem' }}>
                  {new Date(post.published_at).toLocaleDateString('pt-BR')}
                </span>
              </div>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>/blog/{post.slug}</span>
            </div>

            <div style={{ display: 'flex', gap: '0.65rem' }}>
              <button
                onClick={() => handleEdit(post)}
                className="corp-btn corp-btn-secondary"
                style={{ padding: '0.45rem 0.95rem', fontSize: '0.82rem', minHeight: '36px' }}
              >
                <Edit2 size={14} /> Editar
              </button>

              <button
                onClick={() => handleDelete(post.id)}
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
