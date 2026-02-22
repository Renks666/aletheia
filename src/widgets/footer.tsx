import {getLocaleMessages} from "@/shared/lib/i18n/messages";
import type {Locale} from "@/shared/lib/i18n/types";

import styles from "./footer.module.css";

type FooterProps = {
  locale: Locale;
};

export function Footer({locale}: FooterProps) {
  const common = getLocaleMessages(locale).common;

  return (
    <footer id="contact" className={styles.footer}>
      <div className={`container ${styles.row}`}>
        <div className={styles.company}>
          <p className={styles.name}>{common.company}</p>
          <p className={styles.meta}>{common.fullCompany}</p>
          <p className={styles.meta}>{common.slogan}</p>
          <p className={styles.meta}>{common.founded}</p>
        </div>

        <div className={styles.links}>
          <a href="mailto:info@aletheia.pro">info@aletheia.pro</a>
          <a href="tel:+79808880044">+7 980 888 00 44</a>
          <a href="https://t.me/AletheiaFootball" target="_blank" rel="noreferrer">
            t.me/AletheiaFootball
          </a>
          <a href={`/${locale}/legal/privacy`}>{common.privacyPolicy}</a>
          <a href={`/${locale}/legal/consent`}>{common.personalDataConsent}</a>
          <p>© {new Date().getFullYear()} Aletheia</p>
        </div>
      </div>
    </footer>
  );
}
