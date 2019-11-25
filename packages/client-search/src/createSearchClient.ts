import { addMethods, AuthMode, createAuth, CreateClient, shuffle } from '@algolia/client-common';
import { CallEnum, createTransporter, TransporterOptions } from '@algolia/transporter';

import { SearchClient, SearchClientOptions } from './types';

export const createSearchClient: CreateClient<
  SearchClient,
  SearchClientOptions & TransporterOptions
> = options => {
  const appId = options.appId;
  const transporter = createTransporter(options);
  transporter.setHosts(
    [
      { url: `${appId}-dsn.algolia.net`, accept: CallEnum.Read },
      { url: `${appId}.algolia.net`, accept: CallEnum.Write },
    ].concat(
      shuffle([
        { url: `${appId}-1.algolianet.com`, accept: CallEnum.Any },
        { url: `${appId}-2.algolianet.com`, accept: CallEnum.Any },
        { url: `${appId}-3.algolianet.com`, accept: CallEnum.Any },
      ])
    )
  );

  const auth = createAuth(
    options.authMode !== undefined ? options.authMode : AuthMode.WithinHeaders,
    appId,
    options.apiKey
  );

  transporter.addHeaders({
    ...auth.headers(),
    ...{ 'content-type': 'application/x-www-form-urlencoded' },
  });

  transporter.addQueryParameters(auth.queryParameters());

  const base = {
    transporter,
    appId,
    addAlgoliaAgent(segment: string, version?: string): void {
      transporter.userAgent.add({ segment, version });
    },
  };

  return addMethods(base, options.methods);
};
