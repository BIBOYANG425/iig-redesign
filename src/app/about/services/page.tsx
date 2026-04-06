import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services — IIG",
};

const services = [
  {
    title: "Consulting",
    description:
      "Our consulting teams work directly with social enterprises and mission-driven organizations across Los Angeles. From market research and competitive analysis to go-to-market strategy and financial modeling, we deliver actionable recommendations grounded in rigorous analysis. Each engagement is scoped like a professional consulting project, giving our analysts hands-on experience while creating real value for clients.",
  },
  {
    title: "Microfinance — Kiva Trustee Partner",
    description:
      "IIG is an official Kiva trustee partner, providing 0% interest microloans to small business owners across Los Angeles who lack access to traditional capital. Our analysts conduct due diligence on borrowers, assess lending opportunities, and manage the full loan lifecycle from application through repayment. We have funded entrepreneurs like Phelipe of PHresh Juice Bar — a South LA founder who received a $10,500 loan to secure a ghost kitchen and bring organic cold-pressed juice to his community. Through Kiva's platform, every dollar lent is crowdfunded by individual lenders worldwide, creating a direct bridge between global capital and local impact.",
  },
  {
    title: "Research",
    description:
      "Our research division publishes original analysis on impact investing trends, ESG frameworks, and social enterprise performance. Research teams dive deep into thematic areas such as climate finance, education equity, and community development — producing white papers and data-driven insights that inform both our internal strategy and the broader impact investing community.",
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
        </div>
      </section>

      {/* Service Sections */}
      <section className="bg-cream">
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
