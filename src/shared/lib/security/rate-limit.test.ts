import {afterEach, describe, expect, it} from "vitest";

import {consumeRateLimit, createInMemoryRateLimiter, resetRateLimiter, setRateLimiter} from "./rate-limit";

describe("rate limiter adapter", () => {
  afterEach(() => {
    resetRateLimiter();
  });

  it("supports replacing active limiter via adapter", () => {
    setRateLimiter(createInMemoryRateLimiter());

    const first = consumeRateLimit("ip:1", 2, 1000);
    const second = consumeRateLimit("ip:1", 2, 1000);
    const third = consumeRateLimit("ip:1", 2, 1000);

    expect(first.allowed).toBe(true);
    expect(second.allowed).toBe(true);
    expect(third.allowed).toBe(false);
    expect(third.remaining).toBe(0);
  });
});
