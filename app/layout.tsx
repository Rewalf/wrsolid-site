// Root layout — minimal passthrough.
// All locale-specific routes are handled by app/[locale]/layout.tsx,
// which provides the actual <html lang> and <body> structure.
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
