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

    // Mock handler — replace with Formspree/Buttondown later
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("success");
  }

  if (status === "success") {
    return (
      <p className="font-serif text-2xl text-green">
        Welcome to the movement.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md gap-0">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        disabled={status === "loading"}
        className="flex-1 border border-muted/30 bg-transparent px-6 py-4 text-cream placeholder:text-muted outline-none transition-colors focus:border-green disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="border border-green bg-transparent px-8 py-4 text-sm font-semibold text-green transition-colors hover:bg-green hover:text-navy disabled:opacity-50"
      >
        {status === "loading" ? "..." : "Subscribe"}
      </button>
    </form>
  );
}
