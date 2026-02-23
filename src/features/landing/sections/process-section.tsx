import Image from "next/image";

import type {LandingCopy} from "../model/content";

type ProcessSectionProps = {
  copy: LandingCopy;
};

export function ProcessSection({copy}: ProcessSectionProps) {
  return (
    <section id="process" aria-labelledby="process-heading" className="section">
      <div className="container">
        <header className="mb-[clamp(1.3rem,2.7vw,2.15rem)] grid gap-3">
          <h2 id="process-heading" className="text-[clamp(1.9rem,3vw,2.53rem)]">{copy.processTitle}</h2>
          <p className="max-w-[64ch] text-muted">{copy.processIntro}</p>
        </header>

        <div className="grid grid-cols-1 gap-[clamp(1rem,2.2vw,1.4rem)] lg:grid-cols-[minmax(250px,330px)_minmax(0,1fr)]">
          <div className="relative min-h-[280px] overflow-hidden rounded-md border border-line-soft lg:min-h-[430px]">
            <Image
              src="/brand/logo/mark-purple-512.png"
              alt="Themis scales close-up"
              fill
              sizes="330px"
              className="object-contain object-center p-4"
            />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_34%,rgba(201,164,119,0.2),transparent_48%),radial-gradient(circle_at_78%_65%,rgba(46,24,77,0.48),transparent_52%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(20,20,24,0.4),rgba(20,20,24,0.78))]" />
          </div>

          <div className="grid gap-3">
            {copy.process.map((item) => (
              <article
                key={item.stage}
                className="rounded-md border border-line-soft bg-[color:color-mix(in_srgb,var(--color-surface-900)_88%,transparent)] p-[clamp(1rem,1.6vw,1.15rem)]"
              >
                <p className="font-accent text-xs uppercase tracking-[0.09em] text-bronze-300">{item.stage}</p>
                <h3 className="mt-1 text-xl leading-tight">{item.title}</h3>
                <p className="mt-1 text-sm text-muted">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
