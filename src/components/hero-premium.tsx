"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";

// Lazy-load heavy canvas/WebGL components (no SSR)
const PixelBlast = dynamic(() => import("./pixel-blast"), { ssr: false });
const MetaballGlobe = dynamic(() => import("./metaball-globe"), { ssr: false });

/*
  Hero (Premium) — Full-viewport hero with:
  - PixelBlast canvas background (Bayer dithered grid)
  - Stagger-faded typography (left column)
  - Interactive cobe globe (right column)
  - Deep blue-hour background (#05081C) + lime green (#9BD97C) accents
*/

const headlineWords = [
  { text: "Fund Ideas.", delay: 0 },
  { text: "Forge Futures.", delay: 0.15 },
  { text: "Fuel Social Change.", delay: 0.3 },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      delay,
    },
  }),
};

export default function HeroPremium() {
  return (
    <section className="hero-premium">
      {/* Canvas background */}
      <div className="hero-premium__bg">
        <PixelBlast />
      </div>

      <div className="hero-premium__content">
        {/* Left column — Typography */}
        <div className="hero-premium__left">
          <motion.div
            initial="hidden"
            animate="visible"
            className="hero-premium__headlines"
          >
            {headlineWords.map((line) => (
              <motion.h1
                key={line.text}
                custom={line.delay}
                variants={fadeUp}
                className="hero-premium__title"
              >
                {line.text}
              </motion.h1>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
            className="hero-premium__subtitle"
          >
            USC&apos;s premier impact investing organization. We financially
            empower social enterprises in Los Angeles and beyond.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85, ease: "easeOut" }}
            className="hero-premium__ctas"
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
        </div>

        {/* Right column — Globe */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
          className="hero-premium__right"
        >
          <MetaballGlobe />
        </motion.div>
      </div>
    </section>
  );
}
