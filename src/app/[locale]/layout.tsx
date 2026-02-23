import type {Metadata} from "next";
import {NextIntlClientProvider, hasLocale} from "next-intl";
import {getMessages, setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";

import {getLocaleMessages} from "@/shared/lib/i18n/messages";
import {routing} from "@/shared/lib/i18n/routing";

function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://aletheia.pro";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const resolvedLocale = hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;
  const messages = getLocaleMessages(resolvedLocale);
  const siteUrl = getSiteUrl();
  const canonicalPath = `/${resolvedLocale}`;

  return {
    metadataBase: new URL(siteUrl),
    title: messages.meta.title,
    description: messages.meta.description,
    alternates: {
      canonical: canonicalPath,
      languages: {
        ru: "/ru",
        en: "/en",
      },
    },
    openGraph: {
      type: "website",
      locale: resolvedLocale,
      url: `${siteUrl}${canonicalPath}`,
      title: messages.meta.title,
      description: messages.meta.description,
      siteName: "Aletheia",
      images: [
        {
          url: "/brand/logo/mark-purple-512.png",
          width: 512,
          height: 512,
          alt: "Aletheia",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: messages.meta.title,
      description: messages.meta.description,
      images: ["/brand/logo/mark-purple-512.png"],
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  const {locale} = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>;
}
