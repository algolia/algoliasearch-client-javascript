import { LogLevelType } from '@algolia/logger-common';

export type AlgoliaSearchOptions = {
  /**
   * The log level type.
   *
   * @example
   * ```
   * algoliasearch('appId', 'apiKey', {
   *   logLevel: LogLevelEnum.Debug
   * });
   * ```
   */
  readonly logLevel?: LogLevelType;
};
