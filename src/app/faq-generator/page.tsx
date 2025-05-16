import { FaqGeneratorClient } from '@/components/FaqGeneratorClient';
import { HelpCircle, Sparkles } from 'lucide-react';

export default function FaqGeneratorPage() {
  return (
    <div className="flex-grow flex flex-col items-center p-4 md:p-8 bg-background">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center">
          <HelpCircle className="mx-auto h-12 w-12 text-primary mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-primary">
            AI-Powered FAQ Generator
          </h1>
          <p className="mt-2 text-lg text-foreground/80">
            Paste scraped web data below to automatically generate relevant questions and answers.
          </p>
        </div>
        <FaqGeneratorClient />
      </div>
    </div>
  );
}
