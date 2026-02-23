// @vitest-environment jsdom

import {fireEvent, render, screen} from "@testing-library/react";
import {describe, expect, it} from "vitest";

import {getLandingCopy} from "../model/content";
import {FaqSection} from "./faq-section";

describe("FaqSection", () => {
  it("renders native details/summary with focus styling and chevron rotation class", () => {
    const copy = getLandingCopy("en");
    const faq = [
      {
        question: "What is included in the first consultation?",
        answer: "We review your facts, documents and procedural risks.",
        locale: "en" as const,
        order: 1,
      },
    ];

    const {container} = render(<FaqSection copy={copy} faq={faq} />);

    const details = container.querySelector("details");
    const summary = container.querySelector("summary");
    const chevron = container.querySelector("summary svg");

    expect(details).toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(summary).toHaveClass("focus-ring");
    expect(chevron).toHaveClass("group-open:rotate-180");
  });

  it("opens and closes FAQ item on summary click", () => {
    const copy = getLandingCopy("en");
    const faq = [
      {
        question: "How fast do you respond?",
        answer: "Usually within two hours.",
        locale: "en" as const,
        order: 1,
      },
    ];

    render(<FaqSection copy={copy} faq={faq} />);

    const summary = screen.getByText("How fast do you respond?").closest("summary");
    const details = summary?.closest("details");

    expect(summary).toBeInTheDocument();
    expect(details).not.toHaveAttribute("open");

    if (!summary) {
      throw new Error("summary not found");
    }

    fireEvent.click(summary);
    expect(details).toHaveAttribute("open");

    fireEvent.click(summary);
    expect(details).not.toHaveAttribute("open");
  });
});
