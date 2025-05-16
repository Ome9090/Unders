'use server';

import { z } from 'zod';
import { generateFaq as aiGenerateFaq } from '@/ai/flows/generate-faq';
import type { GenerateFaqInput, GenerateFaqOutput } from '@/ai/flows/generate-faq';

// Contact Form
const ContactFormSchema = z.object({
  name: z.string().optional(),
  email: z.string().email({ message: "Invalid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters long." }),
});

export type ContactFormState = {
  message: string;
  status: 'success' | 'error' | 'idle';
  errors?: {
    email?: string[];
    message?: string[];
    name?: string[];
  }
}

export async function submitContactForm(prevState: ContactFormState, formData: FormData): Promise<ContactFormState> {
  try {
    const validatedFields = ContactFormSchema.safeParse({
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    });

    if (!validatedFields.success) {
      return {
        message: "Validation failed. Please check your input.",
        status: 'error',
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    // In a real application, you would send an email or save to a database here.
    // For this example, we'll just log the data.
    console.log("Contact form submitted:", validatedFields.data);

    return {
      message: "Thank you for your message! We'll get back to you soon.",
      status: 'success',
    };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return {
      message: "An unexpected error occurred. Please try again later.",
      status: 'error',
    };
  }
}


// FAQ Generator
const FaqGeneratorSchema = z.object({
  webData: z.string().min(50, { message: "Web data must be at least 50 characters long." }),
});

export type FaqGeneratorState = {
  message: string;
  status: 'success' | 'error' | 'idle';
  faqs?: GenerateFaqOutput['faqs'];
   errors?: {
    webData?: string[];
  }
}

export async function handleGenerateFaq(prevState: FaqGeneratorState, formData: FormData): Promise<FaqGeneratorState> {
  try {
    const validatedFields = FaqGeneratorSchema.safeParse({
      webData: formData.get('webData'),
    });

    if (!validatedFields.success) {
      return {
        message: "Validation failed. Please check your input.",
        status: 'error',
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }
    
    const input: GenerateFaqInput = { webData: validatedFields.data.webData };
    const result = await aiGenerateFaq(input);

    if (result && result.faqs) {
      return {
        message: "FAQs generated successfully!",
        status: 'success',
        faqs: result.faqs,
      };
    } else {
      return {
        message: "AI could not generate FAQs from the provided data.",
        status: 'error',
      };
    }
  } catch (error) {
    console.error("Error generating FAQs:", error);
    return {
      message: "An unexpected error occurred while generating FAQs. Please try again.",
      status: 'error',
    };
  }
}
