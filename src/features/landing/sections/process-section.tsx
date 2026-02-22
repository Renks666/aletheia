import Image from "next/image";

import type {LandingCopy} from "../model/content";
import styles from "../landing-page.module.css";

type ProcessSectionProps = {
  copy: LandingCopy;
};

export function ProcessSection({copy}: ProcessSectionProps) {
  return (
    <section id="process" className="section">
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2>{copy.processTitle}</h2>
          <p>{copy.processIntro}</p>
        </div>

        <div className={styles.processGrid}>
          <div className={styles.processVisual}>
            <Image src="/brand/logo/mark-purple-512.png" alt="Themis scales close-up" fill sizes="330px" />
          </div>

          <div className={styles.processList}>
            {copy.process.map((item) => (
              <article key={item.stage} className={styles.processItem}>
                <p className={styles.processStage}>{item.stage}</p>
                <h3 className={styles.processTitle}>{item.title}</h3>
                <p className={styles.processText}>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
