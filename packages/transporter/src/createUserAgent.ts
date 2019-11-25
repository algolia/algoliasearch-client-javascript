import { UserAgent, UserAgentOptions } from '.';

export function createUserAgent(version: string): UserAgent {
  // eslint-disable-next-line functional/no-let
  let value = `Algolia for JavaScript (${version})`;

  const add = (options: UserAgentOptions): UserAgent => {
    value = `${value}; ${options.segment}${
      options.version !== undefined ? ` (${options.version})` : ''
    }`;

    return { value, add };
  };

  return { value, add };
}
