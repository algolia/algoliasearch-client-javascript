import { RequestOptions } from '@algolia/transporter';

export type Wait<TResponse> = (
  /**
   * The original response.
   */
  response: TResponse,

  /**
   * The custom request options.
   */
  requestOptions?: RequestOptions
) => Readonly<Promise<any>>;
