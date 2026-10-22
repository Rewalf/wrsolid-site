import { Check, Cloud, CodeXml, Compass, Workflow } from 'lucide-react';
import type { SectionOf, iconNames } from '@/lib/content';
import { Section, SectionHeader, type Tone } from '@/components/ui/Section';

const icons: Record<(typeof iconNames)[number], typeof Cloud> = {
  cloud: Cloud,
  code: CodeXml,
  pipeline: Workflow,
  compass: Compass,
};

export default function Services({ section, tone }: { section: SectionOf<'services'>; tone: Tone }) {
  return (
    <Section id={section.id} tone={tone}>
      <SectionHeader eyebrow={section.eyebrow} title={section.title} intro={section.intro} />
      <div className="grid gap-6 md:grid-cols-2">
        {section.items.map((item) => {
          const Icon = icons[item.icon];
          return (
            <article key={item.title} className="flex flex-col rounded-sm border border-line bg-card p-7 md:p-9">
              <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-sm bg-navy text-chalk">
                <Icon aria-hidden="true" className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-heading">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{item.text}</p>
              {item.points.length > 0 && (
                <ul className="mt-6 space-y-2.5">
                  {item.points.map((p) => (
                    <li key={p} className="flex gap-3 text-sm text-fg">
                      <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-navy" />
                      {p}
                    </li>
                  ))}
                </ul>
              )}
              {item.extra && (
                <div className="mt-7 border-l-2 border-signal pl-4">
                  <p className="text-sm font-semibold text-heading">{item.extra.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{item.extra.text}</p>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </Section>
  );
}
