import { useState, useEffect, useRef } from 'react';

/**
 * useTypewriter — SPEC-SITE-007 RF-4
 * Hook de digitação e apagamento suave caractere por caractere sincronizado.
 * 
 * Regras:
 * - Digitação: 60-90ms por caractere
 * - Apagamento: 30-40ms por caractere
 * - Suporte estrito a prefers-reduced-motion (exibe o texto imediatamente)
 * - aria-hidden="true" no elemento consumidor
 */
export function useTypewriter(targetWord, { typingSpeed = 70, deletingSpeed = 35 } = {}) {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const currentWordRef = useRef('');

  useEffect(() => {
    // Verificação de acessibilidade: movimento reduzido
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mediaQuery.matches) {
        setDisplayText(targetWord);
        currentWordRef.current = targetWord;
        return;
      }
    }

    let timeoutId;

    const tick = () => {
      const current = currentWordRef.current;

      // Se a palavra mudou e ainda temos texto antigo digitado, primeiro apagamos
      if (isDeleting) {
        if (current.length > 0) {
          const next = current.slice(0, -1);
          currentWordRef.current = next;
          setDisplayText(next);
          timeoutId = setTimeout(tick, deletingSpeed);
        } else {
          setIsDeleting(false);
          timeoutId = setTimeout(tick, 100);
        }
      } else {
        // Digitando em direção a targetWord
        if (current.length < targetWord.length) {
          const next = targetWord.slice(0, current.length + 1);
          currentWordRef.current = next;
          setDisplayText(next);
          timeoutId = setTimeout(tick, typingSpeed);
        }
      }
    };

    if (currentWordRef.current !== targetWord) {
      if (currentWordRef.current.length > 0) {
        setIsDeleting(true);
        timeoutId = setTimeout(tick, deletingSpeed);
      } else {
        setIsDeleting(false);
        timeoutId = setTimeout(tick, typingSpeed);
      }
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [targetWord, isDeleting, typingSpeed, deletingSpeed]);

  return displayText;
}

export default useTypewriter;
