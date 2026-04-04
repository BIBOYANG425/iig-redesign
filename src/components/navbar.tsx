"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { MobileMenu } from "./mobile-menu";

interface DropdownItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href: string;
  children?: DropdownItem[];
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "About Us", href: "/about" },
      { label: "Team", href: "/about/team" },
      { label: "Services", href: "/about/services" },
      { label: "Values", href: "/about/values" },
    ],
  },
  { label: "Impact Palooza", href: "/impact-palooza" },
  { label: "Contact", href: "/contact" },
  {
    label: "Clients",
    href: "/clients",
    children: [
      { label: "Overview", href: "/clients" },
      { label: "Client FAQs", href: "/clients/faqs" },
      { label: "Case Studies", href: "/clients/case-studies" },
    ],
  },
  {
    label: "Apply",
    href: "/apply",
    children: [
      { label: "Why Join Us", href: "/apply" },
      { label: "FAQs", href: "/apply/faqs" },
    ],
  },
];

function Dropdown({
  item,
  isOpen,
  onOpen,
  onClose,
}: {
  item: NavItem;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <button
        className="flex items-center gap-1 text-sm font-medium tracking-wide text-text transition-colors hover:text-navy"
        onClick={onOpen}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {item.label}
        <svg
          className={`h-3.5 w-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`}
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

      {isOpen && (
        <div className="absolute left-1/2 top-full z-50 mt-2 min-w-[200px] -translate-x-1/2 rounded-lg border border-navy/10 bg-cream p-2 shadow-lg">
          {item.children!.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="block rounded-md px-4 py-2.5 text-sm text-text-muted transition-colors hover:bg-navy/5 hover:text-navy"
              onClick={onClose}
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 border-b border-navy/10 bg-cream/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="font-serif text-xl font-bold tracking-tight text-navy"
        >
          Impact Investing Group
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) =>
            item.children ? (
              <Dropdown
                key={item.label}
                item={item}
                isOpen={openDropdown === item.label}
                onOpen={() => setOpenDropdown(item.label)}
                onClose={() => setOpenDropdown(null)}
              />
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium tracking-wide text-text transition-colors hover:text-navy"
              >
                {item.label}
              </Link>
            ),
          )}
        </div>

        {/* Desktop CTA */}
        <a
          href="https://forms.gle/iT1fCQjJjf8H57JA7"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded-full bg-green px-5 py-2 text-sm font-semibold text-navy transition-colors hover:bg-green-dark lg:inline-block"
        >
          Apply Now
        </a>

        {/* Mobile hamburger */}
        <button
          className="relative z-50 flex h-10 w-10 items-center justify-center lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <div className="flex w-5 flex-col gap-1.5">
            <span
              className={`block h-0.5 w-full bg-navy transition-all ${
                mobileOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-full bg-navy transition-all ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-full bg-navy transition-all ${
                mobileOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navItems={navItems}
      />
    </header>
  );
}
