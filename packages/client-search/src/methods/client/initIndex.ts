import { addMethods } from '@algolia/client-common';

import { SearchIndex } from '../..';
import { SearchClient } from '../../types';
import { SearchIndexOptions } from '../../types/SearchIndexOptions';

export const initIndex = <TClient extends SearchClient>(base: TClient): TClient & HasInitIndex => {
  return {
    ...base,
    initIndex<TIndex>(indexName: string, options: SearchIndexOptions = {}): SearchIndex & TIndex {
      return addMethods(
        {
          transporter: base.transporter,
          appId: base.appId,
          indexName,
        },
        options.methods
      );
    },
  };
};

export type HasInitIndex = {
  readonly initIndex: <TIndex>(
    indexName: string,
    options?: SearchIndexOptions
  ) => SearchIndex & TIndex;
};
