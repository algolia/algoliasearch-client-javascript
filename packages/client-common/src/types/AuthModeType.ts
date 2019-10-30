export const AuthMode: { readonly [key: string]: AuthModeType } = {
  WithinQueryParameters: 0,
  WithinHeaders: 1,
};

export type AuthModeType = 0 | 1;
