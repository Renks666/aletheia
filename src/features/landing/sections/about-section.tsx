import type {LandingCopy} from "../model/content";

type AboutSectionProps = {
  copy: LandingCopy;
};

export function AboutSection({copy}: AboutSectionProps) {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="section border-y border-line-soft bg-[radial-gradient(circle_at_28%_12%,rgba(143,106,67,0.14),transparent_40%),color-mix(in_srgb,var(--color-surface-900)_72%,transparent)]"
    >
      <div className="container">
        <article className="rounded-lg border border-line-soft bg-[color:color-mix(in_srgb,var(--color-bg-950)_64%,transparent)] p-[clamp(1.3rem,3vw,2.1rem)]">
          <h2 id="about-heading" className="max-w-[18ch] text-[clamp(1.9rem,2.8vw,2.63rem)]">{copy.aboutTitle}</h2>
          <p className="mt-4 max-w-[64ch] text-muted">{copy.aboutText}</p>
        </article>
      </div>
    </section>
  );
}
