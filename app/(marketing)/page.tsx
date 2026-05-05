"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import MotionInView from "@/components/MotionInView";
import CaseStudyCard from "@/components/CaseStudyCard";
import ConcentricPattern from "@/components/ConcentricPattern";
import { caseStudies } from "@/data/caseStudies";
import { teamMembers } from "@/data/team";

const stats = [
  { value: "$1B+", label: "Facilities Arranged" },
  { value: "200+", label: "Transactions Completed" },
  { value: "25+", label: "Years Experience" },
  { value: "40+", label: "Lender Relationships" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-900 text-white min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-700 opacity-90" />
        <ConcentricPattern variant="dark" position="right" />

        <div className="container-main relative w-full pt-32 pb-20 sm:pt-40 sm:pb-28 lg:pt-40 lg:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-7xl"
          >
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-blue-400 mb-4">
              Invoice Discounting
            </p>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight max-w-4xl"
              style={{ lineHeight: 1.2 }}
            >
              Connecting Australian Businesses with Working Capital - Financing Creditors
            </h1>
            <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-5xl leading-relaxed">
              ATF is a specialist commercial loan brokerage that sources and
              structures tailored funding programs by discounting purchases invoices for a 30 - 60 day period. We service sectors that cover property, construction,
              wholesale trade, mining,  and general manufacturing.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-wrap gap-4">
              <Link href="/enquire" className="btn-light">
                Get in Touch
              </Link>
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white border border-white/20 rounded-lg hover:bg-white/10 transition-all duration-200"
              >
                View Case Studies
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
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
              About Aus Trade Fin
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-balance">
              Invoice Discounting Specialists
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-600">
              Aus Trade Fin operates as a dedicated commercial loan brokerage, working with institutional banks, non-bank lenders, and private credit providers to source optimal funding structures for Australian businesses.
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
          <div className="flex flex-wrap justify-center gap-6">
            {teamMembers.slice(0, 5).map((member, i) => (
              <motion.div
                key={member.name + i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
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
              </motion.div>
            ))}
          </div>
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
              deliver optimal outcomes.
            </p>
          </MotionInView>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Understand",
                description:
                  "We begin with a thorough assessment of your business, objectives, and funding requirements to define the right structure.",
              },
              {
                step: "02",
                title: "Structure",
                description:
                  "We design a tailored funding strategy and present it to our network of lenders, negotiating competitive terms on your behalf.",
              },
              {
                step: "03",
                title: "Deliver",
                description:
                  "We manage the process through to settlement, coordinating with all parties to ensure a smooth and timely outcome.",
              },
            ].map((item, i) => (
              <MotionInView key={item.step} delay={i * 0.15}>
                <div className="p-6 rounded-xl bg-white border border-slate-200">
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
              </MotionInView>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Case Studies */}
      <section className="relative overflow-hidden section-padding bg-white">
        <ConcentricPattern variant="light" position="left" />
        <div className="container-main relative">
          <MotionInView className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 sm:mb-16">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">
                Case Studies
              </p>
              <h2 className="text-3xl sm:text-4xl font-serif tracking-tight">
                Recent Transactions
              </h2>
            </div>
            <Link
              href="/case-studies"
              className="text-sm font-medium text-navy-900 hover:text-navy-600 transition-colors flex items-center gap-1.5"
            >
              View all
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </MotionInView>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {caseStudies.slice(0, 2).map((study, i) => (
              <CaseStudyCard key={study.id} study={study} index={i} />
            ))}
          </div>
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
              <Link href="/enquire" className="btn-light">
                Contact Us
              </Link>
              <a
                href="tel:1300002026"
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
                1300 002 026
              </a>
            </div>
          </MotionInView>
        </div>
      </section>
    </>
  );
}
