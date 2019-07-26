export class UserAgent {
  public readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(version: string): UserAgent {
    return new UserAgent(`Algolia for Javascript (${version})`);
  }

  public with(options: UserAgentOptions): UserAgent {
    return new UserAgent(`${this.value}; ${options.segment} (${options.version})`);
  }
}

type UserAgentOptions = {
  readonly segment: string;
  readonly version: string;
};
