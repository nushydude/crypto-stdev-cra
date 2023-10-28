const isProduction = process.env.NODE_ENV === 'production';
// Refer to prebuild.js for why this is available from env vars.
const buildNumber = isProduction ? process.env.REACT_APP_BUILD_NUMBER : 'dev';

export const config = {
  API_URI: 'https://crypto-stdev-express.vercel.app',
  BUILD_NUMBER: buildNumber,
};
