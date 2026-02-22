"use client";

import {useTranslations} from "next-intl";

import styles from "./mobile-sticky-cta.module.css";

export function MobileStickyCta() {
  const t = useTranslations("common");

  return (
    <a href="#lead" className={`${styles.sticky} focus-ring`}>
      {t("urgentCta")}
    </a>
  );
}

