import type { OperationType } from './operationType';
import type { ProductType } from './productType';

/**
 * The target of the job.
 */
export type PostURLJobTarget = {
  type: ProductType;
  /**
   * The index name of the product.
   */
  indexName: string;
  operation: OperationType;
};
