"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import MotionInView from "@/components/MotionInView";
import CaseStudyCard from "@/components/CaseStudyCard";
import ConcentricPattern from "@/components/ConcentricPattern";
import { useText } from "@/components/ContentProvider";
import { caseStudies } from "@/data/caseStudies";
import { getTeamMemberInitials, teamMembers } from "@/data/team";

interface ServiceProvider {
  name: string;
  // Drop a logo file into /public/logos and set its path here, e.g. "/logos/clayton-utz.svg"
  logo?: string;
  // Natural pixel dimensions of the logo, so its aspect ratio is preserved.
  logoWidth?: number;
  logoHeight?: number;
  // Optional Tailwind max-height override for square/stacked logos that otherwise look small.
  logoClassName?: string;
}

const serviceProviderGroups: { category: string; providers: ServiceProvider[] }[] = [
  {
    category: "Legal",
    providers: [
      { name: "Clayton Utz", logo: "/logos/clayton-utz.png", logoWidth: 675, logoHeight: 189 },
      { name: "HWLE Lawyers", logo: "/logos/hwle.webp", logoWidth: 1920, logoHeight: 802 },
      { name: "Carmel Riordan Lawyers", logo: "/logos/carmel-riordan.png", logoWidth: 510, logoHeight: 510, logoClassName: "w-24 h-28 object-fill" },
    ],
  },
  {
    category: "Accountants",
    providers: [{ name: "BDO Australia Accountants", logo: "/logos/bdo.webp", logoWidth: 1739, logoHeight: 761 }],
  },
];

const pageLoadEase = [0.22, 1, 0.36, 1] as const;

export default function HomePage() {
  const t = useText();

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
              {t("home.hero.eyebrow")}
            </p>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight max-w-4xl"
              style={{ lineHeight: 1.2 }}
            >
              {t("home.hero.title")}
            </h1>
            <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-5xl leading-relaxed">
              {t("home.hero.body")}
            </p>
            <div className="mt-6 sm:mt-8 flex flex-wrap gap-4">
              <Link href="/contact" className="btn-light">
                {t("home.hero.cta1")}
              </Link>
              <Link
                href="/transactions"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white border border-white/20 rounded-lg hover:bg-white/10 transition-all duration-200"
              >
                {t("home.hero.cta2")}
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
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="border-l border-white/20 pl-5">
                <p className="text-2xl sm:text-3xl font-serif">{t(`home.stat${n}.value`)}</p>
                <p className="text-sm text-slate-400 mt-1">{t(`home.stat${n}.label`)}</p>
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
              {t("home.about.eyebrow")}
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-balance">
              {t("home.about.title")}
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-600">
              {t("home.about.body")}
            </p>
          </MotionInView>
        </div>
      </section>

      {/* Advisory Group Preview */}
      <section className="section-padding bg-white text-slate-900">
        <div className="container-main">
          <MotionInView className="mb-12 sm:mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-blue-600">
              {t("home.team.eyebrow")}
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-balance">
              {t("home.team.title")}
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-600 whitespace-nowrap">
              {t("home.team.body")}
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
                      {getTeamMemberInitials(member.name)}
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
              {t("home.team.link")}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </MotionInView>
        </div>
      </section>

      {/* Service Providers */}
      <section className="section-padding bg-white text-slate-900">
        <div className="container-main">
          <MotionInView className="max-w-2xl mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-balance">
              {t("home.providers.title")}
            </h2>
          </MotionInView>

          <div className="space-y-12">
            {serviceProviderGroups.map((group) => (
              <MotionInView key={group.category}>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-6 text-center">
                  {group.category}
                </h3>
                <div className="flex flex-wrap justify-center gap-6">
                  {group.providers.map((provider) => (
                    <div
                      key={provider.name}
                      className="w-full sm:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)]"
                    >
                      <div className="flex items-center justify-center rounded-lg border border-slate-200 bg-white px-6 py-8 h-32 transition-all hover:shadow-lg hover:border-slate-300">
                        {provider.logo ? (
                          <Image
                            src={provider.logo}
                            alt={provider.name}
                            width={provider.logoWidth ?? 180}
                            height={provider.logoHeight ?? 60}
                            className={provider.logoClassName ?? "max-h-16 w-auto object-contain"}
                          />
                        ) : (
                          <span className="text-center text-sm font-medium text-slate-600">
                            {provider.name}
                          </span>
                        )}
                      </div>
                      <p className="mt-3 text-center text-sm font-medium text-slate-700">
                        {provider.name}
                      </p>
                    </div>
                  ))}
                </div>
              </MotionInView>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="relative overflow-hidden section-padding bg-slate-50">
        <ConcentricPattern variant="light" position="right" />
        <div className="container-main relative">
          <MotionInView className="max-w-5xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">
              {t("home.how.eyebrow")}
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif tracking-tight">
              {t("home.how.title")}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              {t("home.how.body")}
            </p>
          </MotionInView>

          <MotionInView className="mt-12">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5].map((n) => (
                <div
                  key={n}
                  className="p-6 rounded-xl bg-white border border-slate-200"
                >
                  <span className="text-4xl font-serif text-navy-900/10">
                    {String(n).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold text-navy-900">
                    {t(`home.how.step${n}.title`)}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {t(`home.how.step${n}.description`)}
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
                {t("home.transactions.eyebrow")}
              </p>
              <h2 className="text-3xl sm:text-4xl font-serif tracking-tight">
                {t("home.transactions.title")}
              </h2>
            </div>
            <Link
              href="/transactions"
              className="text-sm font-medium text-navy-900 hover:text-navy-600 transition-colors flex items-center gap-1.5"
            >
              {t("home.transactions.link")}
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
              {t("home.cta.title")}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-xl mx-auto">
              {t("home.cta.body")}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact" className="btn-light">
                {t("home.cta.button")}
              </Link>
            </div>
          </MotionInView>
        </div>
      </section>
    </>
  );
}
