import type { Headers } from './requester';

/**
 * The full HTTP response of an API call, as returned by the `WithHTTPInfo` variant of each method.
 */
export type AlgoliaHttpResponse<TData> = {
  /**
   * The HTTP status code of the response.
   */
  status: number;

  /**
   * The headers of the response, with lower-cased names. Undefined when the requester does not capture headers.
   */
  headers?: Headers | undefined;

  /**
   * The raw body of the response.
   */
  content: string;

  /**
   * The deserialized body of the response.
   */
  data: TData;
};
