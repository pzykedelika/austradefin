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
    title: "Construction Industry",
    sector: "Property Finance",
    summary:
      "Discounted invoices throughout the year covering goods and services of all kinds.",
    amount: "$25M of annual volumes",
    outcome: "Significantly improved working capital cashflows in its ongoing business dealings with its external distributors.",
    tags: ["Property", "Refinance", "Institutional"],
  },
  {
    id: "acquisition-finance",
    title: "Wholesaler in Shoes and Leather Goods",
    sector: "Corporate Finance",
    summary:
      "Streamlined cashflows to ensure peaks and troughs were smoothed by discounting bills.",
    amount: "$22M of annual volumes",
    outcome: "Regulated cashflows and eased burden of excessive borrowing to fund deficits.",
    tags: ["Acquisition", "Private Equity", "Structured"],
  },
  {
    id: "construction-finance",
    title: "Defense Industry Supplier",
    sector: "Construction & Development",
    summary:
      "Assisted with funding long wait periods for repayment and thus streamlined the buying cycle.",
    amount: "$10M+ of annual volumes",
    outcome: "This greatly benefited suppliers and in turn the ultimate prime buyer of the company's products and services.",
    tags: ["Construction", "Development", "Non-Bank"],
  },
  {
    id: "working-capital",
    title: "SME Manufacturer",
    sector: "Trade Finance",
    summary:
      "Provided working capital finance through discounting of invoices without disrupting any of the existing banking relationships.",
    amount: "$12M+ of annual volumes",
    outcome: "Enabled the company to increase their turnover by 20% because of increased working capital availability.",
    tags: ["Trade Finance", "Working Capital", "Import"],
  },
  {
    id: "supermarkets",
    title: "Supermarkets",
    sector: "Trade Finance",
    summary:
      "Provided invoice discounting facilities for suppliers in addition to existing banking relationships.",
    amount: "$17M+ of annual volumes",
    outcome: "Enabled the company to increase and strengthen their supplier base because of the increased facilities.",
    tags: ["Trade Finance", "Working Capital", "Import"],
  },
];
