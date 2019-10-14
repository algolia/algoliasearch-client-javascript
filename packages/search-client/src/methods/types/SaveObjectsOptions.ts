import { ChunkOptions } from './ChunkOptions';

export type SaveObjectsOptions = ChunkOptions & {
  readonly autoGenerateObjectIDIfNotExist?: boolean;
};
