import { ConstructorOf } from '@algolia/support';
import { popRequestOption, RequestOptions } from '@algolia/transporter-types';

import { ObjectNotFoundError } from '../../errors/ObjectNotFoundError';
import { SearchIndex } from '../../SearchIndex';
import { FindObjectOptions } from '../types/FindObjectOptions';
import { FindObjectResponse } from '../types/FindObjectResponse';
import { HasSearch, search } from './search';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const findObject = <TSearchIndex extends ConstructorOf<SearchIndex>>(base: TSearchIndex) => {
  const mixin: ConstructorOf<SearchIndex & HasSearch> = search(base);

  return class extends mixin implements HasFindObject {
    public findObject<TObject>(
      callback: (object: TObject) => boolean,
      requestOptions?: FindObjectOptions & RequestOptions
    ): Readonly<Promise<FindObjectResponse<TObject>>> {
      const paginate = popRequestOption(requestOptions, 'paginate', true);
      const query = popRequestOption(requestOptions, 'query', '');

      // eslint-disable-next-line functional/no-let
      let page = 0;

      const forEachPage = (): Readonly<Promise<FindObjectResponse<TObject>>> => {
        return this.search<TObject>(query, { ...requestOptions, page }).then(result => {
          // eslint-disable-next-line functional/no-loop-statement
          for (const [position, hit] of Object.entries(result.hits)) {
            // eslint-disable-next-line promise/no-callback-in-promise
            if (callback(hit)) {
              return {
                object: hit,
                position: parseInt(position, 10),
                page,
              };
            }
          }

          page++;

          // paginate if option was set and has next page
          if (!paginate || page >= result.nbPages) {
            throw new ObjectNotFoundError();
          }

          return forEachPage();
        });
      };

      return forEachPage();
    }
  };
};

export type HasFindObject = {
  readonly findObject: <TObject>(
    callback: (object: TObject) => boolean,
    requestOptions?: FindObjectOptions & RequestOptions
  ) => Readonly<Promise<FindObjectResponse<TObject>>>;
};
