import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { routing } from '@/i18n/routing';
import '../globals.css';

// Self-hosted (Fontsource variable builds, latin subset) so the build never
// depends on fetching from Google Fonts, which fails on the Azure SWA builder.
const montserrat = localFont({
  src: '../fonts/montserrat-latin-wght.woff2',
  weight: '100 900',
  display: 'swap',
  variable: '--font-montserrat',
});

const inter = localFont({
  src: '../fonts/inter-latin-wght.woff2',
  weight: '100 900',
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'WRSolid — Built to Last.',
    template: '%s | WRSolid',
  },
  metadataBase: new URL('https://www.wrsolid.com'),
  openGraph: {
    siteName: 'WRSolid',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'WRSolid — Built to Last' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png'],
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Required for static export — sets locale in cache instead of headers()
  setRequestLocale(locale);

  // Load messages directly — avoids getMessages() which reads headers()
  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <html
      lang={locale}
      className={`${montserrat.variable} ${inter.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
