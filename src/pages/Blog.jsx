import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

export default function Blog({ posts = [] }) {
  // Ordena os posts do mais recente para o mais antigo
  const sortedPosts = [...posts].sort((a, b) => new Date(b.published_at) - new Date(a.published_at));

  return (
    <div className="portfolio-container" style={{ paddingTop: '2.5rem' }}>
      
      {/* HEADER DO BLOG */}
      <div className="section-header-corp" style={{ marginBottom: '3rem' }}>
        <div className="corp-badge">
          <BookOpen size={14} />
          <span>Artigos & Publicações</span>
        </div>
        <h2>Blog & Reflexões de Engenharia</h2>
        <p>Análises sobre arquitetura de sistemas, inteligência artificial, eficiência de hardware e segurança no kernel.</p>
      </div>

      {/* FEED DE ARTIGOS */}
      <div className="blog-grid-corp" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.75rem' }}>
        {sortedPosts.length > 0 ? (
          sortedPosts.map((post) => (
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
