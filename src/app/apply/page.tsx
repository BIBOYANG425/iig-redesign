import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: "Why Join Us",
};

const APPLICATIONS_OPEN = true;

const reasons = [
  {
    heading: "Be part of a larger vision.",
    body: "IIG is more than a student organization — it is a movement connecting human existence with sustainable growth. When you join, you become part of a global effort to align capital with the well-being of people and the planet. Your work here matters beyond the classroom.",
  },
  {
    heading: "Deploy real capital at the grassroots.",
    body: "As an official Kiva Trustee Partner, IIG puts real money into the hands of real entrepreneurs in Los Angeles who lack access to traditional capital. From day one, you will be part of the due diligence, lending, and impact measurement process — proving that global change starts at the grassroots.",
  },
  {
    heading: "Build skills that matter.",
    body: "Our analysts develop proficiency in financial modeling, market research, data analysis, and client communication. These are the same competencies top employers look for, and you will practice them every week while working at the intersection of human development and sustainable markets.",
  },
  {
    heading: "Join a community, not just a club.",
    body: "IIG is a tight-knit group of curious, driven students who care about both professional excellence and social good. You will build friendships, find mentors, and become part of an alumni network that spans consulting, banking, venture capital, and social enterprise.",
  },
  {
    heading: "Launch your career with purpose.",
    body: "Whether you are headed into finance, consulting, tech, or the social sector, IIG gives you a portfolio of real work, a network of like-minded professionals, and a clearer understanding of how capital, nature, and human development are interconnected. The future needs leaders who understand this — and that starts here.",
  },
];

export default function ApplyPage() {
  return (
    <>
      {/* Navy Header */}
      <section className="bg-navy">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center lg:px-8">
          <h1 className="font-serif text-5xl font-bold text-white md:text-6xl">
            Why IIG?
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
            Global change doesn&rsquo;t start in boardrooms. It starts at the
            grassroots. Your career is the most powerful tool you have to shape
            the future. Learn to wield it here.
          </p>
        </div>
      </section>

      {/* Reasons */}
      <section className="bg-cream">
        <div className="mx-auto max-w-3xl px-6 pt-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Apply" }]} />
        </div>
        <div className="mx-auto max-w-3xl space-y-20 px-6 py-24 lg:px-8">
          {reasons.map((reason) => (
            <div key={reason.heading}>
              <h2 className="font-serif text-3xl font-bold text-navy md:text-4xl">
                {reason.heading}
              </h2>
              <p className="mt-4 leading-relaxed text-text-muted">
                {reason.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Block */}
      <section className="bg-off-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="bg-navy px-8 py-16 text-center">
            {APPLICATIONS_OPEN ? (
              <>
                <h2 className="font-serif text-4xl font-bold text-white md:text-5xl">
                  Ready to apply?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-white/70">
                  Applications for Fall 2026 are open. Join a selective community of
                  impact-minded analysts at USC.
                </p>
                <a
                  href="https://forms.gle/iT1fCQjJjf8H57JA7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-block border border-green bg-transparent px-8 py-3 text-sm font-semibold text-green transition-colors hover:bg-green hover:text-navy"
                >
                  Apply Now
                </a>
              </>
            ) : (
              <>
                <h2 className="font-serif text-4xl font-bold text-white md:text-5xl">
                  Applications open soon
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-white/70">
                  Applications open at the start of each semester. Follow us on Instagram
                  to stay in the loop.
                </p>
                <a
                  href="https://www.instagram.com/usciig"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-block border border-cream/30 bg-transparent px-8 py-3 text-sm font-semibold text-cream transition-colors hover:border-cream"
                >
                  Follow @usciig
                </a>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
