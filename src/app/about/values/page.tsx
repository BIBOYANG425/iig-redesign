import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Values — IIG",
};

const values = [
  {
    statement: "Change starts at the roots.",
    body: "We believe that the most profound global transformations begin with local, grassroots action. As a Kiva Trustee Partner, we are committed to empowering communities from the ground up — funding entrepreneurs in Los Angeles who lack access to traditional capital, and proving that sustainable change scales from the bottom up.",
  },
  {
    statement: "Nature as a stakeholder.",
    body: "We recognize that all economic activity is ultimately derived from the natural world. True sustainable growth requires treating the planet's energy and ecosystems as essential partners, not infinite resources. Every strategy we build accounts for the world we share.",
  },
  {
    statement: "Real work, not resume padding.",
    body: "Every project we take on has a real client with a real problem. Our analysts don't simulate consulting — they do it. The work matters, and so does the quality we bring to it.",
  },
  {
    statement: "Impact is measurable.",
    body: "We believe that social good and analytical rigor go hand in hand. If we can't measure it, we can't improve it. Data-driven thinking is at the core of everything we do.",
  },
  {
    statement: "Learn by doing.",
    body: "Textbooks give you theory. IIG gives you experience. From day one, our analysts work alongside social enterprises, developing the skills that matter most through hands-on practice.",
  },
  {
    statement: "Community over competition.",
    body: "We grow together. IIG is built on collaboration, mentorship, and shared purpose. We celebrate each other's wins and lift each other up — because the best teams are built on trust.",
  },
  {
    statement: "Bridge finance and purpose.",
    body: "Capital is a tool. Directed thoughtfully, it can solve some of the world's most pressing challenges. We train the next generation of leaders to invest with intention and impact — connecting human development with the energy of the natural world.",
  },
];

export default function ValuesPage() {
  return (
    <>
      {/* Navy Header */}
      <section className="bg-navy">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center lg:px-8">
          <h1 className="font-serif text-5xl font-bold text-white md:text-6xl">
            Our Values
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
            We believe global change starts at the grassroots. These principles
            guide every engagement, every loan, and every strategy we deliver.
          </p>
        </div>
      </section>

      {/* Values Manifesto */}
      <section className="bg-cream">
        <div className="mx-auto max-w-3xl space-y-20 px-6 py-24 text-center lg:px-8">
          {values.map((value) => (
            <div key={value.statement}>
              <p className="font-serif text-2xl font-bold text-navy md:text-3xl">
                &ldquo;{value.statement}&rdquo;
              </p>
              <p className="mt-4 leading-relaxed text-text-muted">
                {value.body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
