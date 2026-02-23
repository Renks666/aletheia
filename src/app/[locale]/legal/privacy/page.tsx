import type {Metadata} from "next";

import {Badge} from "@/shared/ui/badge";
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
        <article className="mx-auto grid max-w-3xl gap-4 rounded-xl border border-line-soft bg-[var(--gradient-panel)] p-6 shadow-soft md:p-8">
          <Badge variant="accent" className="w-fit text-[0.64rem]">
            Legal
          </Badge>
          <h1 className="text-[clamp(1.65rem,3vw,2.4rem)] leading-tight">{common.privacyPolicy}</h1>
          <p className="text-muted">
            {locale === "en"
              ? "This page describes how Aletheia processes personal data submitted through lead forms."
              : "На этой странице описано, как Алетейя обрабатывает персональные данные, отправленные через формы обратной связи."}
          </p>
        </article>
      </div>
    </main>
  );
}
