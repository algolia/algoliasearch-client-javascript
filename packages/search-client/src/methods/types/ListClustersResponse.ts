import { Cluster } from './Cluster';

export type ListClustersResponse = {
  /** List of clusters */
  readonly clusters: readonly Cluster[];
};
