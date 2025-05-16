import { Rocket } from 'lucide-react';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
      <Rocket className="h-7 w-7" />
      <span className="text-2xl font-bold tracking-tight">Launchpad</span>
    </Link>
  );
}
