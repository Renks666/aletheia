"use client";

import {useTranslations} from "next-intl";

export function MobileStickyCta() {
  const t = useTranslations("common");

  return (
    <a
      href="#lead"
      className="focus-ring fixed inset-x-4 bottom-4 z-50 inline-flex animate-fade-up items-center justify-center rounded-full bg-cta px-4 py-3 text-sm font-semibold text-text shadow-volume md:hidden"
    >
      {t("urgentCta")}
    </a>
  );
}
