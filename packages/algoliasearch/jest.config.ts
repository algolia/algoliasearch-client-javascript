import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['__tests__'],
  moduleDirectories: ['../../node_modules'],
};

export default config;
