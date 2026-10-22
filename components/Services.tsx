'use client';

import { useTranslations } from 'next-intl';

const solidPrinciples = [
  { letter: 'S', label: 'Single Responsibility' },
  { letter: 'O', label: 'Open/Closed' },
  { letter: 'L', label: 'Liskov Substitution' },
  { letter: 'I', label: 'Interface Segregation' },
  { letter: 'D', label: 'Dependency Inversion' },
];

export default function Services() {
  const t = useTranslations('solid');

  return (
    <section
      id="framework"
      className="py-24 md:py-32 px-6"
      style={{ borderTop: '1px solid rgba(244,244,244,0.05)', borderBottom: '1px solid rgba(244,244,244,0.05)' }}
    >
      <div className="max-w-7xl mx-auto text-center">
        <h2
          className="font-bold uppercase mb-16"
          style={{
            fontSize: '1.25rem',
            letterSpacing: '0.4em',
            color: 'rgba(244,244,244,0.4)',
            fontFamily: 'var(--font-syne), Syne, sans-serif',
          }}
        >
          {t('title')}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {solidPrinciples.map(({ letter, label }) => (
            <div key={letter} className="solid-letter-item flex flex-col items-center gap-4">
              <div
                className="solid-letter font-black"
                style={{
                  fontSize: '4rem',
                  fontFamily: 'var(--font-syne), Syne, sans-serif',
                  lineHeight: 1,
                  color: 'transparent',
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  ...({ WebkitTextStroke: '1px rgba(244,244,244,0.2)' } as any),
                }}
              >
                {letter}
              </div>
              <div
                className="uppercase font-bold"
                style={{
                  fontSize: '0.625rem',
                  letterSpacing: '0.15em',
                  color: 'rgba(244,244,244,0.6)',
                  fontFamily: 'var(--font-barlow), Barlow, sans-serif',
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
