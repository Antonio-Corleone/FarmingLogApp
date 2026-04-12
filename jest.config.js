module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  
  testMatch: [
    '<rootDir>/src/screens/**/__tests__/**/*.{ts,tsx}',
    '<rootDir>/src/screens/**/*.{spec,test}.{ts,tsx}',
    '<rootDir>/src/store/**/__tests__/**/*.{ts,tsx}',
    '<rootDir>/src/store/**/*.{spec,test}.{ts,tsx}'
  ],

  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)'
  ],

  collectCoverage: true,
  collectCoverageFrom: [
    'src/screens/**/*.{ts,tsx}',
    'src/store/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/__tests__/**',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
};