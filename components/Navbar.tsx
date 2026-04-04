'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { useLocale } from 'next-intl';

function HexLogo() {
  return (
    <svg width="36" height="42" viewBox="0 0 36 42" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <polygon
        points="18,2 34,11 34,31 18,40 2,31 2,11"
        stroke="#00F2FF"
        strokeWidth="1.5"
        fill="rgba(0,242,255,0.04)"
      />
      <polygon
        points="18,6 30,13 30,29 18,36 6,29 6,13"
        stroke="#00F2FF"
        strokeWidth="0.5"
        strokeOpacity="0.3"
        fill="none"
      />
      <text
        x="18"
        y="26"
        textAnchor="middle"
        fill="#F4F4F4"
        fontSize="10"
        fontWeight="800"
        fontFamily="Syne, var(--font-syne), sans-serif"
        letterSpacing="0.5"
      >
        WRS
      </text>
    </svg>
  );
}

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '#about',    label: t('about') },
    { href: '#services', label: t('services') },
    { href: '#stack',    label: t('techStack') },
    { href: '#contact',  label: t('contact') },
  ];

  const otherLocale = locale === 'en' ? 'es' : 'en';

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? 'rgba(26,26,27,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(51,54,57,0.6)' : '1px solid transparent',
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          className="flex items-center gap-3 group"
          aria-label="WRSolid home"
        >
          <HexLogo />
          <span
            style={{
              fontFamily: 'var(--font-syne), Syne, sans-serif',
              fontSize: '1.125rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              color: '#F4F4F4',
            }}
          >
            WRSolid
          </span>
        </a>

        {/* Nav links — desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium tracking-wide transition-colors duration-200"
                style={{
                  color: 'rgba(244,244,244,0.65)',
                  fontFamily: 'var(--font-barlow), Barlow, sans-serif',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#00F2FF')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(244,244,244,0.65)')}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Language switcher */}
        <div className="flex items-center gap-1">
          <span
            className="text-xs font-mono px-2 py-1 rounded"
            style={{
              color: locale === 'en' ? '#00F2FF' : 'rgba(244,244,244,0.4)',
              fontFamily: 'var(--font-mono-custom), monospace',
              fontWeight: locale === 'en' ? 700 : 400,
              cursor: locale === 'en' ? 'default' : 'pointer',
              transition: 'color 0.2s',
            }}
          >
            {locale === 'en' ? (
              <span>EN</span>
            ) : (
              <Link href={pathname} locale="en">EN</Link>
            )}
          </span>
          <span style={{ color: 'rgba(244,244,244,0.2)', fontSize: '0.65rem' }}>|</span>
          <span
            className="text-xs font-mono px-2 py-1 rounded"
            style={{
              color: locale === 'es' ? '#00F2FF' : 'rgba(244,244,244,0.4)',
              fontFamily: 'var(--font-mono-custom), monospace',
              fontWeight: locale === 'es' ? 700 : 400,
              cursor: locale === 'es' ? 'default' : 'pointer',
              transition: 'color 0.2s',
            }}
          >
            {locale === 'es' ? (
              <span>ES</span>
            ) : (
              <Link href={pathname} locale="es">ES</Link>
            )}
          </span>
        </div>
      </nav>
    </header>
  );
}
