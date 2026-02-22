import type {Metadata} from "next";
import {headers} from "next/headers";
import {Cormorant_Garamond, IBM_Plex_Sans} from "next/font/google";
import {hasLocale} from "next-intl";

import {routing} from "@/shared/lib/i18n/routing";
import "@/shared/styles/tokens.css";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-body",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Алетейя | Спортивный юрист в футболе",
  description:
    'Первая правовая футбольная компания "Алетейя". Комплексная юридическая защита игроков, клубов и агентов.',
};

export default async function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  const requestHeaders = await headers();
  const headerLocale = requestHeaders.get("x-next-intl-locale");
  const htmlLang = hasLocale(routing.locales, headerLocale) ? headerLocale : routing.defaultLocale;

  return (
    <html lang={htmlLang} suppressHydrationWarning>
      <body className={`${cormorant.variable} ${ibmPlexSans.variable}`}>{children}</body>
    </html>
  );
}
