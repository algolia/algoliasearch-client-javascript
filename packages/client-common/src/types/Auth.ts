export type Auth = {
  readonly headers: () => { readonly [key: string]: string };
  readonly queryParameters: () => { readonly [key: string]: string };
};
