const stats = [
  { value: "12+", label: "Client Engagements" },
  { value: "~10%", label: "Acceptance Rate" },
  { value: "80+", label: "Analysts Trained" },
  { value: "6+", label: "Years of Impact" },
];

export function SocialProof() {
  return (
    <section className="border-b border-muted/10 bg-surface">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-6 py-10 sm:grid-cols-4 sm:gap-12 lg:px-8">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-serif text-4xl font-bold text-cream">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
