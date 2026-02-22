// @vitest-environment jsdom

import {render, screen} from "@testing-library/react";
import {describe, expect, it} from "vitest";

import {getLandingCopy} from "../model/content";
import {ExpertiseSection} from "./expertise-section";

describe("ExpertiseSection", () => {
  it("renders 3 expertise cards and CTA for RU copy", () => {
    render(<ExpertiseSection copy={getLandingCopy("ru")} />);

    expect(screen.getByRole("heading", {name: /Экспертный фокус/i})).toBeInTheDocument();
    expect(screen.getAllByRole("heading", {level: 3})).toHaveLength(3);

    const cta = screen.getByRole("link", {name: "Разобрать ситуацию с юристом"});
    expect(cta).toHaveAttribute("href", "#lead-form");
  });

  it("renders 3 expertise cards and CTA for EN copy", () => {
    render(<ExpertiseSection copy={getLandingCopy("en")} />);

    expect(screen.getByRole("heading", {name: /Expert Focus/i})).toBeInTheDocument();
    expect(screen.getAllByRole("heading", {level: 3})).toHaveLength(3);

    const cta = screen.getByRole("link", {name: "Discuss your situation with counsel"});
    expect(cta).toHaveAttribute("href", "#lead-form");
  });
});

