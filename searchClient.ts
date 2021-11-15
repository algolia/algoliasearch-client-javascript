import { SearchApi, SearchApiApiKeys } from 'algoliasearch-client-javascript';

export class searchClient extends SearchApi {
  public constructor(appId: string, apiKey: string) {
    super();

    this.setApiKey(SearchApiApiKeys.appId, appId);
    this.setApiKey(SearchApiApiKeys.apiKey, apiKey);
    this.basePath = 'https://' + appId + '-1.algolianet.com';
  }
}
