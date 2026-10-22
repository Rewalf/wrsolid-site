'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

export default function LanguageSwitcher({ className = '' }: { className?: string }) {
  const t = useTranslations('ui');
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <nav aria-label={t('language')} className={`flex items-center gap-1 text-xs font-semibold tracking-wider ${className}`}>
      {routing.locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span aria-hidden="true" className="px-1 text-chalk/25">|</span>}
          {l === locale ? (
            <span aria-current="true" className="text-chalk">{l.toUpperCase()}</span>
          ) : (
            <Link href={pathname} locale={l} lang={l} className="text-stone transition-colors hover:text-chalk">
              {l.toUpperCase()}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
