import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  roots: ['src/__tests__'],
  testEnvironment: 'jsdom',
};

export default config;
