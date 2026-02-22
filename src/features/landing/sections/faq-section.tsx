import type {FaqItem} from "@/shared/lib/cms/types";

import type {LandingCopy} from "../model/content";
import styles from "../landing-page.module.css";

type FaqSectionProps = {
  copy: LandingCopy;
  faq: FaqItem[];
};

export function FaqSection({copy, faq}: FaqSectionProps) {
  return (
    <section id="faq" className="section">
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2>{copy.faqTitle}</h2>
        </div>

        <div className={styles.faqGrid}>
          {faq.map((item) => (
            <details key={item.question} className={styles.faqItem}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
