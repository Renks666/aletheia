import type {CaseItem} from "@/shared/lib/cms/types";

import type {LandingCopy} from "../model/content";
import styles from "../landing-page.module.css";

type ProofSectionProps = {
  copy: LandingCopy;
  cases: CaseItem[];
};

export function ProofSection({copy, cases}: ProofSectionProps) {
  return (
    <section id="cases" className="section">
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2>{copy.proofTitle}</h2>
          <p>{copy.proofIntro}</p>
        </div>

        <div className={styles.proofGrid}>
          {cases.map((item) => (
            <article key={item.title} className={styles.caseCard}>
              <span className={styles.caseTag}>{copy.caseTag}</span>
              <h3 className={styles.caseTitle}>{item.title}</h3>
              <p className={styles.caseText}>{item.challenge}</p>
              <p className={styles.caseText}>{item.result}</p>
              {item.metrics?.length ? (
                <div className={styles.metrics}>
                  {item.metrics.map((metric) => (
                    <span key={metric} className={styles.metric}>
                      {metric}
                    </span>
                  ))}
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
