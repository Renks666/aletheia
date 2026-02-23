// @vitest-environment jsdom

import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {NextIntlClientProvider} from "next-intl";
import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";

import ruMessages from "@/shared/lib/i18n/messages/ru.json";

import {LeadFormBlock} from "./lead-form-block";

const serviceOptions = [
  {
    slug: "uefa-fifa-cas",
    title: "UEFA, FIFA, CAS",
    summary: "Summary",
    audience: ["player"],
    order: 1,
  },
] as const;

const audienceLabels = {
  player: "Игрок",
  club: "Клуб",
  agent: "Агент",
  coach: "Тренер",
  parent: "Родитель",
} as const;

describe("LeadFormBlock", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("sends detailsToken on details submission", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            ok: true,
            requestId: "3f7f25d9-8138-4645-a092-ec12e06d85fb",
            detailsToken: "signed-token",
            channels: ["email"],
            partial: false,
          }),
          {status: 200},
        ),
      )
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            ok: true,
            requestId: "3f7f25d9-8138-4645-a092-ec12e06d85fb",
            channels: ["email"],
            partial: false,
          }),
          {status: 200},
        ),
      );

    vi.stubGlobal("fetch", fetchMock);

    render(
      <NextIntlClientProvider locale="ru" messages={ruMessages}>
        <LeadFormBlock
          locale="ru"
          serviceOptions={[...serviceOptions]}
          audienceLabels={{...audienceLabels}}
          selectedRole="player"
        />
      </NextIntlClientProvider>,
    );

    fireEvent.change(screen.getByLabelText(ruMessages.lead.name), {target: {value: "Иван Иванов"}});
    fireEvent.change(screen.getByLabelText(ruMessages.lead.phone), {target: {value: "+79991234567"}});
    expect(screen.getByRole("link", {name: "info@aletheia.pro"})).toHaveAttribute(
      "href",
      "mailto:info@aletheia.pro",
    );
    expect(screen.getByRole("link", {name: "t.me/AletheiaFootball"})).toHaveAttribute(
      "href",
      "https://t.me/AletheiaFootball",
    );

    fireEvent.change(screen.getByLabelText(/Email/i), {target: {value: "client@example.com"}});
    fireEvent.change(screen.getByLabelText(ruMessages.lead.message), {
      target: {value: "Нужна консультация"},
    });
    fireEvent.click(screen.getByRole("checkbox"));

    fireEvent.click(screen.getByRole("button", {name: ruMessages.lead.submit}));

    await screen.findByText(ruMessages.lead.detailsTitle);

    fireEvent.change(screen.getByPlaceholderText(ruMessages.lead.detailsPlaceholder), {
      target: {value: "Подробности по делу для второго шага"},
    });
    fireEvent.click(screen.getByRole("button", {name: ruMessages.lead.detailsSubmit}));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    const secondCallInit = fetchMock.mock.calls[1]?.[1] as RequestInit;
    const secondPayload = JSON.parse(String(secondCallInit.body)) as {
      requestId: string;
      detailsToken: string;
    };

    expect(secondPayload.requestId).toBe("3f7f25d9-8138-4645-a092-ec12e06d85fb");
    expect(secondPayload.detailsToken).toBe("signed-token");
  });
});
