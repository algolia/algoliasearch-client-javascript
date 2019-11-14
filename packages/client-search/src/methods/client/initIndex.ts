import { decorate, DecorateOptions } from '@algolia/client-common';
import { TransporterAware } from '@algolia/transporter';

import { SearchIndex } from '../..';

export const initIndex = <TClient extends TransporterAware>(
  base: TClient
): TClient & HasInitIndex => {
  return {
    ...base,
    initIndex<TIndex>(indexName: string, options?: DecorateOptions): SearchIndex & TIndex {
      return decorate<TIndex & SearchIndex>(
        {
          transporter: this.transporter,
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
