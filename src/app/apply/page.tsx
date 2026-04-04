import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why Join Us — IIG",
};

const reasons = [
  {
    heading: "Do real work for real clients.",
    body: "From day one, you will be staffed on a live consulting engagement with a mission-driven organization. No hypothetical case studies, no busy work — just meaningful projects that sharpen your skills and create real impact.",
  },
  {
    heading: "Build skills that matter.",
    body: "Our analysts develop proficiency in financial modeling, market research, data analysis, and client communication. These are the same competencies top employers look for, and you will practice them every week in a collaborative, high-support environment.",
  },
  {
    heading: "Join a community, not just a club.",
    body: "IIG is a tight-knit group of curious, driven students who care about both professional excellence and social good. You will build friendships, find mentors, and become part of an alumni network that spans consulting, banking, venture capital, and social enterprise.",
  },
  {
    heading: "Launch your career with purpose.",
    body: "Whether you are headed into finance, consulting, tech, or the social sector, IIG gives you a portfolio of real work, a network of like-minded professionals, and a clearer understanding of how capital can drive positive change.",
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
            Here&rsquo;s what makes Impact Investing Group different.
          </p>
        </div>
      </section>

      {/* Reasons */}
      <section className="bg-cream">
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
          <div className="rounded-xl bg-navy px-8 py-16 text-center">
            <h2 className="font-serif text-4xl font-bold text-white md:text-5xl">
              Ready to apply?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/70">
              Applications open at the start of each semester. Check back for
              the latest timeline, or follow us on Instagram to stay in the
              loop.
            </p>
            <a
              href="https://forms.gle/iT1fCQjJjf8H57JA7"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block rounded-full bg-green px-8 py-3.5 text-base font-semibold text-navy transition-colors hover:bg-green-dark"
            >
              Apply Now
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
