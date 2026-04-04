'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <header className="relative pt-32 pb-20 md:pt-48 md:pb-40 px-6 overflow-hidden">

      {/* Background: dot grid + radial gradient */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{ background: 'radial-gradient(circle at center, #333639 0%, transparent 70%)' }}
        />
        <div
          className="absolute inset-0"
          style={{ backgroundImage: 'radial-gradient(#F4F4F4 0.5px, transparent 0.5px)', backgroundSize: '40px 40px' }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <div
            className="flex items-center gap-2 mb-6 uppercase"
            style={{
              color: '#00F2FF',
              letterSpacing: '0.3em',
              fontFamily: 'var(--font-barlow), Barlow, sans-serif',
              fontWeight: 500,
              fontSize: '0.75rem',
            }}
          >
            {/* Zap icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            <span>{t('badge')}</span>
          </div>

          {/* Headline */}
          <h1
            className="font-bold tracking-tighter mb-8"
            style={{
              fontSize: 'clamp(3.5rem, 10vw, 9rem)',
              lineHeight: 0.9,
              fontFamily: 'var(--font-syne), Syne, sans-serif',
            }}
          >
            <span
              style={{
                display: 'block',
                backgroundImage: 'linear-gradient(to bottom, #F4F4F4, #333639)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {t('line1')}
            </span>
            <span
              style={{
                display: 'block',
                backgroundImage: 'linear-gradient(to bottom, #F4F4F4, #333639)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {t('line2')}
            </span>
            <span style={{ display: 'block', color: '#F4F4F4', WebkitTextFillColor: '#F4F4F4' }}>
              {t('line3')}
            </span>
          </h1>

          {/* Quote */}
          <p
            className="max-w-2xl mb-12 leading-relaxed italic font-light"
            style={{
              color: 'rgba(244,244,244,0.6)',
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              fontFamily: 'var(--font-barlow), Barlow, sans-serif',
            }}
          >
            &ldquo;{t('quote')}&rdquo;
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-6">
            <a
              href="#contact"
              className="relative group overflow-hidden inline-block text-center"
              style={{
                padding: '1.25rem 2.5rem',
                backgroundColor: '#F4F4F4',
                color: '#1A1A1B',
                fontFamily: 'var(--font-barlow), Barlow, sans-serif',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                fontSize: '0.875rem',
              }}
            >
              <span className="relative z-10">{t('cta1')}</span>
              <span
                className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"
                style={{ backgroundColor: '#00F2FF' }}
              />
            </a>
            <a
              href="#dna"
              className="group inline-flex items-center justify-center gap-3 transition-colors duration-300"
              style={{
                padding: '1.25rem 2.5rem',
                border: '1px solid rgba(244,244,244,0.2)',
                color: '#F4F4F4',
                fontFamily: 'var(--font-barlow), Barlow, sans-serif',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                fontSize: '0.875rem',
                backgroundColor: 'transparent',
              }}
              onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(244,244,244,0.05)'}
              onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'}
            >
              {t('cta2')}
              <svg
                width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                className="group-hover:translate-x-2 transition-transform duration-200"
              >
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
