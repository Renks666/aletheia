import type {CaseItem, FaqItem, ServiceItem} from "@/shared/lib/cms/types";
import type {AudienceRole, Locale} from "@/shared/lib/i18n/types";

import type {LandingCopy} from "./content";

export type LandingPageProps = {
  locale: Locale;
  services: ServiceItem[];
  cases: CaseItem[];
  faq: FaqItem[];
};

export type SharedSectionProps = {
  locale: Locale;
  copy: LandingCopy;
  role: AudienceRole;
};

