import { ContactForm } from '@/components/ContactForm';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Mail } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="flex-grow flex flex-col items-center justify-center p-4 md:p-8 bg-background">
      <div className="w-full max-w-lg space-y-8">
        <div className="text-center">
          <Mail className="mx-auto h-12 w-12 text-primary mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-primary">
            Get in Touch
          </h1>
          <p className="mt-2 text-lg text-foreground/80">
            Have questions or want to sign up for updates? Fill out the form below.
          </p>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
