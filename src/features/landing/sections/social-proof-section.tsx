"use client";

import {CalendarDays, Clock3, Eye, FolderClosed, Scale, ShieldCheck, Trophy, type LucideIcon} from "lucide-react";
import {useEffect, useMemo, useRef, useState} from "react";

import type {CompanyStatIcon, LandingCopy, TrustBadgeIcon} from "../model/content";

type SocialProofSectionProps = {
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

export function SocialProofSection({copy}: SocialProofSectionProps) {
  const statsRef = useRef<HTMLUListElement | null>(null);
  const [isInView, setIsInView] = useState(false);
  const parsedStats = useMemo(
    () =>
      copy.companyStats.map((item) => {
        const numberMatch = item.value.match(/\d+/);
        const target = numberMatch ? Number(numberMatch[0]) : 0;
        const suffix = item.value.replace(String(target), "");

        return {target, suffix, fallback: item.value};
      }),
    [copy.companyStats],
  );
  const [animatedValues, setAnimatedValues] = useState<number[]>(() => parsedStats.map(() => 0));

  useEffect(() => {
    const rootElement = statsRef.current;
    if (!rootElement) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {threshold: 0.3},
    );

    observer.observe(rootElement);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setAnimatedValues(parsedStats.map((item) => item.target));
      return;
    }

    setAnimatedValues(parsedStats.map(() => 0));

    const duration = 1100;
    const start = performance.now();
    let frameId = 0;

    const tick = (timestamp: number) => {
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setAnimatedValues(parsedStats.map((item) => Math.round(item.target * eased)));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameId);
  }, [isInView, parsedStats]);

  return (
    <section
      aria-label="Social proof"
      className="section border-y border-line-soft py-[clamp(1.2rem,2.2vw,1.8rem)]"
    >
      <div className="container grid gap-3">
        <ul ref={statsRef} className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {copy.companyStats.map((item, index) => {
            const Icon = statIcons[item.icon];

            return (
              <li
                key={`${item.value}-${item.label}`}
                className="rounded-md border border-line-soft bg-[color:color-mix(in_srgb,var(--color-surface-900)_82%,transparent)] px-4 py-3"
              >
                <span className="inline-flex size-8 items-center justify-center rounded-full border border-line-soft bg-[color:color-mix(in_srgb,var(--color-primary-800)_56%,transparent)] text-bronze-300">
                  <Icon className="size-4" aria-hidden />
                </span>
                <p className="mt-2 font-accent text-[clamp(2rem,3.7vw,2.6rem)] leading-none text-bronze-300">
                  {parsedStats[index]?.target
                    ? `${animatedValues[index] ?? 0}${parsedStats[index].suffix}`
                    : parsedStats[index]?.fallback}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.09em] text-muted">{item.label}</p>
              </li>
            );
          })}
        </ul>

        <ul className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-4">
          {copy.trustBadges.map((item) => {
            const Icon = trustBadgeIcons[item.icon] ?? ShieldCheck;

            return (
              <li
                key={item.title}
                className="flex items-center gap-2 rounded-md border border-line-soft bg-[color:color-mix(in_srgb,var(--color-surface-900)_72%,transparent)] px-3 py-2"
              >
                <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full border border-line-soft text-bronze-300">
                  <Icon className="size-3.5" aria-hidden />
                </span>
                <p className="text-xs text-muted">{item.title}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
