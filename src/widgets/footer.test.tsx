// @vitest-environment jsdom

import {render, screen} from "@testing-library/react";
import {describe, expect, it} from "vitest";

import {Footer} from "./footer";

describe("Footer", () => {
  it("renders legal links with locale paths", () => {
    render(<Footer locale="ru" />);

    expect(
      screen.getByRole("link", {
        name: "Политика конфиденциальности",
      }),
    ).toHaveAttribute("href", "/ru/legal/privacy");

    expect(
      screen.getByRole("link", {
        name: "Согласие на обработку персональных данных",
      }),
    ).toHaveAttribute("href", "/ru/legal/consent");
  });

  it("renders updated public contacts", () => {
    render(<Footer locale="en" />);

    expect(screen.getByRole("link", {name: "info@aletheia.pro"})).toHaveAttribute(
      "href",
      "mailto:info@aletheia.pro",
    );
    expect(screen.getByRole("link", {name: "+7 980 888 00 44"})).toHaveAttribute(
      "href",
      "tel:+79808880044",
    );
    expect(screen.getByRole("link", {name: "t.me/AletheiaFootball"})).toHaveAttribute(
      "href",
      "https://t.me/AletheiaFootball",
    );
  });
});
