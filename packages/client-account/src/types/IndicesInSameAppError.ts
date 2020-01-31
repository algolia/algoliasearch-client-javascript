export type IndicesInSameAppError = Error & {
  /**
   * The app id.
   */
  readonly appId: string;
};
