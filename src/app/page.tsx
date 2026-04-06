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

const APPLICATIONS_OPEN = true; // Set to false when Google Form is closed

const services = [
  {
    name: "Pro-Bono Consulting",
    description:
      "Semester-long client engagements delivering market sizing, competitive analysis, go-to-market strategy, and operational recommendations.",
    href: "/about/services",
  },
  {
    name: "Microfinance — Kiva Trustee Partner",
    description:
      "As an official Kiva trustee partner, we provide 0% interest loans to small business owners across Los Angeles, funding entrepreneurs who lack access to traditional capital.",
    href: "/about/services",
  },
  {
    name: "Impact Research",
    description:
      "Primary and secondary research, data analysis, and white papers that inform client strategy and stakeholder decisions.",
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
              What We Deliver
            </p>
            <h2 className="mt-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
              Professional Consulting for Social Enterprises
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
            title="Recent Engagements"
            subtitle="Professional deliverables. Measurable client outcomes."
          />
          <div className="mt-14">
            <CaseStudyList />
          </div>
        </div>
      </section>

      {/* Recruitment CTA + Newsletter */}
      <section className="bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Left — recruitment pitch */}
            <div>
              <SectionHeading
                title="Build Real Skills"
                subtitle="IIG analysts gain hands-on consulting experience that prepares them for careers at top firms."
              />
              <ul className="mt-8 space-y-4 text-sm text-muted">
                <li className="flex gap-3">
                  <span className="text-green">→</span>
                  Work directly with real clients on semester-long engagements
                </li>
                <li className="flex gap-3">
                  <span className="text-green">→</span>
                  Build financial models, market analyses, and strategy decks
                </li>
                <li className="flex gap-3">
                  <span className="text-green">→</span>
                  Join a selective community of driven, impact-minded analysts
                </li>
              </ul>
              <div className="mt-10 flex flex-wrap gap-4">
                {APPLICATIONS_OPEN ? (
                  <a
                    href="https://forms.gle/iT1fCQjJjf8H57JA7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-green bg-transparent px-8 py-3 text-sm font-semibold text-green transition-colors hover:bg-green hover:text-navy"
                  >
                    Apply Now
                  </a>
                ) : (
                  <span className="border border-muted/30 px-8 py-3 text-sm font-semibold text-muted">
                    Applications open in September
                  </span>
                )}
                <Link
                  href="/apply"
                  className="border border-muted/30 bg-transparent px-8 py-3 text-sm font-semibold text-cream transition-colors hover:border-cream"
                >
                  Learn More
                </Link>
              </div>
            </div>
            {/* Right — newsletter (secondary) */}
            <div className="flex flex-col justify-center">
              <p className="text-sm text-muted">
                Get notified when applications open.
              </p>
              <div className="mt-4">
                <NewsletterSignup />
              </div>
              <a
                href="https://www.instagram.com/usciig"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-sm text-muted transition-colors hover:text-cream"
              >
                @usciig on Instagram
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
