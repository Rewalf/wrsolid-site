'use client';

import { useTranslations } from 'next-intl';

export default function BrandMessage() {
  const t = useTranslations('brandMessage');

  return (
    <section
      style={{
        backgroundColor: '#333639',
        borderTop: '1px solid rgba(0,242,255,0.1)',
        borderBottom: '1px solid rgba(0,242,255,0.1)',
      }}
    >
      <div className="max-w-5xl mx-auto px-6 py-24 md:py-32">
        <div className="relative">
          {/* Large decorative quote mark */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: -40,
              left: -20,
              fontFamily: 'var(--font-syne), Syne, sans-serif',
              fontSize: '10rem',
              lineHeight: 1,
              color: 'rgba(0,242,255,0.12)',
              fontWeight: 800,
              userSelect: 'none',
              pointerEvents: 'none',
            }}
          >
            "
          </div>

          <blockquote
            style={{
              position: 'relative',
              fontFamily: 'var(--font-syne), Syne, sans-serif',
              fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
              fontWeight: 500,
              lineHeight: 1.65,
              color: 'rgba(244,244,244,0.85)',
              fontStyle: 'italic',
              paddingLeft: '1.5rem',
              borderLeft: '3px solid #00F2FF',
            }}
          >
            {t('quote')}
          </blockquote>

          <div
            style={{
              marginTop: '2rem',
              paddingLeft: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <div
              style={{
                width: 28,
                height: 2,
                backgroundColor: '#00F2FF',
                opacity: 0.6,
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono-custom), monospace',
                fontSize: '0.7rem',
                letterSpacing: '0.15em',
                color: 'rgba(244,244,244,0.4)',
                textTransform: 'uppercase',
              }}
            >
              WRSolid
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
