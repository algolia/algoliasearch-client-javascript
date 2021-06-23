import { ApiKeyACLType } from '.';

export type GetApiKeyResponse = {
  /**
   * The api key value
   */
  value: string;

  /**
   * Date of creation (Unix timestamp).
   */
  createdAt: number;

  /**
   * List of permissions the key contains.
   */
  acl: ApiKeyACLType[];

  /**
   * A Unix timestamp used to define the expiration date of the API key.
   */
  validity: number;

  /**
   * Specify the maximum number of hits this API key can retrieve in one call.
   * This parameter can be used to protect you from attempts at retrieving your entire index contents by massively querying the index.
   */
  maxHitsPerQuery?: number;

  /**
   * Specify the maximum number of API calls allowed from an IP address per hour. Each time an API call is performed with this key, a check is performed.
   */
  maxQueriesPerIPPerHour?: number;

  /**
   * Specify the list of targeted indices. You can target all indices starting with a prefix or ending with a suffix using the ‘*’ character.
   */
  indexes?: string[];

  /**
   * Specify the list of referers. You can target all referers starting with a prefix, ending with a suffix using the ‘*’ character.
   */
  referers?: string[];

  /**
   * IPv4 network allowed to use the generated key.
   * This is used for more protection against API key leaking and reuse.
   * Note that you can only provide a single source, but you can specify a range of IPs (e.g., 192.168.1.0/24).
   */
  restrictSources?: string;

  /**
   * Specify the list of query parameters. You can force the query parameters for a query using the url string format.
   */
  queryParameters?: string;

  /**
   * Specify a description of the API key. Used for informative purposes only. It has impact on the functionality of the API key.
   */
  description?: string;
};
