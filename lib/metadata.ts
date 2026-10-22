import type { Metadata } from 'next';

type OpenGraph = NonNullable<Metadata['openGraph']>;

// Next.js replaces nested metadata fields such as `openGraph` per segment
// instead of merging them, so pages that set their own `openGraph` spread this in.
export const sharedOpenGraph = {
  siteName: 'WRSolid',
  type: 'website',
  images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'WRSolid — Built to Last' }],
} satisfies OpenGraph;
