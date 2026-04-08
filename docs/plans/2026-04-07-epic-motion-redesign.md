# Epic Motion-Driven Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform the IIG homepage from an editorial layout into a cinematic scroll-driven spectacle with pinned sections, counter animations, parallax reveals, and a globe that acts as a persistent narrative thread — all flowing dark-to-light.

**Architecture:** Homepage becomes a single scroll-driven narrative. Framer Motion's `useScroll` and `useTransform` drive all animations from scroll position. Two sections pin (`position: sticky`): the hero and Impact Palooza. The globe's transform properties are derived from page-level scroll progress. Sections transition from dark navy to cream as the user scrolls.

**Tech Stack:** Next.js 16, React 19, Framer Motion 12, Tailwind CSS 4, COBE globe

---

## Task 1: Revert Homepage Sections to Dark

The critique changed Social Proof and Services to cream backgrounds. Revert them to dark navy for the epic dark-to-light journey. The dark portion now extends through: Hero → Social Proof → Services → Impact Palooza.

**Files:**
- Modify: `src/components/social-proof.tsx`
- Modify: `src/app/page.tsx` (services section only)

**Step 1: Revert SocialProof to dark**

In `src/components/social-proof.tsx`, change:
- `bg-off-white` → `bg-navy`
- `border-navy/10` → `border-muted/10`
- `text-navy` (stat values) → `text-cream`
- `text-text-muted` (labels) → `text-muted`

```tsx
<section className="border-b border-muted/10 bg-navy">
  ...
  <p className="font-serif text-4xl font-bold text-cream">{stat.value}</p>
  <p className="mt-1 text-sm text-muted">{stat.label}</p>
```

**Step 2: Revert Services section to dark in page.tsx**

In `src/app/page.tsx`, the "What We Do" section (around line 50):
- `bg-cream` → `bg-navy`
- `text-navy/40` (label) → `text-cream/40`
- `text-navy` (heading, service names, arrow) → `text-cream`
- `text-text-muted` (descriptions) → `text-muted`
- `border-navy/10` → `border-muted/20`
- `hover:bg-navy/5` → `hover:bg-muted/5`
- `focus-visible:ring-navy` → `focus-visible:ring-green`
- `focus-visible:bg-navy/5` → `focus-visible:bg-muted/5`

**Step 3: Verify in browser**

Open http://localhost:3030. Hero, Social Proof, Services, and Impact Palooza should all be dark navy. Case Studies should be dark. Recruitment should be cream.

**Step 4: Commit**

```bash
git add src/components/social-proof.tsx src/app/page.tsx
git commit -m "style: revert homepage to dark-dominant for epic scroll journey"
```

---

## Task 2: Create useCountUp Hook + Animated Social Proof

**Files:**
- Create: `src/hooks/use-count-up.ts`
- Modify: `src/components/social-proof.tsx`

**Step 1: Create the useCountUp hook**

Create `src/hooks/use-count-up.ts`:

```ts
"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

export function useCountUp(
  target: number,
  isInView: boolean,
  duration = 1500
) {
  const prefersReducedMotion = useReducedMotion();
  const [value, setValue] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    if (prefersReducedMotion) {
      setValue(target);
      return;
    }

    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target, duration, prefersReducedMotion]);

  return value;
}
```

**Step 2: Rewrite SocialProof with counter animation**

Rewrite `src/components/social-proof.tsx`. Must be `"use client"` for hooks:

```tsx
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
```

**Step 3: Verify in browser**

Scroll to Social Proof section. Numbers should count up from 0 when the section enters view, staggered by 100ms each. Each stat should also fade-up.

**Step 4: Commit**

```bash
git add src/hooks/use-count-up.ts src/components/social-proof.tsx
git commit -m "feat: add counter animation to social proof stats"
```

---

## Task 3: Pinned Scroll-Reveal Hero

The hero pins for ~1.5 viewport heights. Headline phrases reveal one at a time based on scroll position (not page load). After all phrases reveal, subtitle and CTAs fade in. Then the pin releases.

**Files:**
- Modify: `src/components/hero-premium.tsx`
- Modify: `src/styles/hero-premium.css`

**Step 1: Rewrite hero-premium.tsx**

Replace the entire component. Key changes:
- Section height is `300vh` (provides scroll runway while pinned)
- Inner content uses `position: sticky; top: 0; height: 100vh` to pin
- Each headline maps to a scroll range: phrase 1 at 0-0.15, phrase 2 at 0.15-0.3, phrase 3 at 0.3-0.45
- Subtitle + CTAs appear at scroll progress 0.45-0.6
- Text fades out at 0.7-1.0 (as you leave the hero)

```tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Link from "next/link";
import HeroGrain from "./hero-grain";

const phrases = ["Fund Ideas.", "Forge Futures.", "Fuel Social Change."];

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
      <section className="hero-premium" style={{ height: "100vh" }}>
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
              USC&apos;s premier impact investing organization. We financially
              empower social enterprises in Los Angeles and beyond.
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
    <section ref={sectionRef} style={{ height: "300vh" }}>
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
              USC&apos;s premier impact investing organization. We financially
              empower social enterprises in Los Angeles and beyond.
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
```

