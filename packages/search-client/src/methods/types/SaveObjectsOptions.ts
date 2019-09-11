import { ChunkOptions } from './ChunkOptions';

export type SaveObjectsOptions = ChunkOptions & {
  /* eslint-disable functional/prefer-readonly-type */
  autoGenerateObjectIDIfNotExist?: boolean;
};
