import type {Metadata} from "next";
import {headers} from "next/headers";
import localFont from "next/font/local";
import {hasLocale} from "next-intl";

import {routing} from "@/shared/lib/i18n/routing";
import "@/shared/styles/tokens.css";
import "./globals.css";

const muller = localFont({
  variable: "--font-heading",
  display: "swap",
  src: [
    {path: "./fonts/muller-regular.otf", weight: "400", style: "normal"},
    {path: "./fonts/muller-medium.otf", weight: "500", style: "normal"},
    {path: "./fonts/muller-bold.otf", weight: "700", style: "normal"},
    {path: "./fonts/muller-extrabold.otf", weight: "800", style: "normal"},
  ],
});

const mullerBody = localFont({
  variable: "--font-body",
  display: "swap",
  src: [
    {path: "./fonts/muller-regular.otf", weight: "400", style: "normal"},
    {path: "./fonts/muller-medium.otf", weight: "500", style: "normal"},
    {path: "./fonts/muller-bold.otf", weight: "700", style: "normal"},
  ],
});

const bebas = localFont({
  variable: "--font-accent",
  display: "swap",
  src: [
    {path: "./fonts/bebas-regular.otf", weight: "400", style: "normal"},
    {path: "./fonts/bebas-bold.otf", weight: "700", style: "normal"},
  ],
});

const neosansFallback = localFont({
  variable: "--font-fallback-sans",
  display: "swap",
  preload: false,
  src: [
    {path: "./fonts/neosans-regular.otf", weight: "400", style: "normal"},
    {path: "./fonts/neosans-bold.otf", weight: "700", style: "normal"},
  ],
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
      <body
        className={`${muller.variable} ${mullerBody.variable} ${bebas.variable} ${neosansFallback.variable} bg-bg text-text antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
