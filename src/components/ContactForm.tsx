'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { submitContactForm, type ContactFormState } from '@/lib/actions';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Mail } from 'lucide-react';

const formSchema = z.object({
  name: z.string().optional(),
  email: z.string().email({ message: "Invalid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters long." }),
});

type FormData = z.infer<typeof formSchema>;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
      {pending ? 'Sending...' : 'Send Message'}
    </Button>
  );
}

export function ContactForm() {
  const { toast } = useToast();
  const initialState: ContactFormState = { message: "", status: 'idle' };
  const [state, formAction] = useFormState(submitContactForm, initialState);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    }
  });
  
  useEffect(() => {
    if (state.status === 'success') {
      toast({
        title: "Message Sent!",
        description: state.message,
      });
      reset(); // Reset form fields
    } else if (state.status === 'error' && state.message) {
      // Server-side errors not related to specific fields
      if (!state.errors) {
         toast({
          title: "Error",
          description: state.message,
          variant: "destructive",
        });
      }
    }
  }, [state, toast, reset]);

  return (
    <form action={formAction} className="space-y-6 p-8 border rounded-lg shadow-lg bg-card">
      <div className="space-y-1">
        <Label htmlFor="name">Name (Optional)</Label>
        <Input id="name" {...register('name')} placeholder="Your Name" />
        {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
        {state.errors?.name && <p className="text-sm text-destructive">{state.errors.name[0]}</p>}
      </div>

      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" {...register('email')} placeholder="your@email.com" required />
        {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
        {state.errors?.email && <p className="text-sm text-destructive">{state.errors.email[0]}</p>}
      </div>

      <div className="space-y-1">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" {...register('message')} placeholder="Your question or feedback..." rows={5} required />
        {errors.message && <p className="text-sm text-destructive">{errors.message.message}</p>}
        {state.errors?.message && <p className="text-sm text-destructive">{state.errors.message[0]}</p>}
      </div>
      
      <SubmitButton />
    </form>
  );
}
