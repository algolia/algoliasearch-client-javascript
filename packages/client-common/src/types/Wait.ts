import { RequestOptions } from '@algolia/transporter';

export type Wait<TResponse> = (
  result: TResponse,
  requestOptions?: RequestOptions
) => Readonly<Promise<any>>;
