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

import styles from "./landing-page.module.css";

export function LandingPage({locale, services, cases, faq}: LandingPageProps) {
  const copy = getLandingCopy(locale);

  return (
    <div className={styles.page} data-theme="aletheia">
      <Header locale={locale} />
      <main>
        <RoleExperience copy={copy} services={services} />
        <ProcessSection copy={copy} />
        <ExpertiseSection copy={copy} />
        <ProofSection copy={copy} cases={cases} />
        <AboutSection copy={copy} />
        <FaqSection copy={copy} faq={faq} />
        <section id="lead" className={`section ${styles.leadSection}`}>
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
