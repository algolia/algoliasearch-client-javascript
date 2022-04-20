import type config from '../config/clients.config.json';

export type Generator = Record<string, any> & {
  language: string;
  client: string;
  key: string;
  additionalProperties: AdditionalProperties;
};

export type AdditionalProperties = Partial<{
  packageName: string;
  hasRegionalHost: boolean;
  fallbackToAliasHost: boolean;
  isEuHost: boolean;
  isDeHost: boolean;
  host: string;
  topLevelDomain: string;
  /**
   * Client name needs to be explicitly set, no variables required in the host.
   */
  experimentalHost: string;
}> &
  Record<string, any>;

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

export type RunOptions = {
  errorMessage?: string;
  verbose?: boolean;
  cwd?: string;
};

export type Language = keyof typeof config;

export type Spec = {
  servers: Server[];
  tags: Tag[];
  paths: Path[];
};

/**
 * Server of a spec.
 */
type Server = {
  url: string;
  variables?: {
    [k: string]: {
      enum?: string[];
      default: string;
    };
  };
};

/**
 * Global tag of a spec.
 */
type Tag = {
  name: string;
  description: string;
};

/**
 * Paths of a spec.
 */
type Path = Record<string, Record<string, any>>;
