/**
 * The target of the job.
 */
export type PostURLJobTarget = {
  /**
   * The product to target.
   */
  type: PostURLJobTargetType;
  /**
   * The index name of the product.
   */
  indexName: string;
  /**
   * The type of operation to execute.
   */
  operation: PostURLJobTargetOperation;
};

export type PostURLJobTargetType = 'search';

export type PostURLJobTargetOperation = 'replace';
