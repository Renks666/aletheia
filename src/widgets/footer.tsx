import {getLocaleMessages} from "@/shared/lib/i18n/messages";
import type {Locale} from "@/shared/lib/i18n/types";

import styles from "./footer.module.css";

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
      icon: (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 7.5a1.5 1.5 0 0 1 1.5-1.5h13A1.5 1.5 0 0 1 20 7.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 16.5z"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <path d="m5.2 7.2 6.8 5 6.8-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: "phone",
      label: common.contactPhone,
      href: "tel:+79808880044",
      value: "+7 980 888 00 44",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M8.3 5.6c.4-.9 1.4-1.3 2.3-1l1.6.6c.9.3 1.3 1.3 1.1 2.2l-.4 1.7a1.2 1.2 0 0 1-1.2 1c-.5 0-1 .3-1.2.8-.2.5-.2 1 0 1.5.9 2.2 2.6 3.9 4.8 4.8.5.2 1 .2 1.5 0 .5-.2.8-.7.8-1.2a1.2 1.2 0 0 1 1-1.2l1.7-.4c.9-.2 1.8.2 2.2 1.1l.6 1.6c.3.9-.1 1.9-1 2.3l-.8.3a4.3 4.3 0 0 1-3.2.1 16.9 16.9 0 0 1-10.5-10.5 4.3 4.3 0 0 1 .1-3.2z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: "telegram",
      label: common.contactTelegram,
      href: "https://t.me/AletheiaFootball",
      value: "t.me/AletheiaFootball",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M20.7 5.3c.5-.2 1 .2.9.8l-2.1 11.5c-.1.6-.8.9-1.3.6l-3.9-2.8-2.1 2.1c-.4.4-1.1.2-1.2-.4l-.6-4.1-4-1.3c-.6-.2-.7-1-.1-1.3z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path d="M21 6 9.2 12.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      ),
    },
  ] as const;

  return (
    <footer id="contact" className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.row}>
          <div className={styles.company}>
            <p className={styles.name}>{common.company}</p>
            <p className={styles.meta}>{common.fullCompany}</p>
            <p className={styles.meta}>{common.slogan}</p>
            <p className={styles.meta}>{common.founded}</p>
          </div>

          <div className={styles.contacts}>
            <p className={styles.contactsTitle}>{common.contactsTitle}</p>
            <ul className={styles.contactsList}>
              {contacts.map((contact) => (
                <li className={styles.contactItem} key={contact.id}>
                  <span className={styles.contactIcon}>{contact.icon}</span>
                  <div className={styles.contactBody}>
                    <span className={styles.contactLabel}>{contact.label}</span>
                    <a
                      href={contact.href}
                      target={contact.id === "telegram" ? "_blank" : undefined}
                      rel={contact.id === "telegram" ? "noreferrer" : undefined}
                    >
                      {contact.value}
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.legal}>
          <div className={styles.legalLinks}>
            <a href={`/${locale}/legal/privacy`}>{common.privacyPolicy}</a>
            <a href={`/${locale}/legal/consent`}>{common.personalDataConsent}</a>
          </div>
          <p className={styles.copy}>© 2026 Aletheia</p>
        </div>
      </div>
    </footer>
  );
}
