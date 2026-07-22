import type { ComponentPropsWithoutRef, PointerEvent } from 'react';
import { useRef } from 'react';

function magnetEnabled() {
  return (
    window.matchMedia('(hover: hover)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

export default function MagnetLink({
  onPointerMove,
  onPointerLeave,
  ...props
}: ComponentPropsWithoutRef<'a'>) {
  const ref = useRef<HTMLAnchorElement>(null);

  function handleMove(e: PointerEvent<HTMLAnchorElement>) {
    onPointerMove?.(e);
    const el = ref.current;
    if (!el || !magnetEnabled()) return;
    const r = el.getBoundingClientRect();
    const mx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const my = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    el.style.transform = `translate(${(mx * 4).toFixed(1)}px, ${(my * 3).toFixed(1)}px)`;
  }

  function handleLeave(e: PointerEvent<HTMLAnchorElement>) {
    onPointerLeave?.(e);
    if (ref.current) ref.current.style.transform = '';
  }

  return (
    <a
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      {...props}
    />
  );
}
