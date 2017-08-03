// @flow
import type { AppId, ApiKey } from '../algoliasearch/src/types';
import type { HttpModule } from './types';

export function createRequester({
  appId,
  apiKey,
  http,
}: {
  appId: AppId,
  apiKey: ApiKey,
  http: HttpModule,
}) {
  return '';
}
