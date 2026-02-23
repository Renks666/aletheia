import {ScrollToLeadButton} from "@/widgets/scroll-to-lead-button";

import type {LandingCopy} from "../model/content";

type FinalCtaSectionProps = {
  copy: LandingCopy;
};

export function FinalCtaSection({copy}: FinalCtaSectionProps) {
  return (
    <section className="section py-[clamp(2rem,4.8vw,3rem)]">
      <div className="container">
        <article className="rounded-xl border border-line-soft bg-[var(--gradient-panel)] p-[clamp(1.3rem,3vw,2rem)] shadow-soft">
          <h2 className="text-[clamp(1.6rem,2.8vw,2.2rem)] leading-tight">{copy.finalCtaTitle}</h2>
          <p className="mt-2 max-w-[64ch] text-sm text-muted">{copy.finalCtaSubtitle}</p>
          <div className="mt-4">
            <ScrollToLeadButton label={copy.finalCtaButton} className="px-5" variant="cta" />
          </div>
        </article>
      </div>
    </section>
  );
}
