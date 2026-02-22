// @vitest-environment jsdom

import {fireEvent, render, screen} from "@testing-library/react";
import {NextIntlClientProvider} from "next-intl";
import {describe, expect, it} from "vitest";

import type {ServiceItem} from "@/shared/lib/cms/types";
import enMessages from "@/shared/lib/i18n/messages/en.json";

import {getLandingCopy} from "../model/content";
import {RoleExperience} from "./role-experience";

const services: ServiceItem[] = [
  {
    slug: "player-only",
    title: "Player only service",
    summary: "Only for players",
    audience: ["player"],
    order: 1,
  },
  {
    slug: "club-only",
    title: "Club only service",
    summary: "Only for clubs",
    audience: ["club"],
    order: 2,
  },
];

describe("RoleExperience", () => {
  it("keeps hero stable and updates audience panel and services when role changes", () => {
    render(
      <NextIntlClientProvider locale="en" messages={enMessages}>
        <RoleExperience copy={getLandingCopy("en")} services={services} />
      </NextIntlClientProvider>,
    );

    expect(
      screen.getByRole("heading", {
        name: "Legal defense in professional football: from contracts to arbitration",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Legal defense for a professional football career",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Player only service")).toBeInTheDocument();
    expect(screen.queryByText("Club only service")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", {name: "Club"}));

    expect(
      screen.getByRole("heading", {
        name: "Legal defense in professional football: from contracts to arbitration",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Strategic legal support for football clubs",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Club only service")).toBeInTheDocument();
    expect(screen.queryByText("Player only service")).not.toBeInTheDocument();
  });
});
