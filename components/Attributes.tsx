'use client';

import { useTranslations } from 'next-intl';

const icons = [
  /* Disruptive Innovation — rocket */
  <svg key="0" width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 2C12 2 17 5 17 12L14.5 14.5M12 2C12 2 7 5 7 12L9.5 14.5M12 2L12 8" stroke="#00F2FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.5 14.5L7 17L9 17L9 21L12 18L15 21L15 17L17 17L14.5 14.5" stroke="#00F2FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="10" r="2" stroke="#00F2FF" strokeWidth="1.5"/>
  </svg>,
  /* Elite Expertise — diamond */
  <svg key="1" width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 3L21 9L12 21L3 9L12 3Z" stroke="#00F2FF" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M3 9H21M8 9L12 3M16 9L12 3" stroke="#00F2FF" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>,
  /* Real Agility — lightning bolt */
  <svg key="2" width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M13 2L4 14H12L11 22L20 10H12L13 2Z" stroke="#00F2FF" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"/>
  </svg>,
  /* Technical Transparency — code */
  <svg key="3" width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M8 9L4 12L8 15M16 9L20 12L16 15M14 5L10 19" stroke="#00F2FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>,
];

const keys = ['item1', 'item2', 'item3', 'item4'] as const;

export default function Attributes() {
  const t = useTranslations('attributes');

  return (
    <section
      id="about"
      className="py-24 md:py-32"
      style={{ backgroundColor: '#1A1A1B' }}
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Section header */}
        <div className="mb-16">
          <p
            style={{
              fontFamily: 'var(--font-mono-custom), monospace',
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              color: '#00F2FF',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
            }}
          >
            01 — ABOUT
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-syne), Syne, sans-serif',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: '#F4F4F4',
            }}
          >
            {t('title')}
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {keys.map((key, i) => (
            <div
              key={key}
              className="card-hover p-6 rounded-sm"
              style={{
                backgroundColor: '#333639',
                border: '1px solid rgba(244,244,244,0.06)',
                animationDelay: `${i * 100}ms`,
              }}
            >
              <div
                className="mb-5 p-2.5 inline-block rounded-sm"
                style={{ backgroundColor: 'rgba(0,242,255,0.08)', border: '1px solid rgba(0,242,255,0.15)' }}
              >
                {icons[i]}
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-syne), Syne, sans-serif',
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: '#F4F4F4',
                  marginBottom: '0.5rem',
                }}
              >
                {t(`${key}_title` as const)}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-barlow), Barlow, sans-serif',
                  fontSize: '0.875rem',
                  fontWeight: 300,
                  lineHeight: 1.65,
                  color: 'rgba(244,244,244,0.55)',
                }}
              >
                {t(`${key}_desc` as const)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
