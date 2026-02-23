"use client";

import {ChevronDown} from "lucide-react";
import {useState} from "react";
import type {FaqItem} from "@/shared/lib/cms/types";

import {Button} from "@/shared/ui/button";
import type {LandingCopy} from "../model/content";

type FaqSectionProps = {
  copy: LandingCopy;
  faq: FaqItem[];
};

export function FaqSection({copy, faq}: FaqSectionProps) {
  const [expanded, setExpanded] = useState(false);
  const visibleFaq = expanded ? faq : faq.slice(0, 5);
  const hasExtraItems = faq.length > 5;

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="section scroll-mt-[72px] lg:scroll-mt-[86px]"
    >
      <div className="container">
        <header className="mb-[clamp(1.3rem,2.7vw,2.15rem)] grid gap-3">
          <h2 id="faq-heading" className="text-[clamp(1.9rem,3vw,2.53rem)]">{copy.faqTitle}</h2>
        </header>

        <div className="grid gap-3">
          {visibleFaq.map((item) => (
            <details
              key={item.question}
              className="group overflow-hidden rounded-md border border-line-soft bg-[color:color-mix(in_srgb,var(--color-surface-900)_82%,transparent)]"
            >
              <summary className="focus-ring flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-base font-semibold transition-colors hover:text-bronze-300 group-open:text-bronze-300">
                <span>{item.question}</span>
                <ChevronDown
                  className="size-4 shrink-0 transition-transform duration-200 group-open:rotate-180"
                  aria-hidden
                />
              </summary>
              <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-200 ease-out group-open:grid-rows-[1fr] group-open:opacity-100">
                <div className="overflow-hidden">
                  <p className="px-4 pb-4 text-sm text-muted">{item.answer}</p>
                </div>
              </div>
            </details>
          ))}
        </div>

        {hasExtraItems ? (
          <div className="mt-4">
            <Button variant="secondary" className="h-10 px-5" onClick={() => setExpanded((open) => !open)}>
              {expanded ? copy.faqShowLessLabel : copy.faqShowMoreLabel}
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
