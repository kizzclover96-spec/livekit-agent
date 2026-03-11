'use client';

import { useMemo, useEffect } from 'react';
import { TokenSource } from 'livekit-client';
import { useSession } from '@livekit/components-react';
import { WarningIcon } from '@phosphor-icons/react/dist/ssr';
import type { AppConfig } from '@/app-config';
import { AgentSessionProvider } from '@/components/agents-ui/agent-session-provider';
import { StartAudioButton } from '@/components/agents-ui/start-audio-button';
import { ViewController } from '@/components/app/view-controller';
import { Toaster } from '@/components/ui/sonner';
import { useAgentErrors } from '@/hooks/useAgentErrors';
import { useDebugMode } from '@/hooks/useDebug';

const IN_DEVELOPMENT = process.env.NODE_ENV !== 'production';

function AppSetup() {
  useDebugMode({ enabled: IN_DEVELOPMENT });
  useAgentErrors();
  return null;
}

export function App({ appConfig }: { appConfig: AppConfig }) {
  // 1. Force the endpoint to your API route
  const tokenSource = useMemo(() => {
    return TokenSource.endpoint('/api/connection-details');
  }, []);

  // 2. Initialize the session
  const session = useSession(tokenSource);

 

  return (
    <AgentSessionProvider session={session}>
      <AppSetup />
      <main className="grid h-svh grid-cols-1 place-content-center">
        {/* The ViewController handles the screen swap. 
            If session.state isn't 'connected', it stays on the Welcome screen. */}
        <ViewController appConfig={appConfig} />
      </main>

      {/* This button is vital. If the browser blocks audio, 
          the session might 'connect' but stay silent until this is clicked. */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <StartAudioButton label="Connect & Start Audio" />
      </div>

      <Toaster position="top-center" />
    </AgentSessionProvider>
  );
}