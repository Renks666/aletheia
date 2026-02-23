"use client";

import Image from "next/image";
import {useEffect, useMemo, useRef, useState} from "react";
import {Globe, Menu, X} from "lucide-react";
import {useTranslations} from "next-intl";

import {Button} from "@/shared/ui/button";
import {cn} from "@/shared/lib/utils/cn";
import {Link, usePathname} from "@/shared/lib/i18n/navigation";
import type {Locale} from "@/shared/lib/i18n/types";
import {smoothScrollToId} from "@/shared/lib/utils/smooth-scroll";

type HeaderProps = {
  locale: Locale;
};

type NavItem = {
  id: string;
  label: string;
};

const BRAND_TITLE_GRADIENT_PREV = "linear-gradient(124deg, #f5f1ea 0%, #deccb3 52%, #9f8064 100%)";

export function Header({locale}: HeaderProps) {
  const tNav = useTranslations("nav");
  const tCommon = useTranslations("common");
  const pathname = usePathname();
  const [isLocaleMenuOpen, setIsLocaleMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const localeMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const switcherLabel = locale === "ru" ? "Р’С‹Р±СЂР°С‚СЊ СЏР·С‹Рє" : "Choose language";
  const navAriaLabel = locale === "ru" ? "Р Р°Р·РґРµР»С‹ СЃР°Р№С‚Р°" : "Site sections";
  const localeMenuId = "locale-menu";
  const mobileMenuId = "mobile-menu";
  const brandName = locale === "ru" ? "Алетейя" : "Aletheia";
  const openMenuLabel = locale === "ru" ? "РћС‚РєСЂС‹С‚СЊ РјРµРЅСЋ" : "Open menu";
  const closeMenuLabel = locale === "ru" ? "Р—Р°РєСЂС‹С‚СЊ РјРµРЅСЋ" : "Close menu";

  const navItems = useMemo<NavItem[]>(
    () => [
      {id: "services", label: tNav("services")},
      {id: "process", label: tNav("process")},
      {id: "cases", label: tNav("cases")},
      {id: "faq", label: tNav("faq")},
      {id: "contact", label: tNav("contact")},
    ],
    [tNav],
  );

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!localeMenuRef.current?.contains(event.target as Node)) {
        setIsLocaleMenuOpen(false);
      }

      if (!mobileMenuRef.current?.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsLocaleMenuOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header
      data-site-header
      className="fixed inset-x-0 top-0 z-40 animate-fade-up border-b border-line-soft bg-[color:color-mix(in_srgb,var(--color-bg-950)_78%,transparent)] backdrop-blur-xl"
    >
      <div className="container grid min-h-[72px] grid-cols-[auto_1fr_auto] items-center gap-3 py-2 lg:min-h-[86px] lg:grid-cols-[auto_minmax(0,1fr)_auto]">
        <a href="#top" className="focus-ring group inline-flex min-w-0 items-center gap-3 rounded-md">
          <span
            aria-hidden
            className="relative inline-flex size-10 shrink-0 overflow-hidden rounded-full border border-line-strong bg-[linear-gradient(165deg,rgba(20,20,24,0.65),rgba(20,20,24,0.25))] shadow-[0_0_0_1px_rgba(201,164,119,0.35),0_10px_24px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-105 lg:size-11"
          >
            <Image
              src="/brand/logo/mark-purple-128.png"
              alt=""
              fill
              sizes="44px"
              className="object-contain p-[3px]"
            />
            <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_24%,rgba(201,164,119,0.34),transparent_52%)]" />
          </span>

          <span className="grid min-w-0 gap-0.5 lg:translate-y-[6px]">
            <span
              className="font-heading text-[1.95rem] leading-none tracking-[0.02em] text-[#f2eee8] supports-[(-webkit-background-clip:text)]:bg-clip-text supports-[(-webkit-background-clip:text)]:text-transparent supports-[(-webkit-text-fill-color:transparent)]:[-webkit-text-fill-color:transparent] lg:text-[2.56rem]"
              style={{backgroundImage: BRAND_TITLE_GRADIENT_PREV}}
            >
              {brandName}
            </span>
            <span className="hidden justify-self-center text-center text-[0.72rem] text-muted sm:block">
              {tCommon("slogan")}
            </span>
          </span>
        </a>

        <nav className="mx-auto hidden lg:block" aria-label={navAriaLabel}>
          <ul className="flex items-center gap-1 rounded-full border border-line-soft bg-[color:color-mix(in_srgb,var(--color-surface-900)_46%,transparent)] px-2 py-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="focus-ring inline-flex rounded-full px-3 py-1.5 text-[0.83rem] text-muted transition-all duration-200 hover:bg-[color:color-mix(in_srgb,var(--color-primary-800)_48%,transparent)] hover:text-text"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="cta"
            className="hidden h-10 px-4 text-xs sm:inline-flex"
            onClick={() => smoothScrollToId("lead-form", "center")}
          >
            {tCommon("ctaPrimary")}
          </Button>

          <div className="relative" ref={localeMenuRef}>
            <button
              type="button"
              className="focus-ring relative inline-flex size-8 items-center justify-center overflow-hidden rounded-full border border-[rgba(201,164,119,0.42)] bg-[linear-gradient(158deg,rgba(31,28,39,0.95),rgba(16,14,23,0.92))] text-bronze-300 shadow-[0_0_0_1px_rgba(201,164,119,0.14),0_8px_18px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-200 hover:border-[rgba(201,164,119,0.66)] hover:text-[#dfbe98] hover:shadow-[0_0_0_1px_rgba(201,164,119,0.26),0_10px_22px_rgba(0,0,0,0.36),inset_0_1px_0_rgba(255,255,255,0.12)]"
              aria-label={switcherLabel}
              aria-haspopup="menu"
              aria-expanded={isLocaleMenuOpen}
              aria-controls={localeMenuId}
              onClick={() => setIsLocaleMenuOpen((open) => !open)}
            >
              <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_24%,rgba(201,164,119,0.18),transparent_58%)]" />
              <span className="relative z-[1] inline-flex h-full w-full items-center justify-center">
                <Globe
                  className={cn(
                    "block size-[1.12rem] shrink-0 transition-transform duration-200",
                    isLocaleMenuOpen && "scale-110",
                  )}
                />
              </span>
            </button>

            <div
              id={localeMenuId}
              role="menu"
              aria-hidden={!isLocaleMenuOpen}
              className={cn(
                "absolute left-1/2 top-[calc(100%+0.45rem)] z-50 grid min-w-[92px] -translate-x-1/2 grid-cols-2 gap-1 rounded-lg border border-line-soft bg-[color:color-mix(in_srgb,var(--color-surface-900)_94%,transparent)] p-1.5 shadow-soft backdrop-blur-md origin-top transition-all duration-200 ease-out",
                isLocaleMenuOpen
                  ? "visible translate-y-0 scale-100 opacity-100 blur-0 pointer-events-auto"
                  : "invisible -translate-y-1 scale-95 opacity-0 blur-[2px] pointer-events-none",
              )}
            >
              <Link
                href={pathname}
                locale="ru"
                role="menuitem"
                aria-current={locale === "ru" ? "true" : undefined}
                className={cn(
                  "focus-ring grid h-8 w-10 place-items-center rounded-md text-[0.72rem] font-semibold leading-none text-text transition-all duration-200 hover:bg-[color:color-mix(in_srgb,var(--color-bronze-300)_34%,transparent)]",
                  locale === "ru" &&
                    "bg-[color:color-mix(in_srgb,var(--color-primary-800)_56%,transparent)] shadow-[inset_0_0_0_1px_rgba(201,164,119,0.24)]",
                )}
                onClick={() => setIsLocaleMenuOpen(false)}
              >
                RU
              </Link>
              <Link
                href={pathname}
                locale="en"
                role="menuitem"
                aria-current={locale === "en" ? "true" : undefined}
                className={cn(
                  "focus-ring grid h-8 w-10 place-items-center rounded-md text-[0.72rem] font-semibold leading-none text-text transition-all duration-200 hover:bg-[color:color-mix(in_srgb,var(--color-bronze-300)_34%,transparent)]",
                  locale === "en" &&
                    "bg-[color:color-mix(in_srgb,var(--color-primary-800)_56%,transparent)] shadow-[inset_0_0_0_1px_rgba(201,164,119,0.24)]",
                )}
                onClick={() => setIsLocaleMenuOpen(false)}
              >
                EN
              </Link>
            </div>
          </div>

          <div className="relative lg:hidden" ref={mobileMenuRef}>
            <button
              type="button"
              className="focus-ring inline-flex size-9 items-center justify-center rounded-full border border-line-soft bg-[rgba(22,20,28,0.8)] text-text"
              aria-label={isMobileMenuOpen ? closeMenuLabel : openMenuLabel}
              aria-haspopup="menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls={mobileMenuId}
              onClick={() => setIsMobileMenuOpen((open) => !open)}
            >
              {isMobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>

            {isMobileMenuOpen ? (
              <div
                id={mobileMenuId}
                className="absolute right-0 top-[calc(100%+0.45rem)] z-50 w-[min(86vw,320px)] rounded-lg border border-line-soft bg-[var(--gradient-panel)] p-4 shadow-volume"
              >
                <nav aria-label={navAriaLabel}>
                  <ul className="grid gap-1">
                    {navItems.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className="focus-ring rounded-md border border-transparent px-3 py-2.5 text-sm text-muted transition-colors hover:border-line-soft hover:text-text"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="mt-4">
                  <Button
                    variant="cta"
                    className="w-full"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      smoothScrollToId("lead-form", "center");
                    }}
                  >
                    {tCommon("ctaPrimary")}
                  </Button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}

