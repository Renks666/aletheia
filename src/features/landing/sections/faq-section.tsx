"use client";

import {ChevronDown} from "lucide-react";
import {useState} from "react";

import {cn} from "@/shared/lib/utils/cn";
import type {FaqItem} from "@/shared/lib/cms/types";

import type {LandingCopy} from "../model/content";

type FaqSectionProps = {
  copy: LandingCopy;
  faq: FaqItem[];
};

export function FaqSection({copy, faq}: FaqSectionProps) {
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({});

  function toggleItem(index: number) {
    setOpenItems((prev) => ({...prev, [index]: !prev[index]}));
  }

  return (
    <section id="faq" aria-labelledby="faq-heading" className="section">
      <div className="container">
        <header className="mb-[clamp(1.3rem,2.7vw,2.15rem)] grid gap-3">
          <h2 id="faq-heading" className="text-[clamp(1.9rem,3vw,2.53rem)]">{copy.faqTitle}</h2>
        </header>

        <div className="grid gap-3">
          {faq.map((item, index) => {
            const isOpen = !!openItems[index];
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;

            return (
              <article
                key={item.question}
                className="overflow-hidden rounded-md border border-line-soft bg-[color:color-mix(in_srgb,var(--color-surface-900)_82%,transparent)]"
              >
                <button
                  id={buttonId}
                  type="button"
                  className="focus-ring flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-base font-semibold transition-colors hover:text-bronze-300"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggleItem(index)}
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    className={cn("size-4 shrink-0 transition-transform duration-200", isOpen && "rotate-180")}
                    aria-hidden
                  />
                </button>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={cn(
                    "grid transition-all duration-200 ease-out",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-4 pb-4 text-sm text-muted">{item.answer}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
