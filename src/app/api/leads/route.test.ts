import {beforeEach, describe, expect, it, vi} from "vitest";

import {resetRateLimiter} from "@/shared/lib/security/rate-limit";

vi.mock("@/entities/lead/lib/deliver", () => ({
  deliverLead: vi.fn(),
}));

import {deliverLead} from "@/entities/lead/lib/deliver";

import {POST} from "./route";

const mockedDeliverLead = vi.mocked(deliverLead);

const validPayload = {
  locale: "ru",
  name: "Иван Иванов",
  phone: "+79991234567",
  email: "client@example.com",
  role: "player",
  service: "UEFA, FIFA, CAS",
  message: "Нужна помощь по спору",
  consent: true,
  source: "landing",
} as const;

describe("POST /api/leads", () => {
  beforeEach(() => {
    process.env.LEAD_DETAILS_TOKEN_SECRET = "test-secret";
    resetRateLimiter();
    mockedDeliverLead.mockReset();
  });

  it("returns malformed_json for invalid JSON body", async () => {
    const request = new Request("http://localhost/api/leads", {
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

  it("returns success response with detailsToken and channels", async () => {
    mockedDeliverLead.mockResolvedValue({
      channels: ["email"],
      partial: false,
    });

    const request = new Request("http://localhost/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": "10.0.0.1",
      },
      body: JSON.stringify(validPayload),
    });

    const response = await POST(request);
    const payload = (await response.json()) as {
      ok: boolean;
      requestId?: string;
      detailsToken?: string;
      channels?: string[];
      partial?: boolean;
    };

    expect(response.status).toBe(200);
    expect(payload.ok).toBe(true);
    expect(payload.requestId).toBeTypeOf("string");
    expect(payload.detailsToken).toBeTypeOf("string");
    expect(payload.channels).toEqual(["email"]);
    expect(payload.partial).toBe(false);
  });

  it("keeps HTTP 200 for partial delivery", async () => {
    mockedDeliverLead.mockResolvedValue({
      channels: ["email"],
      partial: true,
    });

    const request = new Request("http://localhost/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": "10.0.0.2",
      },
      body: JSON.stringify(validPayload),
    });

    const response = await POST(request);
    const payload = (await response.json()) as {
      ok: boolean;
      channels?: string[];
      partial?: boolean;
    };

    expect(response.status).toBe(200);
    expect(payload.ok).toBe(true);
    expect(payload.channels).toEqual(["email"]);
    expect(payload.partial).toBe(true);
  });

  it("returns 429 after rate limit is exceeded", async () => {
    mockedDeliverLead.mockResolvedValue({
      channels: ["email"],
      partial: false,
    });

    const requestFactory = () =>
      new Request("http://localhost/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-forwarded-for": "10.0.0.3",
        },
        body: JSON.stringify(validPayload),
      });

    for (let i = 0; i < 6; i += 1) {
      const response = await POST(requestFactory());
      expect(response.status).toBe(200);
    }

    const blockedResponse = await POST(requestFactory());
    const payload = (await blockedResponse.json()) as {ok: boolean; error?: string};

    expect(blockedResponse.status).toBe(429);
    expect(blockedResponse.headers.get("Retry-After")).toBeTruthy();
    expect(payload).toEqual({
      ok: false,
      error: "rate_limited",
    });
  });
});
