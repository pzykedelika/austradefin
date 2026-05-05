import { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Aus Trade Fin terms of service and conditions of use.",
};

export default function TermsPage() {
  return (
    <>
      <PageHeader
        title="Terms of Service"
        subtitle="Last updated: March 2026"
      />

      <section className="section-padding">
        <div className="container-main max-w-3xl">
          <div className="prose prose-slate prose-sm sm:prose-base max-w-none">
            <h2 className="text-xl font-serif text-navy-900 mt-0">
              1. Acceptance of Terms
            </h2>
            <p className="text-slate-600 leading-relaxed">
              By accessing and using the Aus Trade Fin website, you accept and
              agree to be bound by these Terms of Service. If you do not agree to
              these terms, please do not use our website.
            </p>

            <h2 className="text-xl font-serif text-navy-900 mt-10">
              2. Services
            </h2>
            <p className="text-slate-600 leading-relaxed">
              ATF provides commercial loan brokerage services, connecting
              businesses with lending institutions. Information on this website
              is provided for general informational purposes and does not
              constitute financial advice. All finance applications are subject
              to lender assessment and approval.
            </p>

            <h2 className="text-xl font-serif text-navy-900 mt-10">
              3. No Financial Advice
            </h2>
            <p className="text-slate-600 leading-relaxed">
              The content on this website is general in nature and does not take
              into account your specific financial situation, objectives, or
              needs. You should seek independent financial advice before making
              any financial decisions. ATF does not guarantee the availability,
              terms, or approval of any financing product.
            </p>

            <h2 className="text-xl font-serif text-navy-900 mt-10">
              4. Intellectual Property
            </h2>
            <p className="text-slate-600 leading-relaxed">
              All content on this website, including text, graphics, logos, and
              design elements, is the property of Aus Trade Fin Pty Ltd and is
              protected by applicable intellectual property laws. You may not
              reproduce, distribute, or transmit any content without our prior
              written consent.
            </p>

            <h2 className="text-xl font-serif text-navy-900 mt-10">
              5. Limitation of Liability
            </h2>
            <p className="text-slate-600 leading-relaxed">
              To the fullest extent permitted by law, ATF shall not be liable for
              any indirect, incidental, special, consequential, or punitive
              damages arising out of or related to your use of this website or
              our services.
            </p>

            <h2 className="text-xl font-serif text-navy-900 mt-10">
              6. Governing Law
            </h2>
            <p className="text-slate-600 leading-relaxed">
              These terms are governed by the laws of South Australia. Any
              disputes arising from or related to these terms shall be subject to
              the exclusive jurisdiction of the courts of South Australia.
            </p>

            <h2 className="text-xl font-serif text-navy-900 mt-10">
              7. Contact
            </h2>
            <p className="text-slate-600 leading-relaxed">
              For questions about these Terms of Service, contact us at{" "}
              <a
                href="mailto:funds@austradefin.com.au"
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                funds@austradefin.com.au
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
