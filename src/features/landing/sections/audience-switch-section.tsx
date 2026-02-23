"use client";

import {Badge} from "@/shared/ui/badge";
import {cn} from "@/shared/lib/utils/cn";
import type {ServiceItem} from "@/shared/lib/cms/types";
import type {AudienceRole} from "@/shared/lib/i18n/types";
import {ScrollToLeadButton} from "@/widgets/scroll-to-lead-button";

import type {LandingCopy} from "../model/content";

type AudienceSwitchSectionProps = {
  copy: LandingCopy;
  role: AudienceRole;
  onRoleChange: (role: AudienceRole) => void;
  services: ServiceItem[];
};

function splitToSentences(text: string) {
  return text
    .split(/(?<=[.!?:])\s+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function AudienceSwitchSection({
  copy,
  role,
  onRoleChange,
  services,
}: AudienceSwitchSectionProps) {
  const roleTone = copy.heroByRole[role];

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="section scroll-mt-[72px] pb-[clamp(1.2rem,2.6vw,2rem)] lg:scroll-mt-[86px]"
    >
      <div className="container">
        <header className="mb-[clamp(1.3rem,2.7vw,2.15rem)] grid gap-3">
          <h2 id="services-heading" className="text-[clamp(1.9rem,3vw,2.53rem)]">{copy.servicesTitle}</h2>
          <div className="grid gap-1.5">
            {splitToSentences(copy.audienceIntro).map((sentence) => (
              <p key={sentence} className="max-w-[66ch] text-sm text-muted">
                {sentence}
              </p>
            ))}
          </div>
        </header>

        <div className="flex flex-wrap gap-2">
          {(Object.keys(copy.audienceLabels) as AudienceRole[]).map((item) => (
            <button
              type="button"
              key={item}
              className={cn(
                "focus-ring rounded-full border px-4 py-2 text-sm transition-all duration-200",
                role === item
                  ? "border-bronze-300 bg-[color:color-mix(in_srgb,var(--color-primary-800)_60%,transparent)] text-text shadow-soft"
                  : "border-line-soft bg-transparent text-muted hover:border-line-strong hover:text-text",
              )}
              aria-pressed={role === item}
              onClick={() => onRoleChange(item)}
            >
              {copy.audienceLabels[item]}
            </button>
          ))}
        </div>

        <article
          className="mt-4 grid gap-3 rounded-md border border-line-soft bg-[color:color-mix(in_srgb,var(--color-surface-900)_88%,transparent)] p-[clamp(1rem,1.8vw,1.3rem)]"
          aria-live="polite"
          key={role}
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Badge variant="default">{copy.audienceLabels[role]}</Badge>
            <Badge variant="accent">
              {services.length} {copy.serviceSegmentLabel}
            </Badge>
          </div>
          <h3 className="text-[clamp(1.2rem,2vw,1.55rem)] leading-tight">{roleTone.title}</h3>
          <p className="max-w-[70ch] text-muted">{roleTone.subtitle}</p>
        </article>

        <div className="mt-4 grid grid-cols-1 gap-[clamp(0.9rem,1.8vw,1.15rem)] md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.slug}
              className="grid min-h-[180px] content-start gap-3 rounded-md border border-line-soft bg-[var(--gradient-surface)] p-[clamp(1rem,1.8vw,1.2rem)] shadow-sm transition-[transform,box-shadow,border-color,background-color] duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:brightness-[1.02] hover:shadow-[0_0_0_1px_rgba(201,164,119,0.18),0_14px_30px_rgba(0,0,0,0.34)]"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-accent text-xs uppercase tracking-[0.09em] text-bronze-300">
                  {copy.serviceTrackLabel}
                </span>
                <Badge>{service.audience.length} {copy.serviceSegmentLabel}</Badge>
              </div>
              <h3 className="text-[1.2rem] leading-tight">{service.title}</h3>
              <p className="text-sm text-muted">{service.summary}</p>
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
