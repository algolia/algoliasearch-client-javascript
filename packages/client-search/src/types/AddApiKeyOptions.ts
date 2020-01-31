export type AddApiKeyOptions = {
  /**
   * A Unix timestamp used to define the expiration date of the API key.
   */
  readonly validity?: number;

  /**
   * Specify the maximum number of hits this API key can retrieve in one call.
   * This parameter can be used to protect you from attempts at retrieving your entire index contents by massively querying the index.
   */
  readonly maxHitsPerQuery?: number;

  /**
   * Specify the maximum number of API calls allowed from an IP address per hour. Each time an API call is performed with this key, a check is performed.
   */
  readonly maxQueriesPerIPPerHour?: number;

  /**
   * Specify the list of targeted indices. You can target all indices starting with a prefix or ending with a suffix using the ‘*’ character.
   */
  readonly indexes?: readonly string[];

  /**
   * Specify the list of referers. You can target all referers starting with a prefix, ending with a suffix using the ‘*’ character.
   */
  readonly referers?: readonly string[];

  /**
   * Specify the list of query parameters. You can force the query parameters for a query using the url string format.
   */
  readonly queryParameters?: string;

  /**
   * Specify a description of the API key. Used for informative purposes only. It has impact on the functionality of the API key.
   */
  readonly description?: string;
};
