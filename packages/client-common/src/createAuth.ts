import { Auth, AuthMode, AuthModeType } from '.';

export function createAuth(authMode: AuthModeType, appId: string, apiKey: string): Auth {
  const credentials = {
    'x-algolia-api-key': apiKey,
    'x-algolia-application-id': appId,
  };

  return {
    headers(): Readonly<Record<string, string>> {
      if (authMode === AuthMode.WithinHeaders) {
        return credentials;
      } else if (authMode === AuthMode.WithinBody) {
        return {
          'x-algolia-application-id': appId,
        };
      }

      return {};
    },

    queryParameters(): Readonly<Record<string, string>> {
      return authMode === AuthMode.WithinQueryParameters ? credentials : {};
    },

    data(): Readonly<Record<string, string>> {
      return authMode === AuthMode.WithinBody ? { apiKey } : {};
    },
  };
}
