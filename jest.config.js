/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'], // O __tests__ si prefieres esa convención
  moduleNameMapper: {
  '^routes/(.*)$': '<rootDir>/src/routes/$1',
  '^controllers/(.*)$': '<rootDir>/src/controllers/$1',
  '^models/(.*)$': '<rootDir>/src/models/$1',
  '^config/(.*)$'      : '<rootDir>/src/config/$1',
  '^utils/(.*)$'       : '<rootDir>/src/utils/$1',
  '^types/(.*)$'       : '<rootDir>/src/types/$1',
  '^core/(.*)$'        : '<rootDir>/src/core/$1',
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  roots: ['<rootDir>/src'],
/*   testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
  ],
  modulePathIgnorePatterns: [
    '<rootDir>/dist/',
  ], */
};
