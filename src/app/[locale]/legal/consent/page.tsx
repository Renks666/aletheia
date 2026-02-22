import type {Metadata} from "next";

import {getLocaleMessages} from "@/shared/lib/i18n/messages";
import type {Locale} from "@/shared/lib/i18n/types";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function PersonalDataConsentPage({
  params,
}: {
  params: Promise<{locale: Locale}>;
}) {
  const {locale} = await params;
  const common = getLocaleMessages(locale).common;

  return (
    <main className="section">
      <div className="container">
        <h1>{common.personalDataConsent}</h1>
        <p>
          {locale === "en"
            ? "By submitting the form, you consent to processing of personal data required for legal consultation."
            : "Отправляя форму, вы даете согласие на обработку персональных данных, необходимых для юридической консультации."}
        </p>
      </div>
    </main>
  );
}
