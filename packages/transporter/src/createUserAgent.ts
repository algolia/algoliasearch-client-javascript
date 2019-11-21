import { UserAgent, UserAgentOptions } from '.';

export function createUserAgent(version: string): UserAgent {
  const value = `Algolia for JavaScript (${version})`;

  const add = (options: UserAgentOptions): UserAgent => {
    const valueWithAddedSegment = `${value}; ${options.segment}${
      options.version !== undefined ? ` (${options.version})` : ''
    }`;

    return {
      value: valueWithAddedSegment,
      add,
    };
  };

  return { value, add };
}
