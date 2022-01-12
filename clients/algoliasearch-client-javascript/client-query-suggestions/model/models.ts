/* eslint-disable no-param-reassign */
import type { RequestOptions } from '../utils/types';

export * from './errorBase';
export * from './indexName';
export * from './logFile';
export * from './querySuggestionsIndex';
export * from './querySuggestionsIndexParam';
export * from './querySuggestionsIndexWithIndexParam';
export * from './sourceIndex';
export * from './sourceIndexExternal';
export * from './sourceIndexWithReplicas';
export * from './status';
export * from './sucessResponse';

export interface Authentication {
  /**
   * Apply authentication settings to header and query params.
   */
  applyToRequest: (requestOptions: RequestOptions) => Promise<void> | void;
}

export class ApiKeyAuth implements Authentication {
  apiKey: string = '';

  constructor(private location: string, private paramName: string) {}

  applyToRequest(requestOptions: RequestOptions): void {
    if (this.location === 'query') {
      requestOptions.queryParameters[this.paramName] = this.apiKey;
    } else if (
      this.location === 'header' &&
      requestOptions &&
      requestOptions.headers
    ) {
      requestOptions.headers[this.paramName] = this.apiKey;
    } else if (
      this.location === 'cookie' &&
      requestOptions &&
      requestOptions.headers
    ) {
      if (requestOptions.headers.Cookie) {
        requestOptions.headers.Cookie += `; ${
          this.paramName
        }=${encodeURIComponent(this.apiKey)}`;
      } else {
        requestOptions.headers.Cookie = `${this.paramName}=${encodeURIComponent(
          this.apiKey
        )}`;
      }
    }
  }
}
