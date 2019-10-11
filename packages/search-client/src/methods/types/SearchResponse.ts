import { HitWithObjectID } from './HitWithObjectID';

export type SearchResponse<THit extends HitWithObjectID = HitWithObjectID> = {
  /* eslint-disable functional/prefer-readonly-type */
  hits: THit[];
  page: number;
  length?: number;
  offset?: number;
  nbHits: number;
  nbPages: number;
  hitsPerPage: number;
  processingTimeMs: number;
  exhaustiveNbHits: boolean;
  exhaustiveFacetsCount?: boolean;
  facets?: { [key: string]: { [key: string]: number } };
  facetsStats?: {
    [key: string]: {
      min: number;
      max: number;
      avg: number;
      sum: number;
    };
  };
  query: string;
  queryAfterRemoval?: string;
  params: string;
  queryID?: string;
  message?: string;
  aroundLatLng?: string;
  automaticRadius?: string;
  serverUsed?: string;
  index?: string;
  indexUsed?: string;
  abTestVariantID?: number;
  parsedQuery?: string;
  userData?: any;
  appliedRules?: Array<{ [key: string]: any }>;
};
