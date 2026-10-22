import type { Section } from '@/lib/content';
import type { Tone } from '@/components/ui/Section';
import Hero from './Hero';
import Services from './Services';
import Process from './Process';
import Engagement from './Engagement';
import Principles from './Principles';
import Experience from './Experience';
import About from './About';
import Contact from './Contact';

/** Renders one content section. Sections alternate dark and light by position. */
export default function RenderSection({ section, index }: { section: Section; index: number }) {
  const tone: Tone = index % 2 === 0 ? 'dark' : 'light';
  switch (section.type) {
    case 'hero':
      return <Hero section={section} />;
    case 'services':
      return <Services section={section} tone={tone} />;
    case 'process':
      return <Process section={section} tone={tone} />;
    case 'engagement':
      return <Engagement section={section} tone={tone} />;
    case 'principles':
      return <Principles section={section} tone={tone} />;
    case 'experience':
      return <Experience section={section} tone={tone} />;
    case 'about':
      return <About section={section} tone={tone} />;
    case 'contact':
      return <Contact section={section} />;
  }
}
