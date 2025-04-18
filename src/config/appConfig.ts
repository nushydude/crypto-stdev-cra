const isProduction = process.env.NODE_ENV === 'production';
// Refer to prebuild.js for why this is available from env vars.
const buildNumber = isProduction ? import.meta.env.VITE_BUILD_NUMBER : 'dev';

export const appConfig = {
  API_URI: 'https://crypto-stdev-express.vercel.app',
  buildNumber,
  sentryDsn: import.meta.env.VITE_SENTRY_DSN,
  oneSignalAppId: import.meta.env.VITE_ONESIGNAL_APP_ID,
};
