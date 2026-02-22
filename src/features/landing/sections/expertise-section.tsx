"use client";

import {smoothScrollToId} from "@/shared/lib/utils/smooth-scroll";

import type {LandingCopy} from "../model/content";
import styles from "../landing-page.module.css";

type ExpertiseSectionProps = {
  copy: LandingCopy;
};

export function ExpertiseSection({copy}: ExpertiseSectionProps) {
  return (
    <section id="expertise" className={`section ${styles.expertiseSection}`}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2>{copy.expertiseTitle}</h2>
          <p>{copy.expertiseIntro}</p>
        </div>

        <div className={styles.expertiseGrid}>
          {copy.expertiseCards.map((card) => (
            <article key={card.title} className={styles.expertiseCard}>
              <h3 className={styles.expertiseCardTitle}>{card.title}</h3>
              <p className={styles.expertiseCardText}>{card.description}</p>
              <ul className={styles.expertiseList}>
                {card.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className={styles.expertiseActions}>
          <a
            href="#lead-form"
            className={`${styles.expertiseCta} focus-ring`}
            onClick={(event) => {
              event.preventDefault();
              smoothScrollToId("lead-form", "center");
            }}
          >
            {copy.expertiseCtaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
