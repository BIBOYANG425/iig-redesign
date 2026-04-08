"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { NewsletterSignup } from "@/components/newsletter-signup";

const APPLICATIONS_OPEN = true;

export function RecruitmentSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-cream">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <SectionHeading
              title="Join the Vanguard"
              subtitle="We believe global change starts at the grassroots. We train analysts to bridge the gap between human development and natural energy, preparing you to lead the transition from local communities to the world's top firms."
              dark={false}
            />
            <ul className="mt-8 space-y-4 text-sm text-text-muted">
              <li className="flex gap-3"><span className="text-navy">→</span>Deploy real capital to real entrepreneurs as a Kiva Trustee Partner</li>
              <li className="flex gap-3"><span className="text-navy">→</span>Build financial models, market analyses, and strategy decks for social enterprises</li>
              <li className="flex gap-3"><span className="text-navy">→</span>Join a selective community connecting human existence with sustainable growth</li>
            </ul>
            <div className="mt-10 flex flex-wrap gap-4">
              {APPLICATIONS_OPEN ? (
                <a
                  href="https://forms.gle/iT1fCQjJjf8H57JA7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-navy bg-navy px-8 py-3 text-sm font-semibold text-cream transition-colors hover:bg-navy-light"
                >
                  Apply Now
                </a>
              ) : (
                <span className="border border-text-muted/30 px-8 py-3 text-sm font-semibold text-text-muted">
                  Applications open in September
                </span>
              )}
              <Link href="/apply" className="border border-navy/20 bg-transparent px-8 py-3 text-sm font-semibold text-navy transition-colors hover:border-navy">
                Learn More
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <p className="text-sm text-text-muted">Get notified when applications open.</p>
            <div className="mt-4"><NewsletterSignup /></div>
            <a
              href="https://www.instagram.com/usciig"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 text-sm text-text-muted transition-colors hover:text-navy"
            >
              @usciig on Instagram
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
