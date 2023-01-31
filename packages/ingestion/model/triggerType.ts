// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

/**
 * The type of the task reflect how it can be used:   - on_demand: a task that runs manually   - schedule: a task that runs regularly, following a given cron expression   - subscription: a task that runs after a subscription event is received from an integration (e.g. Webhook).
 */
export type TriggerType = 'on_demand' | 'schedule' | 'subscription';
