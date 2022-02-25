export type Generator = Record<string, any> & {
  language: string;
  client: string;
  key: string;
};

export type RunOptions = {
  errorMessage?: string;
  verbose?: boolean;
  cwd?: string;
};
