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
    <section className="section">
      <div className="container">
        <p className="mb-[clamp(1.2rem,3vw,2rem)] max-w-[62ch] text-muted">{copy.servicesIntro}</p>

        <div className="grid grid-cols-1 gap-[clamp(0.9rem,1.8vw,1.15rem)] md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.slug}
              className="grid min-h-[190px] content-start gap-3 rounded-md border border-line-soft bg-[var(--gradient-surface)] p-[clamp(1rem,1.8vw,1.2rem)] transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[0_0_0_1px_rgba(201,164,119,0.18),0_14px_30px_rgba(0,0,0,0.34)]"
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
