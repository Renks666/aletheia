// @vitest-environment jsdom

import {act, render} from "@testing-library/react";
import {NextIntlClientProvider} from "next-intl";
import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";

import enMessages from "@/shared/lib/i18n/messages/en.json";

import {MobileStickyCta} from "./mobile-sticky-cta";

type ObserverRecord = {
  callback: IntersectionObserverCallback;
  observed: Element | null;
};

describe("MobileStickyCta", () => {
  const observers: ObserverRecord[] = [];
  const originalMatchMedia = window.matchMedia;
  const originalIntersectionObserver = window.IntersectionObserver;

  beforeEach(() => {
    document.body.innerHTML = `
      <section id="top"></section>
      <section id="lead-form"></section>
    `;
    observers.length = 0;

    vi.stubGlobal(
      "IntersectionObserver",
      class implements IntersectionObserver {
        readonly root: Element | Document | null = null;
        readonly rootMargin = "0px";
        readonly thresholds: ReadonlyArray<number> = [0];
        private readonly index: number;

        constructor(callback: IntersectionObserverCallback) {
          this.index = observers.push({callback, observed: null}) - 1;
        }

        disconnect() {
          return undefined;
        }

        observe = (target: Element) => {
          observers[this.index].observed = target;
          return undefined;
        };

        takeRecords() {
          return [];
        }

        unobserve() {
          return undefined;
        }
      },
    );

    window.matchMedia = ((query: string) =>
      ({
        matches: query === "(max-width: 767px)",
        media: query,
        onchange: null,
        addListener: () => undefined,
        removeListener: () => undefined,
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
        dispatchEvent: () => false,
      }) as MediaQueryList) as typeof window.matchMedia;
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
    window.IntersectionObserver = originalIntersectionObserver;
    vi.unstubAllGlobals();
  });

  it("becomes visible after hero leaves viewport and hides near lead form", () => {
    const {container} = render(
      <NextIntlClientProvider locale="en" messages={enMessages}>
        <MobileStickyCta />
      </NextIntlClientProvider>,
    );

    const sticky = container.querySelector('button[aria-label="Urgent consultation"]');
    expect(sticky).toBeInTheDocument();
    expect(sticky).toHaveAttribute("aria-label", enMessages.common.urgentCta);
    expect(sticky).toHaveAttribute("aria-hidden", "true");
    expect(sticky).toHaveAttribute("tabindex", "-1");

    const hero = document.getElementById("top");
    const leadForm = document.getElementById("lead-form");

    const heroObserver = observers.find((item) => item.observed === hero);
    const leadObserver = observers.find((item) => item.observed === leadForm);

    expect(heroObserver).toBeDefined();
    expect(leadObserver).toBeDefined();

    act(() => {
      heroObserver?.callback([{isIntersecting: false} as IntersectionObserverEntry], {} as IntersectionObserver);
    });

    expect(sticky).toHaveAttribute("aria-hidden", "false");
    expect(sticky).toHaveAttribute("tabindex", "0");

    act(() => {
      leadObserver?.callback([{isIntersecting: true} as IntersectionObserverEntry], {} as IntersectionObserver);
    });

    expect(sticky).toHaveAttribute("aria-hidden", "true");
    expect(sticky).toHaveAttribute("tabindex", "-1");
  });
});
