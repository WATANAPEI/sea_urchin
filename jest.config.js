module.exports = {
  roots: ["<rootDir>/client"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  verbose: true,
  //testRegex: "(/__test__/.*|(\\.|/)(test|spec))\\.tsx?$",
  testRegex: "/__test__/.*(\\.(test|spec))\\.tsx?$",
  moduleNameMapper: {
    "\\.(css)$": "identity-obj-proxy"
//    "^userEnv$": "<roodDir>/.env/dev.ts"
  },
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "json",
    "jsx"
  ],
  coveragePathIgnorePatterns: [
    "<rootDir>/client/utils",
    "<rootDir>/client/__test__"
  ],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  setupFilesAfterEnv: ["<rootDir>/client/__test__/setupEnzyme.ts"]
};
