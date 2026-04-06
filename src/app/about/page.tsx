import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — IIG",
};

export default function AboutPage() {
  return (
    <>
      {/* Navy Header */}
      <section className="bg-navy">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center lg:px-8">
          <h1 className="font-serif text-5xl font-bold text-white md:text-6xl">
            Impact Investing at USC
          </h1>
        </div>
      </section>

      {/* Two-Column Content */}
      <section className="bg-cream">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-2 lg:gap-20 lg:px-8">
          {/* Left — Mission & History */}
          <div className="space-y-6 text-text-muted leading-relaxed">
            <p>
              Founded in 2018, the Impact Investing Group at USC was born from a
              simple conviction: finance should be a force for good. What started
              as a small cohort of students passionate about social enterprise has
              grown into one of USC&rsquo;s most active organizations at the
              intersection of business and social impact.
            </p>
            <p>
              Our mission is to train the next generation of impact-focused
              analysts&mdash;equipping them with the analytical rigor,
              strategic thinking, and hands-on experience needed to allocate
              capital toward measurable social and environmental outcomes. Through
              pro-bono consulting, microfinance advisory, and original research,
              our members gain real-world experience while creating tangible value
              for mission-driven organizations across Los Angeles.
            </p>
            <p>
              At its core, IIG bridges finance and purpose. We believe that
              rigorous analysis and social impact are not mutually exclusive, and
              that the best way to learn is by doing meaningful work for real
              clients. Every semester, our analysts tackle complex challenges
              alongside social enterprises, nonprofits, and impact funds&mdash;
              developing professional skills that prepare them for careers in
              consulting, investment management, social enterprise, and beyond.
            </p>
          </div>

          {/* Right — Group Photo Placeholder */}
          <div className="flex items-center justify-center rounded-xl bg-navy/5 min-h-[320px]">
            <p className="text-sm text-text-muted">Group photo</p>
          </div>
        </div>
      </section>
    </>
  );
}
