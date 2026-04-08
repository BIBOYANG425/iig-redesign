import Link from "next/link";

const columns = [
  {
    heading: "About",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Team", href: "/about/team" },
      { label: "Services", href: "/about/services" },
      { label: "Values", href: "/about/values" },
    ],
  },
  {
    heading: "Clients",
    links: [
      { label: "Overview", href: "/clients" },
      { label: "Client FAQs", href: "/clients/faqs" },
      { label: "Case Studies", href: "/clients/case-studies" },
    ],
  },
  {
    heading: "Students",
    links: [
      { label: "Why Join Us", href: "/apply" },
      { label: "FAQs", href: "/apply/faqs" },
      { label: "Impact Palooza", href: "/impact-palooza" },
    ],
  },
  {
    heading: "Connect",
    links: [
      { label: "Contact Us", href: "/contact" },
      {
        label: "Instagram",
        href: "https://www.instagram.com/usciig",
        external: true,
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/19111009/",
        external: true,
      },
      {
        label: "Facebook",
        href: "https://www.facebook.com/usciig",
        external: true,
      },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-cream">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {/* Link columns */}
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {columns.map((col) => (
            <div key={col.heading}>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-cream/50">
                {col.heading}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => {
                  const isExternal = "external" in link && link.external;
                  return (
                    <li key={link.href + link.label}>
                      {isExternal ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-muted transition-colors hover:text-cream"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-sm text-muted transition-colors hover:text-cream"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 border-t border-muted/20 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <Link
              href="/"
              className="font-serif text-lg font-bold tracking-tight text-cream"
            >
              Impact Investing Group
            </Link>

            <p className="text-sm text-muted">
              &copy; {year} Impact Investing Group at USC. All rights reserved.
            </p>

            <a
              href="https://forms.gle/iT1fCQjJjf8H57JA7"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-green bg-transparent px-8 py-3 text-sm font-semibold text-green transition-colors hover:bg-green hover:text-navy"
            >
              Apply Now
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
