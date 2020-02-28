import { BrowseOptions, BrowseRequestData, BrowseResponse } from '.';

export function createBrowsablePromise<TObject>(
  options: {
    readonly shouldStop: (response: BrowseResponse<TObject>) => boolean;
    readonly request: (data: BrowseRequestData) => Readonly<Promise<BrowseResponse<TObject>>>;
  } & BrowseOptions<TObject>
): Readonly<Promise<void>> {
  const browse = (data: BrowseRequestData): Promise<void> => {
    return options.request(data).then(response => {
      /**
       * First we send to the developer the
       * batch retrieved from the API.
       */
      if (options.batch !== undefined) {
        options.batch(response.hits);
      }

      /**
       * Then, we ask to the browse concrete implementation
       * if we should stop browsing. As example, the `browseObjects`
       * method will stop if the cursor is not present on the response.
       */
      if (options.shouldStop(response)) {
        return undefined;
      }

      /**
       * Finally, if the response contains a cursor, we browse to the next
       * batch using that same cursor. Otherwise, we just use the traditional
       * browsing using the page element.
       */
      if (response.cursor) {
        return browse({
          cursor: response.cursor,
        });
      }

      return browse({
        page: (data.page || 0) + 1,
      });
    });
  };

  return browse({});
}
