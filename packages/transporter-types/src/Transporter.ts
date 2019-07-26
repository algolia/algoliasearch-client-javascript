import { Host, Request, RequestOptions } from '.';

export interface Transporter {
  readonly withHeaders: (headers: { readonly [key: string]: string }) => Transporter;
  // eslint-disable-next-line functional/prefer-readonly-types
  readonly withHosts: (hosts: Host[]) => Transporter;

  readonly read: <TResponse>(
    request: Request,
    requestOptions?: RequestOptions
  ) => Promise<TResponse>;

  readonly write: <TResponse>(
    request: Request,
    requestOptions?: RequestOptions
  ) => Promise<TResponse>;
}
