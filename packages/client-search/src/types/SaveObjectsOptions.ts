import { ChunkOptions } from '.';

export type SaveObjectsOptions = ChunkOptions & {
  readonly autoGenerateObjectIDIfNotExist?: boolean;
};
