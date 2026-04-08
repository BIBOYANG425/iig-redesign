"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Link from "next/link";

export function ImpactPaloozaMarquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Title scales from small to massive
  const titleScale = useTransform(scrollYProgress, [0, 0.4], [0.3, 1]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  // Description and CTA fade in after title
  const contentOpacity = useTransform(scrollYProgress, [0.45, 0.6], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.45, 0.6], [30, 0]);

  // Everything fades out as you leave
  const exitOpacity = useTransform(scrollYProgress, [0.75, 0.95], [1, 0]);

  if (prefersReducedMotion) {
    return (
      <section className="bg-navy">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <p className="text-xs font-semibold uppercase tracking-widest text-cream/50">
            Flagship Event
          </p>
          <h2
            className="mt-6 font-serif italic text-cream"
            style={{ fontSize: "clamp(3rem, 8vw, 6rem)", lineHeight: 1.05 }}
          >
            Impact Palooza
          </h2>
          <p className="mt-8 max-w-2xl text-lg text-muted">
            Each semester ends with analyst teams presenting final deliverables
            directly to clients and faculty judges. Impact Palooza is where a
            semester of rigorous analysis becomes a professional recommendation deck.
          </p>
          <Link href="/impact-palooza" className="mt-10 inline-block border border-green px-8 py-3 text-sm font-semibold text-green transition-colors hover:bg-green hover:text-navy">
            Learn More
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} style={{ height: "250vh" }}>
      <div
        className="flex items-center justify-center bg-navy overflow-hidden"
        style={{ position: "sticky", top: 0, height: "100vh" }}
      >
        <motion.div
          className="mx-auto max-w-7xl px-6 lg:px-8 text-center"
          style={{ opacity: exitOpacity }}
        >
          <motion.p
            className="text-xs font-semibold uppercase tracking-widest text-cream/50"
            style={{ opacity: titleOpacity }}
          >
            Flagship Event
          </motion.p>

          <motion.h2
            className="mt-6 font-serif italic text-cream origin-center"
            style={{
              fontSize: "clamp(3rem, 10vw, 8rem)",
              lineHeight: 1.05,
              scale: titleScale,
              opacity: titleOpacity,
            }}
          >
            Impact Palooza
          </motion.h2>

          <motion.div style={{ opacity: contentOpacity, y: contentY }}>
            <p className="mx-auto mt-8 max-w-2xl text-lg text-muted">
              Each semester ends with analyst teams presenting final deliverables
              directly to clients and faculty judges. Impact Palooza is where a
              semester of rigorous analysis becomes a professional recommendation deck.
            </p>
            <Link
              href="/impact-palooza"
              className="mt-10 inline-block border border-green px-8 py-3 text-sm font-semibold text-green transition-colors hover:bg-green hover:text-navy"
            >
              Learn More
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
