import type {Metadata} from "next";

import {getLocaleMessages} from "@/shared/lib/i18n/messages";
import type {Locale} from "@/shared/lib/i18n/types";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{locale: Locale}>;
}) {
  const {locale} = await params;
  const common = getLocaleMessages(locale).common;

  return (
    <main className="section">
      <div className="container">
        <h1>{common.privacyPolicy}</h1>
        <p>
          {locale === "en"
            ? "This page describes how Aletheia processes personal data submitted through lead forms."
            : "На этой странице описано, как Алетейя обрабатывает персональные данные, отправленные через формы обратной связи."}
        </p>
      </div>
    </main>
  );
}
