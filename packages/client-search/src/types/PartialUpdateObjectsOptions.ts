import { ChunkOptions } from './ChunkOptions';

export type PartialUpdateObjectsOptions = ChunkOptions & {
  readonly createIfNotExists?: boolean;
};
