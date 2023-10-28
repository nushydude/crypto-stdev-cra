const fs = require('fs');

const buildNumber = fs.readFileSync('./build-number.txt', 'utf-8').trim();

fs.writeFileSync('./.env', `REACT_APP_BUILD_NUMBER=${buildNumber}`);
