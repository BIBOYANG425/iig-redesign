"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const services = [
  {
    name: "Pro-Bono Consulting",
    description:
      "Rigorous, semester-long consulting engagements designed for the modern impact economy. We deliver market sizing, competitive analysis, and operational strategies that align grassroots human development with sustainable global growth.",
    href: "/about/services",
  },
  {
    name: "Microfinance — Kiva Trustee Partner",
    description:
      "As an official Kiva Trustee Partner, we are on the ground in Los Angeles, vetting and funding small business owners who lack access to traditional capital. This is where global change begins — at the grassroots.",
    href: "/about/services",
  },
  {
    name: "Impact Research",
    description:
      "Primary and secondary research, data analysis, and white papers that map the intersection of human development, natural energy, and sustainable markets — informing strategy for clients and stakeholders.",
    href: "/about/services",
  },
];

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Heading parallax — moves slower
  const headingY = useTransform(scrollYProgress, [0, 1], [60, -30]);

  return (
    <section ref={sectionRef} className="bg-navy">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-12 lg:gap-20 lg:px-8">
        <motion.div
          className="lg:col-span-5"
          style={{ y: headingY }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-green">
            What We Deliver
          </p>
          <h2 className="mt-4 font-serif font-semibold text-cream" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            Grassroots Impact, Global Scale
          </h2>
        </motion.div>
        <div className="lg:col-span-7">
          {services.map((service, i) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, x: 60 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: i * 0.15,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <Link
                href={service.href}
                className="group flex items-center justify-between border-b border-muted/20 py-6 transition-colors hover:bg-muted/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:bg-muted/5"
              >
                <div>
                  <h3 className="font-serif text-2xl font-semibold text-cream">
                    {service.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted">
                    {service.description}
                  </p>
                </div>
                <span className="text-green opacity-0 transition-all group-hover:translate-x-2 group-hover:opacity-100 group-focus-visible:translate-x-2 group-focus-visible:opacity-100">
                  →
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
