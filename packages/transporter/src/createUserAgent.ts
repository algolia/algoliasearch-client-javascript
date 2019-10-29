// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createUserAgent(version: string) {
  return {
    value: `Algolia for JavaScript (${version})`,
    with(options: UserAgentOptions) {
      // eslint-disable-next-line functional/immutable-data
      this.value = `${this.value}; ${options.segment}`;

      if (options.version !== undefined) {
        // eslint-disable-next-line functional/immutable-data
        this.value += ` (${options.version})`;
      }

      return Object.assign({}, this);
    },
  };
}

export type UserAgentOptions = {
  readonly segment: string;
  readonly version?: string;
};
