interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionHeading({
  title,
  subtitle,
  centered = false,
}: SectionHeadingProps) {
  return (
    <div className={centered ? "text-center" : ""}>
      <h2 className="font-serif text-4xl font-semibold text-navy md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 max-w-2xl text-text-muted${centered ? " mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
