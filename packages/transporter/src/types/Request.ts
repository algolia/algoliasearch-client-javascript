import { MethodType } from '@algolia/requester-common';

export type Request = {
  readonly method: MethodType;
  readonly path: string;
  readonly data?: object | readonly object[];
  readonly cacheable?: boolean;
};
