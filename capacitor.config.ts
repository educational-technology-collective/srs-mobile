import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'Flashcard learning aid using spaced-repetition (com.etc.ambientlearning)',
  appName: 'Ambient',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
  },
  
};

export default config;
