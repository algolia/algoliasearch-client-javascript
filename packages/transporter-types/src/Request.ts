import { Method } from '@algolia/requester-types';

export type Request = {
  readonly method: Method;
  readonly path: string;
  readonly data?: object;
};
