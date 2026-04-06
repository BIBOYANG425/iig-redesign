"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";

const PixelBlast = dynamic(() => import("./pixel-blast"), { ssr: false });

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
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -80]);

  return (
    <section ref={sectionRef} className="hero-premium">
      <div className="hero-premium__bg">
        <PixelBlast />
      </div>

      <div className="hero-premium__content">
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="hero-premium__left"
        >
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
        </motion.div>
      </div>
    </section>
  );
}
