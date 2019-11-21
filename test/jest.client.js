module.exports = {
  ...require('./jest-common'),
  displayName: 'src/',
  testMatch: ['<rootDir>/src/**/*.test.js'],
  testEnvironment: 'jest-environment-jsdom'
};
