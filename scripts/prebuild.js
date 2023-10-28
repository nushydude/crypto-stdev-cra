// Before building the app, we read the build number from build-number.txt and write it to the .env file.
// Then, the build can be referenced from the app as process.env.REACT_APP_BUILD_NUMBER.

// Tbe build number would be incremented by the GitHub Actions workflow. Refer to build-deploy.yml
const fs = require('fs');

const buildNumber = fs.readFileSync('./build-number.txt', 'utf-8').trim();

fs.writeFileSync('./.env', `REACT_APP_BUILD_NUMBER=${buildNumber}`);
