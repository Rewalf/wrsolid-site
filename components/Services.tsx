'use client';

import { useTranslations } from 'next-intl';

const icons = [
  /* Consulting — strategy arrow */
  <svg key="0" width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="2" y="3" width="8" height="6" rx="1" stroke="#00F2FF" strokeWidth="1.5"/>
    <rect x="9" y="9" width="8" height="6" rx="1" stroke="#00F2FF" strokeWidth="1.5"/>
    <rect x="14" y="15" width="8" height="6" rx="1" stroke="#00F2FF" strokeWidth="1.5"/>
    <path d="M10 6H16M13 6V9" stroke="#00F2FF" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M17 12H22M19.5 12V15" stroke="#00F2FF" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>,
  /* Development — brackets */
  <svg key="1" width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M7 8L3 12L7 16M17 8L21 12L17 16M14 4L10 20" stroke="#00F2FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>,
  /* Cloud Architecture — cloud + network */
  <svg key="2" width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M18 10C18 7.239 15.761 5 13 5C10.858 5 9.027 6.329 8.267 8.208C7.535 8.074 6.777 8.113 6.06 8.33C4.301 8.875 3 10.513 3 12.5C3 14.985 5.015 17 7.5 17H18C20.209 17 22 15.209 22 13C22 10.938 20.412 9.239 18.384 9.028C18.135 9.322 18 9.646 18 10Z" stroke="#00F2FF" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M12 17V21M9 21H15M8 21V19M16 21V19" stroke="#00F2FF" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>,
];

const keys = ['item1', 'item2', 'item3'] as const;

export default function Services() {
  const t = useTranslations('services');

  return (
    <section
      id="services"
      className="py-24 md:py-32"
      style={{ backgroundColor: '#0F1011' }}
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
            02 — SERVICES
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

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {keys.map((key, i) => (
            <div
              key={key}
              className="card-hover relative p-8 rounded-sm overflow-hidden"
              style={{
                backgroundColor: '#1A1A1B',
                border: '1px solid rgba(244,244,244,0.07)',
              }}
            >
              {/* Accent top line */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: 'linear-gradient(to right, #00F2FF, transparent)',
                  opacity: 0.6,
                }}
              />

              {/* Number */}
              <div
                style={{
                  fontFamily: 'var(--font-mono-custom), monospace',
                  fontSize: '0.65rem',
                  letterSpacing: '0.15em',
                  color: 'rgba(0,242,255,0.35)',
                  marginBottom: '1.5rem',
                }}
              >
                0{i + 1}
              </div>

              {/* Icon */}
              <div className="mb-6">{icons[i]}</div>

              {/* Title */}
              <h3
                style={{
                  fontFamily: 'var(--font-syne), Syne, sans-serif',
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  color: '#F4F4F4',
                  marginBottom: '0.75rem',
                }}
              >
                {t(`${key}_title` as const)}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontFamily: 'var(--font-barlow), Barlow, sans-serif',
                  fontSize: '0.9rem',
                  fontWeight: 300,
                  lineHeight: 1.7,
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
