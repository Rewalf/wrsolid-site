'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Shield, Terminal, Cpu } from 'lucide-react';

function SectionHeading({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) {
  return (
    <div className="mb-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-bold tracking-tighter mb-4"
        style={{
          fontSize: 'clamp(2rem, 4vw, 3.25rem)',
          color: '#F4F4F4',
          fontFamily: 'var(--font-syne), Syne, sans-serif',
        }}
      >
        {children}
      </motion.h2>
      {subtitle && (
        <p
          className="max-w-2xl font-light"
          style={{
            color: 'rgba(244,244,244,0.6)',
            fontSize: '1.125rem',
            fontFamily: 'var(--font-barlow), Barlow, sans-serif',
          }}
        >
          {subtitle}
        </p>
      )}
      <div
        className="w-20 h-1 mt-6"
        style={{ backgroundColor: '#00F2FF', boxShadow: '0 0 10px rgba(0,242,255,0.5)' }}
      />
    </div>
  );
}

type CardIcon = typeof Shield;

function FeatureCard({ icon: Icon, title, description }: { icon: CardIcon; title: string; description: string }) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="group p-8 backdrop-blur-sm transition-all duration-500"
      style={{
        backgroundColor: 'rgba(51,54,57,0.3)',
        border: '1px solid rgba(244,244,244,0.1)',
        borderRadius: '2px',
      }}
      onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,242,255,0.4)'}
      onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(244,244,244,0.1)'}
    >
      <div
        className="w-12 h-12 flex items-center justify-center mb-6 border transition-colors duration-500"
        style={{
          backgroundColor: '#333639',
          borderColor: 'rgba(244,244,244,0.1)',
        }}
      >
        <Icon className="w-6 h-6 transition-colors duration-500" style={{ color: '#00F2FF' }} />
      </div>
      <h3
        className="font-bold mb-3 uppercase tracking-wider"
        style={{
          fontSize: '1.25rem',
          color: '#F4F4F4',
          fontFamily: 'var(--font-syne), Syne, sans-serif',
        }}
      >
        {title}
      </h3>
      <p
        className="font-light leading-relaxed"
        style={{ color: 'rgba(244,244,244,0.6)', fontFamily: 'var(--font-barlow), Barlow, sans-serif' }}
      >
        {description}
      </p>
    </motion.div>
  );
}

export default function Attributes() {
  const t = useTranslations('standard');

  const cards = [
    { icon: Shield, titleKey: 'card1_title', descKey: 'card1_desc' },
    { icon: Terminal, titleKey: 'card2_title', descKey: 'card2_desc' },
    { icon: Cpu, titleKey: 'card3_title', descKey: 'card3_desc' },
  ] as const;

  return (
    <section id="expertise" className="py-24 md:py-32 px-6" style={{ backgroundColor: 'rgba(51,54,57,0.1)' }}>
      <div className="max-w-7xl mx-auto">
        <SectionHeading subtitle={t('subtitle')}>
          {t('title')}
        </SectionHeading>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map(({ icon, titleKey, descKey }) => (
            <FeatureCard
              key={titleKey}
              icon={icon}
              title={t(titleKey)}
              description={t(descKey)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
