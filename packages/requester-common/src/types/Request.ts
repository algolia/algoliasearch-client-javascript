import { MethodType } from '.';

export type Request = {
  readonly headers: { readonly [key: string]: string };
  readonly method: MethodType;
  readonly url: string;
  readonly connectTimeout: number;
  readonly responseTimeout: number;
  readonly data: string | undefined;
};
