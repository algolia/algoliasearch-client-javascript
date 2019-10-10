import { ChunkOptions } from './ChunkOptions';

export type PartialUpdateObjectsOptions = ChunkOptions & {
  /* eslint-disable functional/prefer-readonly-type */
  createIfNotExists?: boolean;
};
