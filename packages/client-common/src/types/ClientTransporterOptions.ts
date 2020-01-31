import { Headers, HostOptions, QueryParameters, TransporterOptions } from '@algolia/transporter';

export type ClientTransporterOptions = Pick<
  TransporterOptions,
  Exclude<keyof TransporterOptions, 'headers'> &
    Exclude<keyof TransporterOptions, 'queryParameters'> &
    Exclude<keyof TransporterOptions, 'hosts'>
> & {
  /**
   * The hosts used by the requester.
   */
  readonly hosts?: readonly HostOptions[];

  /**
   * The headers used by the requester. The transporter
   * layer may add some extra headers during the request
   * for the user agent, and others.
   */
  readonly headers?: Headers;

  /**
   * The query parameters used by the requester. The transporter
   * layer may add some extra headers during the request
   * for the user agent, and others.
   */
  readonly queryParameters?: QueryParameters;
};
