'use client';

import React, { forwardRef } from 'react'; // Added forwardRef
import Image from 'next/image';
import { Button } from '@/components/ui/button';

function WelcomeImage() {
  return (
    <div className="relative h-[250px] w-[250px] overflow-hidden rounded-full border-4 border-white/10 mb-4">
      <Image
        src="/Malvin_self.png"
        alt="Malvin_self"
        fill
        className="object-cover"
        priority
      />
    </div>
  );
}

interface WelcomeViewProps {
  startButtonText: string;
  onStartCall: () => void;
}

// Wrap the component in forwardRef so 'motion' works correctly
export const WelcomeView = forwardRef<HTMLDivElement, WelcomeViewProps>(
  ({ startButtonText, onStartCall }, ref) => {
    return (
      <div ref={ref}>
        <section className="animate-gradient flex min-h-screen flex-col items-center justify-center text-center">
          <WelcomeImage />

          <p className="max-w-prose pt-1 leading-6 font-medium text-white">
            Ask malvin any thing
          </p>

          <Button
            size="lg"
            onClick={onStartCall} // This triggers the 'start' from ViewController
            className="mt-6 w-64 rounded-full font-mono text-xs font-bold tracking-wider uppercase"
          >
            {startButtonText}
          </Button>
        </section>

        <div className="fixed bottom-5 left-0 flex w-full items-center justify-center">
          <p className="max-w-prose pt-1 text-xs leading-5 font-normal text-pretty text-white/80 md:text-sm">
            Need help? Check out the{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="mailto:malvinsupportteam@gmail.com"
              className="underline"
            >
              Support Email address
            </a>
            .
          </p>
        </div>
      </div>
    );
  }
);

WelcomeView.displayName = 'WelcomeView';