import { MethodType } from '../types/Method';

export type Request = {
  readonly data: string;
  readonly headers: { readonly [key: string]: string };
  readonly method: MethodType;
  readonly url: string;
  readonly timeout: number;
};
