import { StatelessHost } from '.';

export type StatefullHost = StatelessHost & {
  /**
   * The milliseconds elapsed since the UNIX epoch.
   */
  readonly lastDownDate: number;
};
