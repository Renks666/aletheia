import {Badge} from "@/shared/ui/badge";
import type {CaseItem} from "@/shared/lib/cms/types";

import type {LandingCopy} from "../model/content";

type ProofSectionProps = {
  copy: LandingCopy;
  cases: CaseItem[];
};

export function ProofSection({copy, cases}: ProofSectionProps) {
  return (
    <section id="cases" aria-labelledby="cases-heading" className="section">
      <div className="container">
        <header className="mb-[clamp(1.3rem,2.7vw,2.15rem)] grid gap-3">
          <h2 id="cases-heading" className="text-[clamp(1.9rem,3vw,2.53rem)]">{copy.proofTitle}</h2>
          <p className="max-w-[64ch] text-muted">{copy.proofIntro}</p>
        </header>

        <div className="grid grid-cols-1 gap-[clamp(0.9rem,1.8vw,1.15rem)] md:grid-cols-2 xl:grid-cols-3">
          {cases.map((item) => (
            <article
              key={item.title}
              className="relative grid gap-2 overflow-hidden rounded-md border border-line-soft bg-[linear-gradient(165deg,rgba(30,33,39,0.95),rgba(19,18,24,0.9)),url('/images/bronze-texture.svg')] bg-[length:130%_auto] bg-[position:top_right] p-[clamp(1rem,1.8vw,1.18rem)]"
            >
              <span className="pointer-events-none absolute -bottom-24 -right-16 h-[250px] w-[190px] bg-[url('/brand/logo/mark-purple-512.png')] bg-cover bg-center opacity-[0.09] blur-[0.5px]" />
              <span className="font-accent text-xs uppercase tracking-[0.09em] text-[color:var(--color-accent-ice)]">
                {copy.caseTag}
              </span>
              <h3 className="text-[1.28rem] leading-tight">{item.title}</h3>
              <p className="text-sm text-muted">{item.challenge}</p>
              <p className="text-sm text-muted">{item.result}</p>
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
