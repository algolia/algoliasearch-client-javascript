export type MappedRequestOptions = {
  readonly cacheable: boolean | undefined;
  readonly timeout: number | undefined;
  readonly data: { readonly [key: string]: string };
  readonly headers: { readonly [key: string]: string };
  readonly queryParameters: { readonly [key: string]: string };
};
