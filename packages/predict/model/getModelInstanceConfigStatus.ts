// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

/**
 * `pending` - model has just been created and the pipelines are being set up for the first train & inference. \\ `active` - model is running and generating predictions. \\ `invalid` - model has failed training (ex. Can’t retrieve data from source). An additional `errorMessage` field will be set for this status. \\ `inactive` - model has been deactivated from the dashboard. Pipelines still exist but they are not currently running.
 */
export type GetModelInstanceConfigStatus =
  | 'active'
  | 'inactive'
  | 'invalid'
  | 'pending';
