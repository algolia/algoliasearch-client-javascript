import { RequestOptions } from '@algolia/transporter/types/RequestOptions';

export type OnWaitClosure<TResponse> = (
  result: TResponse,
  requestOptions?: RequestOptions
) => Readonly<Promise<any>>;
