import { BrowseResponse } from '.';
import { ObjectWithObjectID } from './ObjectWithObjectID';

export type BrowseOptions<TObject> = {
  /**
   * The callback called for each batch of objects.
   */
  readonly batch?: (batch: ReadonlyArray<TObject & ObjectWithObjectID>) => any;

  /**
   * The callback called to determine if the browse should stop. By
   * default this checks whether there's any more content to get.
   */
  readonly shouldStop?: (response: BrowseResponse<TObject>) => boolean;
};
