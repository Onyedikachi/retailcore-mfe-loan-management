module.exports = {
  rootDir: "./",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(j|t)sx?$": "babel-jest",
  },
  modulePaths: ['<rootDir>'],
  moduleNameMapper: {
    "\\.(css)$": "identity-obj-proxy",
    "single-spa-react/parcel": "single-spa-react/lib/cjs/parcel.cjs",
    "@app/(.*)": "<rootDir>/src/$1"
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/src/**/*.{js,ts,tsx}"],
  coverageThreshold: {
    "global": {
      "lines": 20
    }
  }
};
