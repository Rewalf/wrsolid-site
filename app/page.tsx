'use client';

import { useEffect } from 'react';

// Static export: no server-side redirect available.
// SWA config also handles / → /en/ at the CDN level.
export default function RootPage() {
  useEffect(() => {
    window.location.replace('/en/');
  }, []);
  return null;
}
