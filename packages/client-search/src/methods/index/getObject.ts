import { RequestOptions } from '@algolia/transporter';

import { getObjects, GetObjectsOptions, ObjectWithObjectID, SearchIndex } from '../..';

export const getObject = (base: SearchIndex) => {
  return <TObject>(
    objectID: string,
    requestOptions?: RequestOptions & GetObjectsOptions
  ): Readonly<Promise<TObject & ObjectWithObjectID>> => {
    return getObjects(base)<TObject>([objectID], requestOptions).then(
      response => response.results[0]
    );
  };
};
