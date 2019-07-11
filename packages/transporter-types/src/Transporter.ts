import { Host, Request, RequestOptions } from '.';

export interface Transporter {
  withHeaders(headers: { [key: string]: string }): Transporter;
  withHosts(hosts: Host[]): Transporter;

  read<TResponse>(request: Request, requestOptions?: RequestOptions): Promise<TResponse>;

  write<TResponse>(request: Request, requestOptions?: RequestOptions): Promise<TResponse>;
}
