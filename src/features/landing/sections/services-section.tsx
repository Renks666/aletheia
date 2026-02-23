"use client";

import {Badge} from "@/shared/ui/badge";
import type {ServiceItem} from "@/shared/lib/cms/types";

import type {LandingCopy} from "../model/content";

type ServicesSectionProps = {
  copy: LandingCopy;
  services: ServiceItem[];
};

function splitToSentences(text: string) {
  return text
    .split(/(?<=[.!?:])\s+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function ServicesSection({copy, services}: ServicesSectionProps) {
  return (
    <section className="section pb-[clamp(1.2rem,2.6vw,2rem)]">
      <div className="container">
        <div className="mb-[clamp(1.2rem,3vw,2rem)] grid gap-1.5">
          {splitToSentences(copy.servicesIntro).map((sentence) => (
            <p key={sentence} className="max-w-[62ch] text-sm text-muted">
              {sentence}
            </p>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-[clamp(0.9rem,1.8vw,1.15rem)] md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.slug}
              className="grid min-h-[190px] content-start gap-3 rounded-md border border-line-soft bg-[var(--gradient-surface)] p-[clamp(1rem,1.8vw,1.2rem)] shadow-sm transition-[transform,box-shadow,border-color,background-color] duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:brightness-[1.02] hover:shadow-[0_0_0_1px_rgba(201,164,119,0.18),0_14px_30px_rgba(0,0,0,0.34)]"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-accent text-xs uppercase tracking-[0.09em] text-bronze-300">
                  {copy.serviceTrackLabel}
                </span>
                <Badge>
                  {service.audience.length} {copy.serviceSegmentLabel}
                </Badge>
              </div>
              <h3 className="text-[1.35rem] leading-tight">{service.title}</h3>
              <div className="grid gap-1.5">
                {splitToSentences(service.summary).map((sentence) => (
                  <p key={`${service.slug}-${sentence}`} className="text-sm text-muted">
                    {sentence}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
