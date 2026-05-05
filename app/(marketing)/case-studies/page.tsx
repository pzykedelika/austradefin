import { Metadata } from "next";
import Section from "@/components/Section";
import CaseStudyCard from "@/components/CaseStudyCard";
import PageHeader from "@/components/PageHeader";
import { caseStudies } from "@/data/caseStudies";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Explore recent transactions and case studies from Aus Trade Fin across property, corporate, trade, and development finance.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Case Studies"
        title="Recent Transactions"
        subtitle="A selection of transactions demonstrating the breadth of funding solutions ATF delivers for Australian businesses."
      />

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {caseStudies.map((study, i) => (
            <CaseStudyCard key={study.id} study={study} index={i} />
          ))}
        </div>
      </Section>
    </>
  );
}
