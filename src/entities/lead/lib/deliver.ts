import nodemailer from "nodemailer";

import type {DeliveryChannel} from "@/entities/lead/model/types";
import type {LeadDetailsInput, LeadRequestInput} from "@/entities/lead/model/schema";

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = Number(process.env.SMTP_PORT ?? "587");
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const SMTP_FROM = process.env.SMTP_FROM;
const LEADS_TO_EMAIL = process.env.LEADS_TO_EMAIL;
const TELEGRAM_WEBHOOK_URL = process.env.TELEGRAM_WEBHOOK_URL;

export type DeliveryResult = {
  channels: DeliveryChannel[];
  partial: boolean;
};

type LeadDetailsDeliveryInput = Omit<LeadDetailsInput, "detailsToken">;

function createTransporter() {
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !SMTP_FROM || !LEADS_TO_EMAIL) {
    return null;
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
}

function logDeliveryError({
  requestId,
  channel,
  error,
}: {
  requestId: string;
  channel: DeliveryChannel;
  error: unknown;
}) {
  const message = error instanceof Error ? error.message : "unknown_error";
  console.error("lead_delivery_failed", {
    requestId,
    channel,
    error: message,
  });
}

function ensureAtLeastOneChannelSucceeded(
  channels: DeliveryChannel[],
  failuresCount: number,
  configuredCount: number,
) {
  if (!channels.length && failuresCount > 0 && configuredCount > 0) {
    throw new Error("all delivery channels failed");
  }
}

export async function deliverLead(
  payload: LeadRequestInput & {requestId: string},
): Promise<DeliveryResult> {
  const channels: DeliveryChannel[] = [];
  let failuresCount = 0;
  const transporter = createTransporter();

  const emailConfigured = Boolean(transporter);
  const telegramConfigured = Boolean(TELEGRAM_WEBHOOK_URL);
  const configuredCount = Number(emailConfigured) + Number(telegramConfigured);

  if (transporter) {
    try {
      await transporter.sendMail({
        from: SMTP_FROM,
        to: LEADS_TO_EMAIL,
        subject: `New lead [${payload.requestId}]`,
        text: [
          `Request ID: ${payload.requestId}`,
          `Locale: ${payload.locale}`,
          `Name: ${payload.name}`,
          `Phone: ${payload.phone}`,
          `Email: ${payload.email || "-"}`,
          `Role: ${payload.role}`,
          `Service: ${payload.service}`,
          `Source: ${payload.source || "-"}`,
          "",
          payload.message || "No message",
        ].join("\n"),
      });
      channels.push("email");
    } catch (error) {
      failuresCount += 1;
      logDeliveryError({requestId: payload.requestId, channel: "email", error});
    }
  }

  if (TELEGRAM_WEBHOOK_URL) {
    try {
      const telegramMessage = [
        `Lead ${payload.requestId}`,
        `${payload.name} (${payload.role})`,
        `Phone: ${payload.phone}`,
        payload.email ? `Email: ${payload.email}` : "",
        `Service: ${payload.service}`,
        payload.message ? `Message: ${payload.message}` : "",
      ]
        .filter(Boolean)
        .join("\n");

      const response = await fetch(TELEGRAM_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({text: telegramMessage}),
      });

      if (!response.ok) {
        throw new Error(`status_${response.status}`);
      }

      channels.push("telegram");
    } catch (error) {
      failuresCount += 1;
      logDeliveryError({requestId: payload.requestId, channel: "telegram", error});
    }
  }

  ensureAtLeastOneChannelSucceeded(channels, failuresCount, configuredCount);

  return {
    channels,
    partial: failuresCount > 0 && channels.length > 0,
  };
}

export async function deliverLeadDetails(payload: LeadDetailsDeliveryInput): Promise<DeliveryResult> {
  const channels: DeliveryChannel[] = [];
  let failuresCount = 0;
  const transporter = createTransporter();

  const emailConfigured = Boolean(transporter);
  const telegramConfigured = Boolean(TELEGRAM_WEBHOOK_URL);
  const configuredCount = Number(emailConfigured) + Number(telegramConfigured);

  if (transporter) {
    try {
      await transporter.sendMail({
        from: SMTP_FROM,
        to: LEADS_TO_EMAIL,
        subject: `Lead details [${payload.requestId}]`,
        text: [`Request ID: ${payload.requestId}`, `Locale: ${payload.locale}`, "", payload.details].join(
          "\n",
        ),
      });
      channels.push("email");
    } catch (error) {
      failuresCount += 1;
      logDeliveryError({requestId: payload.requestId, channel: "email", error});
    }
  }

  if (TELEGRAM_WEBHOOK_URL) {
    try {
      const response = await fetch(TELEGRAM_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: [`Lead details ${payload.requestId}`, payload.details].join("\n\n"),
        }),
      });

      if (!response.ok) {
        throw new Error(`status_${response.status}`);
      }

      channels.push("telegram");
    } catch (error) {
      failuresCount += 1;
      logDeliveryError({requestId: payload.requestId, channel: "telegram", error});
    }
  }

  ensureAtLeastOneChannelSucceeded(channels, failuresCount, configuredCount);

  return {
    channels,
    partial: failuresCount > 0 && channels.length > 0,
  };
}
