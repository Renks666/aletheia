import {Mail, Phone, Send} from "lucide-react";

import {Badge} from "@/shared/ui/badge";
import {getLocaleMessages} from "@/shared/lib/i18n/messages";
import type {Locale} from "@/shared/lib/i18n/types";

type FooterProps = {
  locale: Locale;
};

export function Footer({locale}: FooterProps) {
  const common = getLocaleMessages(locale).common;
  const contacts = [
    {
      id: "email",
      label: common.contactEmail,
      href: "mailto:info@aletheia.pro",
      value: "info@aletheia.pro",
      icon: <Mail className="size-4" aria-hidden />,
    },
    {
      id: "phone",
      label: common.contactPhone,
      href: "tel:+79808880044",
      value: "+7 980 888 00 44",
      icon: <Phone className="size-4" aria-hidden />,
    },
    {
      id: "telegram",
      label: common.contactTelegram,
      href: "https://t.me/AletheiaFootball",
      value: "t.me/AletheiaFootball",
      icon: <Send className="size-4" aria-hidden />,
    },
  ] as const;

  return (
    <footer
      id="contact"
      className="scroll-mt-[72px] border-t border-line-soft bg-[color:color-mix(in_srgb,var(--color-bg-950)_92%,#0b0b0e)] py-10 lg:scroll-mt-[86px]"
    >
      <div className="container grid gap-8">
        <div className="flex flex-wrap items-start justify-between gap-8">
          <div className="grid gap-2">
            <Badge variant="accent" className="w-fit text-[0.64rem]">
              2026
            </Badge>
            <p className="text-base font-semibold">{common.company}</p>
            <p className="text-sm text-muted">{common.fullCompany}</p>
            <p className="text-sm text-muted">{common.slogan}</p>
            <p className="text-sm text-muted">{common.founded}</p>
          </div>

          <div className="grid min-w-[min(28rem,100%)] gap-3">
            <p className="font-accent text-sm uppercase tracking-[0.08em] text-text">{common.contactsTitle}</p>
            <ul className="grid gap-2">
              {contacts.map((contact) => (
                <li
                  className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 rounded-sm border border-line-soft bg-[color:color-mix(in_srgb,var(--color-surface-900)_78%,transparent)] px-3 py-2"
                  key={contact.id}
                >
                  <span className="inline-flex size-8 items-center justify-center rounded-full border border-line-strong bg-[radial-gradient(circle_at_30%_30%,rgba(201,164,119,0.25),rgba(30,33,39,0.2))] text-bronze-300 shadow-[inset_0_0_18px_rgba(143,106,67,0.12)]">
                    {contact.icon}
                  </span>
                  <div className="grid gap-0.5">
                    <span className="font-accent text-[0.68rem] uppercase tracking-[0.08em] text-muted">
                      {contact.label}
                    </span>
                    <a
                      href={contact.href}
                      target={contact.id === "telegram" ? "_blank" : undefined}
                      rel={contact.id === "telegram" ? "noreferrer" : undefined}
                      className="focus-ring w-fit rounded-sm text-sm text-text transition-colors hover:text-bronze-300"
                    >
                      {contact.value}
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="h-px w-full bg-line-soft" />

        <div className="flex flex-wrap items-start justify-between gap-3 text-sm text-muted">
          <div className="flex flex-wrap gap-4">
            <a href={`/${locale}/legal/privacy`} className="focus-ring rounded-sm transition-colors hover:text-bronze-300">
              {common.privacyPolicy}
            </a>
            <a href={`/${locale}/legal/consent`} className="focus-ring rounded-sm transition-colors hover:text-bronze-300">
              {common.personalDataConsent}
            </a>
          </div>
          <p>© 2026 Aletheia</p>
        </div>
      </div>
    </footer>
  );
}
