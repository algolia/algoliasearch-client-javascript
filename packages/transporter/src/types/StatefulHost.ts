import { StatelessHost } from '.';

export const HostStatusEnum: Readonly<Record<string, HostStatusType>> = {
  Up: 1,
  Down: 2,
  Timeouted: 3,
};

export type HostStatusType = 1 | 2 | 3;

export type StatefulHost = StatelessHost & {
  /**
   * Holds the last time this host failed in milliseconds elapsed
   * since the UNIX epoch. This failure can be because of an
   * timeout error or a because the host is not available.
   */
  readonly lastUpdate: number;

  /**
   * Holds the host status. Note that, depending of the `lastUpdate`
   * an host may be considered as `Up` on the transporter layer.
   */
  readonly status: HostStatusType;
};
