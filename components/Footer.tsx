'use client';

import { useTranslations } from 'next-intl';

function HexLogoSmall() {
  return (
    <svg width="28" height="32" viewBox="0 0 36 42" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <polygon points="18,2 34,11 34,31 18,40 2,31 2,11" stroke="#00F2FF" strokeWidth="1.5" fill="rgba(0,242,255,0.04)"/>
      <text x="18" y="26" textAnchor="middle" fill="#F4F4F4" fontSize="10" fontWeight="800" fontFamily="Syne, var(--font-syne), sans-serif" letterSpacing="0.5">WRS</text>
    </svg>
  );
}

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer
      style={{
        backgroundColor: '#1A1A1B',
        borderTop: '1px solid rgba(51,54,57,0.6)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">

        {/* Logo + tagline */}
        <div className="flex items-center gap-3">
          <HexLogoSmall />
          <div>
            <div
              style={{
                fontFamily: 'var(--font-syne), Syne, sans-serif',
                fontSize: '0.9rem',
                fontWeight: 700,
                color: '#F4F4F4',
                letterSpacing: '0.04em',
              }}
            >
              WRSolid
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono-custom), monospace',
                fontSize: '0.65rem',
                letterSpacing: '0.12em',
                color: 'rgba(0,242,255,0.5)',
              }}
            >
              {t('tagline')}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <p
          style={{
            fontFamily: 'var(--font-barlow), Barlow, sans-serif',
            fontSize: '0.8rem',
            color: 'rgba(244,244,244,0.3)',
          }}
        >
          {t('copyright')}
        </p>
      </div>
    </footer>
  );
}
