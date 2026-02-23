"use client";

import Image from "next/image";
import {useTranslations} from "next-intl";

import {Button} from "@/shared/ui/button";
import {smoothScrollToId} from "@/shared/lib/utils/smooth-scroll";

import type {LandingCopy} from "../model/content";

type HeroSectionProps = {
  copy: LandingCopy;
};

export function HeroSection({copy}: HeroSectionProps) {
  const tCommon = useTranslations("common");

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative scroll-mt-[72px] border-b border-line-soft bg-hero py-[clamp(4.2rem,8.2vw,6.4rem)] lg:scroll-mt-[86px]"
    >
      <div className="container grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(300px,430px)]">
        <div className="grid gap-4 animate-fade-up">
          <h1 id="hero-heading" className="max-w-[18ch] text-[clamp(2rem,4.8vw,3.72rem)] leading-[1.03]">
            {copy.heroTitle}
          </h1>
          <p className="max-w-[58ch] text-[clamp(1rem,1.2vw,1.16rem)] text-muted">{copy.heroSubtitle}</p>

          <div className="mt-1 flex flex-wrap gap-3">
            <Button
              variant="cta"
              aria-label={tCommon("ctaPrimary")}
              onClick={() => smoothScrollToId("lead-form", "center")}
            >
              {tCommon("ctaPrimary")}
            </Button>
            <Button
              variant="secondary"
              aria-label={tCommon("ctaSecondary")}
              onClick={() => smoothScrollToId("services")}
            >
              {tCommon("ctaSecondary")}
            </Button>
          </div>
          <p className="mt-1 text-sm text-muted">
            {tCommon("confidential")} • {tCommon("responseSla")}
          </p>
        </div>

        <div className="relative mx-auto aspect-[1920/1967] w-full max-w-[430px] animate-fade-up overflow-hidden rounded-[1.7rem] border border-line-soft bg-[var(--gradient-panel)] shadow-[var(--shadow-volume)]">
          <Image
            src="/brand/logo/hero-vertical-ru-8_3.png"
            alt={copy.heroImageAlt}
            fill
            priority
            sizes="(max-width: 1080px) min(82vw, 430px), 430px"
            className="object-contain object-center p-5 saturate-[0.98] contrast-[1.02]"
          />
          <div className="pointer-events-none absolute inset-[1px] rounded-[calc(1.7rem-1px)] border border-[rgba(242,238,232,0.03)]" />
          <div className="pointer-events-none absolute inset-0 bg-[url('/images/bronze-texture.svg')] opacity-[0.008] mix-blend-soft-light" />
        </div>
      </div>
    </section>
  );
}
