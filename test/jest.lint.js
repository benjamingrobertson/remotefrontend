const { rootDir } = require('./jest-common');

module.exports = {
  rootDir,
  displayName: 'lint:js',
  runner: 'jest-runner-eslint',
  testMatch: ['<rootDir>/src/**/*.js']
};
