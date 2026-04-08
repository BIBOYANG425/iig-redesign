import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: {
    default: "Impact Investing Group at USC",
    template: "%s — Impact Investing Group at USC",
  },
  description:
    "Fund Ideas. Forge Futures. Fuel Social Change. USC's premier impact investing organization delivering pro-bono consulting, financial modeling, and research to social enterprises.",
  openGraph: {
    title: "Impact Investing Group at USC",
    description:
      "Fund Ideas. Forge Futures. Fuel Social Change. Pro-bono consulting and research for LA social enterprises.",
    url: "https://www.usciig.org",
    siteName: "IIG at USC",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Impact Investing Group at USC",
    description:
      "Fund Ideas. Forge Futures. Fuel Social Change. Pro-bono consulting and research for LA social enterprises.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} ${playfair.variable}`}>
      <head>
        <meta name="theme-color" content="#16165F" />
      </head>
      <body className="bg-cream font-sans text-text antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-navy focus:px-4 focus:py-2 focus:text-cream"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
