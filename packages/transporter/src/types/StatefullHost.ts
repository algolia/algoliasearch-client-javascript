import { StatelessHost } from '.';

export type StatefullHost = StatelessHost & {
  /**
   * It's bigger than 0 when the host was down.
   *
   * The milliseconds elapsed since the UNIX epoch.
   */
  readonly downDate: number;
};
