/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'], // O __tests__ si prefieres esa convención
  moduleNameMapper: {
  '^routes/(.*)$': '<rootDir>/src/routes/$1',
  '^controllers/(.*)$': '<rootDir>/src/controllers/$1',
  '^models/(.*)$': '<rootDir>/src/models/$1',
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  roots: ['<rootDir>/src'],
};
