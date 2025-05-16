'use client';

import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  launchDate: string; // ISO string format e.g., "2024-12-31T23:59:59"
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownTimer({ launchDate }: CountdownTimerProps) {
  const calculateTimeLeft = (): TimeLeft | null => {
    const difference = +new Date(launchDate) - +new Date();
    if (difference <= 0) {
      return null; // Launch date has passed
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Calculate initial time left on mount
    setTimeLeft(calculateTimeLeft());
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [launchDate]);

  if (!isClient || timeLeft === null) {
    return (
      <div className="text-center space-y-3 py-8">
        <h2 className="text-3xl font-semibold text-primary">We've Launched!</h2>
        <p className="text-foreground/70">Our site is now live. Explore what we have to offer!</p>
      </div>
    );
  }

  const timeSegments = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="text-center space-y-6 py-8">
      <div className="flex items-center justify-center space-x-2 text-accent">
        <Clock className="h-8 w-8" />
        <h2 className="text-3xl font-semibold tracking-tight">Launching In</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 max-w-2xl mx-auto px-4">
        {timeSegments.map((segment, index) => (
          <div key={segment.label} className="bg-card p-4 md:p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
            <div className="text-4xl md:text-5xl font-bold text-primary animate-pulse-glow">
              {String(segment.value).padStart(2, '0')}
            </div>
            <div className="text-sm md:text-base text-muted-foreground uppercase tracking-wider mt-1">
              {segment.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
