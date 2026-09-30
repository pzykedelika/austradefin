import { Metadata } from "next";
import Section from "@/components/Section";
import CaseStudyCard from "@/components/CaseStudyCard";
import PageHeader from "@/components/PageHeader";
import MotionInView from "@/components/MotionInView";
import { caseStudies } from "@/data/caseStudies";
import { getText } from "@/lib/siteContent.server";

export const metadata: Metadata = {
  title: "Transactions",
  description:
    "Explore recent transactions from Aus Trade Fin across property, corporate, trade, and development finance.",
};

export default async function TransactionsPage() {
  const t = await getText();

  return (
    <>
      <PageHeader
        eyebrow={t("transactions.eyebrow")}
        title={t("transactions.title")}
        subtitle={t("transactions.subtitle")}
        subtitleNoWrap
      />

      <Section>
        <MotionInView>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {caseStudies.map((study) => (
              <CaseStudyCard key={study.id} study={study} />
            ))}
          </div>
        </MotionInView>
      </Section>
    </>
  );
}
