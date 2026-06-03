"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import MotionInView from "@/components/MotionInView";
import CaseStudyCard from "@/components/CaseStudyCard";
import ConcentricPattern from "@/components/ConcentricPattern";
import { caseStudies } from "@/data/caseStudies";
import { teamMembers } from "@/data/team";

const stats = [
  { value: "$2B+", label: "Facilities Arranged by Group Members" },
  { value: "200+", label: "Transactions Completed by Group Members" },
  { value: "100+", label: "Years Experience Across the Group" },
  { value: "40+", label: "Lender Relationships" },
];

const pageLoadEase = [0.22, 1, 0.36, 1] as const;

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-900 text-white min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-5rem)] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-700 opacity-90" />
        <ConcentricPattern variant="dark" position="right" />

        <div className="container-main relative w-full py-20 sm:py-28 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: pageLoadEase }}
            className="max-w-7xl"
          >
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-blue-400 mb-4">
              Invoice Discounting
            </p>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight max-w-4xl"
              style={{ lineHeight: 1.2 }}
            >
              Providing Australian Businesses with Working Capital - Financing Creditors
            </h1>
            <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-5xl leading-relaxed">
              ATF is a specialist invoice financier that
              structures funding programs that purchases invoices for a 30 - 60 day period. We service property construction, retail, wholesale trade, mining, manufacturing and other business sectors. Group members have extensive experience in banking, financing, and structuring such programs across various industries.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-wrap gap-4">
              <Link href="/contact" className="btn-light">
                Get in Touch
              </Link>
              <Link
                href="/transactions"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white border border-white/20 rounded-lg hover:bg-white/10 transition-all duration-200"
              >
                View Transactions
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.14, ease: pageLoadEase }}
            className="mt-12 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="border-l border-white/20 pl-5">
                <p className="text-2xl sm:text-3xl font-serif">{stat.value}</p>
                <p className="text-sm text-slate-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Overview / About */}
      <section id="overview" className="section-padding bg-slate-50 text-slate-900">
        <div className="container-main">
          <MotionInView className="max-w-5xl">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-blue-600">
              About AusTradeFin
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-balance">
              Invoice Discounting Specialists
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-600">
              AusTradeFin works with institutional banks, non-bank lenders, and private credit providers to build optimal working capital solutions for Australian businesses.
            </p>
          </MotionInView>
        </div>
      </section>

      {/* Advisory Group Preview */}
      <section className="section-padding bg-white text-slate-900">
        <div className="container-main">
          <MotionInView className="mb-12 sm:mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-blue-600">
              Our Team
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-balance">
              Advisory Group
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-600 whitespace-nowrap">
              Our advisory group brings together decades of experience in commercial lending, credit analysis, and corporate finance.
            </p>
          </MotionInView>
        </div>

        <div className="container-main">
          <MotionInView>
            <div className="flex flex-wrap justify-center gap-6">
              {teamMembers.slice(0, 5).map((member) => (
                <div
                  key={member.name}
                  className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-white border border-slate-200 rounded-xl p-7 flex flex-col hover:shadow-lg hover:border-slate-300 transition-all duration-300"
                >
                  <div className="w-20 h-20 rounded-full bg-navy-900 flex items-center justify-center mb-5">
                    <span className="text-2xl font-bold text-white">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-navy-900 leading-tight">
                    {member.name}
                  </h3>
                  <p className="text-sm text-blue-600 font-medium mt-1">
                    {member.role}
                  </p>
                  <p className="mt-4 text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </MotionInView>
        </div>

        <div className="container-main">
          <MotionInView delay={0.4} className="mt-10">
            <Link
              href="/advisory"
              className="text-sm font-medium text-navy-900 hover:text-navy-600 transition-colors inline-flex items-center gap-1.5"
            >
              Meet the full team
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </MotionInView>
        </div>
      </section>

      {/* How We Work */}
      <section className="relative overflow-hidden section-padding bg-slate-50">
        <ConcentricPattern variant="light" position="right" />
        <div className="container-main relative">
          <MotionInView className="max-w-5xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">
              Our Approach
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif tracking-tight">
              How We Work
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              The ATF Advisory Group operates with a client-first philosophy,
              combining deep market knowledge with strong lender relationships to
              deliver cost-efficient outcomes to commercial businesses.
            </p>
          </MotionInView>

          <MotionInView className="mt-12">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Understand",
                  description:
                    "We begin with a thorough assessment of your business, working capital, and funding requirements to define the right structure.",
                },
                {
                  step: "02",
                  title: "Structure",
                  description:
                    "We develop a funding strategy and present it to our network of lenders, negotiating competitive terms on your behalf.",
                },
                {
                  step: "03",
                  title: "Deliver",
                  description:
                    "We manage the process through to settlement, coordinating with all parties to ensure a smooth and timely outcome.",
                },
                {
                  step: "04",
                  title: "Ongoing Service",
                  description:
                    "On an ongoing basis, we continue to monitor payments and settlements to ensure the funding facilities are available continuously.",
                },
                {
                  step: "05",
                  title: "Renewal",
                  description:
                    "Regular reviews are conducted on a pre-agreed basis to ensure the funding facilities match the growing business of borrowers.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="p-6 rounded-xl bg-white border border-slate-200"
                >
                  <span className="text-4xl font-serif text-navy-900/10">
                    {item.step}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold text-navy-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </MotionInView>
        </div>
      </section>

      {/* Featured Case Studies */}
      <section className="relative overflow-hidden section-padding bg-white">
        <ConcentricPattern variant="light" position="left" />
        <div className="container-main relative">
          <MotionInView className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 sm:mb-16">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3 whitespace-nowrap">
                Typical Examples of some transactions completed by Advisory Group members
              </p>
              <h2 className="text-3xl sm:text-4xl font-serif tracking-tight">
                Transactions
              </h2>
            </div>
            <Link
              href="/transactions"
              className="text-sm font-medium text-navy-900 hover:text-navy-600 transition-colors flex items-center gap-1.5"
            >
              View all
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </MotionInView>

          <MotionInView>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {caseStudies.slice(0, 5).map((study) => (
                <CaseStudyCard key={study.id} study={study} />
              ))}
            </div>
          </MotionInView>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden section-padding bg-navy-900 text-white">
        <ConcentricPattern variant="dark" position="center" />
        <div className="container-main relative text-center">
          <MotionInView>
            <h2 className="text-3xl sm:text-4xl font-serif tracking-tight">
              Ready to discuss your funding requirements?
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-xl mx-auto">
              Talk with our team to explore how ATF can help structure
              the right finance solution for your business.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact" className="btn-light">
                Contact Us
              </Link>
            </div>
          </MotionInView>
        </div>
      </section>
    </>
  );
}
