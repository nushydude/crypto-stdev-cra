/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BUILD_NUMBER: string;
  readonly VITE_SENTRY_DSN: string;
  readonly VITE_ONESIGNAL_APP_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
} 