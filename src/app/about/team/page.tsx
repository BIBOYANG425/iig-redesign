import type { Metadata } from "next";
import { eboard, analysts, type TeamMember } from "@/data/team";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: "Team",
};

function MemberCard({ member, compact = false }: { member: TeamMember; compact?: boolean }) {
  const size = compact ? "h-20 w-20" : "h-28 w-28";

  return (
    <div className="flex flex-col items-center text-center">
      {/* Headshot placeholder */}
      <div
        className={`${size} bg-navy/10 flex items-center justify-center`}
      >
        <span className="text-xs text-text-muted">Photo</span>
      </div>

      <h3
        className={`mt-4 font-serif font-semibold text-navy ${
          compact ? "text-lg" : "text-xl"
        }`}
      >
        {member.name}
      </h3>
      <p className="mt-1 text-sm font-medium text-green-dark">{member.role}</p>
      <p className="mt-0.5 text-sm text-text-muted">{member.major}</p>

      {member.linkedin && (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 text-xs font-medium text-navy underline underline-offset-2 transition-colors hover:text-navy-light"
        >
          LinkedIn
        </a>
      )}
    </div>
  );
}

export default function TeamPage() {
  return (
    <>
      {/* Navy Header */}
      <section className="bg-navy">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center lg:px-8">
          <h1 className="font-serif text-5xl font-bold text-white md:text-6xl">
            Our Team
          </h1>
        </div>
      </section>

      {/* Executive Board */}
      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-6 pt-6 lg:px-8">
          <Breadcrumbs items={[{ label: "About", href: "/about" }, { label: "Team" }]} />
        </div>
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <h2 className="text-center font-serif text-4xl font-semibold text-navy md:text-5xl">
            Executive Board
          </h2>
          <div className="mt-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {eboard.map((member) => (
              <MemberCard key={member.name} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Analysts */}
      <section className="bg-off-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <h2 className="text-center font-serif text-4xl font-semibold text-navy md:text-5xl">
            Analysts
          </h2>
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {analysts.map((member) => (
              <MemberCard key={member.name} member={member} compact />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
