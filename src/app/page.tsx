import { ConstructionNotice } from '@/components/ConstructionNotice';
import { CountdownTimer } from '@/components/CountdownTimer';
import { Button } from '@/components/ui/button';
import { Mail, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  // Example launch date: December 31, 2024, at 11:59:59 PM UTC
  // Ensure this date is in a format that `new Date()` can parse correctly across browsers/timezones.
  // ISO 8601 format is generally robust.
  const launchDate = "2024-12-31T23:59:59Z"; 

  return (
    <div className="flex-grow flex flex-col items-center justify-center p-4 md:p-8 text-center bg-background">
      <div className="max-w-4xl w-full space-y-12">
        <ConstructionNotice />
        <CountdownTimer launchDate={launchDate} />
        <div className="space-y-4 sm:space-y-0 sm:flex sm:flex-row sm:justify-center sm:space-x-4">
          <Button asChild size="lg" variant="outline" className="w-full sm:w-auto border-primary text-primary hover:bg-primary/10">
            <Link href="/contact">
              <Mail className="mr-2 h-5 w-5" />
              Contact Us
            </Link>
          </Button>
          <Button asChild size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/faq-generator">
              <HelpCircle className="mr-2 h-5 w-5" />
              Try FAQ Generator
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
