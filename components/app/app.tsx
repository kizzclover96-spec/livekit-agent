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
  // 1. Force the app to use your internal API route (bypasses sandbox)
  const tokenSource = useMemo(() => {
    return TokenSource.endpoint('/api/connection-details');
  }, []);

  // 2. Initialize the session object
  const session = useSession(tokenSource);

  // 3. THE TRIGGER: This forces the connection attempt.
  // We use a small timeout to make sure the mobile browser is fully loaded.
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (session.connectionState === 'disconnected') {
        console.log("Ignition: Connecting to Malvin...");
        session.start().catch((err) => console.error("Auto-start failed:", err));
      }
    }, 500); 

    return () => clearTimeout(timeout);
  }, [session]);

  return (
    <AgentSessionProvider session={session}>
      <AppSetup />
      
      <main className="grid h-svh grid-cols-1 place-content-center">
        {/* ViewController automatically flips the screen once session.connectionState is 'connected' */}
        <ViewController appConfig={appConfig} />
      </main>

      {/* Manual Button: Serves as a backup and handles browser audio unlock */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <StartAudioButton label="Connect & Start Audio" />
      </div>

      <Toaster 
        position="top-center" 
        style={{
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
        } as React.CSSProperties}
      />
    </AgentSessionProvider>
  );
}