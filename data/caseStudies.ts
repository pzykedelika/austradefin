export interface CaseStudy {
  id: string;
  title: string;
  sector: string;
  summary: string;
  amount: string;
  outcome: string;
  tags: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: "commercial-property-refinance",
    title: "Commercial Property Refinance",
    sector: "Property Finance",
    summary:
      "Assisted a mid-market property group in refinancing a portfolio of commercial assets across multiple states, securing improved terms and extended tenure with a major institutional lender.",
    amount: "$45M",
    outcome: "Improved loan terms with a 15-year facility and reduced margin",
    tags: ["Property", "Refinance", "Institutional"],
  },
  {
    id: "acquisition-finance",
    title: "Business Acquisition Facility",
    sector: "Corporate Finance",
    summary:
      "Arranged acquisition finance for a private equity-backed purchaser of a national services business, coordinating senior debt, mezzanine, and vendor finance components.",
    amount: "$28M",
    outcome: "Structured multi-tranche facility settled within 8 weeks",
    tags: ["Acquisition", "Private Equity", "Structured"],
  },
  {
    id: "construction-finance",
    title: "Mixed-Use Development Finance",
    sector: "Construction & Development",
    summary:
      "Sourced construction finance for a mixed-use residential and retail development in a metropolitan growth corridor, working with a non-bank lender to achieve competitive pricing.",
    amount: "$62M",
    outcome: "Full funding secured with staged drawdown facility",
    tags: ["Construction", "Development", "Non-Bank"],
  },
  {
    id: "working-capital",
    title: "Trade Finance & Working Capital",
    sector: "Trade Finance",
    summary:
      "Established a revolving trade finance facility for an importing business, enabling improved cash flow management and supplier payment terms across international supply chains.",
    amount: "$12M",
    outcome: "Revolving facility with 90-day terms and flexible drawdown",
    tags: ["Trade Finance", "Working Capital", "Import"],
  },
];
