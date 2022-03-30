import type config from '../config/clients.config.json';

export type CheckForCacheOptions = {
  job: string;
  folder: string;
  generatedFiles: string[];
  filesToCache: string[];
  cacheFile: string;
};

export type CheckForCache = {
  cacheExists: boolean;
  hash: string;
};

export type Generator = Record<string, any> & {
  language: string;
  client: string;
  key: string;
  additionalProperties: Record<string, any> & {
    packageName: string;
    hasRegionalHost?: boolean;
  };
};

export type RunOptions = {
  errorMessage?: string;
  verbose?: boolean;
  cwd?: string;
};

export type Language = keyof typeof config;
