import { useEffect } from 'react';

/**
 * useScrollReveal — SPEC-SITE-006 RF-2
 * Entrada sutil de seção ao rolar via IntersectionObserver nativo.
 * 
 * Regras estritas:
 * - Dispara uma única vez por elemento (unobserve imediato após revelar).
 * - Deslocamento vertical suave (máx 12px) e opacidade em 400ms.
 * - Proibido em conteúdo crítico (hero, contatos diretos, botões principais).
 * - Respeita prefers-reduced-motion (se ativo, exibe imediatamente).
 */
export function useScrollReveal() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Acessibilidade: se o usuário prefere movimento reduzido, revela tudo imediatamente
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      document.querySelectorAll('.scroll-reveal').forEach((el) => {
        el.classList.add('revealed');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target); // Dispara apenas uma única vez
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -30px 0px'
      }
    );

    const elements = document.querySelectorAll('.scroll-reveal:not(.revealed)');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);
}

export default useScrollReveal;
