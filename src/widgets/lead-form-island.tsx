"use client";

import dynamic from "next/dynamic";
import {useEffect, useState} from "react";

import type {ServiceItem} from "@/shared/lib/cms/types";
import type {AudienceRole, Locale} from "@/shared/lib/i18n/types";

const LeadFormBlock = dynamic(
  () => import("./lead-form-block").then((module) => module.LeadFormBlock),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden
        className="grid gap-3 rounded-lg border border-line-soft bg-[color:color-mix(in_srgb,var(--color-surface-900)_88%,transparent)] p-4"
      >
        <div className="h-11 rounded-sm bg-[linear-gradient(90deg,rgba(242,238,232,0.06),rgba(242,238,232,0.14),rgba(242,238,232,0.06))] bg-[length:200%_100%] animate-shimmer" />
        <div className="h-11 rounded-sm bg-[linear-gradient(90deg,rgba(242,238,232,0.06),rgba(242,238,232,0.14),rgba(242,238,232,0.06))] bg-[length:200%_100%] animate-shimmer" />
        <div className="h-11 rounded-sm bg-[linear-gradient(90deg,rgba(242,238,232,0.06),rgba(242,238,232,0.14),rgba(242,238,232,0.06))] bg-[length:200%_100%] animate-shimmer" />
        <div className="h-11 w-44 rounded-full bg-[linear-gradient(90deg,rgba(201,164,119,0.2),rgba(201,164,119,0.45),rgba(201,164,119,0.2))] bg-[length:200%_100%] animate-shimmer" />
      </div>
    ),
  },
);

type LeadFormIslandProps = {
  locale: Locale;
  serviceOptions: ServiceItem[];
  audienceLabels: Record<AudienceRole, string>;
  defaultRole?: AudienceRole;
};

const ROLES = new Set<AudienceRole>(["player", "club", "agent", "coach", "parent"]);

export function LeadFormIsland({
  locale,
  serviceOptions,
  audienceLabels,
  defaultRole = "player",
}: LeadFormIslandProps) {
  const [selectedRole, setSelectedRole] = useState<AudienceRole>(defaultRole);

  useEffect(() => {
    const listener = (event: Event) => {
      const role = (event as CustomEvent<AudienceRole>).detail;
      if (ROLES.has(role)) {
        setSelectedRole(role);
      }
    };

    window.addEventListener("aletheia:role-change", listener);

    return () => {
      window.removeEventListener("aletheia:role-change", listener);
    };
  }, []);

  return (
    <LeadFormBlock
      locale={locale}
      serviceOptions={serviceOptions}
      audienceLabels={audienceLabels}
      selectedRole={selectedRole}
    />
  );
}
