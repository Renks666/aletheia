"use client";

import {useTranslations} from "next-intl";

import {Link, usePathname} from "@/shared/lib/i18n/navigation";
import type {Locale} from "@/shared/lib/i18n/types";
import {smoothScrollToId} from "@/shared/lib/utils/smooth-scroll";

import styles from "./header.module.css";

type HeaderProps = {
  locale: Locale;
};

export function Header({locale}: HeaderProps) {
  const tNav = useTranslations("nav");
  const tCommon = useTranslations("common");
  const pathname = usePathname();
  const oppositeLocale: Locale = locale === "ru" ? "en" : "ru";

  return (
    <header className={styles.header} data-site-header>
      <div className={`container ${styles.inner}`}>
        <a href="#top" className={styles.brand}>
          <span className={styles.brandEmblem} aria-hidden />
          <span className={styles.brandText}>
            <span className={styles.title}>Алетейя</span>
            <span className={styles.slogan}>{tCommon("slogan")}</span>
          </span>
        </a>

        <nav className={styles.nav}>
          <a href="#services">{tNav("services")}</a>
          <a href="#process">{tNav("process")}</a>
          <a href="#expertise">{tNav("expertise")}</a>
          <a href="#cases">{tNav("cases")}</a>
          <a href="#about">{tNav("about")}</a>
          <a href="#faq">{tNav("faq")}</a>
          <a href="#contact">{tNav("contact")}</a>
        </nav>

        <div className={styles.actions}>
          <Link href={pathname} locale={oppositeLocale} className={`${styles.locale} focus-ring`}>
            {oppositeLocale.toUpperCase()}
          </Link>
          <a
            href="#lead"
            className={`${styles.ctaLink} focus-ring`}
            onClick={(event) => {
              event.preventDefault();
              smoothScrollToId("lead-form", "center");
            }}
          >
            {tCommon("ctaPrimary")}
          </a>
        </div>
      </div>
    </header>
  );
}

