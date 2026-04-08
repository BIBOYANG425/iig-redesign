"use client";

import { useRef, useEffect, useCallback } from "react";
import createGlobe from "cobe";

type LatLng = [number, number];
type RGB = [number, number, number];

interface Marker {
  location: LatLng;
  size: number;
  color: RGB;
}

interface Arc {
  from: LatLng;
  to: LatLng;
  color: RGB;
}

// LA-area markers representing grassroots Kiva-funded entrepreneurs
const LA_MARKERS: Marker[] = [
  { location: [34.0522, -118.2437], size: 0.06, color: [0.85, 0.65, 0.13] },
  { location: [34.0195, -118.4912], size: 0.04, color: [0.85, 0.65, 0.13] },
  { location: [33.9425, -118.408], size: 0.04, color: [0.85, 0.65, 0.13] },
];

// Global connection arcs — grassroots to global
const GLOBAL_ARCS: Arc[] = [
  { from: [34.0522, -118.2437], to: [51.5074, -0.1278], color: [0.2, 0.8, 0.8] },
  { from: [34.0522, -118.2437], to: [35.6762, 139.6503], color: [0.2, 0.8, 0.8] },
  { from: [34.0522, -118.2437], to: [-1.2921, 36.8219], color: [0.4, 0.85, 0.55] },
  { from: [34.0522, -118.2437], to: [19.076, 72.8777], color: [0.4, 0.85, 0.55] },
  { from: [34.0522, -118.2437], to: [-23.5505, -46.6333], color: [0.6, 0.4, 0.9] },
  { from: [34.0522, -118.2437], to: [1.3521, 103.8198], color: [0.2, 0.8, 0.8] },
];

// Destination markers
const GLOBAL_MARKERS: Marker[] = [
  { location: [51.5074, -0.1278], size: 0.04, color: [0.2, 0.8, 0.8] },
  { location: [35.6762, 139.6503], size: 0.04, color: [0.2, 0.8, 0.8] },
  { location: [-1.2921, 36.8219], size: 0.04, color: [0.4, 0.85, 0.55] },
  { location: [19.076, 72.8777], size: 0.04, color: [0.4, 0.85, 0.55] },
  { location: [-23.5505, -46.6333], size: 0.04, color: [0.6, 0.4, 0.9] },
  { location: [1.3521, 103.8198], size: 0.04, color: [0.2, 0.8, 0.8] },
];

interface GlobeState {
  baseColor: RGB;
  markerColor: RGB;
  glowColor: RGB;
  markers: Marker[];
  arcs: Arc[];
  diffuse: number;
  mapBrightness: number;
}

// Scroll-driven globe states mapped to page sections
function getGlobeStateForProgress(progress: number): GlobeState {
  // Section 0: Hero (0–0.15) — Green earth, violet atmospheric glow
  if (progress < 0.15) {
    return {
      baseColor: [0.043, 0.043, 0.15],
      markerColor: [0.608, 0.851, 0.486],
      glowColor: [0.35, 0.2, 0.6],
      markers: LA_MARKERS,
      arcs: [],
      diffuse: 0.4,
      mapBrightness: 8,
    };
  }
  // Section 1: Stats (0.15–0.3) — Gold accents emerge
  if (progress < 0.3) {
    return {
      baseColor: [0.05, 0.04, 0.15],
      markerColor: [0.75, 0.7, 0.35],
      glowColor: [0.45, 0.35, 0.2],
      markers: LA_MARKERS,
      arcs: [],
      diffuse: 0.5,
      mapBrightness: 9,
    };
  }
  // Section 2: What We Deliver (0.3–0.5) — Cyan arcs, global connections
  if (progress < 0.5) {
    return {
      baseColor: [0.043, 0.05, 0.18],
      markerColor: [0.4, 0.85, 0.55],
      glowColor: [0.15, 0.5, 0.55],
      markers: [...LA_MARKERS, ...GLOBAL_MARKERS],
      arcs: GLOBAL_ARCS,
      diffuse: 0.6,
      mapBrightness: 7,
    };
  }
  // Section 3: Impact Palooza (0.5–0.65) — Purple/violet nebula glow
  if (progress < 0.65) {
    return {
      baseColor: [0.06, 0.03, 0.2],
      markerColor: [0.6, 0.4, 0.9],
      glowColor: [0.5, 0.2, 0.7],
      markers: [...LA_MARKERS, ...GLOBAL_MARKERS],
      arcs: GLOBAL_ARCS,
      diffuse: 0.7,
      mapBrightness: 6,
    };
  }
  // Section 4: Recent Engagements (0.65–0.8) — Gold focus, local precision
  if (progress < 0.8) {
    return {
      baseColor: [0.05, 0.04, 0.12],
      markerColor: [0.85, 0.65, 0.13],
      glowColor: [0.5, 0.4, 0.15],
      markers: LA_MARKERS.map((m) => ({ ...m, size: m.size * 1.5 })),
      arcs: [],
      diffuse: 0.5,
      mapBrightness: 10,
    };
  }
  // Section 5: Footer / Subscribe (0.8–1.0) — Muted, elegant, starfield
  return {
    baseColor: [0.03, 0.03, 0.1],
    markerColor: [0.5, 0.5, 0.6],
    glowColor: [0.2, 0.2, 0.4],
    markers: [...LA_MARKERS, ...GLOBAL_MARKERS],
    arcs: GLOBAL_ARCS.map((a) => ({ ...a, color: [0.3, 0.3, 0.5] as RGB })),
    diffuse: 0.3,
    mapBrightness: 5,
  };
}

