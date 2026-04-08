"use client";

import { useState, useEffect } from "react";
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
  pathname,
}: {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  pathname: string;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);

  // Auto-expand section when a child page is active
  useEffect(() => {
    if (isOpen) {
      const activeParent = navItems.find(
        (item) =>
          item.children &&
          (pathname === item.href || pathname.startsWith(item.href + "/"))
      );
      if (activeParent) {
        setExpanded(activeParent.label);
      }
    }
  }, [isOpen, pathname, navItems]);

  if (!isOpen) return null;

  function toggleSection(label: string) {
    setExpanded((prev) => (prev === label ? null : label));
  }

  return (
    <div className="border-t border-muted/20 bg-navy lg:hidden">
      <div className="mx-auto max-w-7xl space-y-1 px-6 py-4">
        {navItems.map((item) =>
          item.children ? (
            <div key={item.label}>
              <button
                onClick={() => toggleSection(item.label)}
                className={`flex w-full items-center justify-between py-3 text-base font-medium ${
                  pathname === item.href || pathname.startsWith(item.href + "/") ? "text-green" : "text-cream"
                }`}
                aria-expanded={expanded === item.label || pathname === item.href || pathname.startsWith(item.href + "/")}
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
                      className={`block py-2 text-sm transition-colors hover:text-cream ${
                        pathname === child.href ? "text-green" : "text-muted"
                      }`}
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
              className={`block py-3 text-base font-medium transition-colors hover:text-green ${
                pathname === item.href ? "text-green" : "text-cream"
              }`}
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
