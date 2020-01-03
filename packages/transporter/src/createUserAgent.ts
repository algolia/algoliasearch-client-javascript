import { UserAgent, UserAgentOptions } from '.';

export function createUserAgent(version: string): UserAgent {
  const userAgent: UserAgent = {
    value: `Algolia for JavaScript (${version})`,
    add(options: UserAgentOptions): UserAgent {
      const addedUserAgent = `; ${options.segment}${
        options.version !== undefined ? ` (${options.version})` : ''
      }`;

      if (userAgent.value.indexOf(addedUserAgent) === -1) {
        // eslint-disable-next-line functional/immutable-data
        userAgent.value = `${userAgent.value}${addedUserAgent}`;
      }

      return userAgent;
    },
  };

  return userAgent;
}
