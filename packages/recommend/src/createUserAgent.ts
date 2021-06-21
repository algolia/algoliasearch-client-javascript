import { UserAgent, UserAgentOptions } from '@algolia/transporter';

// Copied from https://github.com/algolia/algoliasearch-client-javascript/blob/831a3debd0c19c87fd71a3e09396bcb3eacd1f5c/packages/transporter/src/createUserAgent.ts
// and adapted the initial value for Recommend.
export function createUserAgent(version: string): UserAgent {
  const userAgent: UserAgent = {
    value: `Algolia Recommend for JavaScript (${version})`,
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
