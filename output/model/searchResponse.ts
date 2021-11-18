import { RequestFile } from './models';
import { Record } from './record';
import { SearchResponseFacetsStats } from './searchResponseFacetsStats';

export class SearchResponse {
  /**
   * If a search encounters an index that is being A/B tested, abTestID reports the ongoing A/B test ID.
   */
  'abTestID'?: number;
  /**
   * If a search encounters an index that is being A/B tested, abTestVariantID reports the variant ID of the index used.
   */
  'abTestVariantID'?: number;
  /**
   * The computed geo location.
   */
  'aroundLatLng'?: string;
  /**
   * The automatically computed radius. For legacy reasons, this parameter is a string and not an integer.
   */
  'automaticRadius'?: string;
  /**
   * Whether the facet count is exhaustive or approximate.
   */
  'exhaustiveFacetsCount'?: boolean;
  /**
   * Indicate if the nbHits count was exhaustive or approximate
   */
  'exhaustiveNbHits': boolean;
  /**
   * Indicate if the typo-tolerence search was exhaustive or approximate (only included when typo-tolerance is enabled)
   */
  'exhaustiveTypo': boolean;
  /**
   * A mapping of each facet name to the corresponding facet counts.
   */
  'facets'?: { [key: string]: { [key: string]: string } };
  /**
   * Statistics for numerical facets.
   */
  'facets_stats'?: { [key: string]: SearchResponseFacetsStats };
  'hits': Array<Record>;
  /**
   * Set the number of hits per page.
   */
  'hitsPerPage': number;
  /**
   * Index name used for the query.
   */
  'index'?: string;
  /**
   * Index name used for the query. In the case of an A/B test, the targeted index isn’t always the index used by the query.
   */
  'indexUsed'?: string;
  /**
   * Used to return warnings about the query.
   */
  'message'?: string;
  /**
   * Number of hits that the search query matched
   */
  'nbHits': number;
  /**
   * Number of pages available for the current query
   */
  'nbPages': number;
  /**
   * The number of hits selected and sorted by the relevant sort algorithm
   */
  'nbSortedHits'?: number;
  /**
   * Specify the page to retrieve.
   */
  'page': number;
  /**
   * A url-encoded string of all search parameters.
   */
  'params': string;
  /**
   * The query string that will be searched, after normalization.
   */
  'parsedQuery'?: string;
  /**
   * Time the server took to process the request, in milliseconds.
   */
  'processingTimeMS': number;
  /**
   * The text to search in the index.
   */
  'query': string;
  /**
   * A markup text indicating which parts of the original query have been removed in order to retrieve a non-empty result set.
   */
  'queryAfterRemoval'?: string;
  /**
   * Actual host name of the server that processed the request.
   */
  'serverUsed'?: string;
  /**
   * Lets you store custom data in your indices.
   */
  'userData'?: { [key: string]: object };

  static discriminator: string | undefined = undefined;

  static attributeTypeMap: Array<{ name: string; baseName: string; type: string }> = [
    {
      name: 'abTestID',
      baseName: 'abTestID',
      type: 'number',
    },
    {
      name: 'abTestVariantID',
      baseName: 'abTestVariantID',
      type: 'number',
    },
    {
      name: 'aroundLatLng',
      baseName: 'aroundLatLng',
      type: 'string',
    },
    {
      name: 'automaticRadius',
      baseName: 'automaticRadius',
      type: 'string',
    },
    {
      name: 'exhaustiveFacetsCount',
      baseName: 'exhaustiveFacetsCount',
      type: 'boolean',
    },
    {
      name: 'exhaustiveNbHits',
      baseName: 'exhaustiveNbHits',
      type: 'boolean',
    },
    {
      name: 'exhaustiveTypo',
      baseName: 'exhaustiveTypo',
      type: 'boolean',
    },
    {
      name: 'facets',
      baseName: 'facets',
      type: '{ [key: string]: { [key: string]: string; }; }',
    },
    {
      name: 'facets_stats',
      baseName: 'facets_stats',
      type: '{ [key: string]: SearchResponseFacetsStats; }',
    },
    {
      name: 'hits',
      baseName: 'hits',
      type: 'Array<Record>',
    },
    {
      name: 'hitsPerPage',
      baseName: 'hitsPerPage',
      type: 'number',
    },
    {
      name: 'index',
      baseName: 'index',
      type: 'string',
    },
    {
      name: 'indexUsed',
      baseName: 'indexUsed',
      type: 'string',
    },
    {
      name: 'message',
      baseName: 'message',
      type: 'string',
    },
    {
      name: 'nbHits',
      baseName: 'nbHits',
      type: 'number',
    },
    {
      name: 'nbPages',
      baseName: 'nbPages',
      type: 'number',
    },
    {
      name: 'nbSortedHits',
      baseName: 'nbSortedHits',
      type: 'number',
    },
    {
      name: 'page',
      baseName: 'page',
      type: 'number',
    },
    {
      name: 'params',
      baseName: 'params',
      type: 'string',
    },
    {
      name: 'parsedQuery',
      baseName: 'parsedQuery',
      type: 'string',
    },
    {
      name: 'processingTimeMS',
      baseName: 'processingTimeMS',
      type: 'number',
    },
    {
      name: 'query',
      baseName: 'query',
      type: 'string',
    },
    {
      name: 'queryAfterRemoval',
      baseName: 'queryAfterRemoval',
      type: 'string',
    },
    {
      name: 'serverUsed',
      baseName: 'serverUsed',
      type: 'string',
    },
    {
      name: 'userData',
      baseName: 'userData',
      type: '{ [key: string]: object; }',
    },
  ];

  static getAttributeTypeMap() {
    return SearchResponse.attributeTypeMap;
  }
}
