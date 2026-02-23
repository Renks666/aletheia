import {Badge} from "@/shared/ui/badge";
import type {CaseItem} from "@/shared/lib/cms/types";

import type {LandingCopy} from "../model/content";

type ProofSectionProps = {
  copy: LandingCopy;
  cases: CaseItem[];
};

function splitToSentences(text: string) {
  return text
    .split(/(?<=[.!?:])\s+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function ProofSection({copy, cases}: ProofSectionProps) {
  return (
    <section
      id="cases"
      aria-labelledby="cases-heading"
      className="section scroll-mt-[72px] pt-[clamp(1.2rem,2.6vw,2rem)] lg:scroll-mt-[86px]"
    >
      <div className="container">
        <header className="mb-[clamp(1.3rem,2.7vw,2.15rem)] grid gap-3">
          <h2 id="cases-heading" className="text-[clamp(1.9rem,3vw,2.53rem)]">{copy.proofTitle}</h2>
          <div className="grid gap-1.5">
            {splitToSentences(copy.proofIntro).map((sentence) => (
              <p key={sentence} className="max-w-[64ch] text-sm text-muted">
                {sentence}
              </p>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 gap-[clamp(0.9rem,1.8vw,1.15rem)] md:grid-cols-2 xl:grid-cols-3">
          {cases.map((item) => (
            <article
              key={item.title}
              className="group relative grid gap-2 overflow-hidden rounded-md border border-line-soft bg-[linear-gradient(165deg,rgba(30,33,39,0.95),rgba(19,18,24,0.9)),url('/images/bronze-texture.svg')] bg-[length:130%_auto] bg-[position:top_right] p-[clamp(1rem,1.8vw,1.18rem)] shadow-sm transition-[transform,box-shadow,border-color,background-color] duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:brightness-[1.02] hover:shadow-[0_0_0_1px_rgba(201,164,119,0.16),0_14px_28px_rgba(0,0,0,0.32)]"
            >
              <span className="pointer-events-none absolute -bottom-24 -right-16 h-[250px] w-[190px] bg-[url('/brand/logo/mark-purple-512.png')] bg-cover bg-center opacity-[0.09] blur-[0.5px]" />
              <span className="font-accent text-xs uppercase tracking-[0.09em] text-[color:var(--color-accent-ice)]">
                {copy.caseTag}
              </span>
              <h3 className="text-[1.28rem] leading-tight group-hover:text-text">{item.title}</h3>
              <div className="grid gap-1.5">
                {splitToSentences(item.challenge).map((sentence) => (
                  <p key={`${item.title}-challenge-${sentence}`} className="text-sm text-muted">
                    {sentence}
                  </p>
                ))}
              </div>
              <div className="grid gap-1.5">
                {splitToSentences(item.result).map((sentence) => (
                  <p key={`${item.title}-result-${sentence}`} className="text-sm text-muted">
                    {sentence}
                  </p>
                ))}
              </div>
              {item.metrics?.length ? (
                <div className="mt-1 flex flex-wrap gap-2">
                  {item.metrics.map((metric) => (
                    <Badge key={metric} variant="accent">
                      {metric}
                    </Badge>
                  ))}
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
