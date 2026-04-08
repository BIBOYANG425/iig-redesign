"use client";

import { useRef } from "react";
import { useInView, motion } from "framer-motion";
import { useCountUp } from "@/hooks/use-count-up";

const stats = [
  { target: 12, suffix: "+", label: "Client Engagements" },
  { target: 10, prefix: "~", suffix: "%", label: "Acceptance Rate" },
  { target: 80, suffix: "+", label: "Analysts Trained" },
  { target: 8, suffix: "+", label: "Years of Impact" },
];

function AnimatedStat({
  target,
  prefix,
  suffix,
  label,
  delay,
}: {
  target: number;
  prefix?: string;
  suffix: string;
  label: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const count = useCountUp(target, isInView);

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      <p className="font-serif font-bold text-cream" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}>
        {prefix}{count}{suffix}
      </p>
      <p className="mt-2 text-sm text-muted">{label}</p>
    </motion.div>
  );
}

export function SocialProof() {
  return (
    <section className="border-b border-muted/10 bg-navy">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-6 py-16 sm:grid-cols-4 sm:gap-12 lg:px-8">
        {stats.map((stat, i) => (
          <AnimatedStat
            key={stat.label}
            target={stat.target}
            prefix={stat.prefix}
            suffix={stat.suffix}
            label={stat.label}
            delay={i * 0.1}
          />
        ))}
      </div>
    </section>
  );
}
