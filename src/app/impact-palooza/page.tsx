import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: "Impact Palooza",
};

export default function ImpactPaloozaPage() {
  return (
    <>
      {/* Navy Header */}
      <section className="bg-navy">
        <div className="mx-auto max-w-7xl px-6 py-32 text-center lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/50">
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
        <div className="mx-auto max-w-3xl px-6 pt-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Impact Palooza" }]} />
        </div>
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
          <div className="mt-14 mx-auto max-w-3xl space-y-8">
            {[
              { year: 2024, semester: "Spring", highlight: "12 teams presented deliverables to clients and faculty judges" },
              { year: 2023, semester: "Spring", highlight: "Expanded to include microfinance showcase alongside consulting presentations" },
              { year: 2022, semester: "Spring", highlight: "First in-person Impact Palooza since 2019" },
            ].map((event) => (
              <div key={event.year} className="border-b border-navy/10 pb-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-navy/40">
                  {event.semester} {event.year}
                </p>
                <p className="mt-2 text-lg text-text-muted">
                  {event.highlight}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
