module.exports = {
  modulePathIgnorePatterns: ['<rootDir>/.cache', '<rootDir>/node_modules']
};

module.exports = {
  ...require('./test/jest-common'),
  collectCoverageFrom: ['**/src/**/*.js', '!**/src/**/*.stories.js'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/__tests__/',
    '/static/',
    '/public/'
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/coverage/',
    '/public/',
    '/.cache/',
    '/__mocks__/',
    '/static/'
  ],
  projects: ['./test/jest.lint.js', './test/jest.client.js']
};
