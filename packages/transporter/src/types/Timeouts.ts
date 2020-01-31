export type Timeouts = {
  /**
   * The timeout to stablish a connection with the server.
   */
  readonly connect: number;

  /**
   * The timeout to receive the response on read requests.
   */
  readonly read: number;

  /**
   * The timeout to receive the response on write requests.
   */
  readonly write: number;
};
