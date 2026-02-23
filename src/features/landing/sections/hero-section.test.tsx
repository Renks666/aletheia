// @vitest-environment jsdom

import {render, screen} from "@testing-library/react";
import {NextIntlClientProvider} from "next-intl";
import {describe, expect, it} from "vitest";

import enMessages from "@/shared/lib/i18n/messages/en.json";
import ruMessages from "@/shared/lib/i18n/messages/ru.json";

import {getLandingCopy} from "../model/content";
import {HeroSection} from "./hero-section";

function renderHero(locale: "en" | "ru") {
  const copy = getLandingCopy(locale);
  const messages = locale === "en" ? enMessages : ruMessages;

  render(
    <NextIntlClientProvider locale={locale} messages={messages}>
      <HeroSection copy={copy} />
    </NextIntlClientProvider>,
  );

  return copy;
}

describe("HeroSection", () => {
  it("renders redesigned company stats cards with values, labels and icons in EN", () => {
    const copy = renderHero("en");

    for (const stat of copy.companyStats) {
      expect(screen.getByText(stat.value)).toBeInTheDocument();
      expect(screen.getByText(stat.label)).toBeInTheDocument();
    }

    const firstStatValue = screen.getByText(copy.companyStats[0].value);
    const firstStatItem = firstStatValue.closest("li");

    expect(firstStatItem).not.toBeNull();

    const statsList = firstStatItem?.parentElement;

    expect(statsList?.tagName).toBe("UL");
    expect(statsList?.children).toHaveLength(3);
    expect(statsList?.querySelectorAll("svg")).toHaveLength(3);

    for (const badge of copy.trustBadges) {
      expect(screen.getByText(badge.title)).toBeInTheDocument();
    }

    const firstBadge = screen.getByText(copy.trustBadges[0].title).closest("li");
    const badgeList = firstBadge?.parentElement;

    expect(badgeList?.tagName).toBe("UL");
    expect(badgeList?.children).toHaveLength(4);
    expect(badgeList?.querySelectorAll("svg")).toHaveLength(4);
  });

  it("renders localized labels for RU stats cards", () => {
    const copy = renderHero("ru");

    for (const stat of copy.companyStats) {
      expect(screen.getByText(stat.value)).toBeInTheDocument();
      expect(screen.getByText(stat.label)).toBeInTheDocument();
    }
  });
});
