import { getTranslations } from 'next-intl/server';

const stack = [
  { label: 'Next.js',     category: 'Frontend' },
  { label: 'React',       category: 'Frontend' },
  { label: 'TypeScript',  category: 'Frontend' },
  { label: 'Tailwind CSS',category: 'Frontend' },
  { label: 'Node.js',     category: 'Backend' },
  { label: '.NET / C#',   category: 'Backend' },
  { label: 'REST & GraphQL', category: 'Backend' },
  { label: 'Azure SWA',   category: 'Cloud' },
  { label: 'Azure Functions', category: 'Cloud' },
  { label: 'Serverless',  category: 'Cloud' },
  { label: 'Microservices', category: 'Cloud' },
  { label: 'Docker',      category: 'Cloud' },
  { label: 'Azure AI',    category: 'AI' },
  { label: 'OpenAI API',  category: 'AI' },
  { label: 'SOLID Principles', category: 'Engineering' },
  { label: 'Clean Code',  category: 'Engineering' },
  { label: 'CI/CD',       category: 'Engineering' },
  { label: 'GitHub Actions', category: 'Engineering' },
];

const categoryColor: Record<string, string> = {
  Frontend:    'rgba(0,242,255,0.12)',
  Backend:     'rgba(0,242,255,0.08)',
  Cloud:       'rgba(0,242,255,0.06)',
  AI:          'rgba(0,242,255,0.15)',
  Engineering: 'rgba(0,242,255,0.05)',
};

export default async function TechStack() {
  const t = await getTranslations('techStack');

  return (
    <section
      id="stack"
      className="py-24 md:py-32"
      style={{ backgroundColor: '#1A1A1B' }}
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Section header */}
        <div className="mb-16">
          <p
            style={{
              fontFamily: 'var(--font-mono-custom), monospace',
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              color: '#00F2FF',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
            }}
          >
            03 — STACK
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-syne), Syne, sans-serif',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: '#F4F4F4',
            }}
          >
            {t('title')}
          </h2>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-3">
          {stack.map((item) => (
            <span
              key={item.label}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.4rem 0.9rem',
                backgroundColor: categoryColor[item.category] ?? 'rgba(0,242,255,0.07)',
                border: '1px solid rgba(0,242,255,0.18)',
                borderRadius: 2,
                fontFamily: 'var(--font-mono-custom), monospace',
                fontSize: '0.75rem',
                color: 'rgba(244,244,244,0.75)',
                letterSpacing: '0.04em',
                transition: 'all 0.2s',
              }}
            >
              <span
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  backgroundColor: '#00F2FF',
                  opacity: 0.7,
                  flexShrink: 0,
                }}
              />
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
