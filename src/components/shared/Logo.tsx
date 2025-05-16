import logoImage from '../../../public/images/bangladesh_logo.png';
import Link from 'next/link';
import Image from 'next/image';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
      <Image src={logoImage} alt="Logo" width={50} height={50} /> {/* Remove the "px" */}
      <span className="text-2xl font-bold tracking-tight">Launchpad</span>
    </Link>
  );
}