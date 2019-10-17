import { BrowseOptions } from './methods/types/BrowseOptions';
import { BrowseResponse } from './methods/types/BrowseResponse';

export class BrowsablePromise<TObject> extends Promise<TObject> {
  public static from<TObject>(
    options: {
      readonly shouldStop: (response: BrowseResponse<TObject>) => boolean;
      readonly request: (data: object) => Readonly<Promise<BrowseResponse<TObject>>>;
    } & BrowseOptions<TObject>
  ): BrowsablePromise<TObject> {
    return new BrowsablePromise<TObject>(resolve => {
      const data = { page: 0 };

      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      const browse = () => {
        return options.request(data).then(response => {
          if (options.batch !== undefined) {
            options.batch(response.hits);
          }

          if (options.shouldStop(response)) {
            return resolve();
          }

          // eslint-disable-next-line functional/immutable-data
          data.page++;

          return browse();
        });
      };

      return browse();
    });
  }
}
