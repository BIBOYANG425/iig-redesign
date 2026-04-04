import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies } from "@/data/case-studies";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) return { title: "Case Study — IIG" };
  return { title: `${study.client} — IIG` };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);

  if (!study) notFound();

  return (
    <>
      {/* Navy Header */}
      <section className="bg-navy">
        <div className="mx-auto max-w-7xl px-6 py-32 text-center lg:px-8">
          <div className="flex items-center justify-center gap-3">
            <span className="rounded-full bg-green/20 px-3 py-1 text-xs font-semibold text-green">
              {study.tag}
            </span>
            <span className="text-xs text-white/50">{study.semester}</span>
          </div>
          <h1 className="mt-6 font-serif text-5xl font-bold text-white md:text-6xl">
            {study.client}
          </h1>
        </div>
      </section>

      {/* Article */}
      <section className="bg-cream">
        <article className="mx-auto max-w-3xl px-6 py-24 lg:px-8">
          {/* Summary */}
          <p className="text-lg leading-relaxed text-text-muted">
            {study.summary}
          </p>

          {/* The Problem */}
          {study.problem && (
            <div className="mt-14">
              <h2 className="font-serif text-3xl font-semibold text-navy">
                The Problem
              </h2>
              <p className="mt-4 leading-relaxed text-text-muted">
                {study.problem}
              </p>
            </div>
          )}

          {/* Our Approach */}
          {study.approach && (
            <div className="mt-14">
              <h2 className="font-serif text-3xl font-semibold text-navy">
                Our Approach
              </h2>
              <p className="mt-4 leading-relaxed text-text-muted">
                {study.approach}
              </p>
            </div>
          )}

          {/* The Outcome */}
          {study.outcome && (
            <div className="mt-14">
              <h2 className="font-serif text-3xl font-semibold text-navy">
                The Outcome
              </h2>
              <p className="mt-4 leading-relaxed text-text-muted">
                {study.outcome}
              </p>
            </div>
          )}

          {/* Testimonial */}
          {study.testimonial && (
            <blockquote className="mt-14 border-l-4 border-green pl-6">
              <p className="font-serif text-lg italic text-navy">
                &ldquo;{study.testimonial}&rdquo;
              </p>
              <cite className="mt-3 block text-sm not-italic text-text-muted">
                &mdash; {study.client}
              </cite>
            </blockquote>
          )}

          {/* Back Link */}
          <div className="mt-16">
            <Link
              href="/clients/case-studies"
              className="text-sm font-medium text-navy underline underline-offset-4 transition-colors hover:text-navy-light"
            >
              &larr; Back to all case studies
            </Link>
          </div>
        </article>
      </section>
    </>
  );
}
