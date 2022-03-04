import { createUserAgent } from './createUserAgent';
import type { UserAgentOptions, UserAgent } from './types';

export type GetUserAgent = {
  userAgents: UserAgentOptions[];
  client: string;
  version: string;
};

export function getUserAgent({
  userAgents,
  client,
  version,
}: GetUserAgent): UserAgent {
  const defaultUserAgent = createUserAgent(version).add({
    segment: client,
    version,
  });

  userAgents.forEach((userAgent) => defaultUserAgent.add(userAgent));

  return defaultUserAgent;
}
