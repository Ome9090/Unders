'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { handleGenerateFaq, type FaqGeneratorState } from '@/lib/actions';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Loader2 } from 'lucide-react';

const formSchema = z.object({
  webData: z.string().min(50, { message: "Web data must be at least 50 characters long." }),
});

type FormData = z.infer<typeof formSchema>;

function GenerateButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Generate FAQs
        </>
      )}
    </Button>
  );
}

export function FaqGeneratorClient() {
  const { toast } = useToast();
  const initialState: FaqGeneratorState = { message: "", status: 'idle', faqs: [] };
  const [state, formAction] = useFormState(handleGenerateFaq, initialState);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      webData: '',
    }
  });

  useEffect(() => {
    if (state.status === 'success' && state.message) {
      toast({
        title: "Success!",
        description: state.message,
      });
      // Do not reset the form here, user might want to refine webData or see results
    } else if (state.status === 'error' && state.message) {
      if (!state.errors) { // Show general error if not field specific
        toast({
          title: "Error",
          description: state.message,
          variant: "destructive",
        });
      }
    }
  }, [state, toast]);

  return (
    <div className="space-y-8 p-8 border rounded-lg shadow-lg bg-card">
      <form action={formAction} className="space-y-6">
        <div className="space-y-1">
          <Label htmlFor="webData" className="text-lg font-medium">Paste Scraped Web Data</Label>
          <Textarea 
            id="webData" 
            {...register('webData')} 
            placeholder="Paste content from a webpage here to generate FAQs..." 
            rows={10} 
            className="min-h-[200px]"
          />
          {errors.webData && <p className="text-sm text-destructive">{errors.webData.message}</p>}
          {state.errors?.webData && <p className="text-sm text-destructive">{state.errors.webData[0]}</p>}
        </div>
        <GenerateButton />
      </form>

      {state.faqs && state.faqs.length > 0 && (
        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-4 text-primary">Generated FAQs</h3>
          <Accordion type="single" collapsible className="w-full">
            {state.faqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-left hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/80">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    </div>
  );
}
