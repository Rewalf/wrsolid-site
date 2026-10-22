import { Check } from 'lucide-react';
import type { SectionOf } from '@/lib/content';
import Button from '@/components/ui/Button';

export default function Hero({ section }: { section: SectionOf<'hero'> }) {
  return (
    <section id={section.id} className="tone-dark stone-texture px-4 pb-24 pt-36 sm:px-6 md:pb-32 md:pt-48">
      <div className="mx-auto max-w-6xl">
        <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-muted">
          <span aria-hidden="true" className="h-0.5 w-8 bg-signal" />
          {section.eyebrow}
        </p>
        <h1 className="max-w-4xl font-heading text-5xl font-bold leading-[1.05] tracking-tight text-heading sm:text-6xl md:text-7xl">
          {section.title}
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">{section.lead}</p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          {section.actions.map((a) => (
            <Button key={a.href + a.label} href={a.href} variant={a.style}>
              {a.label}
            </Button>
          ))}
        </div>

        {section.highlights.length > 0 && (
          <ul className="mt-14 flex flex-col gap-3 border-t border-line pt-8 text-sm text-fg sm:flex-row sm:gap-10">
            {section.highlights.map((h) => (
              <li key={h} className="flex items-center gap-2">
                <Check aria-hidden="true" className="h-4 w-4 text-signal" />
                {h}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
