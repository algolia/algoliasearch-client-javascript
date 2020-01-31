import { CallType } from '.';

export type StatelessHost = {
  /**
   * The protocol of the stateless host. Between `http` and `https`.
   */
  readonly protocol: string;

  /**
   * The url, without protocol.
   */
  readonly url: string;

  /**
   * The type of the host.
   */
  readonly accept: CallType;
};
