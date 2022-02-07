import type { UserAgentOptions, UserAgent } from './types';

export function createUserAgent(version: string): UserAgent {
  const userAgent = {
    value: `Algolia for JavaScript (${version})`,
    add(options: UserAgentOptions): UserAgent {
      const addedUserAgent = `; ${options.segment}${
        options.version !== undefined ? ` (${options.version})` : ''
      }`;

      if (userAgent.value.indexOf(addedUserAgent) === -1) {
        userAgent.value = `${userAgent.value}${addedUserAgent}`;
      }

      return userAgent;
    },
  };

  return userAgent;
}
