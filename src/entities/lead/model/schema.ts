import {z} from "zod";

const baseString = z.string().trim();

export const leadRoleSchema = z.enum(["player", "club", "agent", "coach", "parent", "other"]);

export const leadRequestSchema = z.object({
  locale: z.enum(["ru", "en"]),
  name: baseString.min(2).max(80),
  phone: baseString
    .min(7)
    .max(25)
    .regex(/^\+?\d+$/, "Invalid phone format"),
  email: z.string().trim().email().max(160).optional().or(z.literal("")),
  role: leadRoleSchema,
  service: baseString.min(2).max(100),
  message: baseString.max(1500).optional().or(z.literal("")),
  consent: z.literal(true),
  source: baseString.max(120).optional(),
  sourceDetail: baseString.max(240).optional(),
  landingVariant: baseString.max(120).optional(),
  utmSource: baseString.max(120).optional(),
  utmMedium: baseString.max(120).optional(),
  utmCampaign: baseString.max(160).optional(),
  utmTerm: baseString.max(160).optional(),
  utmContent: baseString.max(160).optional(),
});

export const leadDetailsSchema = z.object({
  requestId: z.string().uuid(),
  locale: z.enum(["ru", "en"]),
  detailsToken: z.string().trim().min(1).max(512),
  details: baseString.min(10).max(3000),
});

export type LeadRequestInput = z.infer<typeof leadRequestSchema>;
export type LeadDetailsInput = z.infer<typeof leadDetailsSchema>;

