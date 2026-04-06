"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

export function ImpactPaloozaMarquee() {
  const prefersReducedMotion = useReducedMotion();
  const text = "IMPACT PALOOZA \u00A0\u00B7\u00A0 ";
  const repeated = text.repeat(6);

  return (
    <section className="overflow-hidden bg-surface py-24">
      {/* Marquee */}
      <div className="relative" aria-hidden="true">
        <motion.div
          className="flex whitespace-nowrap"
          animate={prefersReducedMotion ? undefined : { x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "linear",
          }}
        >
          <span
            className="font-serif italic"
            style={{
              fontSize: "clamp(80px, 12vw, 160px)",
              color: "transparent",
              WebkitTextStroke: "2px #F8F7F4",
              lineHeight: 1.1,
            }}
          >
            {repeated}
          </span>
        </motion.div>
      </div>
      <span className="sr-only">Impact Palooza</span>

      {/* Event details */}
      <div className="mx-auto mt-12 max-w-7xl px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-green">
          Flagship Event
        </p>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          Our annual showcase where student teams present their consulting
          deliverables to clients, faculty, and the broader USC community.
          Impact Palooza celebrates a semester of rigorous work and real-world
          social impact.
        </p>
        <Link
          href="/impact-palooza"
          className="mt-10 inline-block border border-green px-8 py-3 text-sm font-semibold text-green transition-colors hover:bg-green hover:text-navy"
        >
          Learn More
        </Link>
      </div>
    </section>
  );
}
