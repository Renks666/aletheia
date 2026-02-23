import {ScrollToLeadButton} from "@/widgets/scroll-to-lead-button";

import type {LandingCopy} from "../model/content";

type ExpertiseSectionProps = {
  copy: LandingCopy;
};

function splitToSentences(text: string) {
  return text
    .split(/(?<=[.!?:])\s+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function ExpertiseSection({copy}: ExpertiseSectionProps) {
  return (
    <section
      id="expertise"
      aria-labelledby="expertise-heading"
      className="section scroll-mt-[72px] border-y border-line-soft bg-[radial-gradient(circle_at_12%_16%,rgba(201,164,119,0.12),transparent_44%),color-mix(in_srgb,var(--color-surface-900)_82%,transparent)] lg:scroll-mt-[86px]"
    >
      <div className="container">
        <header className="mb-[clamp(1.3rem,2.7vw,2.15rem)] grid gap-3">
          <h2 id="expertise-heading" className="text-[clamp(1.9rem,3vw,2.53rem)]">{copy.expertiseTitle}</h2>
          <div className="grid gap-1.5">
            {splitToSentences(copy.expertiseIntro).map((sentence) => (
              <p key={sentence} className="max-w-[64ch] text-sm text-muted">
                {sentence}
              </p>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 gap-[clamp(0.9rem,1.8vw,1.15rem)] md:grid-cols-2 xl:grid-cols-3">
          {copy.expertiseCards.map((card) => (
            <article
              key={card.title}
              className="grid content-start gap-3 rounded-md border border-line-soft bg-[color:color-mix(in_srgb,var(--color-bg-950)_72%,transparent)] p-[clamp(1rem,1.8vw,1.2rem)] shadow-sm transition-[transform,box-shadow,border-color,background-color] duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:brightness-[1.02] hover:shadow-[0_0_0_1px_rgba(201,164,119,0.18),0_14px_30px_rgba(0,0,0,0.34)]"
            >
              <h3 className="text-[1.2rem] leading-tight">{card.title}</h3>
              <div className="grid gap-1.5">
                {splitToSentences(card.description).map((sentence) => (
                  <p key={`${card.title}-${sentence}`} className="text-sm text-muted">
                    {sentence}
                  </p>
                ))}
              </div>
              <ul className="grid gap-2">
                {card.bullets.map((item) => (
                  <li key={item} className="relative pl-4 text-sm text-muted">
                    <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-bronze-300" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-[clamp(1rem,2vw,1.4rem)]">
          <ScrollToLeadButton label={copy.expertiseCtaLabel} className="h-10 px-5" variant="secondary" />
        </div>
      </div>
    </section>
  );
}
