"use client";

export default function HeroGrain() {
  return (
    <div className="hero-grain" aria-hidden="true">
      <svg className="hero-grain__svg">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" opacity="0.08" />
      </svg>
    </div>
  );
}
