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
      <h3 className="text-xl sm:text-2xl font-semibold text-navy-900 mb-2 leading-tight">
        {study.title}
      </h3>

      <div className="mb-4">
        <span className="text-lg sm:text-xl font-bold text-slate-600">
          {study.amount}
        </span>
      </div>

      <p className="text-sm text-slate-600 leading-relaxed mb-4">
        {study.summary}
      </p>

      <div className="pt-4 border-t border-slate-100">
        <p className="text-sm text-slate-500">
          <span className="font-medium text-blue-600">Outcome: </span>
          {study.outcome}
        </p>
      </div>
    </motion.div>
  );
}
