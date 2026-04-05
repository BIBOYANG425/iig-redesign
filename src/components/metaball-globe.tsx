"use client";

import { useRef, useEffect, useCallback } from "react";
import createGlobe from "cobe";

/*
  MetaballGlobe — Interactive WebGL Earth built with cobe v2.

  - Dark base theme with green continents on deep blue sphere
  - Click-drag rotates the globe with friction-based momentum
  - Theta clamped to prevent flipping upside down
  - Uses globe.update() loop for continuous state updates
*/

export default function MetaballGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerDown = useRef(false);
  const phiRef = useRef(0);
  const thetaRef = useRef(0.3);
  const velocityRef = useRef({ phi: 0, theta: 0 });
  const lastPointer = useRef({ x: 0, y: 0 });
  const lastTime = useRef(0);
  const globeRef = useRef<ReturnType<typeof createGlobe> | null>(null);
  const animRef = useRef<number>(0);

  const autoRotateSpeed = 0.003;

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    pointerDown.current = true;
    lastPointer.current = { x: e.clientX, y: e.clientY };
    lastTime.current = performance.now();
    velocityRef.current = { phi: 0, theta: 0 };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!pointerDown.current) return;
    const now = performance.now();
    const dt = Math.max(now - lastTime.current, 1) / 1000;

    const dx = e.clientX - lastPointer.current.x;
    const dy = e.clientY - lastPointer.current.y;

    const sensitivity = 0.005;
    const dPhi = dx * sensitivity;
    const dTheta = -dy * sensitivity;

    phiRef.current += dPhi;
    thetaRef.current += dTheta;

    // Clamp theta to prevent flipping
    thetaRef.current = Math.max(
      -Math.PI / 2,
      Math.min(Math.PI / 2, thetaRef.current)
    );

    // Track velocity for momentum
    velocityRef.current = {
      phi: dPhi / dt,
      theta: dTheta / dt,
    };

    lastPointer.current = { x: e.clientX, y: e.clientY };
    lastTime.current = now;
  }, []);

  const onPointerUp = useCallback(() => {
    pointerDown.current = false;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const size = canvas.clientWidth;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Green: #9BD97C = rgb(155, 217, 124)
    const greenR = 155 / 255;
    const greenG = 217 / 255;
    const greenB = 124 / 255;

    // Deep blue sphere: #030514
    const blueR = 3 / 255;
    const blueG = 5 / 255;
    const blueB = 20 / 255;

    const globe = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width: size * dpr,
      height: size * dpr,
      phi: phiRef.current,
      theta: thetaRef.current,
      dark: 1,
      diffuse: 1.4,
      mapSamples: 16000,
      mapBrightness: 8,
      baseColor: [blueR, blueG, blueB],
      markerColor: [greenR, greenG, greenB],
      glowColor: [0.05, 0.05, 0.15],
      markers: [],
    });

    globeRef.current = globe;

    // Animation loop: update phi/theta with momentum
    const tick = () => {
      const friction = 0.92;

      if (!pointerDown.current) {
        // Apply momentum with friction
        phiRef.current += velocityRef.current.phi * 0.016;
        thetaRef.current += velocityRef.current.theta * 0.016;

        velocityRef.current.phi *= friction;
        velocityRef.current.theta *= friction;

        // Kill tiny velocities
        if (Math.abs(velocityRef.current.phi) < 0.001) {
          velocityRef.current.phi = 0;
        }
        if (Math.abs(velocityRef.current.theta) < 0.001) {
          velocityRef.current.theta = 0;
        }

        // Auto-rotate when momentum is nearly zero
        if (
          Math.abs(velocityRef.current.phi) < 0.01 &&
          Math.abs(velocityRef.current.theta) < 0.01
        ) {
          phiRef.current += autoRotateSpeed;
        }
      }

      // Clamp theta
      thetaRef.current = Math.max(
        -Math.PI / 2,
        Math.min(Math.PI / 2, thetaRef.current)
      );

      globe.update({
        phi: phiRef.current,
        theta: thetaRef.current,
        width: canvas.clientWidth * dpr,
        height: canvas.clientHeight * dpr,
      });

      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);

    const handleResize = () => {
      const newSize = canvas.clientWidth;
      globe.update({
        width: newSize * dpr,
        height: newSize * dpr,
      });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animRef.current);
      globe.destroy();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="metaball-globe-wrap">
      <canvas
        ref={canvasRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        className="metaball-globe"
      />
    </div>
  );
}
