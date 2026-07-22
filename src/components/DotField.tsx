import { useEffect, useRef } from 'react';

const GAP = 30;
const LIGHT_RADIUS = 190;
const PUSH_RADIUS = 90;
const SPRING = 0.045;
const DAMPING = 0.86;
const EASING = 0.12;
const RIPPLE_RADIUS = 150;
const RIPPLE_FORCE = 9;

interface Dot {
  bx: number;
  by: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export default function DotField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const glow = glowRef.current;
    if (!canvas || !glow) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    let width = 0;
    let height = 0;
    let dots: Dot[] = [];
    const mouse = { x: -9999, y: -9999 };
    const eased = { x: -9999, y: -9999 };
    let raf = 0;

    function build() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      for (let y = GAP / 2; y < height; y += GAP) {
        for (let x = GAP / 2; x < width; x += GAP) {
          dots.push({ bx: x, by: y, x, y, vx: 0, vy: 0 });
        }
      }
    }

    function drawStatic() {
      ctx!.clearRect(0, 0, width, height);
      for (const d of dots) {
        ctx!.beginPath();
        ctx!.arc(d.bx, d.by, 1.1, 0, 6.2832);
        ctx!.fillStyle = 'rgba(233,233,238,0.07)';
        ctx!.fill();
      }
    }

    function frame() {
      eased.x += (mouse.x - eased.x) * EASING;
      eased.y += (mouse.y - eased.y) * EASING;
      glow!.style.transform = `translate(${eased.x - 320}px, ${eased.y - 320}px)`;

      ctx!.clearRect(0, 0, width, height);
      for (const d of dots) {
        const dx = d.x - eased.x;
        const dy = d.y - eased.y;
        const dist = Math.hypot(dx, dy);

        if (dist < PUSH_RADIUS && dist > 0.01) {
          const force = ((PUSH_RADIUS - dist) / PUSH_RADIUS) * 1.6;
          d.vx += (dx / dist) * force;
          d.vy += (dy / dist) * force;
        }
        d.vx += (d.bx - d.x) * SPRING;
        d.vy += (d.by - d.y) * SPRING;
        d.vx *= DAMPING;
        d.vy *= DAMPING;
        d.x += d.vx;
        d.y += d.vy;

        let alpha = 0.055;
        if (dist < LIGHT_RADIUS) alpha += (1 - dist / LIGHT_RADIUS) * 0.5;
        ctx!.beginPath();
        ctx!.arc(d.x, d.y, 1.1, 0, 6.2832);
        ctx!.fillStyle = `rgba(233,233,238,${alpha.toFixed(3)})`;
        ctx!.fill();
      }
      raf = requestAnimationFrame(frame);
    }

    function start() {
      if (!raf && !reduced) raf = requestAnimationFrame(frame);
    }

    function stop() {
      cancelAnimationFrame(raf);
      raf = 0;
    }

    function onResize() {
      build();
      if (reduced) drawStatic();
    }

    function onPointerMove(e: globalThis.PointerEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }

    function onPointerLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    function onPointerDown(e: globalThis.PointerEvent) {
      if (reduced || e.pointerType !== 'touch') return;
      const px = e.clientX;
      const py = e.clientY;
      for (const d of dots) {
        const dx = d.x - px;
        const dy = d.y - py;
        const dist = Math.hypot(dx, dy);
        if (dist < RIPPLE_RADIUS && dist > 0.01) {
          const force = (1 - dist / RIPPLE_RADIUS) * RIPPLE_FORCE;
          d.vx += (dx / dist) * force;
          d.vy += (dy / dist) * force;
        }
      }
    }

    function onVisibility() {
      if (document.hidden) stop();
      else start();
    }

    build();
    if (reduced) drawStatic();
    else start();

    window.addEventListener('resize', onResize);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave);
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      stop();
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className='fixed inset-0 z-0'
        aria-hidden='true'
      />
      <div
        ref={glowRef}
        className='pointer-events-none fixed left-0 top-0 z-1 size-[640px] rounded-full bg-[radial-gradient(circle,oklch(0.93_0.004_270_/_0.05)_0%,transparent_62%)] will-change-transform'
        aria-hidden='true'
      />
    </>
  );
}
