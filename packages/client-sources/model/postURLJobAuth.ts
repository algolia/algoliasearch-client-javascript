/**
 * The authentication scheme for the URL that will be fetched.
 */
export type PostURLJobAuth = {
  /**
   * The type of authentication to use.
   */
  type: PostURLJobAuthType;
  /**
   * The login to use for Basic Auth.
   */
  login: string;
  /**
   * The password to use for Basic Auth.
   */
  password: string;
};

export type PostURLJobAuthType = 'basic';
