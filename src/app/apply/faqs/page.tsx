import type { Metadata } from "next";
import { Accordion } from "@/components/accordion";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: "Application FAQs",
};

const faqs = [
  {
    question: "What is the time commitment?",
    answer:
      "Members typically commit six to eight hours per week, which includes team meetings, client work sessions, and general body meetings. The workload is comparable to a rigorous extracurricular and is designed to be manageable alongside a full course load.",
  },
  {
    question: "Do I need prior experience in finance or consulting?",
    answer:
      "No. We look for intellectual curiosity, a strong work ethic, and genuine interest in social impact — not a specific resume. Many of our strongest analysts had no finance background when they joined. We provide all the training you need during our onboarding program at the start of each semester.",
  },
  {
    question: "What does the application process look like?",
    answer:
      "The process consists of a written application followed by one or two rounds of interviews. The written application asks about your interest in impact investing and relevant experiences. Interviews are conversational and focus on fit, problem-solving ability, and motivation.",
  },
  {
    question: "Can freshmen apply?",
    answer:
      "Yes! We welcome applicants from all years, including first-semester freshmen. Some of our most impactful members joined as freshmen and grew into leadership roles by their junior year.",
  },
  {
    question: "When do applications open?",
    answer:
      "Applications typically open during the first two weeks of each semester. Follow us on Instagram (@usciig) for the latest announcements and deadlines, or check back on this page closer to the start of the semester.",
  },
  {
    question: "Do you accept students from all majors?",
    answer:
      "Absolutely. IIG is intentionally interdisciplinary. Our members come from business, economics, engineering, public policy, environmental studies, and many other fields. Diverse perspectives make our teams stronger and our work more impactful.",
  },
];

export default function ApplyFaqsPage() {
  return (
    <>
      {/* Navy Header */}
      <section className="bg-navy">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center lg:px-8">
          <h1 className="font-serif text-5xl font-bold text-white md:text-6xl">
            Application FAQs
          </h1>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="bg-cream">
        <div className="mx-auto max-w-3xl px-6 pt-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Apply", href: "/apply" }, { label: "FAQs" }]} />
        </div>
        <div className="mx-auto max-w-3xl px-6 py-24 lg:px-8">
          <Accordion items={faqs} />
        </div>
      </section>
    </>
  );
}
