export class UserAgent {
  public readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(version: string): UserAgent {
    return new UserAgent(`Algolia for JavaScript (${version})`);
  }

  public with(options: UserAgentOptions): UserAgent {
    // eslint-disable-next-line functional/no-let
    let value = `${this.value}; ${options.segment}`;

    if (options.version !== undefined) {
      value += ` (${options.version})`;
    }

    return new UserAgent(value);
  }
}

export type UserAgentOptions = {
  readonly segment: string;
  readonly version?: string;
};
