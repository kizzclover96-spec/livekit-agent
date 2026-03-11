'use client';

import { useMemo } from 'react';
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

interface AppProps {
  appConfig: AppConfig;
}

export function App({ appConfig }: AppProps) {
  // FIX 1: Force the app to use YOUR backend route instead of the LiveKit sandbox.
  const tokenSource = useMemo(() => {
    return TokenSource.endpoint('/api/connection-details');
  }, []);

  // FIX 2: Explicitly request the 'default' agent to match your route.ts logic.
  const session = useSession(
    tokenSource,
    { agentName: 'default' } 
  );

  return (
    <AgentSessionProvider session={session}>
      <AppSetup />
      <main className="grid h-svh grid-cols-1 place-content-center">
        <ViewController appConfig={appConfig} />
      </main>
      
      {/* IMPORTANT: This template often requires you to click this button 
          AFTER clicking "Wake Malvin" to enable the microphone.
      */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2">
        <StartAudioButton label="Enable Microphone" />
      </div>

      <Toaster
        icons={{
          warning: <WarningIcon weight="bold" />,
        }}
        position="top-center"
        className="toaster group"
        style={
          {
            '--normal-bg': 'var(--popover)',
            '--normal-text': 'var(--popover-foreground)',
            '--normal-border': 'var(--border)',
          } as React.CSSProperties
        }
      />
    </AgentSessionProvider>
  );
}
