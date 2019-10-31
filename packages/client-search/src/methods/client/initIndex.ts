import { compose } from '@algolia/client-common/helpers';
import { ComposableOptions } from '@algolia/client-common/types/ComposableOptions';
import { TransporterAware } from '@algolia/transporter/types/TransporterAware';

import { SearchIndex } from '../../types/SearchIndex';

export const initIndex = <TClient extends TransporterAware>(
  base: TClient
): TClient & HasInitIndex => {
  return {
    ...base,
    initIndex<TIndex>(indexName: string, options?: ComposableOptions): SearchIndex & TIndex {
      return compose<TIndex & SearchIndex>(
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
    options?: ComposableOptions
  ) => SearchIndex & TIndex;
};
