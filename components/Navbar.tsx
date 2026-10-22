'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import Logo from '@/components/brand/Logo';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import type { SiteContent } from '@/lib/content';

interface Props {
  nav: SiteContent['nav'];
  cta: SiteContent['cta'];
}

export default function Navbar({ nav, cta }: Props) {
  const t = useTranslations('ui');
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    const opener = openRef.current;
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      opener?.focus();
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 px-4 transition-colors duration-300 sm:px-6 ${
          scrolled ? 'border-b border-chalk/10 bg-graphite/95 backdrop-blur' : 'border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex h-18 max-w-6xl items-center justify-between gap-6 text-chalk">
          <a href="#top" aria-label="WRSolid" className="shrink-0">
            <Logo className="h-8 w-auto sm:h-9" />
          </a>

          <nav aria-label={t('mainNav')} className="hidden lg:block">
            <ul className="flex items-center gap-8 text-sm font-medium">
              {nav.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-chalk/75 transition-colors hover:text-chalk">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-6 lg:flex">
            <LanguageSwitcher />
            <a
              href={cta.href}
              className="rounded-sm bg-signal px-5 py-2.5 text-sm font-semibold text-graphite transition-colors hover:bg-[#4BE088]"
            >
              {cta.label}
            </a>
          </div>

          <div className="flex items-center gap-5 lg:hidden">
            <LanguageSwitcher />
            <button
              ref={openRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-label={t('openMenu')}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <Menu aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label={t('mainNav')}
          className="fixed inset-0 z-[60] flex flex-col bg-graphite px-4 py-5 text-chalk sm:px-6"
        >
          <div className="flex items-center justify-between">
            <Logo className="h-8 w-auto" />
            <button ref={closeRef} type="button" onClick={() => setOpen(false)} aria-label={t('closeMenu')}>
              <X aria-hidden="true" className="h-7 w-7" />
            </button>
          </div>
          <nav className="mt-14">
            <ul className="space-y-6 font-heading text-2xl font-semibold">
              {nav.map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={() => setOpen(false)} className="hover:text-signal">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a
            href={cta.href}
            onClick={() => setOpen(false)}
            className="mt-12 rounded-sm bg-signal px-5 py-4 text-center font-semibold text-graphite"
          >
            {cta.label}
          </a>
        </div>
      )}
    </>
  );
}
