"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useInView, motion } from "framer-motion";

const caseStudies = [
  {
    number: "01",
    tag: "Market Research",
    client: "LASIF",
    summary:
      "Delivered a 70-page market landscape analysis identifying three untapped funding verticals for the Los Angeles Social Impact Fund.",
    href: "/clients/case-studies/lasif",
  },
  {
    number: "02",
    tag: "Data Analysis",
    client: "PS Science",
    summary:
      "Built a performance measurement framework tracking educational outcomes across 12 underserved school districts for PS Science.",
    href: "/clients/case-studies/ps-science",
  },
  {
    number: "03",
    tag: "Kiva Microloan",
    client: "PHresh Juice Bar",
    summary:
      "Funded a $10,500 zero-interest Kiva loan for a South LA founder to secure a ghost kitchen and bring organic cold-pressed juice to his community.",
    href: "/clients/case-studies/phresh-juice-bar",
  },
];

export function CaseStudyList() {
  const [hovered, setHovered] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(listRef, { once: true, margin: "-100px" });

  return (
    <div ref={listRef} className="grid gap-0 lg:grid-cols-12">
      {/* Left — numbered list */}
      <div className="lg:col-span-7">
        {caseStudies.map((study, i) => (
          <motion.div
            key={study.client}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: i * 0.15,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <Link
              href={study.href}
              className="group block border-b border-muted/20 py-8 transition-colors"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <p className="font-mono text-sm text-muted">{study.number}</p>
              <h3
                className={`mt-2 font-serif text-3xl font-semibold transition-colors ${
                  hovered === i ? "text-green" : "text-cream"
                }`}
              >
                {study.client}
              </h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-muted">
                {study.tag}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted lg:hidden">
                {study.summary}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Right — hover reveal panel */}
      <div className="hidden items-center justify-center lg:col-span-5 lg:flex">
        <div className="flex h-full w-full items-center justify-center px-8">
          {hovered !== null ? (
            <p className="text-sm leading-relaxed text-muted">
              {caseStudies[hovered].summary}
            </p>
          ) : (
            <p className="text-sm text-muted/40">
              Select an engagement to preview
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
