/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_FIREBASE_API_KEY: string;
  VITE_FIREBASE_APP_ID: string;
  VITE_FIREBASE_MESSAGING_SENDER_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
