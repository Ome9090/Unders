'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/shared/Logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu,UserCog, Info, Mail, HelpCircle, LogIn } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';


interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { href: '/about', label: 'About', icon: Info },
  { href: '/contact', label: 'Contact', icon: Mail },
  { href: '/faq-generator', label: 'FAQ Generator', icon: HelpCircle },
  { href: '/admin/login', label: 'Admin Login', icon: LogIn },
];

interface NavLinkProps extends HTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

function NavLink({ href, children, className, ...props }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "text-sm font-medium transition-colors hover:text-primary",
        isActive ? "text-primary" : "text-foreground/80",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}


export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-8">
        <Logo />
        
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href}>
               <item.icon className="mr-2 h-4 w-4 inline-block" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4 p-4">
                <Logo />
                {navItems.map((item) => (
                  <NavLink key={item.href} href={item.href} className="flex items-center text-lg py-2">
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
