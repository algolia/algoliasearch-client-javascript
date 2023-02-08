// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

import type { MappingTypeCSV } from './mappingTypeCSV';
import type { MethodType } from './methodType';

export type SourceCSV = {
  /**
   * The URL of the file.
   */
  url: string;

  /**
   * The name of the column that contains the unique ID, used as `objectID` in Algolia.
   */
  uniqueIDColumn?: string;

  /**
   * Mapping of type for every column. For example {\"myColumn\": \"boolean\", \"myOtherColumn\": \"json\"}.
   */
  mapping?: Record<string, MappingTypeCSV>;

  method?: MethodType;
};
