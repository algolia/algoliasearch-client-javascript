import type { Host } from './Host';
import type { Requester } from './Requester';
import type { Timeouts, UserAgentOptions } from './Transporter';

export type AuthMode = 'WithinHeaders' | 'WithinQueryParameters';

export type CreateClientOptions = {
  appId: string;
  apiKey: string;
  requester: Requester;
  timeouts: Timeouts;
  userAgents: UserAgentOptions[];
  hosts?: Host[];
  authMode?: AuthMode;
};
