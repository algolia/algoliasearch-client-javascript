import { SearchResponse } from '../..';

export const getObjectPosition = <TObject>() => {
  return (searchResponse: SearchResponse<TObject>, objectID: string): number => {
    // eslint-disable-next-line functional/no-loop-statement
    for (const [position, hit] of Object.entries(searchResponse.hits)) {
      if (hit.objectID === objectID) {
        return parseInt(position, 10);
      }
    }

    return -1;
  };
};
