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
  it("renders compact hero with key CTAs and trust line in EN", () => {
    const copy = renderHero("en");

    expect(screen.getByRole("heading", {name: copy.heroTitle})).toBeInTheDocument();
    expect(screen.getByText(copy.heroSubtitle)).toBeInTheDocument();
    expect(screen.getByRole("button", {name: enMessages.common.ctaPrimary})).toBeInTheDocument();
    expect(screen.getByRole("button", {name: enMessages.common.ctaSecondary})).toBeInTheDocument();
    expect(screen.getByText("Confidential • Response within 2 hours")).toBeInTheDocument();
  });

  it("renders localized hero labels for RU", () => {
    const copy = renderHero("ru");

    expect(screen.getByRole("heading", {name: copy.heroTitle})).toBeInTheDocument();
    expect(screen.getByRole("button", {name: ruMessages.common.ctaPrimary})).toBeInTheDocument();
    expect(screen.getByRole("button", {name: ruMessages.common.ctaSecondary})).toBeInTheDocument();
    expect(screen.getByText("Конфиденциально • Ответ в течение 2 часов")).toBeInTheDocument();
  });
});
