// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

export type HasPendingMappingsResponse = {
  /**
   * If there is any clusters with pending mapping state.
   */
  pending: boolean;

  /**
   * Describe cluster pending (migrating, creating, deleting) mapping state.
   */
  clusters?: Record<string, string[]>;
};
