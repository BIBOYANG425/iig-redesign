interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  dark?: boolean;
}

export function SectionHeading({
  title,
  subtitle,
  centered = false,
  dark = true,
}: SectionHeadingProps) {
  const titleColor = dark ? "text-cream" : "text-navy";
  const subtitleColor = dark ? "text-muted" : "text-text-muted";

  return (
    <div className={centered ? "text-center" : ""}>
      <h2 className={`font-serif text-4xl font-semibold md:text-5xl ${titleColor}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 max-w-2xl ${subtitleColor}${centered ? " mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
