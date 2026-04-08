"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");

    try {
      // Mock handler — replace with Formspree/Buttondown later
      await new Promise((r) => setTimeout(r, 1200));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="font-serif text-2xl text-navy">
        You&apos;re in. We&apos;ll be in touch.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-2">
      <div className="flex gap-0">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          aria-label="Email address"
          required
          disabled={status === "loading"}
          className="flex-1 border border-navy/20 bg-white px-6 py-4 text-text placeholder:text-text-muted/50 outline-none transition-colors focus:border-navy disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="border border-navy bg-navy px-8 py-4 text-sm font-semibold text-cream transition-colors hover:bg-navy-light disabled:opacity-50"
        >
          {status === "loading" ? "..." : "Subscribe"}
        </button>
      </div>
      {status === "error" && (
        <p className="text-sm text-red-600">
          Something went wrong.{" "}
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="underline transition-colors hover:text-navy"
          >
            Try again
          </button>
        </p>
      )}
    </form>
  );
}
