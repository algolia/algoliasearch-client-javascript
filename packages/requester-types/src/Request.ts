import { Method } from '.';

export interface Request {
  readonly data: string;
  readonly headers: { readonly [key: string]: string };
  readonly method: Method;
  readonly url: string;
  readonly timeout: number;
}
