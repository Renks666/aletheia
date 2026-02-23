"use client";

import {useEffect, useState} from "react";
import {useTranslations} from "next-intl";

export function MobileStickyCta() {
  const t = useTranslations("common");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    if (!mediaQuery.matches) {
      setIsVisible(false);
      return;
    }

    const hero = document.getElementById("top");
    const leadForm = document.getElementById("lead-form") ?? document.getElementById("lead");

    let heroInView = true;
    let leadInView = false;

    const updateVisibility = () => {
      setIsVisible(!heroInView && !leadInView);
    };

    const heroObserver = hero
      ? new IntersectionObserver(
          ([entry]) => {
            heroInView = entry.isIntersecting;
            updateVisibility();
          },
          {threshold: 0.12},
        )
      : null;

    const leadObserver = leadForm
      ? new IntersectionObserver(
          ([entry]) => {
            leadInView = entry.isIntersecting;
            updateVisibility();
          },
          {threshold: 0.15},
        )
      : null;

    if (!heroObserver) {
      heroInView = false;
    }

    if (heroObserver && hero) {
      heroObserver.observe(hero);
    }

    if (leadObserver && leadForm) {
      leadObserver.observe(leadForm);
    }
    updateVisibility();

    return () => {
      heroObserver?.disconnect();
      leadObserver?.disconnect();
    };
  }, []);

  return (
    <a
      href="#lead-form"
      aria-label={t("urgentCta")}
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
      className={`focus-ring fixed inset-x-4 bottom-4 z-50 inline-flex items-center justify-center rounded-full bg-cta px-4 py-3 text-sm font-semibold text-text shadow-volume transition-[opacity,transform] duration-200 md:hidden ${isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"}`}
    >
      {t("urgentCta")}
    </a>
  );
}
