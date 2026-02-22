import {routing} from "@/shared/lib/i18n/routing";

export type Locale = (typeof routing.locales)[number];
export type AudienceRole = "player" | "club" | "agent" | "coach" | "parent";

