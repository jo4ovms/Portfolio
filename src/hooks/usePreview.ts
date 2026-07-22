import { useCallback, useEffect, useRef, useState } from 'react';

export interface PreviewData {
  title: string;
  desc: string;
  tech: string;
  url: string;
  image?: string;
}

interface Point {
  clientX: number;
  clientY: number;
}

const WIDTH = 300;
const MARGIN = 20;
const HEIGHT_CLEARANCE = 300;

function clampX(x: number) {
  return Math.min(x, window.innerWidth - WIDTH - MARGIN);
}

function clampY(y: number) {
  return Math.max(MARGIN, Math.min(y, window.innerHeight - HEIGHT_CLEARANCE));
}

function canHover() {
  return window.matchMedia('(hover: hover)').matches;
}

export function usePreview() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<PreviewData | null>(null);
  const [visible, setVisible] = useState(false);
  const pos = useRef({ px: 0, py: 0, tx: 0, ty: 0 });
  const raf = useRef(0);

  const apply = useCallback(() => {
    const el = rootRef.current;
    if (el) {
      el.style.left = `${pos.current.px}px`;
      el.style.top = `${pos.current.py}px`;
    }
  }, []);

  const loop = useCallback(() => {
    const p = pos.current;
    p.px += (p.tx - p.px) * 0.16;
    p.py += (p.ty - p.py) * 0.16;
    apply();
    raf.current = requestAnimationFrame(loop);
  }, [apply]);

  const show = useCallback(
    (next: PreviewData, e: Point) => {
      if (!canHover()) return;
      const p = pos.current;
      p.tx = clampX(e.clientX + 28);
      p.ty = clampY(e.clientY - 130);
      p.px = p.tx;
      p.py = p.ty;
      setData(next);
      setVisible(true);
      apply();
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(loop);
    },
    [apply, loop],
  );

  const move = useCallback((e: Point) => {
    pos.current.tx = clampX(e.clientX + 28);
    pos.current.ty = clampY(e.clientY - 130);
  }, []);

  const hide = useCallback(() => {
    setVisible(false);
    cancelAnimationFrame(raf.current);
    raf.current = 0;
  }, []);

  const showAnchored = useCallback(
    (next: PreviewData, el: HTMLElement) => {
      if (!canHover()) return;
      const r = el.getBoundingClientRect();
      const p = pos.current;
      p.px = p.tx = clampX(r.right + 28);
      p.py = p.ty = clampY(r.top - 60);
      setData(next);
      setVisible(true);
      apply();
    },
    [apply],
  );

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  return { rootRef, data, visible, show, move, hide, showAnchored };
}

export type PreviewController = ReturnType<typeof usePreview>;
