import Image from 'next/image';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
      <Image
        src="/images/bangladesh_logo.png" // ✅ Use path from `public/`
        alt="Logo"
        width={50}
        height={50}
        priority
      />
      <span className="text-2xl font-bold tracking-tight">Launchpad</span>
    </Link>
  );
}
