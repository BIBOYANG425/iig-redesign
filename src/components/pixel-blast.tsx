"use client";

import { useRef, useEffect, useCallback } from "react";

/*
  PixelBlast — Canvas 2D Bayer-dithered grid with liquid wobble + click ripples.

  - 4x4 Bayer matrix thresholds control point density
  - Sine/cosine time-based displacement creates a breathing "liquid" feel
  - Pointer clicks push ripples that distort squares radially
  - Radial edge-fade blends the grid into the dark background
*/

// 4x4 Bayer ordered dithering matrix (normalized 0–1)
const BAYER_4X4 = [
  [0 / 16, 8 / 16, 2 / 16, 10 / 16],
  [12 / 16, 4 / 16, 14 / 16, 6 / 16],
  [3 / 16, 11 / 16, 1 / 16, 9 / 16],
  [15 / 16, 7 / 16, 13 / 16, 5 / 16],
];

type Ripple = {
  x: number;
  y: number;
  time: number;
  strength: number;
};

export default function PixelBlast() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const animRef = useRef<number>(0);
  const dprRef = useRef(1);

  const handleClick = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    ripplesRef.current.push({
      x: (e.clientX - rect.left) * dprRef.current,
      y: (e.clientY - rect.top) * dprRef.current,
      time: performance.now() / 1000,
      strength: 1,
    });
    // Cap ripples to avoid memory issues
    if (ripplesRef.current.length > 12) {
      ripplesRef.current.shift();
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    dprRef.current = dpr;

    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
    };
    resize();
    window.addEventListener("resize", resize);

    const CELL = 10 * dpr; // grid cell size in px
    const DOT_BASE = 2.5 * dpr; // base dot radius

    const draw = (now: number) => {
      const t = now / 1000;
      const W = canvas.width;
      const H = canvas.height;
      const cx = W / 2;
      const cy = H / 2;
      const maxR = Math.sqrt(cx * cx + cy * cy);

      ctx.clearRect(0, 0, W, H);

      const cols = Math.ceil(W / CELL);
      const rows = Math.ceil(H / CELL);

      // Decay ripples
      const ripples = ripplesRef.current;
      for (let i = ripples.length - 1; i >= 0; i--) {
        const age = t - ripples[i].time;
        ripples[i].strength = Math.max(0, 1 - age / 2.5);
        if (ripples[i].strength <= 0) {
          ripples.splice(i, 1);
        }
      }

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const baseX = col * CELL + CELL / 2;
          const baseY = row * CELL + CELL / 2;

          // Bayer threshold for this cell
          const bx = col % 4;
          const by = row % 4;
          const threshold = BAYER_4X4[by][bx];

          // Distance from center (normalized 0–1)
          const dx = baseX - cx;
          const dy = baseY - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const normDist = dist / maxR;

          // Radial density: denser near center, sparser at edges
          const density = 1 - normDist * normDist;

          // Bayer filter: skip this dot if density < threshold
          if (density < threshold) continue;

          // Liquid wobble displacement
          const wobbleX =
            Math.sin(t * 0.8 + baseY * 0.008) * 3 * dpr +
            Math.cos(t * 1.1 + baseX * 0.006) * 2 * dpr;
          const wobbleY =
            Math.cos(t * 0.9 + baseX * 0.007) * 3 * dpr +
            Math.sin(t * 0.7 + baseY * 0.009) * 2 * dpr;

          let px = baseX + wobbleX;
          let py = baseY + wobbleY;

          // Ripple displacement
          for (const ripple of ripples) {
            const rdx = baseX - ripple.x;
            const rdy = baseY - ripple.y;
            const rDist = Math.sqrt(rdx * rdx + rdy * rdy);
            const age = t - ripple.time;
            const waveRadius = age * 400 * dpr;
            const waveDelta = Math.abs(rDist - waveRadius);
            const waveWidth = 120 * dpr;

            if (waveDelta < waveWidth) {
              const waveIntensity =
                (1 - waveDelta / waveWidth) *
                ripple.strength *
                18 *
                dpr;
              const angle = Math.atan2(rdy, rdx);
              px += Math.cos(angle) * waveIntensity * Math.sin(waveDelta * 0.05);
              py += Math.sin(angle) * waveIntensity * Math.sin(waveDelta * 0.05);
            }
          }

          // Edge fade: alpha falls off radially
          const edgeFade = Math.max(0, 1 - normDist * 1.3);
          const alpha = edgeFade * (0.25 + density * 0.35);

          // Dot size varies subtly with time
          const sizeWobble = 1 + Math.sin(t * 1.5 + col * 0.3 + row * 0.3) * 0.15;
          const dotSize = DOT_BASE * sizeWobble * (0.5 + density * 0.5);

          // #9BD97C is rgb(155, 217, 124)
          ctx.fillStyle = `rgba(155, 217, 124, ${alpha * 0.8})`;
          ctx.fillRect(
            px - dotSize / 2,
            py - dotSize / 2,
            dotSize,
            dotSize
          );
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      onPointerDown={handleClick}
      className="pixel-blast"
    />
  );
}
