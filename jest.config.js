module.exports = {
  testEnvironment: "jsdom",
  collectCoverageFrom: [
    "<rootDir>/src/**/*.{ts,tsx}"
  ],
  coverageDirectory: "coverage",
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.(spec|test).{ts,tsx}"
  ],
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "png"
  ],
  "moduleNameMapper": {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "identity-obj-proxy",
    "\\.(css|scss)$": "identity-obj-proxy"
  },
  moduleDirectories: ["node_modules", "src"],
  setupFilesAfterEnv: [
    "<rootDir>/jest-setup.ts"
  ]
};
