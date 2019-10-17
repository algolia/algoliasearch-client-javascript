import { ObjectWithObjectID } from './ObjectWithObjectID';

export type SearchResponse<TObject> = {
  readonly hits: ReadonlyArray<TObject & ObjectWithObjectID>;
  readonly page: number;
  readonly length?: number;
  readonly offset?: number;
  readonly nbHits: number;
  readonly nbPages: number;
  readonly hitsPerPage: number;
  readonly processingTimeMs: number;
  readonly exhaustiveNbHits: boolean;
  readonly exhaustiveFacetsCount?: boolean;
  readonly facets?: { readonly [key: string]: { readonly [key: string]: number } };
  readonly facetsStats?: {
    readonly [key: string]: {
      readonly min: number;
      readonly max: number;
      readonly avg: number;
      readonly sum: number;
    };
  };
  readonly query: string;
  readonly queryAfterRemoval?: string;
  readonly params: string;
  readonly queryID?: string;
  readonly message?: string;
  readonly aroundLatLng?: string;
  readonly automaticRadius?: string;
  readonly serverUsed?: string;
  readonly index?: string;
  readonly indexUsed?: string;
  readonly abTestVariantID?: number;
  readonly parsedQuery?: string;
  readonly userData?: any;
  readonly appliedRules?: ReadonlyArray<{ readonly [key: string]: any }>;
};
