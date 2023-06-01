import {Config} from '@jest/types';

const config: Config.InitialOptions = {
  testEnvironment: 'node',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(mjs?|jsx?|js?|tsx?|ts?)$'
  ,
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/"
  ],
  moduleFileExtensions: ["ts"],
  transform: {}
};

export default config
