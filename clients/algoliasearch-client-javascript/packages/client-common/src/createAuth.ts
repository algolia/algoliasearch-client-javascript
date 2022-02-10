import type { AuthMode } from './types';

export function createAuth(
  appId: string,
  apiKey: string,
  authMode: AuthMode = 'WithinHeaders'
): {
  readonly headers: () => Readonly<Record<string, string>>;
  readonly queryParameters: () => Readonly<Record<string, string>>;
} {
  const credentials = {
    'x-algolia-api-key': apiKey,
    'x-algolia-application-id': appId,
  };

  return {
    headers(): Readonly<Record<string, string>> {
      return authMode === 'WithinHeaders' ? credentials : {};
    },

    queryParameters(): Readonly<Record<string, string>> {
      return authMode === 'WithinQueryParameters' ? credentials : {};
    },
  };
}
