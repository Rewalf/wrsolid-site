import Logo from '@/components/brand/Logo';
import type { SiteContent } from '@/lib/content';

export default function Footer({ footer, email }: { footer: SiteContent['footer']; email: string }) {
  const copyright = footer.copyright.replace('{year}', String(new Date().getFullYear()));

  return (
    <footer className="tone-dark border-t border-line px-4 pb-10 pt-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo className="h-8 w-auto text-chalk" title="WRSolid" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">{footer.description}</p>
            <a href={`mailto:${email}`} className="mt-5 inline-block text-sm font-medium text-heading hover:underline">
              {email}
            </a>
          </div>
          {footer.columns.map((col) => (
            <div key={col.title}>
              <h2 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-heading">{col.title}</h2>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-sm text-muted transition-colors hover:text-heading">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-14 border-t border-line pt-8 text-xs text-muted">{copyright}</p>
      </div>
    </footer>
  );
}
