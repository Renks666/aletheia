import type {LandingCopy} from "../model/content";
import styles from "../landing-page.module.css";

type AboutSectionProps = {
  copy: LandingCopy;
};

export function AboutSection({copy}: AboutSectionProps) {
  return (
    <section id="about" className={`section ${styles.about}`}>
      <div className="container">
        <div className={styles.aboutBox}>
          <h2>{copy.aboutTitle}</h2>
          <p>{copy.aboutText}</p>
        </div>
      </div>
    </section>
  );
}
