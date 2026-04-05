import Link from "next/link";
import HeroPremium from "@/components/hero-premium";
import { SocialProof } from "@/components/social-proof";
import { SectionHeading } from "@/components/section-heading";
import "@/styles/hero-premium.css";

const caseStudies = [
  {
    tag: "Market Research",
    client: "LASIF",
    summary:
      "Conducted comprehensive market research to identify growth opportunities and evaluate the competitive landscape for the Los Angeles Social Innovation Fund.",
    href: "/clients/case-studies",
  },
  {
    tag: "Data Analysis",
    client: "PS Science",
    summary:
      "Delivered data-driven insights and performance analysis to help PS Science measure and scale their educational impact across underserved communities.",
    href: "/clients/case-studies",
  },
  {
    tag: "Market Entry",
    client: "Company Volunteer Day",
    summary:
      "Developed a market entry strategy and go-to-market plan for a social enterprise connecting corporations with meaningful volunteer opportunities.",
    href: "/clients/case-studies",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <HeroPremium />

      {/* Social Proof */}
      <SocialProof />

      {/* What We Do */}
      <section className="bg-cream">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-2 lg:gap-20 lg:px-8">
          <SectionHeading
            title="Impact-Driven Consulting & Research"
          />
          <div className="space-y-6 text-text-muted leading-relaxed">
            <p>
              The Impact Investing Group at USC provides pro-bono consulting,
              microfinance advisory, and research services to social enterprises
              throughout Los Angeles. Our multidisciplinary teams of
              undergraduate analysts bring rigorous financial analysis and
              strategic thinking to organizations creating measurable social
              impact.
            </p>
            <p>
              From market research and data analysis to financial modeling and
              go-to-market strategy, we deliver the same caliber of work as
              top-tier consulting firms&mdash;tailored to the unique needs of
              mission-driven businesses. Each engagement is an opportunity for
              our analysts to develop professional skills while driving real
              change.
            </p>
            <Link
              href="/about/services"
              className="inline-block font-medium text-navy underline underline-offset-4 transition-colors hover:text-navy-light"
            >
              Learn about our services
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Palooza Callout */}
      <section className="bg-navy">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-green">
            Flagship Event
          </p>
          <h2 className="mt-4 font-serif text-4xl font-bold text-white md:text-5xl">
            Impact Palooza
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-white/70">
            Our annual showcase where student teams present their consulting
            deliverables to clients, faculty, and the broader USC community.
            Impact Palooza celebrates a semester of rigorous work and real-world
            social impact.
          </p>
          <Link
            href="/impact-palooza"
            className="mt-10 inline-block rounded-full border-2 border-green px-8 py-3 text-sm font-semibold text-green transition-colors hover:bg-green hover:text-navy"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Recent Case Studies */}
      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <SectionHeading
            title="Recent Work"
            subtitle="See how our analysts create tangible value for social enterprises."
          />

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((study) => (
              <Link
                key={study.client}
                href={study.href}
                className="group rounded-xl border border-navy/10 bg-off-white p-8 transition-shadow hover:shadow-lg"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-text-muted">
                  {study.tag}
                </p>
                <h3 className="mt-3 font-serif text-2xl font-semibold text-navy">
                  {study.client}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  {study.summary}
                </p>
                <p className="mt-6 text-sm font-medium text-navy transition-colors group-hover:text-navy-light">
                  Read more &rarr;
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram / Community */}
      <section className="bg-off-white">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center lg:px-8">
          <SectionHeading
            title="Follow Our Journey"
            centered
          />
          <a
            href="https://www.instagram.com/usciig"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block text-lg font-medium text-navy underline underline-offset-4 transition-colors hover:text-navy-light"
          >
            @usciig
          </a>
        </div>
      </section>
    </>
  );
}
