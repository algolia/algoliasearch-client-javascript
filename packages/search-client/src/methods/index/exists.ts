import { ConstructorOf } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter';

import { SearchIndex } from '../../SearchIndex';
import { getSettings, HasGetSettings } from './getSettings';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const exists = <TSearchIndex extends ConstructorOf<SearchIndex>>(base: TSearchIndex) => {
  const mixin: ConstructorOf<SearchIndex & HasGetSettings> = getSettings(base);

  return class extends mixin implements HasExists {
    public exists(requestOptions?: RequestOptions): Readonly<Promise<boolean>> {
      return this.getSettings(requestOptions)
        .then(() => true)
        .catch(error => {
          if (error.status !== 404) {
            throw error;
          }

          return false;
        });
    }
  };
};

export type HasExists = {
  readonly exists: (requestOptions?: RequestOptions) => Readonly<Promise<boolean>>;
};
