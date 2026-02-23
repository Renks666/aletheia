"use client";

import {useEffect, useState} from "react";

import type {ServiceItem} from "@/shared/lib/cms/types";
import type {AudienceRole, Locale} from "@/shared/lib/i18n/types";
import {LeadFormBlock} from "./lead-form-block";

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
