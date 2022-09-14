// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

import {
  createAuth,
  createTransporter,
  getAlgoliaAgent,
} from '@algolia/client-common';
import type {
  CreateClientOptions,
  Headers,
  Host,
  Request,
  RequestOptions,
  QueryParameters,
} from '@algolia/client-common';

import type { ActivateModelInstanceResponse } from '../model/activateModelInstanceResponse';
import type { ActivateModelParams } from '../model/activateModelParams';
import type {
  DelProps,
  DeleteModelInstanceProps,
  DeleteUserProfileProps,
  FetchUserProfileProps,
  GetProps,
  GetModelInstanceConfigProps,
  GetModelMetricsProps,
  PostProps,
  PutProps,
  UpdateModelInstanceProps,
} from '../model/clientMethodProps';
import type { DeleteModelInstanceResponse } from '../model/deleteModelInstanceResponse';
import type { DeleteUserProfileResponse } from '../model/deleteUserProfileResponse';
import type { FetchAllUserProfilesParams } from '../model/fetchAllUserProfilesParams';
import type { FetchAllUserProfilesResponse } from '../model/fetchAllUserProfilesResponse';
import type { GetAvailableModelTypesResponseInner } from '../model/getAvailableModelTypesResponseInner';
import type { ModelInstance } from '../model/modelInstance';
import type { ModelMetrics } from '../model/modelMetrics';
import type { UpdateModelInstanceResponse } from '../model/updateModelInstanceResponse';
import type { UserProfile } from '../model/userProfile';

export const apiClientVersion = '1.0.0-alpha.18';

export const REGIONS = ['eu', 'us'] as const;
export type Region = typeof REGIONS[number];

