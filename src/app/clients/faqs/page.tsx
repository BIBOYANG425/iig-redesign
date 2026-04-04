import type { Metadata } from "next";
import { Accordion } from "@/components/accordion";

export const metadata: Metadata = {
  title: "Client FAQs — IIG",
};

const faqs = [
  {
    question: "What types of organizations does IIG work with?",
    answer:
      "We partner with social enterprises, nonprofits, impact funds, and mission-driven organizations of all sizes. Our clients typically operate in sectors like affordable housing, education, food access, workforce development, and community health — though we are open to any organization whose work creates measurable social or environmental impact.",
  },
  {
    question: "What does a typical engagement look like?",
    answer:
      "Each engagement lasts one semester (roughly twelve to fourteen weeks). We begin with a scoping call to define deliverables and milestones, assign a team of four to six trained analysts, and hold regular check-ins throughout the project. Final deliverables are presented at Impact Palooza, our end-of-semester showcase event.",
  },
  {
    question: "Is the work really pro bono?",
    answer:
      "Yes. All of our consulting, research, and advisory services are provided at no cost to the client. IIG is a student-run organization and our primary goal is to create educational opportunities for our members while delivering real value to mission-driven organizations.",
  },
  {
    question: "What kind of deliverables can we expect?",
    answer:
      "Deliverables vary by engagement but typically include market research reports, financial models, competitive analyses, data dashboards, strategic recommendations, and executive presentations. Every project is tailored to the client's specific needs and goals.",
  },
  {
    question: "How do we request IIG's services?",
    answer:
      "Reach out through our contact page or email us directly. We review incoming requests on a rolling basis and match projects with teams at the start of each semester. We recommend reaching out at least two to three weeks before the semester begins to ensure your project can be scoped and staffed in time.",
  },
];

export default function ClientFaqsPage() {
  return (
    <>
      {/* Navy Header */}
      <section className="bg-navy">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center lg:px-8">
          <h1 className="font-serif text-5xl font-bold text-white md:text-6xl">
            Client FAQs
          </h1>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="bg-cream">
        <div className="mx-auto max-w-3xl px-6 py-24 lg:px-8">
          <Accordion items={faqs} />
        </div>
      </section>
    </>
  );
}
