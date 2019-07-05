import { Request } from './Request';
import { RequestOptions } from './RequestOptions';

export interface Transporter {
  read<TResponse>(
    request: Request,
    requestOptions?: RequestOptions
  ): Promise<TResponse>;

  write<TResponse>(
    request: Request,
    requestOptions?: RequestOptions
  ): Promise<TResponse>;
}
