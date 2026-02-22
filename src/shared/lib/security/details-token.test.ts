import {beforeEach, describe, expect, it} from "vitest";

import {signDetailsToken, verifyDetailsToken} from "./details-token";

describe("details token", () => {
  beforeEach(() => {
    process.env.LEAD_DETAILS_TOKEN_SECRET = "token-secret";
  });

  it("verifies a valid token", () => {
    const issuedAt = Date.now();
    const token = signDetailsToken({
      requestId: "3f7f25d9-8138-4645-a092-ec12e06d85fb",
      locale: "ru",
      issuedAt,
    });

    const valid = verifyDetailsToken({
      token,
      requestId: "3f7f25d9-8138-4645-a092-ec12e06d85fb",
      locale: "ru",
      now: issuedAt + 1000,
    });

    expect(valid).toBe(true);
  });

  it("rejects token for different locale", () => {
    const token = signDetailsToken({
      requestId: "3f7f25d9-8138-4645-a092-ec12e06d85fb",
      locale: "ru",
      issuedAt: Date.now(),
    });

    const valid = verifyDetailsToken({
      token,
      requestId: "3f7f25d9-8138-4645-a092-ec12e06d85fb",
      locale: "en",
    });

    expect(valid).toBe(false);
  });

  it("rejects expired token", () => {
    const issuedAt = Date.now();
    const token = signDetailsToken({
      requestId: "3f7f25d9-8138-4645-a092-ec12e06d85fb",
      locale: "ru",
      issuedAt,
    });

    const valid = verifyDetailsToken({
      token,
      requestId: "3f7f25d9-8138-4645-a092-ec12e06d85fb",
      locale: "ru",
      now: issuedAt + 25 * 60 * 60 * 1000,
    });

    expect(valid).toBe(false);
  });
});
