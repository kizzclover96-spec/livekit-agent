import Image from 'next/image';
import { Button } from '@/components/ui/button';

function WelcomeImage() {
  return (
    <Image
      src="/Malvin_self.png"
      alt="Malvin_self"
      width={250}
      height={250}
      className="mb-4"
      priority
    />
  );
}

interface WelcomeViewProps {
  startButtonText: string;
  onStartCall: () => void;
}

export const WelcomeView = ({
  startButtonText,
  onStartCall,
  ref,
}: React.ComponentProps<'div'> & WelcomeViewProps) => {
  return (
    <div ref={ref}>
      <section className="animate-gradient flex min-h-screen flex-col items-center justify-center text-center">
        <WelcomeImage />

        <p className="max-w-prose pt-1 leading-6 font-medium text-white">Ask malvin any thing</p>

        <Button
          size="lg"
          onClick={onStartCall}
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
            Voice AI quickstart
          </a>
          .
        </p>
      </div>
    </div>
  );
};