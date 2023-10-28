const isProduction = process.env.NODE_ENV === 'production';
const buildNumber = isProduction ? process.env.BUILD_NUMBER : 'dev';

export const config = {
  API_URI: 'https://crypto-stdev-express.vercel.app',
  BUILD_NUMBER: buildNumber,
};
