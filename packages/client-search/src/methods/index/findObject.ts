import { popRequestOption, RequestOptions } from '@algolia/transporter';

import {
  createObjectNotFoundError,
  FindObjectOptions,
  FindObjectResponse,
  ObjectWithObjectID,
  search,
  SearchIndex,
} from '../..';

export const findObject = (base: SearchIndex) => {
  return <TObject>(
    callback: (object: TObject & ObjectWithObjectID) => boolean,
    requestOptions?: FindObjectOptions & RequestOptions
  ): Readonly<Promise<FindObjectResponse<TObject>>> => {
    const paginate = popRequestOption(requestOptions, 'paginate', true);
    const query = popRequestOption(requestOptions, 'query', '');

    // eslint-disable-next-line functional/no-let
    let page = 0;

    const forEachPage = (): Readonly<Promise<FindObjectResponse<TObject>>> => {
      return search(base)<TObject>(query, { ...requestOptions, page }).then(result => {
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
  };
};
