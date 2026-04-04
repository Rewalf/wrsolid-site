'use client';

import { useTranslations } from 'next-intl';

/* Decorative spinning hexagon rings */
function HexRings() {
  return (
    <div
      className="absolute inset-0 flex items-center justify-end pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Outer ring */}
      <div
        className="animate-spin-slow opacity-[0.06]"
        style={{ width: 680, height: 680, flexShrink: 0, marginRight: -180 }}
      >
        <svg viewBox="0 0 200 200" fill="none" width="100%" height="100%">
          <polygon
            points="100,4 188,52 188,148 100,196 12,148 12,52"
            stroke="#00F2FF"
            strokeWidth="0.6"
            fill="none"
          />
        </svg>
      </div>
      {/* Mid ring */}
      <div
        className="animate-counter-spin opacity-[0.10] absolute"
        style={{ width: 460, height: 460, right: -80 }}
      >
        <svg viewBox="0 0 200 200" fill="none" width="100%" height="100%">
          <polygon
            points="100,8 185,55 185,145 100,192 15,145 15,55"
            stroke="#00F2FF"
            strokeWidth="0.8"
            fill="none"
          />
        </svg>
      </div>
      {/* Inner ring */}
      <div
        className="animate-spin-slow opacity-[0.18] absolute"
        style={{ width: 280, height: 280, right: 10 }}
      >
        <svg viewBox="0 0 200 200" fill="none" width="100%" height="100%">
          <polygon
            points="100,10 182,57 182,143 100,190 18,143 18,57"
            stroke="#00F2FF"
            strokeWidth="1"
            fill="rgba(0,242,255,0.03)"
          />
          {/* WRS inside */}
          <text
            x="100"
            y="115"
            textAnchor="middle"
            fill="rgba(0,242,255,0.3)"
            fontSize="28"
            fontWeight="800"
            fontFamily="Syne, sans-serif"
            letterSpacing="2"
          >
            WRS
          </text>
        </svg>
      </div>
    </div>
  );
}

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center dot-grid"
      style={{ backgroundColor: '#1A1A1B' }}
    >
      {/* Decorative background */}
      <HexRings />

      {/* Cyan radial glow — top left */}
      <div
        className="absolute top-0 left-0 pointer-events-none"
        aria-hidden="true"
        style={{
          width: 600,
          height: 600,
          background: 'radial-gradient(ellipse at top left, rgba(0,242,255,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 md:py-40">
        <div className="max-w-2xl">

          {/* Tagline badge */}
          <div
            className="animate-fade-in delay-100 inline-flex items-center gap-2 mb-8 px-3 py-1.5 rounded-sm"
            style={{
              border: '1px solid rgba(0,242,255,0.3)',
              backgroundColor: 'rgba(0,242,255,0.05)',
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: '#00F2FF',
                display: 'inline-block',
                boxShadow: '0 0 6px #00F2FF',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono-custom), monospace',
                fontSize: '0.7rem',
                letterSpacing: '0.2em',
                color: '#00F2FF',
                textTransform: 'uppercase',
              }}
            >
              {t('tagline')}
            </span>
          </div>

          {/* Main headline */}
          <h1
            className="animate-fade-up delay-200"
            style={{
              fontFamily: 'var(--font-syne), Syne, sans-serif',
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: '#F4F4F4',
              marginBottom: '1.5rem',
            }}
          >
            {t('headline')}
          </h1>

          {/* Subheadline */}
          <p
            className="animate-fade-up delay-300"
            style={{
              fontFamily: 'var(--font-barlow), Barlow, sans-serif',
              fontSize: '1.1rem',
              fontWeight: 300,
              lineHeight: 1.7,
              color: 'rgba(244,244,244,0.65)',
              maxWidth: '520px',
              marginBottom: '2.5rem',
            }}
          >
            {t('subheadline')}
          </p>

          {/* CTA button */}
          <div className="animate-fade-up delay-400">
            <a
              href="#contact"
              className="inline-flex items-center gap-3 px-8 py-4 text-sm font-semibold tracking-wider uppercase transition-all duration-300 neon-glow"
              style={{
                fontFamily: 'var(--font-barlow), Barlow, sans-serif',
                backgroundColor: '#00F2FF',
                color: '#1A1A1B',
                letterSpacing: '0.1em',
                border: '1px solid #00F2FF',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#00F2FF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#00F2FF';
                e.currentTarget.style.color = '#1A1A1B';
              }}
            >
              {t('cta')}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="animate-fade-in delay-800 absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <div
            style={{
              width: 1,
              height: 40,
              background: 'linear-gradient(to bottom, transparent, rgba(0,242,255,0.5))',
              animation: 'fade-up 1.5s ease infinite',
            }}
          />
        </div>
      </div>
    </section>
  );
}
