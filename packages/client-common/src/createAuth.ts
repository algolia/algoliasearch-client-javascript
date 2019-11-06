import { AuthMode, AuthModeType } from '.';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createAuth(authMode: AuthModeType, appId: string, apiKey: string) {
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
