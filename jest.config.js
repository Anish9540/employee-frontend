// module.exports = {
//   preset: 'ts-jest',  // Use ts-jest for TypeScript support
//   transform: {
//     '^.+\\.(ts|tsx)$': 'ts-jest',  // Handle TypeScript files
//     '^.+\\.(js|jsx)$': 'babel-jest',  // Use babel-jest for JS/JSX files
//   },
//   transformIgnorePatterns: [
//     '/node_modules/(?!axios)/',  // Example: Ignore node_modules except Axios (if needed)
//   ],
//   moduleNameMapper: {
//     '\\.(css|scss)$': 'identity-obj-proxy',  // If you're using CSS or SCSS in React components
//   },
//   testEnvironment: 'jsdom',  // Use jsdom for simulating a browser environment
//   setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],  // Optional: for setup code (e.g., Enzyme or other utilities)
// };


module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!axios)/' // Add other packages if needed
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less|scss)$': 'identity-obj-proxy',
    '^axios$': require.resolve('axios'),
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};