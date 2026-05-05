import { ReactNode } from "react";
import ConcentricPattern from "./ConcentricPattern";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}

export default function PageHeader({
  eyebrow,
  title,
  subtitle,
  children,
}: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-navy-900 text-white pt-32 pb-16 sm:pt-40 sm:pb-20">
      <ConcentricPattern variant="dark" position="right" />
      <div className="container-main relative">
        {eyebrow && (
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-blue-400 mb-3">
            {eyebrow}
          </p>
        )}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-xl">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
