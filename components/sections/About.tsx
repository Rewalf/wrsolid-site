import { ArrowUpRight, Check } from 'lucide-react';
import type { SectionOf } from '@/lib/content';
import { Section, SectionHeader, type Tone } from '@/components/ui/Section';

export default function About({ section, tone }: { section: SectionOf<'about'>; tone: Tone }) {
  return (
    <Section id={section.id} tone={tone}>
      <SectionHeader eyebrow={section.eyebrow} title={section.title} />
      <div className="grid gap-12 lg:grid-cols-[3fr_2fr] lg:gap-16">
        <div className="space-y-5 text-lg leading-relaxed text-fg">
          {section.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
          {section.quote && (
            <blockquote className="mt-10 border-l-2 border-signal pl-6 font-heading text-xl font-medium leading-relaxed text-heading">
              {section.quote}
            </blockquote>
          )}
        </div>

        <aside className="self-start rounded-sm bg-card p-7">
          {section.credentials.length > 0 && (
            <ul className="space-y-3">
              {section.credentials.map((c) => (
                <li key={c} className="flex gap-3 text-sm text-fg">
                  <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-signal" />
                  {c}
                </li>
              ))}
            </ul>
          )}
          {section.links.length > 0 && (
            <ul className="mt-7 space-y-2 border-t border-line pt-6">
              {section.links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-heading underline-offset-4 hover:underline"
                  >
                    {l.label}
                    <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </aside>
      </div>
    </Section>
  );
}
