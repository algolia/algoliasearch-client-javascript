export type Host = {
  /**
   * The host URL.
   */
  url: string;

  /**
   * The accepted transporter.
   */
  accept: 'read' | 'readWrite' | 'write';

  /**
   * The protocol of the host URL.
   */
  protocol: 'http' | 'https';

  /**
   * The port of the host URL.
   */
  port?: number | undefined;
};

export type StatefulHost = Host & {
  /**
   * The status of the host.
   */
  status: 'down' | 'timed out' | 'up';

  /**
   * The last update of the host status, used to compare with the expiration delay.
   */
  lastUpdate: number;

  /**
   * Returns whether the host is up or not.
   */
  isUp: () => boolean;

  /**
   * Returns whether the host is timed out or not.
   */
  isTimedOut: () => boolean;
};
