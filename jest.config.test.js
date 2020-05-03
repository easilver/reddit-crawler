module.exports = {
  "testEnvironment": "node",
  "collectCoverage": true,
  "collectCoverageFrom": [
    "<rootDir>/src/data/**/*.ts",
    "<rootDir>/src/utils/**/*.ts",
    "!<rootDir>/test/**/*.ts",
    "!<rootDir>/src/components/**/*.ts",
    "!<rootDir>/src/icons/**/*.ts",
    "!<rootDir>/src/**/*.tsx",
    "!<rootDir>/src/serviceWorker.ts",
    "!<rootDir>/src/setupTests.ts",
  ],
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "css"
  ],
  "moduleDirectories": [
    "node_modules"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  "testMatch": [
    "**/test/**/?(*.)test.ts"
  ]
}