**Step 2: Update hero-premium.css**

Remove `min-height: 100vh` from `.hero-premium` (height is now controlled by the outer section + sticky). Ensure `.hero-premium` has `height: 100vh` only when used as the sticky child:

```css
.hero-premium {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  overflow: hidden;
}
```

Remove the old `min-height: 100vh` line. The height comes from the inline style.

Also increase the title font size for cinematic scale:
```css
.hero-premium__title {
  font-size: clamp(3rem, 8vw, 7rem);
}
```

Mobile override at 640px:
```css
.hero-premium__title {
  font-size: clamp(2.2rem, 10vw, 3.5rem);
}
```

**Step 3: Verify in browser**

- Scroll slowly through the hero. Phrases should appear one at a time.
- Subtitle and CTAs should appear after all three phrases.
- Content should fade out as you scroll past the hero.
- On mobile, the hero should still work with the sticky behavior.

**Step 4: Commit**

```bash
git add src/components/hero-premium.tsx src/styles/hero-premium.css
git commit -m "feat: pinned scroll-reveal hero with cinematic typography"
```

---

## Task 4: Services Parallax Stagger

**Files:**
- Modify: `src/app/page.tsx` (services section)

**Step 1: Convert services section to client component**

The services section currently lives inline in `page.tsx`. Extract it to a new client component at `src/components/services-section.tsx` so we can use Framer Motion hooks.

```tsx
"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const services = [
  {
    name: "Pro-Bono Consulting",
    description: "Semester-long client engagements delivering market sizing, competitive analysis, go-to-market strategy, and operational recommendations.",
    href: "/about/services",
  },
  {
    name: "Microfinance — Kiva Trustee Partner",
    description: "As an official Kiva trustee partner, we provide 0% interest loans to small business owners across Los Angeles, funding entrepreneurs who lack access to traditional capital.",
    href: "/about/services",
  },
  {
    name: "Impact Research",
    description: "Primary and secondary research, data analysis, and white papers that inform client strategy and stakeholder decisions.",
    href: "/about/services",
  },
];

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
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
          ref={headingRef}
          className="lg:col-span-5"
          style={{ y: headingY }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-cream/40">
            What We Deliver
          </p>
          <h2 className="mt-4 font-serif font-semibold text-cream" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            Professional Services for Social Enterprises
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
```

**Step 2: Update page.tsx**

Replace the inline services section with `<ServicesSection />`. Remove the `services` array and the `Link` import if no longer needed elsewhere. Add `import { ServicesSection } from "@/components/services-section";`.

**Step 3: Verify in browser**

Service rows should slide in from the right, staggered. The heading should parallax at a different rate than the rows as you scroll.

**Step 4: Commit**

```bash
git add src/components/services-section.tsx src/app/page.tsx
git commit -m "feat: parallax stagger for services section"
```

---

## Task 5: Impact Palooza Pinned Scaling Transform

**Files:**
- Modify: `src/components/impact-palooza-marquee.tsx`

**Step 1: Rewrite as pinned scaling section**

The section gets `height: 250vh` as scroll runway. Inner content uses `position: sticky`. The title scales from ~2rem to massive during scroll. Description and CTA fade in after title reaches full scale.

```tsx
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
```

**Step 2: Verify in browser**

Scroll into Impact Palooza. Title should scale from small to large as you scroll. Description and CTA should appear after the title lands. Everything fades out as you scroll past.

**Step 3: Commit**

```bash
git add src/components/impact-palooza-marquee.tsx
git commit -m "feat: pinned scaling transform for Impact Palooza section"
```

---

## Task 6: Case Studies Scroll-Reveal

**Files:**
- Modify: `src/components/case-study-list.tsx`

**Step 1: Add scroll-reveal animations**

Wrap each case study link in a `motion.div` with `useInView`-triggered fade-up. Add typewriter stagger to the numbered labels.

Each case study gets:
- `initial={{ opacity: 0, y: 40 }}`
- `animate={isInView ? { opacity: 1, y: 0 } : {}}`
- Staggered delay: `i * 0.15`

The number label gets a slight additional delay.

Read the current file, then add `useInView` from framer-motion. Wrap each list item in a motion container. Keep the hover-reveal panel logic intact.

**Step 2: Verify in browser**

Case studies should fade/slide up as they enter the viewport, staggered.

**Step 3: Commit**

```bash
git add src/components/case-study-list.tsx
git commit -m "feat: scroll-reveal animations for case study cards"
```

---

## Task 7: Globe Narrative Behavior

The globe should react to page-level scroll progress — growing, shifting, and fading across the full page journey.

**Files:**
- Modify: `src/components/scroll-globe.tsx`
- Modify: `src/styles/hero-premium.css`

**Step 1: Expand scroll-driven transforms**

In `src/components/scroll-globe.tsx`, the globe currently has basic scale/x/y transforms. Expand them for the narrative arc:

```tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";

const CobeGlobe = dynamic(() => import("./cobe-globe"), { ssr: false });

export default function ScrollGlobe() {
  const { scrollYProgress } = useScroll();

  // Globe narrative: small → grows → peak at mid-page → fades
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.8, 1], [0.8, 1.2, 1.8, 1.2, 0.6]);
  const x = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.8], ["0%", "-5%", "-10%", "5%"]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], ["0%", "5%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.5, 0.75, 1], [0.5, 1, 1, 0.3, 0]);

  return (
    <div className="scroll-globe">
      <motion.div className="scroll-globe__inner" style={{ scale, x, y, opacity }}>
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          style={{ width: "100%", height: "100%" }}
        >
          <CobeGlobe />
        </motion.div>
      </motion.div>
    </div>
  );
}
```

**Step 2: Update globe CSS for larger presence**

In `src/styles/hero-premium.css`, change `.scroll-globe` width back to `40vw` (slightly bigger than the 35vw we set in critique) so it has room to scale up during the narrative:

```css
.scroll-globe {
  width: 40vw;
}
```

Keep `display: none` at 1024px breakpoint.

**Step 3: Verify in browser**

The globe should:
- Start medium/faded in the hero
- Grow and become prominent as you reach the middle sections
- Shrink and fade as you approach the cream sections at the bottom

**Step 4: Commit**

```bash
git add src/components/scroll-globe.tsx src/styles/hero-premium.css
git commit -m "feat: globe narrative behavior — grows, peaks, and fades with scroll"
```

---

## Task 8: Recruitment Section Soft Motion

**Files:**
- Modify: `src/app/page.tsx` (recruitment section)

**Step 1: Wrap recruitment section elements in motion components**

The recruitment section needs to be a client component for `useInView`. Extract it to `src/components/recruitment-section.tsx`:

```tsx
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
              title="Build Real Skills"
              subtitle="IIG analysts gain hands-on consulting experience that prepares them for careers at top firms."
              dark={false}
            />
            <ul className="mt-8 space-y-4 text-sm text-text-muted">
              <li className="flex gap-3"><span className="text-navy">→</span>Work directly with real clients on semester-long engagements</li>
              <li className="flex gap-3"><span className="text-navy">→</span>Build financial models, market analyses, and strategy decks</li>
              <li className="flex gap-3"><span className="text-navy">→</span>Join a selective community of driven, impact-minded analysts</li>
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
```

**Step 2: Update page.tsx**

Replace the inline recruitment section with `<RecruitmentSection />`. Remove the `APPLICATIONS_OPEN` constant, `NewsletterSignup` import, and `SectionHeading` import from page.tsx if no longer used elsewhere in that file. Keep `Link` import if still used.

**Step 3: Verify and commit**

```bash
git add src/components/recruitment-section.tsx src/app/page.tsx
git commit -m "feat: soft motion reveals for recruitment section"
```

---

## Task 9: Dark-to-Light Background Transition

The Case Studies section should have a transitional background — not pure navy, but a gradient or slightly warmer tone that bridges to the cream recruitment section.

**Files:**
- Modify: `src/app/page.tsx` (case studies section wrapper)
- Modify: `src/app/globals.css` (add transitional color if needed)

**Step 1: Add a gradient background to the Case Studies section**

In `page.tsx`, change the case studies section from `bg-navy` to an inline gradient:

```tsx
<section
  className="relative"
  style={{
    background: "linear-gradient(to bottom, #16165F 0%, #1E1E7A 60%, #2A2A6E 100%)",
  }}
>
```

This creates a subtle warm-up as you scroll toward cream. The gradient goes from navy → navy-light → a slightly warmer purple-navy.

**Step 2: Verify and commit**

```bash
git add src/app/page.tsx
git commit -m "style: transitional gradient on case studies for dark-to-light journey"
```

---

## Task 10: Final Verification + Reduced Motion Pass

**Files:**
- All modified files (read-only verification)

**Step 1: Test reduced motion**

In browser DevTools, enable `prefers-reduced-motion: reduce` (Elements → Rendering → Emulate CSS media feature). Verify:
- Hero shows all content immediately, no pin (single viewport height)
- Social Proof shows final numbers immediately, no count animation
- Services show immediately, no slide-in
- Impact Palooza shows immediately, no pin/scale
- Case Studies show immediately
- Recruitment shows immediately
- Globe still renders but without scroll transforms

**Step 2: Test mobile**

Resize to 375px width. Verify:
- Globe is hidden
- Hero pins and reveals still work
- Impact Palooza pin still works
- Counter animation fires
- No horizontal overflow from scaled elements

**Step 3: Run build**

```bash
cd /Users/mac/Downloads/IIG\ Website/iig-redesign && npx next build
```

All 18 routes should compile successfully.

**Step 4: Final commit**

```bash
git add -A
git commit -m "feat: epic motion-driven homepage redesign complete"
```

---

## Notes

- **Globe reference**: User mentioned globe construction can be found in a "News GitHub pull" — check that PR for any alternate globe implementation before starting Task 7.
- **Performance**: If globe + scroll transforms cause jank, consider reducing COBE `mapSamples` from 40000 to 20000, or debouncing scroll updates.
- **Dependencies**: No new npm packages needed — framer-motion and cobe are already installed.
