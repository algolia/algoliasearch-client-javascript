import { ChunkOptions } from '.';

export type PartialUpdateObjectsOptions = ChunkOptions & {
  readonly createIfNotExists?: boolean;
};
