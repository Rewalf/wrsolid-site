// Root route — middleware redirects to /en or /es based on Accept-Language.
// This page is never rendered in practice.
import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect('/en');
}
