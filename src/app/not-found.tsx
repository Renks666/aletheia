import Link from "next/link";

import {Button} from "@/shared/ui/button";

export default function NotFound() {
  return (
    <main className="section">
      <div className="container">
        <section className="mx-auto grid max-w-2xl gap-5 rounded-xl border border-line-soft bg-[var(--gradient-panel)] p-7 text-center shadow-soft md:p-10">
          <p className="font-accent text-xs uppercase tracking-[0.12em] text-bronze-300">404</p>
          <h1 className="text-[clamp(1.8rem,4vw,2.7rem)] leading-tight">Страница недоступна</h1>
          <p className="text-muted">
            Раздел еще не опубликован или не существует в текущем контуре.
          </p>
          <div className="mx-auto">
            <Button asChild>
              <Link href="/ru">На главную</Link>
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
