import Link from "next/link";
import ConcentricPattern from "./ConcentricPattern";

const footerLinks = [
  {
    title: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Advisory Group", href: "/advisory" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-900 text-white">
      <ConcentricPattern variant="dark" position="left" />
      <div className="container-main relative py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-serif tracking-tight">ATF</span>
            </Link>
            <p className="mt-4 text-sm text-slate-400 max-w-sm leading-relaxed">
              Aus Trade Fin is a specialist commercial loan brokerage connecting
              Australian businesses with tailored funding solutions from
              institutional and non-bank lenders.
            </p>
            <div className="mt-6 space-y-2 text-sm text-slate-400">
              <p>26 Smith Street Walkerville, SA 5081</p>
              <p>
                <a
                  href="tel:1300002026"
                  className="hover:text-white transition-colors"
                >
                  1300 002 026
                </a>
              </p>
              <p>
                <a
                  href="mailto:funds@austradefin.com.au"
                  className="hover:text-white transition-colors"
                >
                  funds@austradefin.com.au
                </a>
              </p>
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
                {group.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Aus Trade Fin. All rights
            reserved.
          </p>
          <p className="text-xs text-slate-600">
            Australian Credit Licence holder. All finance applications are
            subject to lender approval.
          </p>
        </div>
      </div>
    </footer>
  );
}
