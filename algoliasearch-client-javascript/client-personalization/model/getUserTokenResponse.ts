export type GetUserTokenResponse = {
  /**
   * UserToken representing the user for which to fetch the Personalization profile.
   */
  userToken: string;
  /**
   * Date of last event update. (ISO-8601 format).
   */
  lastEventAt: string;
  /**
   * The userToken scores.
   */
  scores: Record<string, any>;
};
