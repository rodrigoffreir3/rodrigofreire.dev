import React, { useState, useEffect, useRef } from 'react';
import MockupLoja from './MockupLoja';
import MockupInstitucional from './MockupInstitucional';
import MockupPdv from './MockupPdv';
import MockupWhatsapp from './MockupWhatsapp';
import MockupErp from './MockupErp';

/**
 * HeroCarousel — SPEC-SITE-007 RF-1 & RF-2
 * Carrossel de 5 mockups no Hero da Home.
 * 
 * Regras:
 * - Rotação circular a cada 7s em loop infinito
 * - Transição lateral suave com sentido consistente (slide + fade 450ms)
 * - Pausa obrigatória ao passar o mouse ou após clique manual
 * - Indicadores acessíveis com <button>, aria-label e área mínima de toque (44x44px)
 * - Apenas o mockup ativo anima internamente (performance RF-7)
 */
export default function HeroCarousel({ 
  slides, 
  activeIndex, 
  onSelectIndex, 
  onSlideChange 
}) {
  const [resetTick, setResetTick] = useState(0);
  const isHoveredRef = useRef(false);
  const ignoreHoverUntilRef = useRef(0);
  const containerRef = useRef(null);

  const activeIndexRef = useRef(activeIndex);
  activeIndexRef.current = activeIndex;

  const onSlideChangeRef = useRef(onSlideChange);
  onSlideChangeRef.current = onSlideChange;
  const onSelectIndexRef = useRef(onSelectIndex);
  onSelectIndexRef.current = onSelectIndex;

  // Efeito de rotação automática a cada 7 segundos
  useEffect(() => {
    // Acessibilidade: verificar prefers-reduced-motion
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mediaQuery.matches) {
        return; // Sob movimento reduzido, carrossel não avança automaticamente
      }
    }

    const timer = setInterval(() => {
      // Pausa se o cursor estiver sobre o mockup, a menos que o usuário tenha acabado de selecionar um slide
      if (isHoveredRef.current && Date.now() > ignoreHoverUntilRef.current) {
        return;
      }

      const nextIndex = (activeIndexRef.current + 1) % slides.length;
      if (onSlideChangeRef.current) {
        onSlideChangeRef.current(nextIndex);
      } else if (onSelectIndexRef.current) {
        onSelectIndexRef.current(nextIndex);
      }
    }, 7000);

    return () => clearInterval(timer);
  }, [resetTick, slides.length]);

  const handleManualSelect = (idx) => {
    // Ao clicar manualmente, garante que o movimento retome após 7s,
    // mesmo se o cursor do mouse permanecer sobre o botão clicado
    ignoreHoverUntilRef.current = Date.now() + 15000;
    isHoveredRef.current = false;

    if (onSlideChange) {
      onSlideChange(idx);
    } else if (onSelectIndex) {
      onSelectIndex(idx);
    }

    // Reinicia o ciclo de 7s a partir do clique
    setResetTick(t => t + 1);
  };

  const handleMouseEnter = () => {
    // Apenas ativa pausa de hover em dispositivos com ponteiro físico (mouse)
    // Evita congelamento permanente em celulares e tablets (telas touch)
    if (typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      isHoveredRef.current = true;
    }
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
  };



  const mockups = [
    <MockupLoja key="loja" isActive={activeIndex === 0} />,
    <MockupInstitucional key="inst" isActive={activeIndex === 1} />,
    <MockupPdv key="pdv" isActive={activeIndex === 2} />,
    <MockupWhatsapp key="wa" isActive={activeIndex === 3} />,
    <MockupErp key="erp" isActive={activeIndex === 4} />
  ];

  return (
    <div 
      className="hero-carousel-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={containerRef}
      aria-roledescription="carousel"
      aria-label="Exemplos práticos de soluções de TI desenvolvidas"
    >
      <div 
        className="hero-carousel-stage"
        aria-live="polite"
      >
        {mockups.map((mockup, idx) => {
          let positionClass = 'slide-hidden';
          if (idx === activeIndex) {
            positionClass = 'slide-active';
          } else if (idx === (activeIndex - 1 + mockups.length) % mockups.length) {
            positionClass = 'slide-exit-left';
          } else {
            positionClass = 'slide-enter-right';
          }

          return (
            <div 
              key={idx} 
              className={`hero-carousel-slide ${positionClass}`}
              aria-hidden={idx !== activeIndex}
            >
              {mockup}
            </div>
          );
        })}
      </div>

      {/* CONTROLE MANUAL OBRIGATÓRIO (RF-2 / CA-4 / CA-5) */}
      <nav className="hero-carousel-nav" aria-label="Navegação do carrossel de soluções">
        {slides.map((slide, idx) => {
          const isCurrent = idx === activeIndex;
          return (
            <button
              key={slide.id}
              type="button"
              className={`hero-carousel-dot ${isCurrent ? 'active' : ''}`}
              onClick={() => handleManualSelect(idx)}
              aria-label={`Ver exemplo de ${slide.label}`}
              aria-current={isCurrent ? 'true' : 'false'}
            >
              <span className="hero-carousel-dot-inner" />
              <span className="hero-carousel-dot-text">{slide.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
