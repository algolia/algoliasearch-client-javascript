import type { AlgoliaAgentOptions, TransporterOptions } from './Transporter';

export type AuthMode = 'WithinHeaders' | 'WithinQueryParameters';

type OverriddenTransporterOptions =
  | 'baseHeaders'
  | 'baseQueryParameters'
  | 'hosts';

export type CreateClientOptions = Omit<
  TransporterOptions,
  OverriddenTransporterOptions | 'algoliaAgent'
> &
  Partial<Pick<TransporterOptions, OverriddenTransporterOptions>> & {
    appId: string;
    apiKey: string;
    authMode?: AuthMode;
    algoliaAgents: AlgoliaAgentOptions[];
  };

export type InitClientOptions = Partial<
  Omit<CreateClientOptions, 'apiKey' | 'appId'>
>;
