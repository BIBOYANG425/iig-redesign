export interface CaseStudy {
  slug: string;
  client: string;
  semester: string;
  tag: string;
  summary: string;
  problem?: string;
  approach?: string;
  outcome?: string;
  testimonial?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "lasif",
    client: "LASIF",
    semester: "Spring 2023",
    tag: "Market Research",
    summary:
      "Conducted comprehensive market research for the Los Angeles Social Impact Fund to identify emerging investment opportunities in underserved communities across greater Los Angeles.",
    problem:
      "LASIF needed a data-driven understanding of the social enterprise landscape in Los Angeles to inform their next round of impact investments. They lacked granular insight into which sectors and geographies offered the strongest combination of financial return and measurable social impact.",
    approach:
      "Our team of six analysts spent twelve weeks conducting primary and secondary research. We surveyed over forty social enterprises, interviewed fund managers and community leaders, and built a proprietary scoring model that weighted financial viability alongside impact metrics such as job creation, community health outcomes, and environmental sustainability.",
    outcome:
      "We delivered a seventy-page market landscape report identifying three high-potential sectors — affordable housing, workforce development, and food access — along with a shortlist of fifteen vetted investment candidates. LASIF incorporated our findings into their Spring 2023 investment thesis and deployed capital into two of the recommended organizations within six months.",
    testimonial:
      "The IIG team brought the kind of analytical rigor we would expect from a top consulting firm. Their research directly shaped our investment strategy and helped us deploy capital with confidence.",
  },
  {
    slug: "ps-science",
    client: "PS Science",
    semester: "Spring 2023",
    tag: "Data Analysis",
    summary:
      "Performed data analysis and program evaluation for PS Science, a nonprofit bringing hands-on science education to underserved Title I elementary schools in Los Angeles.",
    problem:
      "PS Science had years of program data across dozens of partner schools but lacked the capacity to analyze it. They needed to quantify their impact in a way that would satisfy current funders and attract new ones, while also identifying which program elements drove the strongest learning outcomes.",
    approach:
      "Our analysts cleaned and consolidated five years of pre- and post-assessment data spanning over eight thousand students. We ran statistical analyses to isolate the variables most correlated with improved science literacy, segmented results by school demographics, and built interactive dashboards that PS Science could present to stakeholders.",
    outcome:
      "The analysis revealed that PS Science programs improved student science proficiency scores by an average of thirty-four percent, with the largest gains among English-language learners. Our dashboards and executive summary became central to PS Science's annual fundraising campaign, contributing to a successful grant renewal worth over two hundred thousand dollars.",
    testimonial:
      "IIG didn't just crunch numbers — they told the story of our impact in a way that resonated with funders. The dashboards they built are something we use every single week.",
  },
  {
    slug: "phresh-juice-bar",
    client: "PHresh Juice Bar",
    semester: "Spring 2024",
    tag: "Kiva Microloan",
    summary:
      "Funded a $10,500 zero-interest Kiva microloan for a South LA entrepreneur to secure a ghost kitchen and launch an organic cold-pressed juice business serving his community.",
    problem:
      "Phelipe, a South Los Angeles native and former Whole Foods store leader, launched PHresh Juice Bar after a personal transformation centered on health and sobriety. He had been selling cold-pressed juice at local gyms and run clubs but needed a commercial kitchen to scale. Traditional lenders wouldn't finance a pre-revenue food startup with no collateral, leaving him stuck between a growing customer base and no way to produce at volume.",
    approach:
      "As a Kiva trustee partner, IIG's microfinance team conducted due diligence on Phelipe's business plan, assessed his market opportunity in the South LA food desert landscape, and structured a $10,500 zero-interest loan through Kiva's crowdfunding platform. Our analysts reviewed his unit economics, projected cash flow for a ghost kitchen operation, and helped him refine his pitch for Kiva's lender community. The loan was posted on Kiva and fully funded by 272 individual lenders worldwide.",
    outcome:
      "The loan enabled Phelipe to secure a ghost kitchen location and transition from informal pop-up sales to a legitimate commercial operation. PHresh Juice Bar now produces organic cold-pressed juice at scale for the South LA community. The successful funding and repayment cycle also strengthened IIG's track record as a Kiva trustee, enabling future microloans to LA-based entrepreneurs.",
    testimonial:
      "IIG believed in my vision when the banks wouldn't even take my call. Their team helped me put together a real plan and connected me with lenders who wanted to see my community thrive.",
  },
];
