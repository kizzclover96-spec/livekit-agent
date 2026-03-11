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
  const tokenSource = useMemo(() => {
    return TokenSource.endpoint('/api/connection-details');
  }, []);

  const session = useSession(tokenSource);

  // AUTO-START TRIGGER
  useEffect(() => {
    if (session.connectionState === 'disconnected') {
      session.start();
    }
  }, [session]);

  return (
    <AgentSessionProvider session={session}>
      <AppSetup />
      <main className="grid h-svh grid-cols-1 place-content-center">
        <ViewController appConfig={appConfig} />
      </main>

      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        {/* Removed the 'session' prop to fix the Type Error */}
        <StartAudioButton label="Connect & Start Audio" />
      </div>

      <Toaster position="top-center" />
    </AgentSessionProvider>
  );
}