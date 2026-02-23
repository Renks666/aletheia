import type {FaqItem} from "@/shared/lib/cms/types";

import type {LandingCopy} from "../model/content";

type FaqSectionProps = {
  copy: LandingCopy;
  faq: FaqItem[];
};

export function FaqSection({copy, faq}: FaqSectionProps) {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="section">
      <div className="container">
        <header className="mb-[clamp(1.3rem,2.7vw,2.15rem)] grid gap-3">
          <h2 id="faq-heading" className="text-[clamp(1.9rem,3vw,2.53rem)]">{copy.faqTitle}</h2>
        </header>

        <div className="grid gap-3">
          {faq.map((item) => (
            <details
              key={item.question}
              className="group overflow-hidden rounded-md border border-line-soft bg-[color:color-mix(in_srgb,var(--color-surface-900)_82%,transparent)]"
            >
              <summary className="focus-ring cursor-pointer list-none px-4 py-3 text-base font-semibold transition-colors group-open:text-bronze-300">
                {item.question}
              </summary>
              <p className="px-4 pb-4 text-sm text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
