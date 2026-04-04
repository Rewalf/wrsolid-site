import type { Metadata } from 'next';
import { Syne, Barlow, JetBrains_Mono } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { routing } from '@/i18n/routing';
import '../globals.css';

const syne = Syne({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
});

const barlow = Barlow({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-barlow',
  weight: ['300', '400', '500', '600', '700'],
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono-custom',
});

export const metadata: Metadata = {
  title: {
    default: 'WRSolid — Built to Last.',
    template: '%s | WRSolid',
  },
  description:
    'Premium software consulting and development combining the rigor of best industry practices with cutting-edge Artificial Intelligence and Cloud Computing.',
  metadataBase: new URL('https://www.wrsolid.com'),
  openGraph: {
    siteName: 'WRSolid',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${syne.variable} ${barlow.variable} ${mono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" style={{ backgroundColor: '#1A1A1B', color: '#F4F4F4', fontFamily: 'var(--font-barlow), Barlow, sans-serif' }}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
