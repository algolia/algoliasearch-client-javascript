import { UserAgent, UserAgentOptions } from '.';

export function createUserAgent(version: string): UserAgent {
  // eslint-disable-next-line functional/no-let
  const userAgent: UserAgent = {
    value: `Algolia for JavaScript (${version})`,
    add(options: UserAgentOptions): UserAgent {
      // eslint-disable-next-line functional/immutable-data
      userAgent.value = `${userAgent.value}; ${options.segment}${
        options.version !== undefined ? ` (${options.version})` : ''
      }`;

      return userAgent;
    },
  };

  return userAgent;
}
