import { RequestOptions, ApiError } from '@algolia/transporter-types';
import { SearchIndex } from '../../SearchIndex';
import { ConstructorOf } from '@algolia/support';
import { getSettings, HasGetSettings } from './getSettings';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const exists = <TSearchIndex extends ConstructorOf<SearchIndex>>(base: TSearchIndex) => {
  const Mixin: ConstructorOf<SearchIndex & HasGetSettings> = getSettings(base);

  return class extends Mixin implements HasExists {
    public exists(requestOptions?: RequestOptions): Promise<boolean> {
      return new Promise(resolve => {
        this.getSettings(requestOptions)
          .then(() => resolve(true))
          .catch((err: ApiError) => {
            if (err.status !== 404) {
              throw err;
            }

            resolve(false);
          });
      });
    }
  };
};

export type HasExists = {
  readonly exists: (requestOptions?: RequestOptions) => Promise<boolean>;
};
