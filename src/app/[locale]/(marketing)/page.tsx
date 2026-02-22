import {LandingPage} from "@/features/landing/landing-page";
import {getLandingCmsContent} from "@/shared/lib/cms/content";
import {routing} from "@/shared/lib/i18n/routing";
import type {Locale} from "@/shared/lib/i18n/types";

export default async function MarketingHomePage({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale: localeParam} = await params;
  const locale: Locale = routing.locales.includes(localeParam as Locale)
    ? (localeParam as Locale)
    : routing.defaultLocale;

  const content = await getLandingCmsContent(locale);

  return (
    <LandingPage
      locale={locale}
      services={content.services}
      cases={content.cases}
      faq={content.faq}
    />
  );
}
