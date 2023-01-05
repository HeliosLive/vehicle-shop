module.exports = {
    preset: 'jest-preset-angular',
    testEnvironment: 'jsdom',
    globals: {
        isolatedModules: true
    },
    roots: ['src'],
    setupFilesAfterEnv: ['./src/setup-jest.ts'],
    globalSetup: 'jest-preset-angular/global-setup',
    reporters: ['default', 'jest-junit'],
    coverageReporters: ['html', 'cobertura', 'lcov', 'text'],
    testResultsProcessor: 'jest-sonar-reporter',
    collectCoverage: false,
    collectCoverageFrom: [
        '**/src/**/*.ts',
        '!**/node_modules/**',
        '!**/src/main.ts',
        '!**/src/jestGlobalMocks.ts',
        '!**/src/**/*.module.ts',
        '!**/src/app/shared/models/**',
        '!**/src/app/shared/helpers/**',
        '!test/**',
        '!**/polyfills.ts',
        '!**/environments/**',
        '!**/src/setupJest.ts',
        '!**/index.ts',
        '!**/*.token.ts',
        '!**/*.config.ts'
    ],
    testPathIgnorePatterns: ['/node_modules/', '/src/environments/'],
    moduleDirectories: ['node_modules', __dirname],
    moduleNameMapper: {
        '@core/(.*)': 'src/app/core/$1',
        '@shared/(.*)': 'src/app/shared/$1',
        '@test/(.*)': 'src/test/$1'
    }
};
