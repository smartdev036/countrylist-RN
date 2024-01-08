// eslint-disable-next-line no-undef
module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node', 'android.js', 'ios.js'],
  automock: false,
  setupFiles: ['./jest/jest.setup.ts'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    '\\.(js|jsx|ts|tsx)$': 'ts-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|@react-native-async-storage|@usercentrics/react-native-sdk)',
  ],
  testRegex: ['(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$'],
  testPathIgnorePatterns: [
    '\\.snap$',
    '<rootDir>/node_modules/',
    '<rootDir>/e2e/',
  ],
  testEnvironment: 'node',
  globals: {
    __DEV__: true,
  }
};