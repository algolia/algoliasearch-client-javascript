import { SearchResponse } from '../..';

export const getObjectPosition = () => {
  return (searchResponse: SearchResponse, objectID: string): number => {
    // eslint-disable-next-line functional/no-loop-statement
    for (const [position, hit] of Object.entries(searchResponse.hits)) {
      if (hit.objectID === objectID) {
        return parseInt(position, 10);
      }
    }

    return -1;
  };
};
