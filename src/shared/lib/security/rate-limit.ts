type RateLimitRecord = {
  count: number;
  expiresAt: number;
};

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  retryAfterMs: number;
};

export type RateLimiter = {
  consume: (key: string, maxRequests: number, windowMs: number) => RateLimitResult;
};

type RateLimitStore = Map<string, RateLimitRecord>;

function createRateLimitStore(): RateLimitStore {
  return new Map<string, RateLimitRecord>();
}

export function createInMemoryRateLimiter(store = createRateLimitStore()): RateLimiter {
  return {
    consume(key, maxRequests, windowMs) {
      const now = Date.now();
      const current = store.get(key);

      if (!current || current.expiresAt <= now) {
        store.set(key, {
          count: 1,
          expiresAt: now + windowMs,
        });

        return {
          allowed: true,
          remaining: Math.max(0, maxRequests - 1),
          retryAfterMs: windowMs,
        };
      }

      if (current.count >= maxRequests) {
        return {
          allowed: false,
          remaining: 0,
          retryAfterMs: current.expiresAt - now,
        };
      }

      current.count += 1;
      store.set(key, current);

      return {
        allowed: true,
        remaining: Math.max(0, maxRequests - current.count),
        retryAfterMs: current.expiresAt - now,
      };
    },
  };
}

const defaultRateLimiter = createInMemoryRateLimiter();
let activeRateLimiter: RateLimiter = defaultRateLimiter;

export function setRateLimiter(limiter: RateLimiter) {
  activeRateLimiter = limiter;
}

export function resetRateLimiter() {
  activeRateLimiter = defaultRateLimiter;
}

export function consumeRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number,
): RateLimitResult {
  return activeRateLimiter.consume(key, maxRequests, windowMs);
}
