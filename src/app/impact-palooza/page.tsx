import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impact Palooza — IIG",
};

export default function ImpactPaloozaPage() {
  return (
    <>
      {/* Navy Header */}
      <section className="bg-navy">
        <div className="mx-auto max-w-7xl px-6 py-32 text-center lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-green">
            IIG&rsquo;s Signature Annual Event
          </p>
          <h1 className="mt-4 font-serif text-5xl font-bold text-white md:text-6xl">
            Impact Palooza
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
            A celebration of a semester&rsquo;s worth of rigorous consulting,
            research, and microfinance work&mdash;where student teams present
            their deliverables to clients, faculty, industry leaders, and the
            broader USC community.
          </p>
          {/* <a
            href="#register"
            className="mt-10 inline-block rounded-full bg-green px-8 py-3 text-sm font-semibold text-navy transition-colors hover:bg-green-dark"
          >
            Register Now
          </a> */}
        </div>
      </section>

      {/* What is Impact Palooza? */}
      <section className="bg-cream">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center lg:px-8">
          <h2 className="font-serif text-4xl font-semibold text-navy md:text-5xl">
            What is Impact Palooza?
          </h2>
          <p className="mt-6 leading-relaxed text-text-muted">
            Impact Palooza is IIG&rsquo;s flagship annual event, bringing
            together students, social entrepreneurs, investors, and community
            leaders for an evening of panels, workshops, and networking. Teams
            showcase their semester-long consulting and research projects, sharing
            actionable insights with the clients and organizations they&rsquo;ve
            served. It&rsquo;s the culmination of months of hands-on work&mdash;
            and a testament to what happens when finance meets purpose.
          </p>
        </div>
      </section>

      {/* Past Events */}
      <section className="bg-off-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <h2 className="text-center font-serif text-4xl font-semibold text-navy md:text-5xl">
            Past Events
          </h2>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[2024, 2023, 2022].map((year) => (
              <div
                key={year}
                className="flex aspect-video items-center justify-center rounded-xl bg-navy/5"
              >
                <p className="text-sm text-text-muted">
                  Impact Palooza {year}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
