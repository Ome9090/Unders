import { HardHat } from 'lucide-react';

export function ConstructionNotice() {
  return (
    <div className="text-center space-y-4">
      <HardHat className="mx-auto h-16 w-16 text-primary animate-bounce" />
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">
        Under Construction
      </h1>
      <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto">
        We're working hard to bring you something amazing. Stay tuned for our launch!
      </p>
    </div>
  );
}
