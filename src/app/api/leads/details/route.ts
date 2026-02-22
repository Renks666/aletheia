import {NextResponse} from "next/server";

import {deliverLeadDetails} from "@/entities/lead/lib/deliver";
import {leadDetailsSchema} from "@/entities/lead/model/schema";
import type {LeadResponse} from "@/entities/lead/model/types";
import {verifyDetailsToken} from "@/shared/lib/security/details-token";
import {consumeRateLimit} from "@/shared/lib/security/rate-limit";
import {sanitizeText} from "@/shared/lib/utils/sanitize";

const MAX_REQUESTS = 10;
const WINDOW_MS = 10 * 60 * 1000;

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  return forwardedFor?.split(",")[0]?.trim() || "unknown";
}

export async function POST(request: Request) {
  const clientIp = getClientIp(request);
  const limiter = consumeRateLimit(`lead-details:${clientIp}`, MAX_REQUESTS, WINDOW_MS);

  if (!limiter.allowed) {
    return NextResponse.json(
      {
        ok: false,
        error: "rate_limited",
      } satisfies LeadResponse,
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil(limiter.retryAfterMs / 1000)),
        },
      },
    );
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

  const parsed = leadDetailsSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "validation_error",
      } satisfies LeadResponse,
      {status: 400},
    );
  }

  const isValidToken = verifyDetailsToken({
    token: parsed.data.detailsToken,
    requestId: parsed.data.requestId,
    locale: parsed.data.locale,
  });

  if (!isValidToken) {
    return NextResponse.json(
      {
        ok: false,
        error: "invalid_details_token",
      } satisfies LeadResponse,
      {status: 401},
    );
  }

  try {
    const delivery = await deliverLeadDetails({
      requestId: parsed.data.requestId,
      locale: parsed.data.locale,
      details: sanitizeText(parsed.data.details),
    });

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
      requestId: parsed.data.requestId,
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
