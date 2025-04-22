// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'jest-environment-jsdom',
//   moduleNameMapper: {
//     '^react-router-dom$': 'react-router-dom',
//   },
//   transform: {
//     '^.+\\.(ts|tsx)$': 'ts-jest',
//   },
//   setupFilesAfterEnv: [
//     '@testing-library/jest-dom'
//   ],
//   transformIgnorePatterns: [
//     'node_modules/(?!(react-router-dom)/)',
//   ],
//   moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
// };


// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!axios)', // allow transforming axios if it's ESM
  ],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};
