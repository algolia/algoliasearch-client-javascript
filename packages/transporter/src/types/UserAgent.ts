import { UserAgentOptions } from './UserAgentOptions';

export type UserAgent = {
  /**
   * @readonly
   */
  value: string; // eslint-disable-line functional/prefer-readonly-type
  readonly add: (options: UserAgentOptions) => UserAgent;
};
