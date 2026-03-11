'use client';

import { useCallback } from 'react'; // Added for proper callback binding
import { AnimatePresence, motion } from 'motion/react';
import { useSessionContext } from '@livekit/components-react';
import type { AppConfig } from '@/app-config';
import { SessionView } from '@/components/app/session-view';
import { WelcomeView } from '@/components/app/welcome-view';

const MotionWelcomeView = motion.create(WelcomeView);
const MotionSessionView = motion.create(SessionView);

const VIEW_MOTION_PROPS = {
  variants: {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  },
  initial: 'hidden',
  animate: 'visible',
  exit: 'hidden',
  transition: {
    duration: 0.5,
    ease: 'linear',
  },
};

interface ViewControllerProps {
  appConfig: AppConfig;
}

export function ViewController({ appConfig }: ViewControllerProps) {
  // 1. Context Consumption: Explicitly extracting start from the context provider
  const { isConnected, start } = useSessionContext();

  // 2. Callback Binding: Creating a stable reference to initiate the agent
  // This ensures the button's onClick handler has a solid reference to the start function.
  const handleStartAgent = useCallback(async () => {
    try {
      console.log('Initiating agent session...');
      await start();
    } catch (error) {
      console.error('Failed to start agent:', error);
    }
  }, [start]);

  return (
    <AnimatePresence mode="wait">
      {/* Welcome view */}
      {!isConnected && (
        <MotionWelcomeView
          key="welcome"
          {...VIEW_MOTION_PROPS}
          startButtonText={appConfig.startButtonText}
          // Passing the bound callback to the WelcomeView
          onStartCall={handleStartAgent}
        />
      )}
      {/* Session view */}
      {isConnected && (
        <MotionSessionView 
          key="session-view" 
          {...VIEW_MOTION_PROPS} 
          appConfig={appConfig} 
        />
      )}
    </AnimatePresence>
  );
}