'use client';

import { useTranslations } from 'next-intl';

function WRSLogo({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 115" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path d="M50 5L95 30V85L50 110L5 85V30L50 5Z" stroke="currentColor" strokeWidth="2" fill="rgba(244,244,244,0.05)" />
      <path d="M25 40L40 75L50 55L60 75L75 40" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M25 85H75" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <path d="M50 15L80 32V68L50 85L20 68V32L50 15Z" stroke="#00F2FF" strokeWidth="0.5" strokeDasharray="2 2" />
    </svg>
  );
}

export default function Footer() {
  const t = useTranslations('footer');

  const capabilities = [
    { key: 'ai', label: t('ai') },
    { key: 'cloud', label: t('cloud') },
    { key: 'enterprise', label: t('enterprise') },
    { key: 'strategy', label: t('strategy') },
  ];

  const corporate = [
    { key: 'theStandard', label: t('theStandard'), href: '#framework' },
    { key: 'linkedin', label: t('linkedin'), href: 'https://linkedin.com/company/wrsolid' },
    { key: 'legal', label: t('legal'), href: '#' },
    { key: 'contact', label: t('contact'), href: '#contact' },
  ];

  return (
    <footer
      className="pt-20 pb-10 px-6"
      style={{ backgroundColor: '#1A1A1B', borderTop: '1px solid rgba(244,244,244,0.1)' }}
    >
      <div className="max-w-7xl mx-auto">

        {/* 4-column grid */}
        <div className="grid md:grid-cols-4 gap-12 mb-20">

          {/* Brand column (spans 2) */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <WRSLogo className="w-8 h-8" />
              <span
                className="font-bold"
                style={{
                  fontSize: '1.125rem',
                  letterSpacing: '0.2em',
                  fontFamily: 'var(--font-syne), Syne, sans-serif',
                }}
              >
                WRSOLID
              </span>
            </div>
            <p
              className="font-light max-w-sm"
              style={{
                color: 'rgba(244,244,244,0.4)',
                fontFamily: 'var(--font-barlow), Barlow, sans-serif',
              }}
            >
              {t('description')}
            </p>
          </div>

          {/* Capabilities */}
          <div>
            <h5
              className="font-bold mb-6 uppercase tracking-widest"
              style={{
                fontSize: '0.75rem',
                fontFamily: 'var(--font-barlow), Barlow, sans-serif',
                color: '#F4F4F4',
              }}
            >
              {t('capabilities')}
            </h5>
            <ul className="space-y-4">
              {capabilities.map(({ key, label }) => (
                <li key={key}>
                  <a
                    href="#"
                    className="font-light text-sm transition-colors duration-200 hover:text-[#00F2FF]"
                    style={{ color: 'rgba(244,244,244,0.6)', fontFamily: 'var(--font-barlow), Barlow, sans-serif' }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Corporate */}
          <div>
            <h5
              className="font-bold mb-6 uppercase tracking-widest"
              style={{
                fontSize: '0.75rem',
                fontFamily: 'var(--font-barlow), Barlow, sans-serif',
                color: '#F4F4F4',
              }}
            >
              {t('corporate')}
            </h5>
            <ul className="space-y-4">
              {corporate.map(({ key, label, href }) => (
                <li key={key}>
                  <a
                    href={href}
                    className="font-light text-sm transition-colors duration-200 hover:text-[#00F2FF]"
                    style={{ color: 'rgba(244,244,244,0.6)', fontFamily: 'var(--font-barlow), Barlow, sans-serif' }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row justify-between items-center pt-10 gap-4"
          style={{ borderTop: '1px solid rgba(244,244,244,0.05)' }}
        >
          <span
            className="uppercase tracking-[0.2em]"
            style={{
              fontSize: '0.625rem',
              color: 'rgba(244,244,244,0.2)',
              fontFamily: 'var(--font-barlow), Barlow, sans-serif',
            }}
          >
            {t('copyright')}
          </span>
          <div
            className="flex gap-8 uppercase tracking-[0.2em]"
            style={{
              fontSize: '0.625rem',
              color: 'rgba(244,244,244,0.2)',
              fontFamily: 'var(--font-barlow), Barlow, sans-serif',
            }}
          >
            <span>{t('badge1')}</span>
            <span>{t('badge2')}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
