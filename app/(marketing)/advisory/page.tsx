import { Metadata } from "next";
import Section from "@/components/Section";
import TeamCard from "@/components/TeamCard";
import PageHeader from "@/components/PageHeader";
import MotionInView from "@/components/MotionInView";
import { teamMembers } from "@/data/team";
import { getText } from "@/lib/siteContent.server";

export const metadata: Metadata = {
  title: "Advisory Group",
  description:
    "Meet the ATF Advisory Group - experienced professionals in commercial lending, credit analysis, and corporate finance.",
};

export default async function AdvisoryPage() {
  const t = await getText();

  return (
    <>
      <PageHeader
        eyebrow={t("advisory.eyebrow")}
        title={t("advisory.title")}
        subtitle={t("advisory.subtitle")}
      />

      <Section>
        <MotionInView>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {teamMembers.map((member) => (
              <TeamCard key={member.name} member={member} />
            ))}
          </div>
        </MotionInView>
      </Section>
    </>
  );
}
