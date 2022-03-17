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
