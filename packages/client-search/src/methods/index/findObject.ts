import { popRequestOption, RequestOptions } from '@algolia/transporter';

import { FindObjectOptions, FindObjectResponse, ObjectWithObjectID, SearchIndex } from '../..';
import { createObjectNotFoundError } from '../../errors/createObjectNotFoundError';
import { HasSearch, search } from './search';

export const findObject = <TSearchIndex extends SearchIndex>(
  base: TSearchIndex
): TSearchIndex & HasSearch & HasFindObject => {
  return {
    ...search(base),
    findObject<TObject>(
      callback: (object: TObject & ObjectWithObjectID) => boolean,
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
            throw createObjectNotFoundError();
          }

          return forEachPage();
        });
      };

      return forEachPage();
    },
  };
};

export type HasFindObject = {
  readonly findObject: <TObject>(
    callback: (object: TObject & ObjectWithObjectID) => boolean,
    requestOptions?: FindObjectOptions & RequestOptions
  ) => Readonly<Promise<FindObjectResponse<TObject>>>;
};
