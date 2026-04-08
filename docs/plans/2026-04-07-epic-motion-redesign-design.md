# IIG Website — Epic Motion-Driven Redesign

**Date:** 2026-04-07
**Direction:** Motion-Driven Spectacle (Option C) with Dark-to-Light Journey (Option B)
**Motion Level:** Full Spectacle
**Platform:** Next.js + Framer Motion + Tailwind CSS

---

## Concept

The page is a cinematic scroll-driven journey from dark to light — from bold mission statement into warm, approachable detail. The globe acts as a persistent narrative thread, transforming as you scroll. Key sections pin and transform. Stats animate. Text reveals dramatically. The feeling: "this org is doing something that matters."

---

## Color Journey

| Section | Background | Tone |
|---------|-----------|------|
| Hero | Dark navy (#16165F) | Immersive, dramatic |
| Social Proof | Dark navy | Continuing the drama |
| Services | Dark navy | Depth, parallax layers |
| Impact Palooza (pin) | Navy → transitional | The turning point |
| Case Studies | Deep muted / navy-light | Warming |
| Recruitment + Newsletter | Cream (#F8F7F4) | Warm arrival |
| Footer | Cream | Calm resting point |

---

## Section-by-Section Design

### 1. Hero (Pinned, ~1.5vh scroll distance)

- Hero pins for ~1.5 viewport heights of scroll
- Headline words ("Fund Ideas. Forge Futures. Fuel Social Change.") reveal one phrase at a time via scroll position — not on page load
- Grain texture shifts opacity subtly with scroll
- Globe starts small/medium, centered-right, begins its journey
- After all three phrases reveal, subtitle and CTAs fade in
- Pin releases, page continues scrolling
- Typography: `clamp(3.5rem, 10vw, 8rem)` — cinematic scale
- Full-bleed dark navy

### 2. Social Proof (Counter Animation)

- Stats count up from zero when section enters viewport (intersection observer)
- "12+" ticks 0→12, "80+" ticks 0→80, etc.
- 100ms stagger between each stat
- Large cinematic numbers
- Dark navy background, natural scroll (no pin)

### 3. Services (Staggered Parallax Reveal)

- Three service rows slide in from the right, staggered on scroll
- Left-side heading parallaxes at slower rate than rows — creates depth
- Each row reveals sequentially with slight parallax offset
- Dark navy background
- Large left-aligned section heading

### 4. Impact Palooza (Pinned Transform — "Wow Moment")

- Section pins as you scroll into it
- Title "Impact Palooza" scales from body-text size to massive display (~60% viewport width)
- Background begins transitioning from dark navy toward a warmer mid-tone
- Description and CTA fade in once title reaches full scale
- Pin releases
- This is the mid-page spectacle

### 5. Case Studies (Scroll-Reveal Cards)

- Each case study fades and slides up as it enters viewport
- Numbered labels have typewriter-style stagger
- Hover-reveal panel still works on desktop
- Background: transitional — deep muted tone, gradient from navy to warmer dark
- Softer motion than earlier sections (tension is releasing)

### 6. Recruitment + Newsletter (The Arrival)

- Background fully transitioned to cream
- Warm, inviting after the dark journey
- Elements fade in gently — motion is softer here
- "Apply Now" CTA gets subtle pulse/glow
- Emotional payoff: you've been shown why IIG matters, now here's how to join

### 7. Footer

- Cream background, no animation
- Calm resting point — the journey ends here
- Clean, editorial

---

## Globe Behavior (Persistent Narrative Thread)

The globe is visible throughout and reacts to page scroll progress:

| Scroll Position | Globe State |
|----------------|-------------|
| Hero | Small/medium, centered-right, subtle rotation |
| Past hero | Drifts right, scales up slightly |
| Impact Palooza pin | Peak size, prominently visible |
| Lower sections | Fades to ~20% opacity, shrinks |
| Recruitment/footer | Barely visible or gone — warmth replaces drama |

All globe properties (`scale`, `x`, `y`, `opacity`) driven by `scrollYProgress`.

---

## Technical Approach

- **Framer Motion**: `useScroll`, `useTransform`, `useInView`, `motion` components
- **Pinned sections**: CSS `position: sticky` + framer-motion scroll transforms (NO scroll-jacking, native scroll preserved)
- **Counter animation**: Custom hook using `useInView` + `requestAnimationFrame`
- **Performance**: `will-change: transform` on animated elements, lazy-load heavy components
- **Accessibility**: `useReducedMotion` fallback for ALL animations — static layout for reduced-motion users
- **Scroll progress**: Single page-level `useScroll` for globe. Section-level `useScroll({ target })` for individual section animations.

---

## Typography

| Role | Font | Size |
|------|------|------|
| Hero headline | Playfair Display 700 | `clamp(3.5rem, 10vw, 8rem)` |
| Section headings | Playfair Display 600 | `clamp(2.5rem, 6vw, 5rem)` |
| Impact Palooza (pinned) | Playfair Display 700 italic | Scales from ~2rem to ~8rem during pin |
| Body | Plus Jakarta Sans 400 | 16-18px |
| Stats (counter) | Playfair Display 700 | `clamp(3rem, 8vw, 6rem)` |

---

## What Changes From Current State

- Hero: scroll-reveal phrases replace load-based animation; section pins
- Social Proof: counter animation added; stays dark (was changed to cream — reverting)
- Services: parallax stagger added; stays dark (was changed to cream — reverting)
- Impact Palooza: pinned scaling transform replaces static layout
- Case Studies: scroll-reveal cards; background transitions to warmer tone
- Recruitment: stays cream; softer motion; CTA emphasis
- Globe: expanded behavior — scroll-driven transforms for scale/position/opacity across full page
- Color: dark-dominant with gradual transition to cream (not alternating)

---

## What Stays The Same

- Navigation (active states, breadcrumbs, mobile menu)
- Footer structure and content
- All inner pages (About, Team, Services, Values, Apply, Clients, Contact, Impact Palooza)
- Breadcrumbs on inner pages
- Button system (normalized in critique fixes)
- Hardened content (fixed placeholders, form, etc.)
- Font choices (Playfair Display + Plus Jakarta Sans)
- Globe component (COBE) — behavior changes, component stays
