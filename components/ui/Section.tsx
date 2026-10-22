export type Tone = 'dark' | 'light';

interface SectionProps {
  id: string;
  tone: Tone;
  className?: string;
  children: React.ReactNode;
}

export function Section({ id, tone, className = '', children }: SectionProps) {
  return (
    <section id={id} className={`tone-${tone} px-4 py-20 sm:px-6 md:py-28 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

interface HeaderProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  center?: boolean;
}

export function SectionHeader({ eyebrow, title, intro, center = false }: HeaderProps) {
  return (
    <header className={`mb-12 max-w-3xl md:mb-16 ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <p className={`mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted ${center ? 'justify-center' : ''}`}>
          <span aria-hidden="true" className="h-0.5 w-6 bg-signal" />
          {eyebrow}
        </p>
      )}
      <h2 className="font-heading text-3xl font-bold tracking-tight text-heading md:text-4xl">{title}</h2>
      {intro && <p className="mt-5 text-lg leading-relaxed text-muted">{intro}</p>}
    </header>
  );
}
