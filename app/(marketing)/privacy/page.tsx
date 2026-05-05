import { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Aus Trade Fin privacy policy and data handling practices.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader title="Privacy Policy" subtitle="Last updated: March 2026" />

      <section className="section-padding">
        <div className="container-main max-w-3xl">
          <div className="prose prose-slate prose-sm sm:prose-base max-w-none">
            <h2 className="text-xl font-serif text-navy-900 mt-0">
              1. Introduction
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Aus Trade Fin Pty Ltd (&quot;ATF&quot;, &quot;we&quot;,
              &quot;us&quot;, or &quot;our&quot;) is committed to protecting the
              privacy of your personal information. This Privacy Policy outlines
              how we collect, use, disclose, and safeguard your information in
              accordance with the Australian Privacy Principles (APPs) under the
              Privacy Act 1988 (Cth).
            </p>

            <h2 className="text-xl font-serif text-navy-900 mt-10">
              2. Information We Collect
            </h2>
            <p className="text-slate-600 leading-relaxed">
              We may collect personal information including your name, contact
              details, business information, financial information relevant to
              loan applications, and any other information you provide to us in
              the course of our engagement.
            </p>

            <h2 className="text-xl font-serif text-navy-900 mt-10">
              3. How We Use Your Information
            </h2>
            <p className="text-slate-600 leading-relaxed">
              We use your information to provide our commercial loan brokerage
              services, communicate with you regarding your enquiries, assess
              your funding requirements, liaise with potential lenders on your
              behalf, and comply with our legal and regulatory obligations.
            </p>

            <h2 className="text-xl font-serif text-navy-900 mt-10">
              4. Disclosure of Information
            </h2>
            <p className="text-slate-600 leading-relaxed">
              We may disclose your personal information to lenders and financial
              institutions for the purpose of assessing and arranging finance, to
              our professional advisors, and as required by law. We will not sell
              or rent your personal information to third parties.
            </p>

            <h2 className="text-xl font-serif text-navy-900 mt-10">
              5. Data Security
            </h2>
            <p className="text-slate-600 leading-relaxed">
              We take reasonable steps to protect your personal information from
              misuse, interference, loss, and unauthorised access, modification,
              or disclosure. We store information securely and restrict access to
              authorised personnel only.
            </p>

            <h2 className="text-xl font-serif text-navy-900 mt-10">
              6. Contact
            </h2>
            <p className="text-slate-600 leading-relaxed">
              If you have any questions about this Privacy Policy or wish to
              access or correct your personal information, please contact us at{" "}
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
