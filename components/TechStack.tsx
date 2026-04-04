'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const codeLines: Array<{ text: string; cyan?: boolean; comment?: boolean }> = [
  { text: 'namespace WRSolid.Core.Intelligence {', cyan: true },
  { text: '  public class TungstenArchitect : ISolidEngine', cyan: true },
  { text: '  {' },
  { text: '    // Ensuring 99.9% resilience', comment: true },
  { text: '    public async Task ExecuteAsync()', cyan: true },
  { text: '    {' },
  { text: '      var model = await _azure.LoadAI();', cyan: true },
  { text: '      // Built to last. No shortcuts.', comment: true },
  { text: '      return ProcessWithPrecision(model);', cyan: true },
  { text: '    }' },
  { text: '  }' },
  { text: '}' },
];

function CodeBlock() {
  return (
    <pre
      className="leading-relaxed"
      style={{
        color: '#9ca3af',
        fontFamily: 'var(--font-mono-custom), JetBrains Mono, monospace',
        fontSize: '0.875rem',
      }}
    >
      {codeLines.map((line, i) => (
        <div key={i}>
          {line.comment ? (
            <span style={{ color: '#6b7280' }}>{line.text}</span>
          ) : line.cyan ? (
            <span style={{ color: '#00F2FF' }}>{line.text}</span>
          ) : (
            <span>{line.text}</span>
          )}
        </div>
      ))}
    </pre>
  );
}

function SectionHeading({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) {
  return (
    <div className="mb-12">
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

export default function TechStack() {
  const t = useTranslations('dna');

  const items = [
    { num: '01', titleKey: 'item1_title' as const, descKey: 'item1_desc' as const },
    { num: '02', titleKey: 'item2_title' as const, descKey: 'item2_desc' as const },
    { num: '03', titleKey: 'item3_title' as const, descKey: 'item3_desc' as const },
  ];

  return (
    <section id="dna" className="py-24 md:py-32 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">

        {/* Left: numbered list */}
        <div>
          <SectionHeading subtitle={t('subtitle')}>
            {t('title')}
          </SectionHeading>

          <div className="space-y-10">
            {items.map(({ num, titleKey, descKey }) => (
              <div key={num} className="flex gap-6">
                <div
                  className="font-bold shrink-0"
                  style={{
                    color: '#00F2FF',
                    fontFamily: 'var(--font-mono-custom), JetBrains Mono, monospace',
                    fontSize: '1.5rem',
                    lineHeight: 1.2,
                  }}
                >
                  {num}
                </div>
                <div>
                  <h4
                    className="font-bold mb-2 uppercase tracking-wide"
                    style={{
                      fontSize: '1.25rem',
                      color: '#F4F4F4',
                      fontFamily: 'var(--font-syne), Syne, sans-serif',
                    }}
                  >
                    {t(titleKey)}
                  </h4>
                  <p
                    className="font-light"
                    style={{
                      color: 'rgba(244,244,244,0.6)',
                      fontFamily: 'var(--font-barlow), Barlow, sans-serif',
                    }}
                  >
                    {t(descKey)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: mock code editor */}
        <div className="relative">
          <div
            className="overflow-hidden shadow-2xl"
            style={{
              backgroundColor: '#1A1A1B',
              border: '1px solid rgba(244,244,244,0.1)',
              borderRadius: '8px',
            }}
          >
            {/* Title bar */}
            <div
              className="px-4 py-2 flex items-center gap-2 border-b"
              style={{ backgroundColor: '#333639', borderColor: 'rgba(244,244,244,0.1)' }}
            >
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'rgba(239,68,68,0.5)' }} />
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'rgba(234,179,8,0.5)' }} />
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'rgba(34,197,94,0.5)' }} />
              <span
                className="ml-4 uppercase tracking-widest"
                style={{ fontSize: '0.625rem', color: 'rgba(244,244,244,0.4)', fontFamily: 'var(--font-mono-custom), monospace' }}
              >
                WRSolid_Core_Service.cs
              </span>
            </div>

            {/* Code */}
            <div className="p-6 overflow-x-auto">
              <CodeBlock />
            </div>
          </div>

          {/* Glow effects */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full pointer-events-none" style={{ backgroundColor: 'rgba(0,242,255,0.05)', filter: 'blur(80px)' }} />
          <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full pointer-events-none" style={{ backgroundColor: 'rgba(0,242,255,0.1)', filter: 'blur(80px)' }} />
        </div>

      </div>
    </section>
  );
}
