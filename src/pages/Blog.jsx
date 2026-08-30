import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Search } from 'lucide-react';

export default function Blog({ posts }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  // Coleta todas as tags únicas
  const allTags = Array.from(new Set(posts.flatMap(p => p.tags || [])));

  // Filtra posts por busca e tag
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !selectedTag || (post.tags && post.tags.includes(selectedTag));
    return matchesSearch && matchesTag;
  });

  return (
    <div className="portfolio-container" style={{ paddingTop: '2.5rem' }}>
      
      {/* HEADER DO BLOG */}
      <div className="section-header-corp" style={{ marginBottom: '3rem' }}>
        <div className="corp-badge">
          <BookOpen size={14} />
          <span>Artigos & Publicações</span>
        </div>
        <h2>Blog & Reflexões de Engenharia</h2>
        <p>Análises sobre arquitetura de sistemas, eficiência física de inteligência artificial, mercado de semicondutores e segurança no kernel.</p>
      </div>

      {/* BARRA DE PESQUISA E FILTROS DE TAGS */}
      <div style={{ maxWidth: '720px', margin: '0 auto 3rem auto' }}>
        <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
          <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Buscar artigos por palavra-chave..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '0.85rem 1rem 0.85rem 48px',
              borderRadius: '999px',
              border: '1px solid var(--glass-border)',
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              color: 'var(--text-heading)',
              fontSize: '0.95rem',
              outline: 'none'
            }}
          />
        </div>

        {/* TAGS */}
        {allTags.length > 0 && (
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={() => setSelectedTag('')}
              className={`tech-tag ${!selectedTag ? 'active' : ''}`}
              style={{
                cursor: 'pointer',
                background: !selectedTag ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                color: !selectedTag ? '#ffffff' : 'var(--text-body)',
                border: '1px solid var(--glass-border)',
                padding: '0.35rem 0.85rem',
                fontSize: '0.82rem'
              }}
            >
              Todos os Temas
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
                className={`tech-tag ${selectedTag === tag ? 'active' : ''}`}
                style={{
                  cursor: 'pointer',
                  background: selectedTag === tag ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                  color: selectedTag === tag ? '#ffffff' : 'var(--text-body)',
                  border: '1px solid var(--glass-border)',
                  padding: '0.35rem 0.85rem',
                  fontSize: '0.82rem'
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* FEED DE ARTIGOS */}
      <div className="blog-grid-corp" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.75rem' }}>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div key={post.id} className="blog-card-corp">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <div className="tech-tag">
                  {new Date(post.published_at).toLocaleDateString('pt-BR')}
                </div>
                {post.tags && post.tags[0] && (
                  <span className="corp-badge" style={{ fontSize: '0.7rem', padding: '0.2rem 0.55rem' }}>
                    {post.tags[0]}
                  </span>
                )}
              </div>

              <h4><Link to={`/blog/${post.slug}`}>{post.title}</Link></h4>
              <p>{post.description}</p>
              
              <Link to={`/blog/${post.slug}`} className="corp-btn corp-btn-secondary" style={{ padding: '0.55rem 1.25rem', fontSize: '0.88rem', marginTop: 'auto', alignSelf: 'flex-start' }}>
                Ler Artigo Completo →
              </Link>
            </div>
          ))
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 1rem' }}>
            <p style={{ color: 'var(--text-muted)' }}>Nenhum artigo encontrado com os filtros selecionados.</p>
          </div>
        )}
      </div>

    </div>
  );
}
