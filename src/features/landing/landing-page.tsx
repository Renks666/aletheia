import {RoleExperience} from "@/features/landing/interactive/role-experience";
import {getLandingCopy} from "@/features/landing/model/content";
import type {LandingPageProps} from "@/features/landing/model/types";
import {AboutSection} from "@/features/landing/sections/about-section";
import {ExpertiseSection} from "@/features/landing/sections/expertise-section";
import {FaqSection} from "@/features/landing/sections/faq-section";
import {ProcessSection} from "@/features/landing/sections/process-section";
import {ProofSection} from "@/features/landing/sections/proof-section";
import {Footer} from "@/widgets/footer";
import {Header} from "@/widgets/header";
import {LeadFormIsland} from "@/widgets/lead-form-island";
import {MobileStickyCta} from "@/widgets/mobile-sticky-cta";

export function LandingPage({locale, services, cases, faq}: LandingPageProps) {
  const copy = getLandingCopy(locale);

  return (
    <div className="relative min-h-screen isolate overflow-hidden" data-theme="aletheia">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_14%_14%,rgba(201,164,119,0.09),transparent_35%),radial-gradient(circle_at_82%_8%,rgba(75,42,123,0.2),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(125,143,163,0.09)_1px,transparent_1px),linear-gradient(to_bottom,rgba(125,143,163,0.08)_1px,transparent_1px)] bg-[size:120px_120px] opacity-25" />

      <Header locale={locale} />
      <main>
        <RoleExperience copy={copy} services={services} />
        <ProcessSection copy={copy} />
        <ExpertiseSection copy={copy} />
        <ProofSection copy={copy} cases={cases} />
        <AboutSection copy={copy} />
        <FaqSection copy={copy} faq={faq} />
        <section id="lead" className="section py-[clamp(3rem,6vw,4.8rem)]">
          <div className="container">
            <div id="lead-form">
              <LeadFormIsland
                locale={locale}
                serviceOptions={services}
                audienceLabels={copy.audienceLabels}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
      <MobileStickyCta />
    </div>
  );
}
