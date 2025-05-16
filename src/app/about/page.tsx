import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Info } from "lucide-react";
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="flex-grow flex flex-col items-center justify-center p-4 md:p-8 bg-background">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="text-center">
          <Info className="mx-auto h-12 w-12 text-primary mb-4" />
          <CardTitle className="text-3xl font-bold text-primary">About Launchpad</CardTitle>
          <CardDescription className="text-foreground/80">
            Learn more about our upcoming application.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Image 
            src="https://placehold.co/600x300.png" 
            alt="Placeholder image for about section"
            data-ai-hint="team collaboration"
            width={600} 
            height={300}
            className="rounded-lg shadow-md mx-auto" 
          />
          <p className="text-foreground/90 leading-relaxed">
            Welcome to Launchpad! We are building an innovative platform designed to revolutionize [Your Industry/Field]. Our mission is to provide users with a seamless and powerful experience, packed with cutting-edge features and an intuitive interface.
          </p>
          <p className="text-foreground/90 leading-relaxed">
            Our team is passionate about technology and dedicated to creating solutions that make a real difference. While Launchpad is currently under construction, we are working tirelessly to bring our vision to life. We believe that [Your Core Value Proposition] will empower our users to achieve more.
          </p>
          <p className="text-muted-foreground text-center">
            Stay tuned for more updates as we approach our launch date. We can't wait to share Launchpad with you!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
