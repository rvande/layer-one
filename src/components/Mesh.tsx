'use client';

import { useEffect, useRef } from 'react';

/** Perspective network mesh drawn on a canvas that fills its parent section. */
export function Mesh({ tone }: { tone: 'light' | 'dark' }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    const parent = cv?.parentElement;
    const ctx = cv?.getContext('2d');
    if (!cv || !parent || !ctx) return;

    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dark = tone === 'dark';
    const col = dark ? '234,106,30' : '194,77,16';
    const aMax = dark ? 0.75 : 0.5;
    const R = 18;
    const C = 34;
    const span = 4.4;
    let W = 0;
    let H = 0;
    let t = 0;
    let running = true;
    let raf = 0;

    const size = () => {
      const r = parent.getBoundingClientRect();
      const d = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width;
      H = r.height;
      cv.width = W * d;
      cv.height = H * d;
      ctx.setTransform(d, 0, 0, d, 0, 0);
    };

    const frame = () => {
      ctx.clearRect(0, 0, W, H);
      const P: number[][][] = [];
      const hz = H * (dark ? 0.25 : 0.38);
      for (let r = 0; r <= R; r++) {
        const z = 1 + r * 0.32;
        const row: number[][] = [];
        for (let c = 0; c <= C; c++) {
          const wx = (c / C - 0.5) * span;
          const h =
            Math.sin(wx * 1.7 + t) * 0.22 +
            Math.cos(z * 1.25 - t * 0.8) * 0.2 +
            Math.sin((wx + z) * 0.9 + t * 0.5) * 0.12;
          row.push([W / 2 + (wx / z) * W * 0.95, hz + ((1.25 - h) / z) * H * 0.62, z]);
        }
        P.push(row);
      }
      ctx.lineWidth = 1;
      for (let r = 0; r < R; r++) {
        for (let c = 0; c < C; c++) {
          const p = P[r][c];
          const a = aMax * (1.15 - p[2] / 7);
          ctx.strokeStyle = `rgba(${col},${a.toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(p[0], p[1]);
          ctx.lineTo(P[r][c + 1][0], P[r][c + 1][1]);
          ctx.moveTo(p[0], p[1]);
          ctx.lineTo(P[r + 1][c][0], P[r + 1][c][1]);
          ctx.moveTo(p[0], p[1]);
          ctx.lineTo(P[r + 1][c + 1][0], P[r + 1][c + 1][1]);
          ctx.stroke();
          if (r < 7 && (r + c) % 3 === 0) {
            ctx.fillStyle = `rgba(${col},${Math.min(1, a * 1.6)})`;
            ctx.beginPath();
            ctx.arc(p[0], p[1], 1.6, 0, 6.283);
            ctx.fill();
          }
        }
      }
      t += 0.012;
      if (!still && running) raf = requestAnimationFrame(frame);
    };

    size();
    frame();

    const io = new IntersectionObserver((entries) => {
      const visible = entries[0].isIntersecting;
      if (visible && !running && !still) {
        running = true;
        frame();
      } else if (!visible) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(cv);

    let timeout: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        size();
        if (still) frame();
      }, 150);
    };
    window.addEventListener('resize', onResize);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      clearTimeout(timeout);
      window.removeEventListener('resize', onResize);
    };
  }, [tone]);

  return <canvas ref={ref} className="mesh" data-tone={tone} aria-hidden="true" />;
}
