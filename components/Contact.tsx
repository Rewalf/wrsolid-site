import { getTranslations } from 'next-intl/server';

export default async function Contact() {
  const t = await getTranslations('contact');

  return (
    <section
      id="contact"
      className="py-24 md:py-36 relative overflow-hidden dot-grid"
      style={{ backgroundColor: '#0F1011' }}
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: 500,
          height: 500,
          background: 'radial-gradient(ellipse at bottom right, rgba(0,242,255,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">

        {/* Section number */}
        <p
          style={{
            fontFamily: 'var(--font-mono-custom), monospace',
            fontSize: '0.7rem',
            letterSpacing: '0.2em',
            color: '#00F2FF',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
          }}
        >
          04 — CONTACT
        </p>

        {/* Heading */}
        <h2
          style={{
            fontFamily: 'var(--font-syne), Syne, sans-serif',
            fontSize: 'clamp(2rem, 5vw, 3.75rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: '#F4F4F4',
            lineHeight: 1.1,
            marginBottom: '1.25rem',
          }}
        >
          {t('title')}
        </h2>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: 'var(--font-barlow), Barlow, sans-serif',
            fontSize: '1.05rem',
            fontWeight: 300,
            color: 'rgba(244,244,244,0.55)',
            marginBottom: '3rem',
          }}
        >
          {t('subtitle')}
        </p>

        {/* CTA link — styled via global CSS */}
        <a
          href="mailto:contact@wrsolid.com"
          className="contact-cta"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '1rem 2.5rem',
            fontFamily: 'var(--font-barlow), Barlow, sans-serif',
            fontSize: '0.8rem',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#00F2FF',
            border: '1px solid rgba(0,242,255,0.4)',
            backgroundColor: 'transparent',
            transition: 'all 0.3s ease',
            textDecoration: 'none',
          }}
        >
          {t('cta')}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 4L20 4M20 4L20 20M20 4L4 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </a>
      </div>
    </section>
  );
}
