/**
 * Api Key object.
 */
export type ApiKey = {
  /**
   * Set of permissions associated with the key.
   */
  acl: ApiKeyAcl[];
  /**
   * A comment used to identify a key more easily in the dashboard. It is not interpreted by the API.
   */
  description?: string;
  /**
   * Restrict this new API key to a list of indices or index patterns. If the list is empty, all indices are allowed.
   */
  indexes?: string[];
  /**
   * Maximum number of hits this API key can retrieve in one query. If zero, no limit is enforced.
   */
  maxHitsPerQuery?: number;
  /**
   * Maximum number of API calls per hour allowed from a given IP address or a user token.
   */
  maxQueriesPerIPPerHour?: number;
  /**
   * URL-encoded query string. Force some query parameters to be applied for each query made with this API key.
   */
  queryParameters?: string;
  /**
   * Restrict this new API key to specific referers. If empty or blank, defaults to all referers.
   */
  referers?: string[];
  /**
   * Validity limit for this key in seconds. The key will automatically be removed after this period of time.
   */
  validity?: number;
};

export type ApiKeyAcl =
  | 'addObject'
  | 'analytics'
  | 'browse'
  | 'deleteIndex'
  | 'deleteObject'
  | 'editSettings'
  | 'listIndexes'
  | 'logs'
  | 'personalization'
  | 'recommendation'
  | 'search'
  | 'seeUnretrievableAttributes'
  | 'settings'
  | 'usage';
