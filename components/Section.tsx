import { ReactNode } from "react";
import MotionInView from "./MotionInView";

interface SectionProps {
  children: ReactNode;
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  dark?: boolean;
  className?: string;
}

export default function Section({
  children,
  id,
  eyebrow,
  title,
  subtitle,
  dark = false,
  className = "",
}: SectionProps) {
  return (
    <section
      id={id}
      className={`section-padding ${
        dark ? "bg-navy-900 text-white" : "bg-white text-slate-900"
      } ${className}`}
    >
      <div className="container-main">
        {(eyebrow || title || subtitle) && (
          <MotionInView className="max-w-2xl mb-12 sm:mb-16">
            {eyebrow && (
              <p
                className={`text-xs font-semibold uppercase tracking-widest mb-3 ${
                  dark ? "text-blue-400" : "text-blue-600"
                }`}
              >
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-balance">
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                className={`mt-4 text-base sm:text-lg leading-relaxed ${
                  dark ? "text-slate-400" : "text-slate-600"
                }`}
              >
                {subtitle}
              </p>
            )}
          </MotionInView>
        )}
        {children}
      </div>
    </section>
  );
}