function getDefaultHosts(region: Region): Host[] {
  const url = 'predict.{region}.algolia.com'.replace('{region}', region);

  return [{ url, accept: 'readWrite', protocol: 'https' }];
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createPredictClient({
  appId: appIdOption,
  apiKey: apiKeyOption,
  authMode,
  algoliaAgents,
  region: regionOption,
  ...options
}: CreateClientOptions & { region: Region }) {
  const auth = createAuth(appIdOption, apiKeyOption, authMode);
  const transporter = createTransporter({
    hosts: getDefaultHosts(regionOption),
    ...options,
    algoliaAgent: getAlgoliaAgent({
      algoliaAgents,
      client: 'Predict',
      version: apiClientVersion,
    }),
    baseHeaders: {
      'content-type': 'text/plain',
      ...auth.headers(),
      ...options.baseHeaders,
    },
    baseQueryParameters: {
      ...auth.queryParameters(),
      ...options.baseQueryParameters,
    },
  });

  return {
    transporter,

    /**
     * The `appId` currently in use.
     */
    appId: appIdOption,

    /**
     * Clears the cache of the transporter for the `requestsCache` and `responsesCache` properties.
     */
    clearCache(): Promise<void> {
      return Promise.all([
        transporter.requestsCache.clear(),
        transporter.responsesCache.clear(),
      ]).then(() => undefined);
    },

    /**
     * Get the value of the `algoliaAgent`, used by our libraries internally and telemetry system.
     */
    get _ua(): string {
      return transporter.algoliaAgent.value;
    },

    /**
     * Adds a `segment` to the `x-algolia-agent` sent with every requests.
     *
     * @param segment - The algolia agent (user-agent) segment to add.
     * @param version - The version of the agent.
     */
    addAlgoliaAgent(segment: string, version?: string): void {
      transporter.algoliaAgent.add({ segment, version });
    },

    /**
     * Activate an existing model template. This action triggers the training and inference pipelines for the selected model.  The model is added with `status=pending`. If a model with the exact same source & index already exists, the API endpoint returns an error.
     *
     * @summary Activate a model instance.
     * @param activateModelParams - The activateModelParams object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    activateModelInstance(
      activateModelParams: ActivateModelParams,
      requestOptions?: RequestOptions
    ): Promise<ActivateModelInstanceResponse> {
      if (!activateModelParams) {
        throw new Error(
          'Parameter `activateModelParams` is required when calling `activateModelInstance`.'
        );
      }

      if (!activateModelParams.type) {
        throw new Error(
          'Parameter `activateModelParams.type` is required when calling `activateModelInstance`.'
        );
      }
      if (!activateModelParams.name) {
        throw new Error(
          'Parameter `activateModelParams.name` is required when calling `activateModelInstance`.'
        );
      }
      if (!activateModelParams.sourceID) {
        throw new Error(
          'Parameter `activateModelParams.sourceID` is required when calling `activateModelInstance`.'
        );
      }
      if (!activateModelParams.index) {
        throw new Error(
          'Parameter `activateModelParams.index` is required when calling `activateModelInstance`.'
        );
      }

      const requestPath = '/1/predict/models';
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      const request: Request = {
        method: 'POST',
        path: requestPath,
        queryParameters,
        headers,
        data: activateModelParams,
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * This method allow you to send requests to the Algolia REST API.
     *
     * @summary Send requests to the Algolia REST API.
     * @param del - The del object.
     * @param del.path - The path of the API endpoint to target, anything after the /1 needs to be specified.
     * @param del.parameters - Query parameters to be applied to the current query.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    del(
      { path, parameters }: DelProps,
      requestOptions?: RequestOptions
    ): Promise<Record<string, any>> {
      if (!path) {
        throw new Error('Parameter `path` is required when calling `del`.');
      }

      const requestPath = '/1{path}'.replace('{path}', path);
      const headers: Headers = {};
      const queryParameters: QueryParameters = parameters ? parameters : {};

      const request: Request = {
        method: 'DELETE',
        path: requestPath,
        queryParameters,
        headers,
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * Delete the model’s configuration, pipelines and generated predictions.
     *
     * @summary Delete a model instance.
     * @param deleteModelInstance - The deleteModelInstance object.
     * @param deleteModelInstance.modelID - The ID of the model to retrieve.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    deleteModelInstance(
      { modelID }: DeleteModelInstanceProps,
      requestOptions?: RequestOptions
    ): Promise<DeleteModelInstanceResponse> {
      if (!modelID) {
        throw new Error(
          'Parameter `modelID` is required when calling `deleteModelInstance`.'
        );
      }

      const requestPath = '/1/predict/models/{modelID}'.replace(
        '{modelID}',
        encodeURIComponent(modelID)
      );
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      const request: Request = {
        method: 'DELETE',
        path: requestPath,
        queryParameters,
        headers,
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * Delete all data and predictions associated with an authenticated user (userID) or an anonymous user (cookieID, sessionID).
     *
     * @summary Delete user profile.
     * @param deleteUserProfile - The deleteUserProfile object.
     * @param deleteUserProfile.userID - User ID for authenticated users or cookie ID for non-authenticated repeated users (visitors).
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    deleteUserProfile(
      { userID }: DeleteUserProfileProps,
      requestOptions?: RequestOptions
    ): Promise<DeleteUserProfileResponse> {
      if (!userID) {
        throw new Error(
          'Parameter `userID` is required when calling `deleteUserProfile`.'
        );
      }

      const requestPath = '/1/users/{userID}'.replace(
        '{userID}',
        encodeURIComponent(userID)
      );
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      const request: Request = {
        method: 'DELETE',
        path: requestPath,
        queryParameters,
        headers,
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * Get all users with predictions in the provided application.
     *
     * @summary Get all user profiles.
     * @param fetchAllUserProfilesParams - The fetchAllUserProfilesParams object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    fetchAllUserProfiles(
      fetchAllUserProfilesParams: FetchAllUserProfilesParams,
      requestOptions?: RequestOptions
    ): Promise<FetchAllUserProfilesResponse> {
      if (!fetchAllUserProfilesParams) {
        throw new Error(
          'Parameter `fetchAllUserProfilesParams` is required when calling `fetchAllUserProfiles`.'
        );
      }

      const requestPath = '/1/users';
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      const request: Request = {
        method: 'POST',
        path: requestPath,
        queryParameters,
        headers,
        data: fetchAllUserProfilesParams,
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * Get predictions, properties (raw, computed or custom) and segments (computed or custom) for a user profile.
     *
     * @summary Get user profile.
     * @param fetchUserProfile - The fetchUserProfile object.
     * @param fetchUserProfile.userID - User ID for authenticated users or cookie ID for non-authenticated repeated users (visitors).
     * @param fetchUserProfile.params - The params object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    fetchUserProfile(
      { userID, params }: FetchUserProfileProps,
      requestOptions?: RequestOptions
    ): Promise<UserProfile> {
      if (!userID) {
        throw new Error(
          'Parameter `userID` is required when calling `fetchUserProfile`.'
        );
      }

      if (!params) {
        throw new Error(
          'Parameter `params` is required when calling `fetchUserProfile`.'
        );
      }

      const requestPath = '/1/users/{userID}/fetch'.replace(
        '{userID}',
        encodeURIComponent(userID)
      );
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      const request: Request = {
        method: 'POST',
        path: requestPath,
        queryParameters,
        headers,
        data: params,
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * This method allow you to send requests to the Algolia REST API.
     *
     * @summary Send requests to the Algolia REST API.
     * @param get - The get object.
     * @param get.path - The path of the API endpoint to target, anything after the /1 needs to be specified.
     * @param get.parameters - Query parameters to be applied to the current query.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    get(
      { path, parameters }: GetProps,
      requestOptions?: RequestOptions
    ): Promise<Record<string, any>> {
      if (!path) {
        throw new Error('Parameter `path` is required when calling `get`.');
      }

      const requestPath = '/1{path}'.replace('{path}', path);
      const headers: Headers = {};
      const queryParameters: QueryParameters = parameters ? parameters : {};

      const request: Request = {
        method: 'GET',
        path: requestPath,
        queryParameters,
        headers,
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * Get a list of all available model types. Each model type can be activated more than once, by selecting a different data source.
     *
     * @summary Get a list of available model types.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getAvailableModelTypes(
      requestOptions?: RequestOptions
    ): Promise<GetAvailableModelTypesResponseInner[]> {
      const requestPath = '/1/predict/modeltypes';
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      const request: Request = {
        method: 'GET',
        path: requestPath,
        queryParameters,
        headers,
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * Get the configuration for a model that was activated.
     *
     * @summary Get a model’s instance configuration.
     * @param getModelInstanceConfig - The getModelInstanceConfig object.
     * @param getModelInstanceConfig.modelID - The ID of the model to retrieve.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getModelInstanceConfig(
      { modelID }: GetModelInstanceConfigProps,
      requestOptions?: RequestOptions
    ): Promise<ModelInstance> {
      if (!modelID) {
        throw new Error(
          'Parameter `modelID` is required when calling `getModelInstanceConfig`.'
        );
      }

      const requestPath = '/1/predict/models/{modelID}'.replace(
        '{modelID}',
        encodeURIComponent(modelID)
      );
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      const request: Request = {
        method: 'GET',
        path: requestPath,
        queryParameters,
        headers,
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * Get a list of all model instances.
     *
     * @summary Get model instances.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getModelInstances(
      requestOptions?: RequestOptions
    ): Promise<ModelInstance[]> {
      const requestPath = '/1/predict/models';
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      const request: Request = {
        method: 'GET',
        path: requestPath,
        queryParameters,
        headers,
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * Get the model instance’ training metrics.
     *
     * @summary Get a model’s instance metrics.
     * @param getModelMetrics - The getModelMetrics object.
     * @param getModelMetrics.modelID - The ID of the model to retrieve.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getModelMetrics(
      { modelID }: GetModelMetricsProps,
      requestOptions?: RequestOptions
    ): Promise<ModelMetrics[]> {
      if (!modelID) {
        throw new Error(
          'Parameter `modelID` is required when calling `getModelMetrics`.'
        );
      }

      const requestPath = '/1/predict/models/{modelID}/metrics'.replace(
        '{modelID}',
        encodeURIComponent(modelID)
      );
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      const request: Request = {
        method: 'GET',
        path: requestPath,
        queryParameters,
        headers,
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * This method allow you to send requests to the Algolia REST API.
     *
     * @summary Send requests to the Algolia REST API.
     * @param post - The post object.
     * @param post.path - The path of the API endpoint to target, anything after the /1 needs to be specified.
     * @param post.parameters - Query parameters to be applied to the current query.
     * @param post.body - The parameters to send with the custom request.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    post(
      { path, parameters, body }: PostProps,
      requestOptions?: RequestOptions
    ): Promise<Record<string, any>> {
      if (!path) {
        throw new Error('Parameter `path` is required when calling `post`.');
      }

      const requestPath = '/1{path}'.replace('{path}', path);
      const headers: Headers = {};
      const queryParameters: QueryParameters = parameters ? parameters : {};

      const request: Request = {
        method: 'POST',
        path: requestPath,
        queryParameters,
        headers,
        data: body ? body : {},
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * This method allow you to send requests to the Algolia REST API.
     *
     * @summary Send requests to the Algolia REST API.
     * @param put - The put object.
     * @param put.path - The path of the API endpoint to target, anything after the /1 needs to be specified.
     * @param put.parameters - Query parameters to be applied to the current query.
     * @param put.body - The parameters to send with the custom request.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    put(
      { path, parameters, body }: PutProps,
      requestOptions?: RequestOptions
    ): Promise<Record<string, any>> {
      if (!path) {
        throw new Error('Parameter `path` is required when calling `put`.');
      }

      const requestPath = '/1{path}'.replace('{path}', path);
      const headers: Headers = {};
      const queryParameters: QueryParameters = parameters ? parameters : {};

      const request: Request = {
        method: 'PUT',
        path: requestPath,
        queryParameters,
        headers,
        data: body ? body : {},
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * Update a model’s configuration.
     *
     * @summary Update a model instance.
     * @param updateModelInstance - The updateModelInstance object.
     * @param updateModelInstance.modelID - The ID of the model to retrieve.
     * @param updateModelInstance.updateModelParams - The updateModelParams object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    updateModelInstance(
      { modelID, updateModelParams }: UpdateModelInstanceProps,
      requestOptions?: RequestOptions
    ): Promise<UpdateModelInstanceResponse> {
      if (!modelID) {
        throw new Error(
          'Parameter `modelID` is required when calling `updateModelInstance`.'
        );
      }

      if (!updateModelParams) {
        throw new Error(
          'Parameter `updateModelParams` is required when calling `updateModelInstance`.'
        );
      }

      if (!updateModelParams.name) {
        throw new Error(
          'Parameter `updateModelParams.name` is required when calling `updateModelInstance`.'
        );
      }

      const requestPath = '/1/predict/models/{modelID}'.replace(
        '{modelID}',
        encodeURIComponent(modelID)
      );
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      const request: Request = {
        method: 'POST',
        path: requestPath,
        queryParameters,
        headers,
        data: updateModelParams,
      };

      return transporter.request(request, requestOptions);
    },
  };
}

/**
 * The client type.
 */
export type PredictClient = ReturnType<typeof createPredictClient>;
