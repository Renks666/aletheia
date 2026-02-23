"use client";

import {Badge} from "@/shared/ui/badge";
import {cn} from "@/shared/lib/utils/cn";
import type {AudienceRole} from "@/shared/lib/i18n/types";

import type {LandingCopy} from "../model/content";

type AudienceSwitchSectionProps = {
  copy: LandingCopy;
  role: AudienceRole;
  onRoleChange: (role: AudienceRole) => void;
  servicesCount: number;
};

export function AudienceSwitchSection({
  copy,
  role,
  onRoleChange,
  servicesCount,
}: AudienceSwitchSectionProps) {
  const roleTone = copy.heroByRole[role];

  return (
    <section id="services" aria-labelledby="services-heading" className="section pb-[clamp(1.2rem,2.6vw,2rem)]">
      <div className="container">
        <header className="mb-[clamp(1.3rem,2.7vw,2.15rem)] grid gap-3">
          <h2 id="services-heading" className="text-[clamp(1.9rem,3vw,2.53rem)]">{copy.servicesTitle}</h2>
          <p className="max-w-[66ch] text-muted">{copy.audienceIntro}</p>
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
              {servicesCount} {copy.serviceSegmentLabel}
            </Badge>
          </div>
          <h3 className="text-[clamp(1.2rem,2vw,1.55rem)] leading-tight">{roleTone.title}</h3>
          <p className="max-w-[70ch] text-muted">{roleTone.subtitle}</p>
        </article>
      </div>
    </section>
  );
}
