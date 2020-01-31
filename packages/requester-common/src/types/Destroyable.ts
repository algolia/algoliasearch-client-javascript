export type Destroyable = {
  /**
   * Destroy any sockets that are currently in use by the agent.
   *
   * It is usually not necessary to do this. However, if using an agent with keepAlive enabled, then
   * it is best to explicitly shut down the agent when it will no longer be used. Otherwise, sockets
   * may hang open for quite a long time before the server terminates them.
   */
  readonly destroy: () => Readonly<Promise<void>>;
};
