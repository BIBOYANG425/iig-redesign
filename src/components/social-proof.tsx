const stats = [
  { value: "12+", label: "Clients Served" },
  { value: "80+", label: "Analysts Trained" },
  { value: "6+", label: "Years of Impact" },
];

export function SocialProof() {
  return (
    <section className="border-b border-navy/10 bg-off-white">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-8 px-6 py-10 sm:flex-row sm:gap-16 lg:px-8">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-serif text-4xl font-bold text-navy">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
