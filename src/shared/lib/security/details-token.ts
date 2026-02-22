import {createHmac, timingSafeEqual} from "node:crypto";

import type {Locale} from "@/shared/lib/i18n/types";

const DEFAULT_TTL_MS = 24 * 60 * 60 * 1000;

type DetailsTokenPayload = {
  requestId: string;
  locale: Locale;
  issuedAt: number;
};

type VerifyDetailsTokenInput = {
  token: string;
  requestId: string;
  locale: Locale;
  now?: number;
  ttlMs?: number;
};

function getSecret(): string {
  const secret = process.env.LEAD_DETAILS_TOKEN_SECRET;
  if (!secret) {
    throw new Error("LEAD_DETAILS_TOKEN_SECRET is not configured");
  }

  return secret;
}

function encodePayload(payload: DetailsTokenPayload): string {
  return Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
}

function decodePayload(payloadBase64: string): DetailsTokenPayload | null {
  try {
    const raw = Buffer.from(payloadBase64, "base64url").toString("utf8");
    const parsed = JSON.parse(raw) as Partial<DetailsTokenPayload>;

    if (
      typeof parsed.requestId !== "string" ||
      (parsed.locale !== "ru" && parsed.locale !== "en") ||
      typeof parsed.issuedAt !== "number"
    ) {
      return null;
    }

    return parsed as DetailsTokenPayload;
  } catch {
    return null;
  }
}

function signPayload(payloadBase64: string, secret: string): string {
  return createHmac("sha256", secret).update(payloadBase64).digest("base64url");
}

export function signDetailsToken(payload: {requestId: string; locale: Locale; issuedAt?: number}): string {
  const secret = getSecret();
  const normalized: DetailsTokenPayload = {
    requestId: payload.requestId,
    locale: payload.locale,
    issuedAt: payload.issuedAt ?? Date.now(),
  };

  const payloadBase64 = encodePayload(normalized);
  const signature = signPayload(payloadBase64, secret);

  return `${payloadBase64}.${signature}`;
}

export function verifyDetailsToken({
  token,
  requestId,
  locale,
  now = Date.now(),
  ttlMs = DEFAULT_TTL_MS,
}: VerifyDetailsTokenInput): boolean {
  const [payloadBase64, signature] = token.split(".");
  if (!payloadBase64 || !signature) {
    return false;
  }

  let expectedSignature: string;
  try {
    expectedSignature = signPayload(payloadBase64, getSecret());
  } catch {
    return false;
  }

  const providedBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (
    providedBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(providedBuffer, expectedBuffer)
  ) {
    return false;
  }

  const payload = decodePayload(payloadBase64);
  if (!payload) {
    return false;
  }

  if (payload.requestId !== requestId || payload.locale !== locale) {
    return false;
  }

  if (!Number.isFinite(payload.issuedAt)) {
    return false;
  }

  if (payload.issuedAt > now) {
    return false;
  }

  if (now - payload.issuedAt > ttlMs) {
    return false;
  }

  return true;
}
