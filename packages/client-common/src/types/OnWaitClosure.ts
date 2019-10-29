import { RequestOptions } from '@algolia/transporter';

export type OnWaitClosure<TResponse> = (
  result: TResponse,
  requestOptions?: RequestOptions
) => Readonly<Promise<any>>;
