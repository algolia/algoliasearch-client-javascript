import { CallType } from '.';

export type HostOptions = {
  /**
   * The url of the server, without the protocol.
   */
  readonly url: string;

  /**
   * The type of host.
   */
  readonly accept: CallType;

  /**
   * The protocol. Defaults to `https`.
   */
  readonly protocol?: string;
};
