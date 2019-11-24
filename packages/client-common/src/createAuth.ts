import { Auth, AuthMode, AuthModeType } from '.';

export function createAuth(authMode: AuthModeType, appId: string, apiKey: string): Auth {
  const credentials = {
    'x-algolia-api-key': apiKey,
    'x-algolia-application-id': appId,
  };

  return {
    headers(): { readonly [key: string]: string } {
      return authMode === AuthMode.WithinHeaders ? credentials : {};
    },

    queryParameters(): { readonly [key: string]: string } {
      return authMode === AuthMode.WithinQueryParameters ? credentials : {};
    },
  };
}
