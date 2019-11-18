import { decorate, DecorateOptions } from '@algolia/client-common';

import { SearchIndex } from '../..';
import { SearchClient } from '../../types';

export const initIndex = <TClient extends SearchClient>(base: TClient): TClient & HasInitIndex => {
  return {
    ...base,
    initIndex<TIndex>(indexName: string, options?: DecorateOptions): SearchIndex & TIndex {
      return decorate<TIndex & SearchIndex>(
        {
          transporter: this.transporter,
          appId: base.appId,
          indexName,
        },
        options
      );
    },
  };
};

export type HasInitIndex = {
  readonly initIndex: <TIndex>(
    indexName: string,
    options?: DecorateOptions
  ) => SearchIndex & TIndex;
};
