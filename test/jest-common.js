const path = require('path');

module.exports = {
  rootDir: path.join(__dirname, '..'),
  transform: {
    '^.+\\.jsx?$': '<rootDir>/test/jest-preprocess.js'
  },
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
    // eslint-disable-next-line max-len
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/file-mock.js'
  },
  testPathIgnorePatterns: ['node_modules', '.cache', 'public'],
  transformIgnorePatterns: ['node_modules/(?!(gatsby)/)'],
  globals: {
    __PATH_PREFIX__: ''
  },
  testURL: 'http://localhost',
  setupFiles: ['<rootDir>/test/jest-loadershim.js'],
  setupFilesAfterEnv: ['<rootDir>/test/jest.setup.js'],
  collectCoverageFrom: ['**/src/**/*.js'],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ]
};
