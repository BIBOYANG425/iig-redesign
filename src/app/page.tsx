import Link from "next/link";
import HeroPremium from "@/components/hero-premium";
import ScrollGlobe from "@/components/scroll-globe";
import { SocialProof } from "@/components/social-proof";
import { SectionHeading } from "@/components/section-heading";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { ImpactPaloozaMarquee } from "@/components/impact-palooza-marquee";
import { CaseStudyList } from "@/components/case-study-list";
import { CanvasErrorBoundary } from "@/components/error-boundary";
import "@/styles/hero-premium.css";

const services = [
  {
    name: "Pro-Bono Consulting",
    description:
      "Strategic advisory and deliverables for LA social enterprises.",
    href: "/about/services",
  },
  {
    name: "Microfinance Advisory",
    description:
      "Financial modeling and investment analysis for mission-driven orgs.",
    href: "/about/services",
  },
  {
    name: "Impact Research",
    description:
      "Market research, data analysis, and go-to-market strategy.",
    href: "/about/services",
  },
];

export default function Home() {
  return (
    <>
      {/* Fixed globe — scales across entire page scroll */}
      <CanvasErrorBoundary>
        <ScrollGlobe />
      </CanvasErrorBoundary>

      {/* Hero */}
      <HeroPremium />

      {/* Social Proof */}
      <SocialProof />

      {/* What We Do — Service Rows */}
      <section className="bg-transparent">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-12 lg:gap-20 lg:px-8">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-green">
              Our Expertise
            </p>
            <h2 className="mt-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
              Impact-Driven Consulting & Research
            </h2>
          </div>
          <div className="lg:col-span-7">
            {services.map((service) => (
              <Link
                key={service.name}
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
            ))}
          </div>
        </div>
      </section>

      {/* Impact Palooza — Kinetic Marquee */}
      <ImpactPaloozaMarquee />

      {/* Recent Case Studies — Numbered List */}
      <section className="bg-navy">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <SectionHeading
            title="Recent Work"
            subtitle="See how our analysts create tangible value for social enterprises."
          />
          <div className="mt-14">
            <CaseStudyList />
          </div>
        </div>
      </section>

      {/* Follow Our Journey — Newsletter */}
      <section className="bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center lg:px-8">
          <SectionHeading title="Follow Our Journey" centered />
          <div className="mt-10 flex justify-center">
            <NewsletterSignup />
          </div>
          <a
            href="https://www.instagram.com/usciig"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block text-sm text-muted transition-colors hover:text-cream"
          >
            @usciig on Instagram
          </a>
        </div>
      </section>
    </>
  );
}
