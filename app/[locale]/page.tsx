import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Attributes from '@/components/Attributes';
import Services from '@/components/Services';
import TechStack from '@/components/TechStack';
import BrandMessage from '@/components/BrandMessage';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Attributes />
        <Services />
        <TechStack />
        <BrandMessage />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
