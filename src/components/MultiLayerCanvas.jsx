import React from 'react';

export default function MultiLayerCanvas({ settings, children }) {
  const {
    bg_image_url = '',
    bg_image_size = 'cover',
    bg_image_repeat = 'no-repeat',
    overlay_color = 'rgba(9, 13, 22, 0.75)',
    
    hero_char_url = '',
    hero_char_position = 'bottom-right',
    hero_char_size = '380px',
    hero_char_opacity = 1.0,
    
    secondary_bg_url = '',
    secondary_bg_position = 'bottom-center',
    secondary_bg_size = '100%',
    secondary_bg_opacity = 0.9,
    
    content_has_border = true,
    content_border_color = 'rgba(255, 255, 255, 0.12)',
    content_bg_color = 'rgba(17, 24, 39, 0.62)',
    content_blur_level = 20,
    content_border_radius = '24px'
  } = settings || {};

  // Calcula posição CSS para o elemento flutuante
  const getCharPositionStyle = () => {
    switch (hero_char_position) {
      case 'bottom-left':
        return { bottom: '0px', left: '20px' };
      case 'center-bottom':
        return { bottom: '0px', left: '50%', transform: 'translateX(-50%)' };
      case 'top-right':
        return { top: '80px', right: '20px' };
      case 'top-left':
        return { top: '80px', left: '20px' };
      case 'bottom-right':
      default:
        return { bottom: '0px', right: '20px' };
    }
  };

  return (
    <div className="multi-layer-viewport" style={{ position: 'relative', minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>
      
      {/* 1. CAMADA BASE DE FUNDO (Background Pattern / Imagem Principal) */}
      <div
        className="canvas-layer-base"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: -4,
          backgroundImage: bg_image_url ? `url(${bg_image_url})` : 'none',
          backgroundSize: bg_image_size,
          backgroundRepeat: bg_image_repeat,
          backgroundPosition: 'center',
          backgroundColor: '#090d16'
        }}
      />

      {/* 2. CAMADA DE OVERLAY DE COR / TINT */}
      <div
        className="canvas-layer-overlay"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: -3,
          backgroundColor: overlay_color,
          pointerEvents: 'none'
        }}
      />

      {/* 3. CAMADA AMBIENTE APPLE MESH (Orbs de Luz Suave para Refração) */}
      <div className="apple-ambient-container" aria-hidden="true" style={{ position: 'fixed', inset: 0, zIndex: -2, pointerEvents: 'none' }}>
        <div className="apple-ambient-orb orb-primary" />
        <div className="apple-ambient-orb orb-secondary" />
        <div className="apple-ambient-orb orb-accent" />
      </div>

      {/* 4. CAMADA SECUNDÁRIA (ex: Nuvens no rodapé ou texturas de horizonte) */}
      {secondary_bg_url && (
        <div
          className="canvas-layer-secondary"
          style={{
            position: 'fixed',
            left: 0,
            right: 0,
            bottom: 0,
            height: secondary_bg_size || '300px',
            backgroundImage: `url(${secondary_bg_url})`,
            backgroundRepeat: 'repeat-x',
            backgroundPosition: secondary_bg_position || 'bottom center',
            backgroundSize: 'contain',
            opacity: secondary_bg_opacity,
            zIndex: -1,
            pointerEvents: 'none'
          }}
        />
      )}

      {/* 5. CAMADA DECORATIVA FLUTUANTE (Sticker / Personagem / PNG) */}
      {hero_char_url && (
        <div
          className="canvas-layer-sticker"
          style={{
            position: 'fixed',
            zIndex: 10,
            maxWidth: hero_char_size,
            opacity: hero_char_opacity,
            pointerEvents: 'none',
            ...getCharPositionStyle()
          }}
        >
          <img
            src={hero_char_url}
            alt="Decorative Element"
            style={{ width: '100%', height: 'auto', display: 'block', filter: 'drop-shadow(0 10px 25px rgba(0,0,0,0.5))' }}
          />
        </div>
      )}

      {/* 6. CONTAINER CENTRAL DE CONTEÚDO (Com Delimitação de Vidro ou Livre/Transparente) */}
      <div className="canvas-content-wrapper" style={{ width: '100%', position: 'relative', zIndex: 20 }}>
        {content_has_border ? (
          <div
            className="central-glass-container"
            style={{
              maxWidth: '1240px',
              margin: '1.5rem auto 3rem auto',
              padding: '0 1rem',
              backgroundColor: content_bg_color,
              backdropFilter: `blur(${content_blur_level}px) saturate(180%)`,
              WebkitBackdropFilter: `blur(${content_blur_level}px) saturate(180%)`,
              border: `1px solid ${content_border_color}`,
              borderRadius: content_border_radius,
              boxShadow: '0 16px 48px -8px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.18)'
            }}
          >
            {children}
          </div>
        ) : (
          <div
            className="central-free-container"
            style={{
              maxWidth: '1240px',
              margin: '0 auto',
              padding: '0 1rem',
              backgroundColor: 'transparent'
            }}
          >
            {children}
          </div>
        )}
      </div>

    </div>
  );
}
