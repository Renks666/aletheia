"use client";

import Image from "next/image";
import {useTranslations} from "next-intl";

import {Button} from "@/shared/ui/button";
import {smoothScrollToId} from "@/shared/lib/utils/smooth-scroll";

import type {LandingCopy} from "../model/content";
import styles from "../landing-page.module.css";

type HeroSectionProps = {
  copy: LandingCopy;
};

export function HeroSection({copy}: HeroSectionProps) {
  const tCommon = useTranslations("common");

  return (
    <section id="top" className={styles.hero}>
      <div className={`container ${styles.heroGrid}`}>
        <div className={styles.heroCopy}>
          <h1 className={styles.heroTitle}>{copy.heroTitle}</h1>
          <p className={styles.heroSubtitle}>{copy.heroSubtitle}</p>

          <div className={styles.heroActions}>
            <Button onClick={() => smoothScrollToId("lead-form", "center")}>
              {tCommon("ctaPrimary")}
            </Button>
            <Button
              variant="secondary"
              onClick={() => smoothScrollToId("services")}
            >
              {tCommon("ctaSecondary")}
            </Button>
          </div>

          <div className={styles.statsRow}>
            {copy.companyStats.map((item) => (
              <span key={item} className={styles.statChip}>
                {item}
              </span>
            ))}
          </div>

          <ul className={styles.heroTrust}>
            {copy.trustBadges.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className={styles.badgeRow}>
            <span className={styles.badge}>{tCommon("confidential")}</span>
            <span className={styles.badge}>{tCommon("responseSla")}</span>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <Image
            src="/brand/logo/hero-vertical-ru-8_3.png"
            alt={copy.heroImageAlt}
            fill
            priority
            sizes="(max-width: 1080px) 100vw, 520px"
          />
          <div className={styles.heroOverlay} />
        </div>
      </div>
    </section>
  );
}
