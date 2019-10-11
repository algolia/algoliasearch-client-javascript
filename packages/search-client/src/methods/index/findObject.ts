import { RequestOptions, popRequestOption } from '@algolia/transporter-types';
import { SearchIndex } from '../../SearchIndex';
import { ConstructorOf } from '@algolia/support';
import { FindObjectOptions } from '../types/FindObjectOptions';
import { ObjectNotFoundError } from '../../errors/ObjectNotFoundError';
import { FindObjectResponse } from '../types/FindObjectResponse';
import { search, HasSearch } from './search';
import { HitWithObjectID } from '../types/HitWithObjectID';

/**

export const deleteObject = <TSearchIndex extends ConstructorOf<SearchIndex>>(base: TSearchIndex) => {
  const Mixin = deleteObjects(base);

  return class

 */

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const findObject = <TSearchIndex extends ConstructorOf<SearchIndex>>(base: TSearchIndex) => {
  const Mixin: ConstructorOf<SearchIndex & HasSearch> = search(base);

  return class extends Mixin implements HasFindObject {
    public findObject<TObject extends HitWithObjectID>(
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
  readonly findObject: <TObject extends HitWithObjectID>(
    callback: (object: TObject) => boolean,
    requestOptions?: FindObjectOptions & RequestOptions
  ) => Readonly<Promise<FindObjectResponse<TObject>>>;
};
