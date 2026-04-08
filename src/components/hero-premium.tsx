"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Link from "next/link";
import HeroGrain from "./hero-grain";

const phrases = ["Rooted Locally.", "Empowering Humanity.", "Financing the Future."];

export default function HeroPremium() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Each phrase: fade in and slide up within its scroll range
  const phrase1Opacity = useTransform(scrollYProgress, [0, 0.08, 0.15], [0, 1, 1]);
  const phrase1Y = useTransform(scrollYProgress, [0, 0.08], [40, 0]);

  const phrase2Opacity = useTransform(scrollYProgress, [0.12, 0.2, 0.3], [0, 1, 1]);
  const phrase2Y = useTransform(scrollYProgress, [0.12, 0.2], [40, 0]);

  const phrase3Opacity = useTransform(scrollYProgress, [0.25, 0.33, 0.45], [0, 1, 1]);
  const phrase3Y = useTransform(scrollYProgress, [0.25, 0.33], [40, 0]);

  const phraseAnims = [
    { opacity: phrase1Opacity, y: phrase1Y },
    { opacity: phrase2Opacity, y: phrase2Y },
    { opacity: phrase3Opacity, y: phrase3Y },
  ];

  // Subtitle + CTAs appear after all phrases
  const subtitleOpacity = useTransform(scrollYProgress, [0.45, 0.55], [0, 1]);
  const subtitleY = useTransform(scrollYProgress, [0.45, 0.55], [30, 0]);

  // Everything fades out as you leave the hero
  const exitOpacity = useTransform(scrollYProgress, [0.7, 0.9], [1, 0]);
  const exitY = useTransform(scrollYProgress, [0.7, 0.9], [0, -60]);

  // Grain opacity shifts with scroll
  const grainOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.3]);

  // Reduced motion: show everything immediately
  if (prefersReducedMotion) {
    return (
      <section className="hero-premium bg-navy" style={{ height: "100vh" }}>
        <div className="hero-premium__bg">
          <HeroGrain />
        </div>
        <div className="hero-premium__content">
          <div className="hero-premium__left">
            <div className="hero-premium__headlines">
              {phrases.map((text) => (
                <h1 key={text} className="hero-premium__title">{text}</h1>
              ))}
            </div>
            <p className="hero-premium__subtitle">
              USC&apos;s premier impact investing organization. Global change
              starts at the grassroots. We direct capital and strategy to the
              intersection of human development and natural energy.
            </p>
            <div className="hero-premium__ctas">
              <Link href="https://forms.gle/iT1fCQjJjf8H57JA7" target="_blank" rel="noopener noreferrer" className="hero-premium__btn hero-premium__btn--primary">Apply Now</Link>
              <Link href="/about/services" className="hero-premium__btn hero-premium__btn--secondary">Our Services</Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="bg-navy" style={{ height: "300vh" }}>
      {/* Sticky inner — pins at top for scroll duration */}
      <div className="hero-premium" style={{ position: "sticky", top: 0, height: "100vh" }}>
        <motion.div className="hero-premium__bg" style={{ opacity: grainOpacity }}>
          <HeroGrain />
        </motion.div>

        <div className="hero-premium__content">
          <motion.div
            className="hero-premium__left"
            style={{ opacity: exitOpacity, y: exitY }}
          >
            <div className="hero-premium__headlines">
              {phrases.map((text, i) => (
                <motion.h1
                  key={text}
                  className="hero-premium__title"
                  style={{ opacity: phraseAnims[i].opacity, y: phraseAnims[i].y }}
                >
                  {text}
                </motion.h1>
              ))}
            </div>

            <motion.p
              className="hero-premium__subtitle"
              style={{ opacity: subtitleOpacity, y: subtitleY }}
            >
              USC&apos;s premier impact investing organization. Global change
              starts at the grassroots. We direct capital and strategy to the
              intersection of human development and natural energy.
            </motion.p>

            <motion.div
              className="hero-premium__ctas"
              style={{ opacity: subtitleOpacity, y: subtitleY }}
            >
              <Link
                href="https://forms.gle/iT1fCQjJjf8H57JA7"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-premium__btn hero-premium__btn--primary"
              >
                Apply Now
              </Link>
              <Link
                href="/about/services"
                className="hero-premium__btn hero-premium__btn--secondary"
              >
                Our Services
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
