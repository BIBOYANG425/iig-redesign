import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-navy font-sans text-cream antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
