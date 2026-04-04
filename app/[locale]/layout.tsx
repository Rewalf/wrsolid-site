import type { Metadata } from 'next';
import { Syne, Barlow, JetBrains_Mono } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
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
      className={`${syne.variable} ${barlow.variable} ${mono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
