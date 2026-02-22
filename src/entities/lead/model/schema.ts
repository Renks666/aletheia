import {z} from "zod";

const baseString = z.string().trim();

export const leadRoleSchema = z.enum(["player", "club", "agent", "coach", "parent"]);

export const leadRequestSchema = z.object({
  locale: z.enum(["ru", "en"]),
  name: baseString.min(2).max(80),
  phone: baseString
    .min(7)
    .max(25)
    .regex(/^[\d+()\s-]+$/, "Invalid phone format"),
  email: z.string().trim().email().max(160).optional().or(z.literal("")),
  role: leadRoleSchema,
  service: baseString.min(2).max(100),
  message: baseString.max(1500).optional().or(z.literal("")),
  consent: z.literal(true),
  source: baseString.max(120).optional(),
});

export const leadDetailsSchema = z.object({
  requestId: z.string().uuid(),
  locale: z.enum(["ru", "en"]),
  detailsToken: z.string().trim().min(1).max(512),
  details: baseString.min(10).max(3000),
});

export type LeadRequestInput = z.infer<typeof leadRequestSchema>;
export type LeadDetailsInput = z.infer<typeof leadDetailsSchema>;

