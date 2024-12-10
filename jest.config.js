module.exports = {
    moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
    transform: {
        '^.+\\.vue$': 'vue-jest',
        '^.+\\.js$': 'babel-jest',
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '\\.(css|scss|sass|less)$': 'jest-transform-stub',
        '\\.(jpg|jpeg|png|gif|svg)$': 'jest-transform-stub',
    },
    transformIgnorePatterns: ['/node_modules/(?!@vue|vue)/'],
    testEnvironment: 'jest-environment-jsdom',
};
