import { RequestOptions } from '@algolia/transporter';

import { SearchIndex } from '../types/SearchIndex';
import { getSettings, HasGetSettings } from './getSettings';

export const exists = <TSearchIndex extends SearchIndex>(
  base: TSearchIndex
): TSearchIndex & HasGetSettings & HasExists => {
  return {
    ...getSettings(base),
    exists(requestOptions?: RequestOptions): Readonly<Promise<boolean>> {
      return this.getSettings(requestOptions)
        .then(() => true)
        .catch(error => {
          if (error.status !== 404) {
            throw error;
          }

          return false;
        });
    },
  };
};

export type HasExists = {
  readonly exists: (requestOptions?: RequestOptions) => Readonly<Promise<boolean>>;
};
