import { Metadata } from "next";
import Section from "@/components/Section";
import TeamCard from "@/components/TeamCard";
import PageHeader from "@/components/PageHeader";
import { teamMembers } from "@/data/team";

export const metadata: Metadata = {
  title: "Advisory Group",
  description:
    "Meet the ATF Advisory Group - experienced professionals in commercial lending, credit analysis, and corporate finance.",
};

export default function AdvisoryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Team"
        title="Advisory Group"
        subtitle={"Our advisory group is composed of seasoned finance professionals who bring deep expertise and established networks across Australian commercial lending markets."}
      />

      <Section>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {teamMembers.map((member, i) => (
            <TeamCard key={member.name + i} member={member} index={i} />
          ))}
        </div>
      </Section>

    </>
  );
}
