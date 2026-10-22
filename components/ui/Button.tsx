import { ArrowRight } from 'lucide-react';

interface Props {
  href: string;
  variant?: 'primary' | 'secondary';
  className?: string;
  children: React.ReactNode;
}

const base =
  'group inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3.5 text-sm font-semibold transition-colors duration-200';

const variants = {
  primary: 'bg-signal text-graphite hover:bg-[#4BE088]',
  secondary: 'border border-line text-heading hover:border-heading',
};

export default function Button({ href, variant = 'primary', className = '', children }: Props) {
  const external = href.startsWith('http');
  return (
    <a
      href={href}
      className={`${base} ${variants[variant]} ${className}`}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
      <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
    </a>
  );
}
