"use client";

import type {AudienceRole} from "@/shared/lib/i18n/types";

import type {LandingCopy} from "../model/content";
import styles from "../landing-page.module.css";

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
    <section id="services" className={`section ${styles.audience}`}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2>{copy.servicesTitle}</h2>
          <p>{copy.audienceIntro}</p>
        </div>

        <div className={styles.audienceButtons}>
          {(Object.keys(copy.audienceLabels) as AudienceRole[]).map((item) => (
            <button
              type="button"
              key={item}
              className={`${styles.audienceButton} ${
                role === item ? styles.audienceButtonActive : ""
              } focus-ring`}
              aria-pressed={role === item}
              onClick={() => onRoleChange(item)}
            >
              {copy.audienceLabels[item]}
            </button>
          ))}
        </div>

        <article className={styles.audiencePanel} aria-live="polite">
          <div className={styles.audiencePanelTop}>
            <span className={styles.audienceRoleBadge}>{copy.audienceLabels[role]}</span>
            <span className={styles.audienceCountBadge}>
              {servicesCount} {copy.serviceSegmentLabel}
            </span>
          </div>
          <h3 className={styles.audiencePanelTitle}>{roleTone.title}</h3>
          <p className={styles.audiencePanelText}>{roleTone.subtitle}</p>
        </article>
      </div>
    </section>
  );
}
