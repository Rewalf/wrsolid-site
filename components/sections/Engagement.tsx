import { Check } from 'lucide-react';
import type { SectionOf } from '@/lib/content';
import { Section, SectionHeader, type Tone } from '@/components/ui/Section';
import Button from '@/components/ui/Button';

export default function Engagement({ section, tone }: { section: SectionOf<'engagement'>; tone: Tone }) {
  return (
    <Section id={section.id} tone={tone}>
      <SectionHeader eyebrow={section.eyebrow} title={section.title} intro={section.intro} />
      <div className="grid gap-6 md:grid-cols-2">
        {section.options.map((option, i) => (
          <article key={option.name} className="flex flex-col rounded-sm border border-line bg-card p-7 md:p-9">
            <h3 className="font-heading text-2xl font-bold text-heading">{option.name}</h3>
            <p className="mt-1 text-sm font-medium uppercase tracking-wider text-muted">{option.duration}</p>
            <p className="mt-5 leading-relaxed text-fg">{option.text}</p>
            <ul className="mt-6 mb-8 space-y-2.5">
              {option.points.map((p) => (
                <li key={p} className="flex gap-3 text-sm text-fg">
                  <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-navy" />
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-auto">
              <Button href={option.cta.href} variant={i === 0 ? 'primary' : 'secondary'}>
                {option.cta.label}
              </Button>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
