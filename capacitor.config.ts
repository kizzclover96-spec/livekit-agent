import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.malvin.agent',
  appName: 'malvin',
  webDir: 'out',
  server: {
    // PASTE YOUR VERCEL HTTPS URL BELOW
    url: 'https://livekit-agent-rho.vercel.app/', 
    cleartext: true
  }
};

export default config;