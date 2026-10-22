import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RenderSection from '@/components/sections';
import { getPage, getSite } from '@/lib/content';
import { routing } from '@/i18n/routing';
import { sharedOpenGraph } from '@/lib/metadata';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const { meta } = await getPage(locale, 'home');
  return {
    title: { absolute: meta.title },
    description: meta.description,
    alternates: {
      canonical: `/${locale}/`,
      languages: Object.fromEntries(routing.locales.map((l) => [l, `/${l}/`])),
    },
    openGraph: {
      ...sharedOpenGraph,
      title: meta.title,
      description: meta.description,
      locale,
      url: `/${locale}/`,
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [site, page] = await Promise.all([getSite(locale), getPage(locale, 'home')]);

  return (
    <>
      <Navbar nav={site.nav} cta={site.cta} />
      <main>
        {page.sections.map((section, i) => (
          <RenderSection key={section.id} section={section} index={i} />
        ))}
      </main>
      <Footer footer={site.footer} email={site.email} />
    </>
  );
}
