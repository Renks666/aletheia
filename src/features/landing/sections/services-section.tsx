"use client";

import {Badge} from "@/shared/ui/badge";
import type {ServiceItem} from "@/shared/lib/cms/types";

import type {LandingCopy} from "../model/content";

type ServicesSectionProps = {
  copy: LandingCopy;
  services: ServiceItem[];
};

export function ServicesSection({copy, services}: ServicesSectionProps) {
  return (
    <section className="section pt-[clamp(1.2rem,2.6vw,2rem)]">
      <div className="container">
        <p className="mb-[clamp(1.2rem,3vw,2rem)] max-w-[62ch] text-muted">{copy.servicesIntro}</p>

        <div className="grid grid-cols-1 gap-[clamp(0.9rem,1.8vw,1.15rem)] md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.slug}
              className="grid min-h-[190px] content-start gap-3 rounded-md border border-line-soft bg-[var(--gradient-surface)] p-[clamp(1rem,1.8vw,1.2rem)]"
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
              <p className="text-sm text-muted">{service.summary}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
