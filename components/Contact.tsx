'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function Contact() {
  const t = useTranslations('contact');

  return (
    <section
      id="contact"
      className="py-24 md:py-40 px-6 text-center relative overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto relative z-10"
      >
        <h2
          className="font-bold mb-8"
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.75rem)',
            fontFamily: 'var(--font-syne), Syne, sans-serif',
            color: '#F4F4F4',
            lineHeight: 1.1,
          }}
        >
          {t('headline1')}{' '}
          <br />
          <span style={{ color: '#00F2FF' }}>{t('headline2')}</span>
        </h2>

        <p
          className="font-light mb-12"
          style={{
            color: 'rgba(244,244,244,0.6)',
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            fontFamily: 'var(--font-barlow), Barlow, sans-serif',
          }}
        >
          {t('subtitle')}
        </p>

        <a
          href="mailto:hello@wrsolid.com"
          className="inline-block font-bold tracking-widest uppercase transition-transform duration-300 hover:scale-105"
          style={{
            padding: '1.25rem 3rem',
            backgroundColor: '#F4F4F4',
            color: '#1A1A1B',
            fontFamily: 'var(--font-barlow), Barlow, sans-serif',
            fontSize: '1.125rem',
          }}
        >
          {t('cta')}
        </a>
      </motion.div>

      {/* Decorative large background text */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none whitespace-nowrap font-black"
        style={{
          fontSize: '20vw',
          color: 'rgba(244,244,244,0.02)',
          fontFamily: 'var(--font-syne), Syne, sans-serif',
          zIndex: 0,
        }}
      >
        WRSOLID WRSOLID
      </div>
    </section>
  );
}
