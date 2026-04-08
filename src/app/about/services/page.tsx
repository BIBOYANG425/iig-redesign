import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: "Services",
};

const services = [
  {
    title: "Pro-Bono Consulting",
    description:
      "Our consulting teams work directly with social enterprises and mission-driven organizations across Los Angeles. We deliver rigorous, semester-long engagements — from market sizing and competitive analysis to go-to-market strategy and financial modeling — designed to align grassroots human development with sustainable global growth. Each project is scoped like a professional consulting engagement, creating real value for clients while training the next generation of impact-driven leaders.",
  },
  {
    title: "Microfinance — Kiva Trustee Partner",
    description:
      "As an official Kiva Trustee Partner, IIG is on the ground in Los Angeles, vetting and funding small business owners who lack access to traditional capital. This is where our grassroots philosophy becomes operational. Our analysts conduct due diligence on borrowers, assess lending opportunities, and manage the full loan lifecycle from application through repayment. Through Kiva's platform, every dollar lent is crowdfunded by individual lenders worldwide — creating a direct bridge between global capital and local human development. This is where global change begins.",
  },
  {
    title: "Research",
    description:
      "Our research division publishes original analysis at the intersection of human development, natural energy, and sustainable markets. Research teams dive deep into thematic areas such as climate finance, education equity, renewable energy, and community development — producing white papers and data-driven insights that map the future of impact investing. We believe that understanding the relationship between nature, energy, and human progress is essential to directing capital where it matters most.",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Navy Header */}
      <section className="bg-navy">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center lg:px-8">
          <h1 className="font-serif text-5xl font-bold text-white md:text-6xl">
            Our Services
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
            We believe change starts at the grassroots. Our three service lines
            — consulting, microfinance, and research — work together to connect
            human development with sustainable growth.
          </p>
        </div>
      </section>

      {/* Service Sections */}
      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-6 pt-6 lg:px-8">
          <Breadcrumbs items={[{ label: "About", href: "/about" }, { label: "Services" }]} />
        </div>
        <div className="mx-auto max-w-7xl space-y-24 px-6 py-24 lg:px-8">
          {services.map((service) => (
            <div key={service.title} className="max-w-3xl">
              <h2 className="font-serif text-3xl font-semibold text-navy md:text-4xl">
                {service.title}
              </h2>
              <p className="mt-6 leading-relaxed text-text-muted">
                {service.description}
              </p>
              <Link
                href="/clients/case-studies"
                className="mt-6 inline-block text-sm font-medium text-navy underline underline-offset-4 transition-colors hover:text-navy-light"
              >
                See our case studies &rarr;
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
