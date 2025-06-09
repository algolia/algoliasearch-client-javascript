import type { AlgoliaAgentOptions, TransporterOptions } from './transporter';

export type AuthMode = 'WithinHeaders' | 'WithinQueryParameters';

type OverriddenTransporterOptions = 'baseHeaders' | 'baseQueryParameters' | 'hosts';

export type CreateClientOptions = Omit<TransporterOptions, OverriddenTransporterOptions | 'algoliaAgent'> &
  Partial<Pick<TransporterOptions, OverriddenTransporterOptions>> & {
    appId: string;
    apiKey: string;
    authMode?: AuthMode | undefined;
    algoliaAgents: AlgoliaAgentOptions[];
  };

export type ClientOptions = Partial<Omit<CreateClientOptions, 'apiKey' | 'appId'>>;
