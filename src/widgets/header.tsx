"use client";

import {useEffect, useRef, useState} from "react";
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
  const [isLocaleMenuOpen, setIsLocaleMenuOpen] = useState(false);
  const localeMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLocaleMenuOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!localeMenuRef.current?.contains(event.target as Node)) {
        setIsLocaleMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsLocaleMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLocaleMenuOpen]);

  const switcherLabel = locale === "ru" ? "Выбрать язык" : "Choose language";

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

          {/* Глобус расположен в шапке: по центру по вертикали и справа от CTA */}
          <div className={styles.localeSwitcher} ref={localeMenuRef}>
            <button
              type="button"
              className={`${styles.localeTrigger} focus-ring`}
              aria-label={switcherLabel}
              aria-haspopup="menu"
              aria-expanded={isLocaleMenuOpen}
              onClick={() => setIsLocaleMenuOpen((open) => !open)}
            >
              <svg className={styles.globeIcon} viewBox="0 0 16 16" aria-hidden>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.27 14.1a6.5 6.5 0 0 0 3.67-3.45q-1.24.21-2.7.34-.31 1.83-.97 3.1M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.48-1.52a7 7 0 0 1-.96 0H7.5a4 4 0 0 1-.84-1.32q-.38-.89-.63-2.08a40 40 0 0 0 3.92 0q-.25 1.2-.63 2.08a4 4 0 0 1-.84 1.31zm2.94-4.76q1.66-.15 2.95-.43a7 7 0 0 0 0-2.58q-1.3-.27-2.95-.43a18 18 0 0 1 0 3.44m-1.27-3.54a17 17 0 0 1 0 3.64 39 39 0 0 1-4.3 0 17 17 0 0 1 0-3.64 39 39 0 0 1 4.3 0m1.1-1.17q1.45.13 2.69.34a6.5 6.5 0 0 0-3.67-3.44q.65 1.26.98 3.1M8.48 1.5l.01.02q.41.37.84 1.31.38.89.63 2.08a40 40 0 0 0-3.92 0q.25-1.2.63-2.08a4 4 0 0 1 .85-1.32 7 7 0 0 1 .96 0m-2.75.4a6.5 6.5 0 0 0-3.67 3.44 29 29 0 0 1 2.7-.34q.31-1.83.97-3.1M4.58 6.28q-1.66.16-2.95.43a7 7 0 0 0 0 2.58q1.3.27 2.95.43a18 18 0 0 1 0-3.44m.17 4.71q-1.45-.12-2.69-.34a6.5 6.5 0 0 0 3.67 3.44q-.65-1.27-.98-3.1"
                  fill="currentColor"
                />
              </svg>
            </button>

            <div className={`${styles.localeMenu} ${isLocaleMenuOpen ? styles.localeMenuOpen : ""}`} role="menu">
              <Link
                href={pathname}
                locale="ru"
                role="menuitem"
                aria-current={locale === "ru" ? "true" : undefined}
                className={`${styles.localeOption} ${locale === "ru" ? styles.localeOptionActive : ""} focus-ring`}
                onClick={() => setIsLocaleMenuOpen(false)}
              >
                RU
              </Link>
              <Link
                href={pathname}
                locale="en"
                role="menuitem"
                aria-current={locale === "en" ? "true" : undefined}
                className={`${styles.localeOption} ${locale === "en" ? styles.localeOptionActive : ""} focus-ring`}
                onClick={() => setIsLocaleMenuOpen(false)}
              >
                EN
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
