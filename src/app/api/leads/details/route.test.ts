import {beforeEach, describe, expect, it, vi} from "vitest";

import {resetRateLimiter} from "@/shared/lib/security/rate-limit";
import {signDetailsToken} from "@/shared/lib/security/details-token";

vi.mock("@/entities/lead/lib/deliver", () => ({
  deliverLeadDetails: vi.fn(),
}));

import {deliverLeadDetails} from "@/entities/lead/lib/deliver";

import {POST} from "./route";

const mockedDeliverLeadDetails = vi.mocked(deliverLeadDetails);

const requestId = "3f7f25d9-8138-4645-a092-ec12e06d85fb";

describe("POST /api/leads/details", () => {
  beforeEach(() => {
    process.env.LEAD_DETAILS_TOKEN_SECRET = "test-secret";
    resetRateLimiter();
    mockedDeliverLeadDetails.mockReset();
  });

  it("returns malformed_json for invalid JSON body", async () => {
    const request = new Request("http://localhost/api/leads/details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: "{invalid",
    });

    const response = await POST(request);
    const payload = (await response.json()) as {ok: boolean; error?: string};

    expect(response.status).toBe(400);
    expect(payload).toEqual({
      ok: false,
      error: "malformed_json",
    });
  });

  it("returns 401 for invalid details token", async () => {
    const request = new Request("http://localhost/api/leads/details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        requestId,
        locale: "ru",
        detailsToken: "invalid.token",
        details: "Достаточно длинное описание дела для валидации",
      }),
    });

    const response = await POST(request);
    const payload = (await response.json()) as {ok: boolean; error?: string};

    expect(response.status).toBe(401);
    expect(payload).toEqual({
      ok: false,
      error: "invalid_details_token",
    });
  });

  it("accepts valid details token and returns success", async () => {
    mockedDeliverLeadDetails.mockResolvedValue({
      channels: ["email"],
      partial: false,
    });

    const detailsToken = signDetailsToken({
      requestId,
      locale: "ru",
      issuedAt: Date.now(),
    });

    const request = new Request("http://localhost/api/leads/details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        requestId,
        locale: "ru",
        detailsToken,
        details: "Достаточно длинное описание дела для валидации",
      }),
    });

    const response = await POST(request);
    const payload = (await response.json()) as {
      ok: boolean;
      requestId?: string;
      channels?: string[];
      partial?: boolean;
    };

    expect(response.status).toBe(200);
    expect(payload).toEqual({
      ok: true,
      requestId,
      channels: ["email"],
      partial: false,
    });
  });
});
