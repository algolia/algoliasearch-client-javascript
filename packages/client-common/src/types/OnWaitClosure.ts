import { RequestOptions } from '@algolia/transporter/src/types/RequestOptions';

export type OnWaitClosure<TResponse> = (
  result: TResponse,
  requestOptions?: RequestOptions
) => Readonly<Promise<any>>;
