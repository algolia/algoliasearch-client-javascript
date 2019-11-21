import { UserAgentOptions } from './UserAgentOptions';

export type UserAgent = {
  readonly value: string;
  readonly add: (options: UserAgentOptions) => UserAgent;
};
