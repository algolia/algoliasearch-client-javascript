import type { Cache } from './Cache';
import type { Host } from './Host';
import type { Requester } from './Requester';
import type {
  Timeouts,
  UserAgentOptions,
  TransporterOptions,
} from './Transporter';

export type AuthMode = 'WithinHeaders' | 'WithinQueryParameters';

export type CreateClientOptions = Pick<
  TransporterOptions,
  'hostsCache' | 'requestsCache' | 'responsesCache'
> & {
  appId: string;
  apiKey: string;
  requester: Requester;
  timeouts: Timeouts;
  userAgents: UserAgentOptions[];
  hosts?: Host[];
  authMode?: AuthMode;
};

export type InitClientOptions = Partial<{
  requester: Requester;
  hosts: Host[];
  responsesCache: Cache;
  requestsCache: Cache;
  hostsCache: Cache;
}>;
