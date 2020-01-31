import { UserAgentOptions } from './UserAgentOptions';

export type UserAgent = {
  /**
   * The raw value of the user agent.
   *
   * @readonly
   */
  value: string; // eslint-disable-line functional/prefer-readonly-type

  /**
   * Mutates the current user agent ading the given user agent options.
   */
  readonly add: (options: UserAgentOptions) => UserAgent;
};
