'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';

function WRSLogo({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 115" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path d="M50 5L95 30V85L50 110L5 85V30L50 5Z" stroke="currentColor" strokeWidth="2" fill="rgba(244,244,244,0.05)" />
      <path d="M25 40L40 75L50 55L60 75L75 40" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M25 85H75" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <path d="M50 15L80 32V68L50 85L20 68V32L50 15Z" stroke="#00F2FF" strokeWidth="0.5" strokeDasharray="2 2" className="animate-pulse" />
    </svg>
  );
}

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '#expertise', label: t('expertise') },
    { href: '#framework', label: t('standard') },
    { href: '#dna',       label: t('dna') },
  ];

  return (
    <>
      <nav
        className="fixed top-0 inset-x-0 z-50 transition-all duration-500 px-6 py-4"
        style={isScrolled ? {
          backgroundColor: 'rgba(26,26,27,0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(244,244,244,0.08)',
          paddingTop: '0.75rem',
          paddingBottom: '0.75rem',
        } : {
          backgroundColor: 'transparent',
          borderBottom: '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3" aria-label="WRSolid home">
            <WRSLogo className="w-10 h-10" />
            <span style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              fontFamily: 'var(--font-syne), Syne, sans-serif',
              paddingTop: '2px',
            }}>
              WRSOLID
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            <ul className="flex items-center gap-10">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm font-medium tracking-widest uppercase transition-colors duration-200 hover:text-[#00F2FF]"
                    style={{ color: 'rgba(244,244,244,0.7)', fontFamily: 'var(--font-barlow), Barlow, sans-serif' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="text-sm font-bold tracking-widest uppercase px-6 py-2.5 border transition-all duration-300"
              style={{
                backgroundColor: '#333639',
                borderColor: 'rgba(244,244,244,0.2)',
                color: '#F4F4F4',
                fontFamily: 'var(--font-barlow), Barlow, sans-serif',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = '#F4F4F4';
                (e.currentTarget as HTMLElement).style.color = '#1A1A1B';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = '#333639';
                (e.currentTarget as HTMLElement).style.color = '#F4F4F4';
              }}
            >
              {t('cta')}
            </a>

            {/* Language switcher */}
            <div className="flex items-center gap-1" style={{ fontFamily: 'var(--font-mono-custom), monospace', fontSize: '0.7rem' }}>
              {locale === 'en' ? (
                <span style={{ color: '#00F2FF', fontWeight: 700 }}>EN</span>
              ) : (
                <Link href={pathname} locale="en" style={{ color: 'rgba(244,244,244,0.4)' }} className="hover:text-[#00F2FF] transition-colors">EN</Link>
              )}
              <span style={{ color: 'rgba(244,244,244,0.2)', margin: '0 4px' }}>|</span>
              {locale === 'es' ? (
                <span style={{ color: '#00F2FF', fontWeight: 700 }}>ES</span>
              ) : (
                <Link href={pathname} locale="es" style={{ color: 'rgba(244,244,244,0.4)' }} className="hover:text-[#00F2FF] transition-colors">ES</Link>
              )}
            </div>
          </div>

          {/* Mobile: lang switcher + hamburger */}
          <div className="md:hidden flex items-center gap-4">
            <div className="flex items-center gap-1" style={{ fontFamily: 'var(--font-mono-custom), monospace', fontSize: '0.7rem' }}>
              {locale === 'en' ? (
                <span style={{ color: '#00F2FF', fontWeight: 700 }}>EN</span>
              ) : (
                <Link href={pathname} locale="en" style={{ color: 'rgba(244,244,244,0.4)' }}>EN</Link>
              )}
              <span style={{ color: 'rgba(244,244,244,0.2)', margin: '0 4px' }}>|</span>
              {locale === 'es' ? (
                <span style={{ color: '#00F2FF', fontWeight: 700 }}>ES</span>
              ) : (
                <Link href={pathname} locale="es" style={{ color: 'rgba(244,244,244,0.4)' }}>ES</Link>
              )}
            </div>
            <button onClick={() => setMobileOpen(true)} aria-label="Open menu">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[60] flex flex-col p-8"
          style={{ backgroundColor: '#1A1A1B' }}
        >
          <div className="flex justify-end mb-12">
            <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <div className="flex flex-col gap-8" style={{ fontFamily: 'var(--font-syne), Syne, sans-serif', fontSize: '1.5rem', fontWeight: 700, letterSpacing: '0.15em' }}>
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="uppercase hover:text-[#00F2FF] transition-colors">
                {link.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setMobileOpen(false)} className="uppercase text-[#00F2FF]">
              {t('cta')}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
