module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // ignore test util folder
  modulePathIgnorePatterns: ['.src/util/__tests__/util.ts'],
};
