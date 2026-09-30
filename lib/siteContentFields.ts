// Registry of every piece of website wording the client can edit from /admin.
// `default` is what the site shows until someone saves a change, so the site
// looks identical before any edits are made.

export interface ContentField {
  key: string;
  page: string;
  label: string;
  default: string;
  multiline?: boolean;
}

export const MAX_CONTENT_LENGTH = 2000;

const steps = [
  {
    title: "Understand",
    description:
      "We begin with a thorough assessment of your business, working capital, and funding requirements to define the right structure.",
  },
  {
    title: "Structure",
    description:
      "We develop a funding strategy and present it to our network of lenders, negotiating competitive terms on your behalf.",
  },
  {
    title: "Deliver",
    description:
      "We manage the process through to settlement, coordinating with all parties to ensure a smooth and timely outcome.",
  },
  {
    title: "Ongoing Service",
    description:
      "On an ongoing basis, we continue to monitor payments and settlements to ensure the funding facilities are available continuously.",
  },
  {
    title: "Renewal",
    description:
      "Regular reviews are conducted on a pre-agreed basis to ensure the funding facilities match the growing business of borrowers.",
  },
];

const stats = [
  { value: "$2B+", label: "Facilities Arranged by Group Members" },
  { value: "200+", label: "Transactions Completed by Group Members" },
  { value: "100+", label: "Years Experience Across the Group" },
  { value: "40+", label: "Lender Relationships" },
];

