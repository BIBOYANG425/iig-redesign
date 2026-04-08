import HeroPremium from "@/components/hero-premium";
import ScrollGlobe from "@/components/scroll-globe";
import { SocialProof } from "@/components/social-proof";
import { SectionHeading } from "@/components/section-heading";
import { ImpactPaloozaMarquee } from "@/components/impact-palooza-marquee";
import { CaseStudyList } from "@/components/case-study-list";
import { ServicesSection } from "@/components/services-section";
import { RecruitmentSection } from "@/components/recruitment-section";
import { CanvasErrorBoundary } from "@/components/error-boundary";
import "@/styles/hero-premium.css";

export default function Home() {
  return (
    <>
      {/* Fixed globe — scales across entire page scroll */}
      <CanvasErrorBoundary>
        <ScrollGlobe />
      </CanvasErrorBoundary>

      {/* Hero — dark navy, pinned scroll-reveal */}
      <HeroPremium />

      {/* Social Proof — dark navy, counter animation */}
      <div className="relative z-[2]">
        <SocialProof />
      </div>

      {/* Services — dark navy, parallax stagger */}
      <div className="relative z-[2]">
        <ServicesSection />
      </div>

      {/* Impact Palooza — dark navy, pinned scaling */}
      <div className="relative z-[2]">
        <ImpactPaloozaMarquee />
      </div>

      {/* Recent Case Studies — transitional gradient */}
      <section
        className="relative z-[2]"
        style={{
          background: "linear-gradient(to bottom, #16165F 0%, #1E1E7A 60%, #2A2A6E 100%)",
        }}
      >
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <SectionHeading
            title="Recent Engagements"
            subtitle="Professional deliverables. Measurable client outcomes."
          />
          <div className="mt-14">
            <CaseStudyList />
          </div>
        </div>
      </section>

      {/* Recruitment + Newsletter — cream, soft motion */}
      <div className="relative z-[2]">
        <RecruitmentSection />
      </div>
    </>
  );
}
