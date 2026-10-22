import type { SectionOf } from '@/lib/content';
import { Section, SectionHeader, type Tone } from '@/components/ui/Section';

export default function Principles({ section, tone }: { section: SectionOf<'principles'>; tone: Tone }) {
  return (
    <Section id={section.id} tone={tone}>
      <SectionHeader eyebrow={section.eyebrow} title={section.title} intro={section.intro} />
      <div className="grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
        {section.items.map((item) => (
          <div key={item.title} className="border-t border-line pt-6">
            <h3 className="font-heading text-lg font-semibold text-heading">{item.title}</h3>
            <p className="mt-3 leading-relaxed text-muted">{item.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
