"use client";

import { motion } from "framer-motion";
import { CaseStudy } from "@/data/caseStudies";

interface CaseStudyCardProps {
  study: CaseStudy;
  index: number;
}

export default function CaseStudyCard({ study, index }: CaseStudyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="group bg-white border border-slate-200 rounded-xl p-6 sm:p-8 hover:shadow-lg hover:border-slate-300 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
          {study.sector}
        </span>
        <span className="text-2xl sm:text-3xl font-bold text-navy-900">
          {study.amount}
        </span>
      </div>

      <h3 className="text-lg sm:text-xl font-semibold text-navy-900 mb-3">
        {study.title}
      </h3>

      <p className="text-sm text-slate-600 leading-relaxed mb-4">
        {study.summary}
      </p>

      <div className="pt-4 border-t border-slate-100">
        <p className="text-sm text-slate-500">
          <span className="font-medium text-slate-700">Outcome: </span>
          {study.outcome}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {study.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-medium"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
