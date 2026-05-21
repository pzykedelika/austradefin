"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MotionInViewProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function MotionInView({
  children,
  className = "",
  delay = 0,
}: MotionInViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
