import type {AudienceRole, Locale} from "@/shared/lib/i18n/types";

export type ServiceItem = {
  slug: string;
  title: string;
  summary: string;
  audience: AudienceRole[];
  order: number;
};

export type CaseItem = {
  title: string;
  challenge: string;
  result: string;
  metrics?: string[];
  isAnonymized: boolean;
};

export type FaqItem = {
  question: string;
  answer: string;
  locale: Locale;
  order: number;
};

export type LandingCmsContent = {
  services: ServiceItem[];
  cases: CaseItem[];
  faq: FaqItem[];
};

