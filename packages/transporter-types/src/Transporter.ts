import { Host, Request, RequestOptions } from '.';

export type Transporter = {
  // eslint-disable-next-line functional/prefer-readonly-type
  headers: { [key: string]: string };

  // eslint-disable-next-line functional/prefer-readonly-type
  queryParameters: { [key: string]: string };

  // eslint-disable-next-line functional/prefer-readonly-type,
  hosts: Host[];

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