function lerp3(a: RGB, b: RGB, t: number): RGB {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  ];
}

function lerpNum(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export default function CobeGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerDown = useRef(false);
  const pointerX = useRef(0);
  const phiRef = useRef(0);
  const velocityRef = useRef(0);
  const animRef = useRef<number>(0);
  const scrollRef = useRef(0);
  const currentState = useRef<GlobeState>(getGlobeStateForProgress(0));

  // Track scroll position
  useEffect(() => {
    const onScroll = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      diffuse: 1.0,
      mapSamples: 40000,
      mapBrightness: 8,
      mapBaseBrightness: 0.005,
      baseColor: [0.043, 0.043, 0.15],
      markerColor: [0.608, 0.851, 0.486],
      glowColor: [0.35, 0.2, 0.6],
      markers: LA_MARKERS,
      arcs: [],
      arcColor: [0.2, 0.8, 0.8],
      arcWidth: 0.4,
      arcHeight: 0.3,
    });

    let paused = false;

    const onVisibilityChange = () => {
      paused = document.hidden;
      if (!paused) animRef.current = requestAnimationFrame(tick);
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    const tick = () => {
      if (paused) return;

      // Auto-rotation with drag momentum
      if (!pointerDown.current) {
        phiRef.current += velocityRef.current;
        velocityRef.current *= 0.95;

        if (Math.abs(velocityRef.current) < 0.0001) {
          velocityRef.current = 0;
          if (!prefersReducedMotion) {
            phiRef.current += 0.0015;
          }
        }
      }

      // Get target state based on scroll progress
      const targetState = getGlobeStateForProgress(scrollRef.current);
      const smoothing = 0.08;

      // Smoothly interpolate current state toward target
      currentState.current = {
        baseColor: lerp3(
          currentState.current.baseColor,
          targetState.baseColor,
          smoothing
        ),
        markerColor: lerp3(
          currentState.current.markerColor,
          targetState.markerColor,
          smoothing
        ),
        glowColor: lerp3(
          currentState.current.glowColor,
          targetState.glowColor,
          smoothing
        ),
        markers: targetState.markers,
        arcs: targetState.arcs,
        diffuse: lerpNum(
          currentState.current.diffuse,
          targetState.diffuse,
          smoothing
        ),
        mapBrightness: lerpNum(
          currentState.current.mapBrightness,
          targetState.mapBrightness,
          smoothing
        ),
      };

      // Scroll-driven theta tilt
      const targetTheta = -0.1 + scrollRef.current * 0.4;
      const currentTheta = lerpNum(0, targetTheta, 0.1);

      globe.update({
        phi: phiRef.current,
        theta: currentTheta,
        width: 1000,
        height: 1000,
        baseColor: currentState.current.baseColor,
        markerColor: currentState.current.markerColor,
        glowColor: currentState.current.glowColor,
        markers: currentState.current.markers,
        arcs: currentState.current.arcs,
        diffuse: currentState.current.diffuse,
        mapBrightness: currentState.current.mapBrightness,
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
          "radial-gradient(circle at center, black 70%, transparent 100%)",
        maskImage:
          "radial-gradient(circle at center, black 70%, transparent 100%)",
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
