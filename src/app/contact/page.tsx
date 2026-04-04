import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — IIG",
};

export default function ContactPage() {
  return (
    <>
      {/* Navy Header */}
      <section className="bg-navy">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center lg:px-8">
          <h1 className="font-serif text-5xl font-bold text-white md:text-6xl">
            Get in Touch
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
            For partnerships, consulting inquiries, or general questions.
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-cream">
        <div className="mx-auto max-w-2xl px-6 py-24 lg:px-8">
          <form
            action="https://formspree.io/f/YOUR_FORM_ID"
            method="POST"
            className="space-y-6"
          >
            {/* First Name + Last Name */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="first-name"
                  className="mb-2 block text-sm font-medium text-navy"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="first-name"
                  name="first-name"
                  required
                  className="w-full rounded-lg border border-navy/10 bg-white px-4 py-3 text-text placeholder:text-text-muted/50 focus:border-navy focus:ring-1 focus:ring-navy focus:outline-none"
                  placeholder="Jane"
                />
              </div>
              <div>
                <label
                  htmlFor="last-name"
                  className="mb-2 block text-sm font-medium text-navy"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="last-name"
                  name="last-name"
                  required
                  className="w-full rounded-lg border border-navy/10 bg-white px-4 py-3 text-text placeholder:text-text-muted/50 focus:border-navy focus:ring-1 focus:ring-navy focus:outline-none"
                  placeholder="Doe"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-navy"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full rounded-lg border border-navy/10 bg-white px-4 py-3 text-text placeholder:text-text-muted/50 focus:border-navy focus:ring-1 focus:ring-navy focus:outline-none"
                placeholder="jane@example.com"
              />
            </div>

            {/* Subject */}
            <div>
              <label
                htmlFor="subject"
                className="mb-2 block text-sm font-medium text-navy"
              >
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                className="w-full rounded-lg border border-navy/10 bg-white px-4 py-3 text-text focus:border-navy focus:ring-1 focus:ring-navy focus:outline-none"
              >
                <option>General Inquiry</option>
                <option>Consulting Inquiry</option>
                <option>Partnership</option>
                <option>Other</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-navy"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                className="w-full rounded-lg border border-navy/10 bg-white px-4 py-3 text-text placeholder:text-text-muted/50 focus:border-navy focus:ring-1 focus:ring-navy focus:outline-none"
                placeholder="How can we help?"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-lg bg-navy px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-navy-light sm:w-auto"
            >
              Send Message
            </button>
          </form>

          {/* Social Links */}
          <div className="mt-16 flex items-center justify-center gap-8">
            <a
              href="https://www.instagram.com/usciig"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-muted transition-colors hover:text-navy"
            >
              Instagram
            </a>
            <a
              href="https://www.linkedin.com/company/19111009/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-muted transition-colors hover:text-navy"
            >
              LinkedIn
            </a>
            <a
              href="https://www.facebook.com/usciig"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-muted transition-colors hover:text-navy"
            >
              Facebook
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
