export type LeadRole = "player" | "club" | "agent" | "coach" | "parent";

export type DeliveryChannel = "email" | "telegram";

export type LeadErrorCode =
  | "validation_error"
  | "malformed_json"
  | "rate_limited"
  | "delivery_not_configured"
  | "delivery_failed"
  | "invalid_details_token";

export type LeadRequest = {
  locale: "ru" | "en";
  name: string;
  phone: string;
  email?: string;
  role: LeadRole;
  service: string;
  message?: string;
  consent: true;
  source?: string;
  sourceDetail?: string;
  landingVariant?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
};

export type LeadSuccessResponse = {
  ok: true;
  requestId: string;
  channels: DeliveryChannel[];
  partial: boolean;
  detailsToken?: string;
};

export type LeadErrorResponse = {
  ok: false;
  error: LeadErrorCode;
};

export type LeadResponse = LeadSuccessResponse | LeadErrorResponse;

export type LeadDetailsRequest = {
  requestId: string;
  locale: "ru" | "en";
  detailsToken: string;
  details: string;
};
