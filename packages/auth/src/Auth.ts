export const AuthMode: { readonly [key: string]: AuthModeType } = {
  WithinQueryParameters: 0,
  WithinHeaders: 1,
};

export type AuthModeType = 0 | 1;

export class Auth {
  private readonly authMode: AuthModeType;

  private readonly credentials: { readonly [key: string]: string };

  public constructor(authMode: AuthModeType, appId: string, apiKey: string) {
    this.authMode = authMode;
    this.credentials = {
      'x-algolia-api-key': apiKey,
      'x-algolia-application-id': appId,
    };
  }

  public headers(): { readonly [key: string]: string } {
    return this.authMode === AuthMode.WithinHeaders ? this.credentials : {};
  }

  public queryParameters(): { readonly [key: string]: string } {
    return this.authMode === AuthMode.WithinQueryParameters ? this.credentials : {};
  }
}