export const contentFields: ContentField[] = [
  // Homepage: hero
  { key: "home.hero.eyebrow", page: "Homepage", label: "Top banner: small heading", default: "Invoice Discounting" },
  {
    key: "home.hero.title",
    page: "Homepage",
    label: "Top banner: main headline",
    default: "Providing Australian Businesses with Working Capital - Financing Creditors",
    multiline: true,
  },
  {
    key: "home.hero.body",
    page: "Homepage",
    label: "Top banner: paragraph",
    default:
      "ATF is a specialist invoice financier that structures funding programs that purchases invoices for a 30 - 60 day period. We service property construction, retail, wholesale trade, mining, manufacturing and other business sectors. Group members have extensive experience in banking, financing, and structuring such programs across various industries.",
    multiline: true,
  },
  { key: "home.hero.cta1", page: "Homepage", label: "Top banner: first button", default: "Get in Touch" },
  { key: "home.hero.cta2", page: "Homepage", label: "Top banner: second button", default: "View Transactions" },
  ...stats.flatMap((s, i) => [
    { key: `home.stat${i + 1}.value`, page: "Homepage", label: `Figure ${i + 1}: number`, default: s.value },
    { key: `home.stat${i + 1}.label`, page: "Homepage", label: `Figure ${i + 1}: description`, default: s.label },
  ]),

  // Homepage: about
  { key: "home.about.eyebrow", page: "Homepage", label: "About section: small heading", default: "About AusTradeFin" },
  { key: "home.about.title", page: "Homepage", label: "About section: heading", default: "Invoice Discounting Specialists" },
  {
    key: "home.about.body",
    page: "Homepage",
    label: "About section: paragraph",
    default:
      "AusTradeFin works with institutional banks, non-bank lenders, and private credit providers to build optimal working capital solutions for Australian businesses.",
    multiline: true,
  },

  // Homepage: team preview
  { key: "home.team.eyebrow", page: "Homepage", label: "Advisory Group section: small heading", default: "Our Team" },
  { key: "home.team.title", page: "Homepage", label: "Advisory Group section: heading", default: "Advisory Group" },
  {
    key: "home.team.body",
    page: "Homepage",
    label: "Advisory Group section: paragraph",
    default:
      "Our advisory group brings together decades of experience in commercial lending, credit analysis, and corporate finance.",
    multiline: true,
  },
  { key: "home.team.link", page: "Homepage", label: "Advisory Group section: link text", default: "Meet the full team" },

  // Homepage: service providers
  { key: "home.providers.title", page: "Homepage", label: "Service Providers section: heading", default: "Service Providers" },

  // Homepage: how we work
  { key: "home.how.eyebrow", page: "Homepage", label: "How We Work: small heading", default: "Our Approach" },
  { key: "home.how.title", page: "Homepage", label: "How We Work: heading", default: "How We Work" },
  {
    key: "home.how.body",
    page: "Homepage",
    label: "How We Work: paragraph",
    default:
      "The ATF Advisory Group operates with a client-first philosophy, combining deep market knowledge with strong lender relationships to deliver cost-efficient outcomes to commercial businesses.",
    multiline: true,
  },
  ...steps.flatMap((s, i) => [
    { key: `home.how.step${i + 1}.title`, page: "Homepage", label: `Step ${i + 1}: title`, default: s.title },
    {
      key: `home.how.step${i + 1}.description`,
      page: "Homepage",
      label: `Step ${i + 1}: description`,
      default: s.description,
      multiline: true,
    },
  ]),

  // Homepage: transactions preview
  {
    key: "home.transactions.eyebrow",
    page: "Homepage",
    label: "Transactions section: small heading",
    default: "Typical Examples of some transactions completed by Advisory Group members",
  },
  { key: "home.transactions.title", page: "Homepage", label: "Transactions section: heading", default: "Transactions" },
  { key: "home.transactions.link", page: "Homepage", label: "Transactions section: link text", default: "View all" },

  // Homepage: bottom call to action
  { key: "home.cta.title", page: "Homepage", label: "Bottom banner: heading", default: "Ready to discuss your funding requirements?" },
  {
    key: "home.cta.body",
    page: "Homepage",
    label: "Bottom banner: paragraph",
    default: "Talk with our team to explore how ATF can help structure the right finance solution for your business.",
    multiline: true,
  },
  { key: "home.cta.button", page: "Homepage", label: "Bottom banner: button", default: "Contact Us" },

  // Advisory Group page
  { key: "advisory.eyebrow", page: "Advisory Group page", label: "Header: small heading", default: "Our Team" },
  { key: "advisory.title", page: "Advisory Group page", label: "Header: heading", default: "Advisory Group" },
  {
    key: "advisory.subtitle",
    page: "Advisory Group page",
    label: "Header: paragraph",
    default:
      "Our advisory group is composed of seasoned finance professionals who bring deep expertise and established networks across Australian commercial lending markets.",
    multiline: true,
  },

  // Transactions page
  { key: "transactions.eyebrow", page: "Transactions page", label: "Header: small heading", default: "Typical Examples" },
  { key: "transactions.title", page: "Transactions page", label: "Header: heading", default: "Transactions" },
  {
    key: "transactions.subtitle",
    page: "Transactions page",
    label: "Header: paragraph",
    default:
      "A selection of transactions demonstrating the breadth of funding solutions ATF delivers for Australian businesses.",
    multiline: true,
  },

  // Contact page and contact details (also shown in the footer)
  { key: "contact.eyebrow", page: "Contact details", label: "Contact page: small heading", default: "Contact" },
  { key: "contact.title", page: "Contact details", label: "Contact page: heading", default: "Get in Touch" },
  {
    key: "contact.subtitle",
    page: "Contact details",
    label: "Contact page: paragraph",
    default: "Reach out to our team to discuss how ATF can assist with your commercial funding requirements.",
    multiline: true,
  },
  { key: "contact.email", page: "Contact details", label: "Email address (contact page and footer)", default: "funds@austradefin.com.au" },
  { key: "contact.phone", page: "Contact details", label: "Phone number (contact page and footer)", default: "1300 002 026" },
  { key: "contact.office", page: "Contact details", label: "Office address (contact page and footer)", default: "26 Smith Street Walkerville, SA 5081" },
  { key: "contact.hours.title", page: "Contact details", label: "Business hours: heading", default: "Business Hours" },
  { key: "contact.hours.weekdays", page: "Contact details", label: "Business hours: weekdays", default: "Monday – Friday: 9:00 AM – 5:00 PM ACST" },
  { key: "contact.hours.weekend", page: "Contact details", label: "Business hours: weekend", default: "Saturday – Sunday: Closed" },

  // Footer
  {
    key: "footer.about",
    page: "Footer",
    label: "Footer: company description",
    default:
      "Aus Trade Fin is a specialist commercial loan brokerage connecting Australian businesses with tailored funding solutions from institutional and non-bank lenders.",
    multiline: true,
  },
  {
    key: "footer.disclaimer",
    page: "Footer",
    label: "Footer: small print",
    default: "Australian Credit Licence holder. All finance applications are subject to lender approval.",
    multiline: true,
  },
];

export const contentDefaults: Record<string, string> = Object.fromEntries(
  contentFields.map((f) => [f.key, f.default])
);

export const contentKeys = new Set(contentFields.map((f) => f.key));

export function resolveText(overrides: Record<string, string>, key: string): string {
  return overrides[key] ?? contentDefaults[key] ?? "";
}
