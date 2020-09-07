import { CallType } from '.';

export type HostOptions =
  | string
  | {
      /**
       * The url of the server, without the protocol.
       */
      readonly url: string;

      /**
       * The type of host. Defaults to `Any`.
       */
      readonly accept?: CallType;

      /**
       * The protocol. Defaults to `https`.
       */
      readonly protocol?: string;
    };
