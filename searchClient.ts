import { SearchApi } from 'algoliasearch-client-javascript';

export class searchClient extends SearchApi {
  public constructor(appId: string, apiKey: string) {
    super();

    this.defaultHeaders['X-Algolia-Application-Id'] = appId;
    this.defaultHeaders['X-Algolia-API-Key'] = apiKey;
    this.basePath = 'https://' + appId + '-1.algolianet.com';
  }
}
