"use client";

import {CalendarDays, Clock3, Eye, FolderClosed, Scale, ShieldCheck, Trophy, type LucideIcon} from "lucide-react";
import Image from "next/image";
import {useTranslations} from "next-intl";
import {useEffect, useMemo, useRef, useState} from "react";

import {Button} from "@/shared/ui/button";
import {smoothScrollToId} from "@/shared/lib/utils/smooth-scroll";

import type {CompanyStatIcon, LandingCopy, TrustBadgeIcon} from "../model/content";

type HeroSectionProps = {
  copy: LandingCopy;
};

const statIcons: Record<CompanyStatIcon, LucideIcon> = {
  calendar: CalendarDays,
  folder: FolderClosed,
  trophy: Trophy,
};

const trustBadgeIcons: Record<TrustBadgeIcon, LucideIcon> = {
  regulations: Scale,
  anonymized: Eye,
  shield: ShieldCheck,
  response: Clock3,
};

export function HeroSection({copy}: HeroSectionProps) {
  const tCommon = useTranslations("common");
  const statsRef = useRef<HTMLUListElement | null>(null);
  const [isStatsInView, setIsStatsInView] = useState(false);

  const parsedStats = useMemo(
    () =>
      copy.companyStats.map((item) => {
        const numberMatch = item.value.match(/\d+/);
        const target = numberMatch ? Number(numberMatch[0]) : 0;
        const suffix = item.value.replace(String(target), "");

        return {
          target,
          suffix,
          fallback: item.value,
        };
      }),
    [copy.companyStats],
  );

  const [animatedValues, setAnimatedValues] = useState<number[]>(() =>
    parsedStats.map((item) => item.target),
  );

  useEffect(() => {
    setAnimatedValues(parsedStats.map((item) => item.target));
  }, [parsedStats]);

  useEffect(() => {
    const rootElement = statsRef.current;
    if (!rootElement) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsStatsInView(entry.isIntersecting);
      },
      {threshold: 0.25},
    );

    observer.observe(rootElement);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isStatsInView) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setAnimatedValues(parsedStats.map((item) => item.target));
      return;
    }

    setAnimatedValues(parsedStats.map(() => 0));

    const duration = 1200;
    const start = performance.now();
    let frameId = 0;
    const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3);

    const tick = (timestamp: number) => {
      const progress = Math.min((timestamp - start) / duration, 1);
      const easedProgress = easeOutCubic(progress);

      setAnimatedValues(
        parsedStats.map((item) => {
          if (!item.target) {
            return 0;
          }

          return Math.round(item.target * easedProgress);
        }),
      );

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frameId);
  }, [isStatsInView, parsedStats]);

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative scroll-mt-[72px] border-b border-line-soft bg-hero py-[clamp(4.2rem,8.2vw,6.4rem)] lg:scroll-mt-[86px]"
    >
      <div className="container grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(360px,520px)]">
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

          <ul ref={statsRef} className="mt-2 grid grid-cols-1 gap-3 md:grid-cols-3">
            {copy.companyStats.map((item, index) => {
              const Icon = statIcons[item.icon];
              const parsedStat = parsedStats[index];
              const animatedValue = animatedValues[index] ?? 0;

              return (
                <li
                  key={`${item.value}-${item.label}`}
                  className="group relative overflow-hidden rounded-md border border-line-soft bg-[linear-gradient(160deg,rgba(30,33,39,0.9),rgba(20,20,24,0.82))] px-4 py-3 shadow-sm transition-[transform,box-shadow,border-color,background-color] duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:brightness-[1.02] hover:shadow-[0_0_0_1px_rgba(201,164,119,0.16),0_14px_30px_rgba(0,0,0,0.32)]"
                >
                  <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_12%,rgba(201,164,119,0.14),transparent_45%)]" />
                  <div className="relative">
                    <span className="inline-flex size-8 items-center justify-center rounded-full border border-line-soft bg-[color:color-mix(in_srgb,var(--color-primary-800)_56%,transparent)] text-[color:color-mix(in_srgb,var(--color-bronze-300)_80%,transparent)]">
                      <Icon className="size-4" aria-hidden />
                    </span>
                    <p className="mt-2 font-accent text-[clamp(2.6rem,5.3vw,4rem)] leading-none tracking-[0.02em] text-bronze-300">
                      {parsedStat?.target
                        ? `${animatedValue}${parsedStat.suffix}`
                        : parsedStat?.fallback ?? item.value}
                    </p>
                    <p className="mt-2 text-[0.72rem] uppercase tracking-[0.09em] text-muted group-hover:text-text">
                      {item.label}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>

          <ul className="mt-2 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
            {copy.trustBadges.map((item) => {
              const Icon = trustBadgeIcons[item.icon] ?? ShieldCheck;

              return (
                <li
                  key={item.title}
                  className="group relative overflow-hidden rounded-md border border-line-soft bg-[linear-gradient(160deg,rgba(30,33,39,0.9),rgba(20,20,24,0.82))] p-4 text-text shadow-sm transition-[transform,box-shadow,border-color,background-color] duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:brightness-[1.02] hover:shadow-[0_0_0_1px_rgba(201,164,119,0.2),0_14px_30px_rgba(0,0,0,0.34)]"
                >
                  <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_12%,rgba(201,164,119,0.14),transparent_45%)]" />
                  <span className="pointer-events-none absolute inset-0 bg-[url('/images/bronze-texture.svg')] opacity-[0.01] mix-blend-soft-light" />
                  <div className="relative flex items-start gap-3">
                    <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-line-soft bg-[color:color-mix(in_srgb,var(--color-primary-800)_56%,transparent)] text-[color:var(--color-bronze-300)] transition-colors group-hover:text-[color:color-mix(in_srgb,var(--color-bronze-300)_88%,#fff)]">
                      <Icon className="size-4" strokeWidth={1.7} aria-hidden />
                    </span>
                    <p className="text-sm leading-5 text-muted group-hover:text-text">{item.title}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="relative mx-auto aspect-[1920/1967] w-full max-w-[520px] animate-fade-up overflow-hidden rounded-[1.7rem] border border-line-soft bg-[var(--gradient-panel)] shadow-[var(--shadow-volume)]">
          <Image
            src="/brand/logo/hero-vertical-ru-8_3.png"
            alt={copy.heroImageAlt}
            fill
            priority
            sizes="(max-width: 1080px) 100vw, 520px"
            className="object-cover object-center saturate-[0.98] contrast-[1.02]"
          />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_12%,rgba(201,164,119,0.12),transparent_44%),radial-gradient(circle_at_84%_10%,rgba(75,42,123,0.14),transparent_48%),linear-gradient(180deg,rgba(20,20,24,0.05)_0%,rgba(20,20,24,0.02)_54%,rgba(20,20,24,0.11)_100%)]" />
          <div className="pointer-events-none absolute inset-[1px] rounded-[calc(1.7rem-1px)] border border-[rgba(242,238,232,0.03)]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-[linear-gradient(180deg,rgba(20,20,24,0)_0%,rgba(20,20,24,0.24)_100%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[url('/images/bronze-texture.svg')] opacity-[0.008] mix-blend-soft-light" />
        </div>
      </div>
    </section>
  );
}
