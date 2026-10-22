import { Mail } from 'lucide-react';
import type { SectionOf } from '@/lib/content';
import { SectionHeader } from '@/components/ui/Section';
import Button from '@/components/ui/Button';

export default function Contact({ section }: { section: SectionOf<'contact'> }) {
  const mailto = `mailto:${section.email}?subject=${encodeURIComponent(section.subject)}`;
  return (
    <section id={section.id} className="tone-dark stone-texture px-4 py-24 sm:px-6 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow={section.eyebrow} title={section.title} intro={section.intro} center />
        <div className="flex flex-col items-center gap-5">
          <Button href={mailto}>{section.cta}</Button>
          <a href={mailto} className="inline-flex items-center gap-2 text-sm text-muted hover:text-heading">
            <Mail aria-hidden="true" className="h-4 w-4" />
            {section.email}
          </a>
        </div>
      </div>
    </section>
  );
}
