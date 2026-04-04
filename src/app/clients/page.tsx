import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Clients — IIG",
};

const clients = ["LASIF", "PS Science", "Client 3", "Client 4"];

export default function ClientsPage() {
  return (
    <>
      {/* Navy Header */}
      <section className="bg-navy">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center lg:px-8">
          <h1 className="font-serif text-5xl font-bold text-white md:text-6xl">
            Who We Work With
          </h1>
        </div>
      </section>

      {/* About Our Clients */}
      <section className="bg-cream">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center lg:px-8">
          <p className="leading-relaxed text-text-muted">
            IIG partners with social enterprises, nonprofits, and impact funds
            across Los Angeles. Every engagement is structured like a
            professional consulting project&mdash;scoped, staffed, and
            delivered with the same rigor our clients would expect from a
            top-tier firm. We build lasting relationships that go beyond a
            single semester, and many of our clients return year after year.
          </p>
        </div>
      </section>

      {/* Client Logo Grid */}
      <section className="bg-off-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {clients.map((name) => (
              <div
                key={name}
                className="flex aspect-video items-center justify-center rounded-xl bg-navy/5"
              >
                <p className="text-sm font-medium text-text-muted">{name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pull Quote */}
      <section className="bg-cream">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center lg:px-8">
          <blockquote className="font-serif text-2xl italic text-navy md:text-3xl">
            &ldquo;IIG brought the kind of analytical rigor we would expect
            from a top consulting firm.&rdquo;
          </blockquote>
          <p className="mt-6 text-sm text-text-muted">
            &mdash; LASIF, Spring 2023
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-off-white">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center lg:px-8">
          <Link
            href="/contact"
            className="inline-block rounded-full bg-green px-8 py-3.5 text-base font-semibold text-navy transition-colors hover:bg-green-dark"
          >
            Work with us
          </Link>
        </div>
      </section>
    </>
  );
}
