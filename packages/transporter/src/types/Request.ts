import { MethodType } from '@algolia/requester-common';

export type Request = {
  /**
   * The method of the request. `GET`, etc.
   */
  readonly method: MethodType;

  /**
   * The path of the request. i.e: `/1/indexes`.
   */
  readonly path: string;

  /**
   * The data to transfer to the server.
   */
  readonly data?: Record<string, any> | ReadonlyArray<Record<string, any>>;

  /**
   * If the response should persist on cache.
   */
  readonly cacheable?: boolean;
};
