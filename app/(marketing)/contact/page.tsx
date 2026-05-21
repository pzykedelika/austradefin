import { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import MotionInView from "@/components/MotionInView";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Aus Trade Fin to discuss your commercial funding requirements.",
};

const contactDetails = [
  {
    label: "Email",
    value: "funds@austradefin.com.au",
    href: "mailto:funds@austradefin.com.au",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    label: "Phone",
    value: "1300 002 026",
    href: "tel:1300002026",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
      </svg>
    ),
  },
  {
    label: "Office",
    value: "26 Smith Street Walkerville, SA 5081",
    href: undefined,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get in Touch"
        subtitle="Reach out to our team to discuss how ATF can assist with your commercial funding requirements."
      />

      <section className="section-padding">
        <div className="container-main">
          <div className="max-w-2xl">
            <MotionInView>
              <div className="space-y-6">
                {contactDetails.map((detail) => (
                  <div
                    key={detail.label}
                    className="flex items-start gap-4 p-6 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-navy-900/5 flex items-center justify-center text-navy-900">
                      {detail.icon}
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        {detail.label}
                      </p>
                      {detail.href ? (
                        <a
                          href={detail.href}
                          className="mt-1 text-base font-medium text-navy-900 hover:text-navy-600 transition-colors"
                        >
                          {detail.value}
                        </a>
                      ) : (
                        <p className="mt-1 text-base font-medium text-navy-900">
                          {detail.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </MotionInView>

            <MotionInView className="mt-12">
              <div className="p-6 rounded-xl bg-slate-50 border border-slate-200">
                <h3 className="text-base font-semibold text-navy-900">
                  Business Hours
                </h3>
                <div className="mt-3 space-y-1 text-sm text-slate-600">
                  <p>Monday &ndash; Friday: 9:00 AM &ndash; 5:00 PM ACST</p>
                  <p>Saturday &ndash; Sunday: Closed</p>
                </div>
              </div>
            </MotionInView>
          </div>
        </div>
      </section>
    </>
  );
}
