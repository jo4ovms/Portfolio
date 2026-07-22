import { useEffect, useRef } from 'react';

export function useReveal<T extends HTMLElement>(delay = 0) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    el.classList.add('reveal');
    if (delay) el.style.transitionDelay = `${delay}ms`;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add('reveal-in');
            io.disconnect();
          }
        }
      },
      { rootMargin: '0px 0px -60px 0px' },
    );
    io.observe(el);

    return () => io.disconnect();
  }, [delay]);

  return ref;
}
