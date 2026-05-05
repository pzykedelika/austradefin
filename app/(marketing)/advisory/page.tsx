import { Metadata } from "next";
import Section from "@/components/Section";
import TeamCard from "@/components/TeamCard";
import PageHeader from "@/components/PageHeader";
import ConcentricPattern from "@/components/ConcentricPattern";
import { teamMembers } from "@/data/team";
import MotionInView from "@/components/MotionInView";

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
        subtitle="Our advisory group is composed of seasoned finance professionals who bring deep expertise and established networks across Australian commercial lending markets."
      />

      <Section>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {teamMembers.map((member, i) => (
            <TeamCard key={member.name + i} member={member} index={i} />
          ))}
        </div>
      </Section>

      {/* Approach section */}
      <section className="relative overflow-hidden section-padding bg-slate-50">
        <ConcentricPattern variant="light" position="right" />
        <div className="container-main relative">
          <MotionInView className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">
              Our Approach
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif tracking-tight">
              How We Work
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              The ATF Advisory Group operates with a client-first philosophy,
              combining deep market knowledge with strong lender relationships to
              deliver optimal outcomes. We take the time to understand each
              client&apos;s unique requirements before recommending a funding
              strategy.
            </p>
          </MotionInView>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Understand",
                description:
                  "We begin with a thorough assessment of your business, objectives, and funding requirements to define the right structure.",
              },
              {
                step: "02",
                title: "Structure",
                description:
                  "We design a tailored funding strategy and present it to our network of lenders, negotiating competitive terms on your behalf.",
              },
              {
                step: "03",
                title: "Deliver",
                description:
                  "We manage the process through to settlement, coordinating with all parties to ensure a smooth and timely outcome.",
              },
            ].map((item, i) => (
              <MotionInView key={item.step} delay={i * 0.15}>
                <div>
                  <span className="text-4xl font-serif text-navy-900/10">
                    {item.step}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold text-navy-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </MotionInView>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
