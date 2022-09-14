// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

/**
 * `active` - model is running and generating predictions. The active value is allowed only if the current status of the model is `inactive`. \\ `inactive` - model training and inference have been paused. The inactive value is allowed only if the current status of the model is `active`.
 */
export type Status = 'active' | 'inactive';
