"use client";

import type {ServiceItem} from "@/shared/lib/cms/types";

import type {LandingCopy} from "../model/content";
import styles from "../landing-page.module.css";

type ServicesSectionProps = {
  copy: LandingCopy;
  services: ServiceItem[];
};

export function ServicesSection({copy, services}: ServicesSectionProps) {
  return (
    <section className={`section ${styles.servicesSection}`}>
      <div className="container">
        <p className={styles.servicesIntro}>{copy.servicesIntro}</p>

        <div className={styles.servicesGrid}>
          {services.map((service) => (
            <article key={service.slug} className={styles.serviceCard}>
              <div className={styles.serviceTop}>
                <span className={styles.serviceTag}>{copy.serviceTrackLabel}</span>
                <span className={styles.badge}>
                  {service.audience.length} {copy.serviceSegmentLabel}
                </span>
              </div>
              <h3 className={styles.serviceTitle}>{service.title}</h3>
              <p className={styles.serviceSummary}>{service.summary}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
