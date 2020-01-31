import { ObjectWithObjectID } from './ObjectWithObjectID';

export type BrowseOptions<TObject> = {
  /**
   * The callback called for each batch of objects.
   */
  readonly batch?: (batch: ReadonlyArray<TObject & ObjectWithObjectID>) => any;
};
