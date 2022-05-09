export type DeleteUserProfileResponse = {
  /**
   * UserToken representing the user for which to fetch the Personalization profile.
   */
  userToken: string;
  /**
   * A date until which the data can safely be considered as deleted for the given user. Any data received after the `deletedUntil` date will start building a new user profile.
   */
  deletedUntil: string;
};
