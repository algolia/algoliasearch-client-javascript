import { BrowseResponse } from '.';
import { ObjectWithObjectID } from './ObjectWithObjectID';

export type BrowseOptions<TObject> = {
  /**
   * The callback called for each batch of objects.
   */
  readonly batch?: (batch: ReadonlyArray<TObject & ObjectWithObjectID>) => any;
  /**
   * condition to stop browsing. By default this checks whether there's any more content to get
   */
  readonly shouldStop?: (response: BrowseResponse<TObject>) => boolean;
};
