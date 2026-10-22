import type { SectionOf } from '@/lib/content';
import { Section, SectionHeader, type Tone } from '@/components/ui/Section';

export default function Experience({ section, tone }: { section: SectionOf<'experience'>; tone: Tone }) {
  return (
    <Section id={section.id} tone={tone}>
      <SectionHeader eyebrow={section.eyebrow} title={section.title} intro={section.intro} />
      <div className="grid gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16">
        <div>
          <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-muted">{section.industriesTitle}</h3>
          <ul className="flex flex-wrap gap-2.5">
            {section.industries.map((industry) => (
              <li key={industry} className="rounded-full border border-line bg-card px-4 py-2 text-sm text-fg">
                {industry}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-muted">{section.stackTitle}</h3>
          <dl className="divide-y divide-line border-y border-line">
            {section.stack.map((row) => (
              <div key={row.group} className="grid gap-1 py-4 sm:grid-cols-[8rem_1fr] sm:gap-6">
                <dt className="font-heading text-sm font-semibold text-heading">{row.group}</dt>
                <dd className="text-sm leading-relaxed text-fg">{row.items.join(' · ')}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
