import { Host, Request, RequestOptions } from '.';

export type Transporter = {
  // eslint-disable-next-line functional/prefer-readonly-type
  readonly headers: { readonly [key: string]: string };

  // eslint-disable-next-line functional/prefer-readonly-type,
  readonly hosts: readonly Host[];

  // eslint-disable-next-line functional/no-mixed-type
  readonly read: <TResponse>(
    request: Request,
    requestOptions?: RequestOptions
  ) => Promise<TResponse>;

  readonly write: <TResponse>(
    request: Request,
    requestOptions?: RequestOptions
  ) => Promise<TResponse>;
};
