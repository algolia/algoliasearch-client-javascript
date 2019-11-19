import { addMethod } from '@algolia/client-common';
import { RequestOptions } from '@algolia/transporter';

import { SearchIndex } from '../..';
import { getSettings } from '.';

export const exists = <TSearchIndex extends SearchIndex>(
  base: TSearchIndex
): TSearchIndex & HasExists => {
  return {
    ...base,
    exists(requestOptions?: RequestOptions): Readonly<Promise<boolean>> {
      return addMethod(base, getSettings)
        .getSettings(requestOptions)
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
