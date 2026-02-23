import {randomUUID} from "node:crypto";

import {NextResponse} from "next/server";

import {deliverLead} from "@/entities/lead/lib/deliver";
import {leadRequestSchema} from "@/entities/lead/model/schema";
import type {LeadResponse} from "@/entities/lead/model/types";
import {consumeRateLimit} from "@/shared/lib/security/rate-limit";
import {signDetailsToken} from "@/shared/lib/security/details-token";
import {sanitizeText} from "@/shared/lib/utils/sanitize";

const MAX_REQUESTS = 6;
const WINDOW_MS = 10 * 60 * 1000;

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  return forwardedFor?.split(",")[0]?.trim() || "unknown";
}

export async function POST(request: Request) {
  const clientIp = getClientIp(request);
  const limiter = consumeRateLimit(`leads:${clientIp}`, MAX_REQUESTS, WINDOW_MS);

  if (!limiter.allowed) {
    const response: LeadResponse = {
      ok: false,
      error: "rate_limited",
    };

    return NextResponse.json(response, {
      status: 429,
      headers: {
        "Retry-After": String(Math.ceil(limiter.retryAfterMs / 1000)),
      },
    });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: "malformed_json",
      } satisfies LeadResponse,
      {status: 400},
    );
  }

  const parsed = leadRequestSchema.safeParse(body);

  if (!parsed.success) {
    const response: LeadResponse = {
      ok: false,
      error: "validation_error",
    };

    return NextResponse.json(response, {status: 400});
  }

  const requestId = randomUUID();
  const payload = {
    ...parsed.data,
    name: sanitizeText(parsed.data.name),
    service: sanitizeText(parsed.data.service),
    message: parsed.data.message ? sanitizeText(parsed.data.message) : "",
    source: parsed.data.source ? sanitizeText(parsed.data.source) : "",
    sourceDetail: parsed.data.sourceDetail ? sanitizeText(parsed.data.sourceDetail) : "",
    landingVariant: parsed.data.landingVariant ? sanitizeText(parsed.data.landingVariant) : "",
    utmSource: parsed.data.utmSource ? sanitizeText(parsed.data.utmSource) : "",
    utmMedium: parsed.data.utmMedium ? sanitizeText(parsed.data.utmMedium) : "",
    utmCampaign: parsed.data.utmCampaign ? sanitizeText(parsed.data.utmCampaign) : "",
    utmTerm: parsed.data.utmTerm ? sanitizeText(parsed.data.utmTerm) : "",
    utmContent: parsed.data.utmContent ? sanitizeText(parsed.data.utmContent) : "",
    requestId,
  };

  try {
    const detailsToken = signDetailsToken({
      requestId,
      locale: parsed.data.locale,
    });

    const delivery = await deliverLead(payload);

    if (!delivery.channels.length) {
      return NextResponse.json(
        {
          ok: false,
          error: "delivery_not_configured",
        } satisfies LeadResponse,
        {status: 503},
      );
    }

    return NextResponse.json({
      ok: true,
      requestId,
      detailsToken,
      channels: delivery.channels,
      partial: delivery.partial,
    } satisfies LeadResponse);
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: "delivery_failed",
      } satisfies LeadResponse,
      {status: 500},
    );
  }
}
