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
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
            Rooted locally. Empowering humanity. Financing the future.
          </p>
        </div>
      </section>

      {/* Two-Column Content */}
      <section className="bg-cream">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-2 lg:gap-20 lg:px-8">
          {/* Left — Mission & History */}
          <div className="space-y-6 text-text-muted leading-relaxed">
            <p>
              Founded in 2018, the Impact Investing Group at USC was born from a
              simple conviction: global change starts at the grassroots, and
              finance should be the tool that makes it possible. What started as
              a small cohort of students passionate about social enterprise has
              grown into one of USC&rsquo;s most active organizations at the
              intersection of human development, natural energy, and sustainable
              growth.
            </p>
            <p>
              Our mission is to train the next generation of impact-focused
              analysts&mdash;equipping them with the analytical rigor, strategic
              thinking, and hands-on experience needed to allocate capital toward
              measurable social and environmental outcomes. As an official Kiva
              Trustee Partner, we don&rsquo;t just study impact investing&mdash;we
              practice it, deploying real capital to real entrepreneurs in Los
              Angeles who lack access to traditional financial systems.
            </p>
            <p>
              At its core, IIG bridges finance and purpose. We believe that
              sustainability, human development, and the energy of the natural
              world are inseparable&mdash;and that the most meaningful change
              scales from the ground up. Every semester, our analysts tackle
              complex challenges alongside social enterprises, nonprofits, and
              impact funds, developing professional skills while proving that
              grassroots action can have global resonance.
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
