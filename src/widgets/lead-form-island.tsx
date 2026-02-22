"use client";

import dynamic from "next/dynamic";
import {useEffect, useState} from "react";

import type {ServiceItem} from "@/shared/lib/cms/types";
import type {AudienceRole, Locale} from "@/shared/lib/i18n/types";

import styles from "./lead-form-island.module.css";

const LeadFormBlock = dynamic(
  () => import("./lead-form-block").then((module) => module.LeadFormBlock),
  {
    ssr: false,
    loading: () => (
      <div className={styles.skeleton} aria-hidden>
        <div className={styles.row} />
        <div className={styles.row} />
        <div className={styles.row} />
        <div className={styles.button} />
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
