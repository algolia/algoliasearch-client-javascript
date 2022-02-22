import type { Host } from './Host';
import type { Timeouts, UserAgentOptions } from './Transporter';

export type AuthMode = 'WithinHeaders' | 'WithinQueryParameters';

export type CreateClientOptions = {
  appId: string;
  apiKey: string;
  requester: any;
  timeouts: Timeouts;
  userAgents: UserAgentOptions[];
  hosts?: Host[];
  authMode?: AuthMode;
};
