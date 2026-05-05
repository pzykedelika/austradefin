"use client";

import { motion } from "framer-motion";
import { TeamMember } from "@/data/team";

interface TeamCardProps {
  member: TeamMember;
  index: number;
}

export default function TeamCard({ member, index }: TeamCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 hover:shadow-lg hover:border-slate-300 transition-all duration-300"
    >
      {/* Avatar placeholder */}
      <div className="w-16 h-16 rounded-full bg-navy-900 flex items-center justify-center mb-5">
        <span className="text-xl font-bold text-white">
          {member.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </span>
      </div>

      <h3 className="text-lg font-semibold text-navy-900">{member.name}</h3>
      <p className="text-sm text-blue-600 font-medium mt-1">{member.role}</p>

      <p className="mt-4 text-sm text-slate-600 leading-relaxed whitespace-pre-line">
        {member.bio}
      </p>

    </motion.div>
  );
}
