// @vitest-environment jsdom

import {render} from "@testing-library/react";
import {describe, expect, it, vi} from "vitest";

import type {CaseItem, FaqItem, ServiceItem} from "@/shared/lib/cms/types";

import {LandingPage} from "./landing-page";

vi.mock("@/widgets/header", () => ({
  Header: () => <header data-slot="header" />,
}));

vi.mock("@/widgets/footer", () => ({
  Footer: () => <footer data-slot="footer" />,
}));

vi.mock("@/widgets/mobile-sticky-cta", () => ({
  MobileStickyCta: () => <a data-slot="sticky" href="#lead">Sticky</a>,
}));

vi.mock("@/widgets/lead-form-island", () => ({
  LeadFormIsland: () => <div data-slot="lead-form-island" />,
}));

vi.mock("@/features/landing/interactive/role-experience", () => ({
  RoleExperience: () => <section data-slot="role" />,
}));

vi.mock("@/features/landing/sections/process-section", () => ({
  ProcessSection: () => <section data-slot="process" />,
}));

vi.mock("@/features/landing/sections/proof-section", () => ({
  ProofSection: () => <section data-slot="proof" />,
}));

vi.mock("@/features/landing/sections/about-section", () => ({
  AboutSection: () => <section data-slot="about" />,
}));

vi.mock("@/features/landing/sections/faq-section", () => ({
  FaqSection: () => <section data-slot="faq" />,
}));

vi.mock("@/features/landing/sections/final-cta-section", () => ({
  FinalCtaSection: () => <section data-slot="final-cta" />,
}));

const services: ServiceItem[] = [
  {
    slug: "sample",
    title: "Sample service",
    summary: "Sample summary",
    audience: ["player"],
    order: 1,
  },
];

const cases: CaseItem[] = [
  {
    title: "Sample case",
    challenge: "Challenge",
    result: "Result",
    isAnonymized: true,
  },
];

const faq: FaqItem[] = [
  {
    question: "Sample question?",
    answer: "Sample answer",
    locale: "ru",
    order: 1,
  },
];

describe("LandingPage", () => {
  it("renders sections in new conversion-first order", () => {
    const {container} = render(<LandingPage locale="ru" services={services} cases={cases} faq={faq} />);

    const sectionOrder = Array.from(container.querySelectorAll("main [data-slot]")).map((node) =>
      node.getAttribute("data-slot"),
    );

    expect(sectionOrder).toEqual([
      "role",
      "process",
      "proof",
      "about",
      "faq",
      "final-cta",
      "lead-form-island",
    ]);

    expect(container.querySelector("#lead")).not.toBeNull();
    expect(container.querySelector("#lead-form")).not.toBeNull();
  });
});
