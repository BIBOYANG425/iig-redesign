import type { Metadata } from "next";
import Link from "next/link";
import { caseStudies } from "@/data/case-studies";

export const metadata: Metadata = {
  title: "Case Studies — IIG",
};

export default function CaseStudiesPage() {
  return (
    <>
      {/* Navy Header */}
      <section className="bg-navy">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center lg:px-8">
          <h1 className="font-serif text-5xl font-bold text-white md:text-6xl">
            Case Studies
          </h1>
        </div>
      </section>

      {/* Case Study Cards */}
      <section className="bg-cream">
        <div className="mx-auto max-w-4xl space-y-12 px-6 py-24 lg:px-8">
          {caseStudies.map((study) => (
            <Link
              key={study.slug}
              href={`/clients/case-studies/${study.slug}`}
              className="block rounded-xl bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-green/20 px-3 py-1 text-xs font-semibold text-navy">
                  {study.tag}
                </span>
                <span className="text-xs text-text-muted">
                  {study.semester}
                </span>
              </div>
              <h2 className="mt-4 font-serif text-2xl font-semibold text-navy md:text-3xl">
                {study.client}
              </h2>
              <p className="mt-3 leading-relaxed text-text-muted">
                {study.summary}
              </p>
              <span className="mt-4 inline-block text-sm font-medium text-navy">
                Read full case study &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
