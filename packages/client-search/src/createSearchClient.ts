import { createAuth } from '@algolia/auth';
import { AuthMode, AuthModeType } from '@algolia/auth/src/types/AuthModeType';
import { compose, shuffle } from '@algolia/client-common';
import { ComposableOptions } from '@algolia/client-common/src/types/ComposableOptions';
import { createTransporter } from '@algolia/transporter';
import { Call } from '@algolia/transporter/src/types/Call';
import { TransporterOptions } from '@algolia/transporter/src/types/TransporterOptions';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createSearchClient = <TClient>(
  options: SearchClientOptions & TransporterOptions & ComposableOptions
) => {
  const appId = options.appId;
  const transporter = createTransporter(options);
  transporter.setHosts(
    [
      { url: `${appId}-dsn.algolia.net`, accept: Call.Read },
      { url: `${appId}.algolia.net`, accept: Call.Write },
    ].concat(
      shuffle([
        { url: `${appId}-1.algolianet.com`, accept: Call.Any },
        { url: `${appId}-2.algolianet.com`, accept: Call.Any },
        { url: `${appId}-3.algolianet.com`, accept: Call.Any },
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
      transporter.addUserAgent(segment, version);
    },
  };

  return compose<TClient & typeof base>(
    base,
    options
  );
};

export type SearchClientOptions = {
  readonly appId: string;
  readonly apiKey: string;
  readonly authMode?: AuthModeType;
};
