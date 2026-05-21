import { Metadata } from "next";
import Section from "@/components/Section";
import CaseStudyCard from "@/components/CaseStudyCard";
import PageHeader from "@/components/PageHeader";
import { caseStudies } from "@/data/caseStudies";

export const metadata: Metadata = {
  title: "Transactions",
  description:
    "Explore recent transactions from Aus Trade Fin across property, corporate, trade, and development finance.",
};

export default function TransactionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Typical Examples"
        title="Transactions"
        subtitle="A selection of transactions demonstrating the breadth of funding solutions ATF delivers for Australian businesses."
        subtitleNoWrap
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
