"use client";

import { useState } from "react";
import Link from "next/link";

interface DropdownItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href: string;
  children?: DropdownItem[];
}

export function MobileMenu({
  isOpen,
  onClose,
  navItems,
}: {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
}) {
  const [expanded, setExpanded] = useState<string | null>(null);

  if (!isOpen) return null;

  function toggleSection(label: string) {
    setExpanded((prev) => (prev === label ? null : label));
  }

  return (
    <div className="border-t border-muted/20 bg-surface lg:hidden">
      <div className="mx-auto max-w-7xl space-y-1 px-6 py-4">
        {navItems.map((item) =>
          item.children ? (
            <div key={item.label}>
              <button
                onClick={() => toggleSection(item.label)}
                className="flex w-full items-center justify-between py-3 text-base font-medium text-cream"
                aria-expanded={expanded === item.label}
              >
                {item.label}
                <svg
                  className={`h-4 w-4 text-muted transition-transform ${
                    expanded === item.label ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {expanded === item.label && (
                <div className="ml-4 space-y-1 border-l border-muted/20 pl-4">
                  {item.children!.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={onClose}
                      className="block py-2 text-sm text-muted transition-colors hover:text-cream"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Link
              key={item.label}
              href={item.href}
              onClick={onClose}
              className="block py-3 text-base font-medium text-cream transition-colors hover:text-green"
            >
              {item.label}
            </Link>
          ),
        )}

        {/* Mobile CTA */}
        <div className="pt-4">
          <a
            href="https://forms.gle/iT1fCQjJjf8H57JA7"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="block w-full border border-green bg-transparent py-3 text-center text-sm font-semibold text-green transition-colors hover:bg-green hover:text-navy"
          >
            Apply Now
          </a>
        </div>
      </div>
    </div>
  );
}
