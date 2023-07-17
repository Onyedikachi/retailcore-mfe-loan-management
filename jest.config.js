module.exports = {
  rootDir: "src",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(j|t)sx?$": "babel-jest",
  },
  modulePaths: ['<rootDir>'],
  rootDir: './',
  moduleNameMapper: {
    "\\.(css)$": "identity-obj-proxy",
    "single-spa-react/parcel": "single-spa-react/lib/cjs/parcel.cjs",
    "@app/(.*)": "<rootDir>/src/$1"
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
};
