// Code generated by OpenAPI Generator (https://openapi-generator.tech), manual changes will be lost - read more on https://github.com/algolia/api-clients-automation. DO NOT EDIT.

import type { Action } from './action';
import type { PushTaskRecords } from './pushTaskRecords';

export type PushTaskPayload = {
  action: Action;

  records: Array<PushTaskRecords>;
};
