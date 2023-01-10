module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "\\.(scss|sass|css)$": "identity-obj-proxy",
  },
  coveragePathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/tests/"],
};
