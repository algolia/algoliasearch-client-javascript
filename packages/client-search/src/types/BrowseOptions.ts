import { ObjectWithObjectID } from './ObjectWithObjectID';

export type BrowseOptions<TObject> = {
  readonly batch?: (batch: ReadonlyArray<TObject & ObjectWithObjectID>) => any;
};
