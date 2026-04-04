export function Hero() {
  return (
    <section className="relative flex min-h-[85vh] items-center justify-center bg-navy">
      {/* Grain / noise texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center">
        <h1 className="font-serif text-5xl font-bold leading-tight text-white md:text-7xl">
          Fund Ideas.
          <br />
          Forge Futures.
          <br />
          Fuel Social Change.
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-lg text-white/70 md:text-xl">
          USC&rsquo;s premier impact investing organization. We financially
          empower social enterprises in Los Angeles and beyond.
        </p>

        <a
          href="https://forms.gle/iT1fCQjJjf8H57JA7"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-block rounded-full bg-green px-8 py-3.5 text-base font-semibold text-navy transition-colors hover:bg-green-dark"
        >
          Apply Now
        </a>
      </div>
    </section>
  );
}
