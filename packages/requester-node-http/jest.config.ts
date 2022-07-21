import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  roots: ['src/__tests__'],
  testEnvironment: 'node',
};

export default config;
