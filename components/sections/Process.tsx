import type { SectionOf } from '@/lib/content';
import { Section, SectionHeader, type Tone } from '@/components/ui/Section';

export default function Process({ section, tone }: { section: SectionOf<'process'>; tone: Tone }) {
  return (
    <Section id={section.id} tone={tone}>
      <SectionHeader eyebrow={section.eyebrow} title={section.title} intro={section.intro} />
      <ol className="grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
        {section.steps.map((step, i) => (
          <li key={step.title} className="flex flex-col bg-surface p-6">
            <span className="font-heading text-sm font-bold text-signal">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="mt-3 font-heading text-lg font-semibold text-heading">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
          </li>
        ))}
      </ol>
      {section.note && (
        <div className="mt-10 flex flex-col gap-2 rounded-sm bg-card p-6 md:flex-row md:items-baseline md:gap-6 md:p-8">
          <p className="flex shrink-0 items-center gap-2 font-heading font-semibold text-heading">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-signal" />
            {section.note.title}
          </p>
          <p className="leading-relaxed text-muted">{section.note.text}</p>
        </div>
      )}
    </Section>
  );
}
