"use client";

import { useRef, useEffect, useCallback } from "react";
import createGlobe from "cobe";

export default function CobeGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerDown = useRef(false);
  const pointerX = useRef(0);
  const phiRef = useRef(0);
  const velocityRef = useRef(0);
  const animRef = useRef<number>(0);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    pointerDown.current = true;
    pointerX.current = e.clientX;
    velocityRef.current = 0;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!pointerDown.current) return;
    const dx = e.clientX - pointerX.current;
    pointerX.current = e.clientX;
    phiRef.current += dx * 0.005;
    velocityRef.current = dx * 0.005;
  }, []);

  const onPointerUp = useCallback(() => {
    pointerDown.current = false;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const globe = createGlobe(canvas, {
      devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
      width: 1000,
      height: 1000,
      phi: 0,
      theta: 0.15,
      dark: 1,
      diffuse: 0.4,
      mapSamples: 40000,
      mapBrightness: 8,
      mapBaseBrightness: 0.005,
      baseColor: [0.043, 0.043, 0.15],
      markerColor: [0.608, 0.851, 0.486],
      glowColor: [0.2, 0.2, 0.6],
      markers: [],
    });

    let paused = false;

    const onVisibilityChange = () => {
      paused = document.hidden;
      if (!paused) animRef.current = requestAnimationFrame(tick);
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    const tick = () => {
      if (paused) return;

      if (!pointerDown.current) {
        phiRef.current += velocityRef.current;
        velocityRef.current *= 0.95;

        if (Math.abs(velocityRef.current) < 0.0001) {
          velocityRef.current = 0;
          if (!prefersReducedMotion) {
            phiRef.current += 0.005;
          }
        }
      }

      globe.update({
        phi: phiRef.current,
        theta: 0,
        width: 1000,
        height: 1000,
      });

      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animRef.current);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      globe.destroy();
    };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "1/1",
        position: "relative",
        WebkitMaskImage:
          "radial-gradient(circle at center, black 60%, transparent 100%)",
        maskImage:
          "radial-gradient(circle at center, black 60%, transparent 100%)",
      }}
    >
      <canvas
        ref={canvasRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={{
          width: "100%",
          height: "100%",
          cursor: "grab",
          touchAction: "none",
        }}
      />
    </div>
  );
}
