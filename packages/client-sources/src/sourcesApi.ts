import {
  createAuth,
  createTransporter,
  getUserAgent,
} from '@experimental-api-clients-automation/client-common';
import type {
  CreateClientOptions,
  Headers,
  Host,
  Request,
  RequestOptions,
  QueryParameters,
} from '@experimental-api-clients-automation/client-common';

import type { PostIngestUrlResponse } from '../model/postIngestUrlResponse';
import type { PostURLJob } from '../model/postURLJob';

export * from '../model/models';
export const apiClientVersion = '0.0.5';

export type Region = 'de' | 'us';

function getDefaultHosts(region: Region): Host[] {
  return [
    {
      url: `data.${region}.algolia.com`,
      accept: 'readWrite',
      protocol: 'https',
    },
  ];
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createSourcesApi(
  options: CreateClientOptions & { region: Region }
) {
  const auth = createAuth(options.appId, options.apiKey, options.authMode);
  const transporter = createTransporter({
    hosts: options?.hosts ?? getDefaultHosts(options.region),
    hostsCache: options.hostsCache,
    requestsCache: options.requestsCache,
    responsesCache: options.responsesCache,
    baseHeaders: {
      'content-type': 'application/x-www-form-urlencoded',
      ...auth.headers(),
    },
    baseQueryParameters: auth.queryParameters(),
    userAgent: getUserAgent({
      userAgents: options.userAgents,
      client: 'Sources',
      version: apiClientVersion,
    }),
    timeouts: options.timeouts,
    requester: options.requester,
  });

  function addUserAgent(segment: string, version?: string): void {
    transporter.userAgent.add({ segment, version });
  }

  return {
    addUserAgent,
    /**
     * This method allow you to send requests to the Algolia REST API.
     *
     * @summary Send requests to the Algolia REST API.
     * @param del - The del object.
     * @param del.path - The path of the API endpoint to target, anything after the /1 needs to be specified.
     * @param del.parameters - URL-encoded query string. Force some query parameters to be applied for each query made with this API key.
     * @param del.body - The parameters to send with the custom request.
     */
    del(
      { path, parameters, body }: DelProps,
      requestOptions?: RequestOptions
    ): Promise<Record<string, any>> {
      const requestPath = '/1{path}'.replace('{path}', String(path));
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      if (!path) {
        throw new Error('Parameter `path` is required when calling `del`.');
      }

      if (parameters !== undefined) {
        queryParameters.parameters = parameters.toString();
      }

      const request: Request = {
        method: 'DELETE',
        path: requestPath,
        data: body,
      };

      return transporter.request(
        request,
        {
          queryParameters,
          headers,
        },
        requestOptions
      );
    },

    /**
     * This method allow you to send requests to the Algolia REST API.
     *
     * @summary Send requests to the Algolia REST API.
     * @param get - The get object.
     * @param get.path - The path of the API endpoint to target, anything after the /1 needs to be specified.
     * @param get.parameters - URL-encoded query string. Force some query parameters to be applied for each query made with this API key.
     */
    get(
      { path, parameters }: GetProps,
      requestOptions?: RequestOptions
    ): Promise<Record<string, any>> {
      const requestPath = '/1{path}'.replace('{path}', String(path));
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      if (!path) {
        throw new Error('Parameter `path` is required when calling `get`.');
      }

      if (parameters !== undefined) {
        queryParameters.parameters = parameters.toString();
      }

      const request: Request = {
        method: 'GET',
        path: requestPath,
      };

      return transporter.request(
        request,
        {
          queryParameters,
          headers,
        },
        requestOptions
      );
    },

    /**
     * This method allow you to send requests to the Algolia REST API.
     *
     * @summary Send requests to the Algolia REST API.
     * @param post - The post object.
     * @param post.path - The path of the API endpoint to target, anything after the /1 needs to be specified.
     * @param post.parameters - URL-encoded query string. Force some query parameters to be applied for each query made with this API key.
     * @param post.body - The parameters to send with the custom request.
     */
    post(
      { path, parameters, body }: PostProps,
      requestOptions?: RequestOptions
    ): Promise<Record<string, any>> {
      const requestPath = '/1{path}'.replace('{path}', String(path));
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      if (!path) {
        throw new Error('Parameter `path` is required when calling `post`.');
      }

      if (parameters !== undefined) {
        queryParameters.parameters = parameters.toString();
      }

      const request: Request = {
        method: 'POST',
        path: requestPath,
        data: body,
      };

      return transporter.request(
        request,
        {
          queryParameters,
          headers,
        },
        requestOptions
      );
    },

    /**
     * Add an ingestion job that will fetch data from an URL.
     *
     * @summary Create a new ingestion job via URL.
     * @param postURLJob - The postURLJob object.
     */
    postIngestUrl(
      postURLJob: PostURLJob,
      requestOptions?: RequestOptions
    ): Promise<PostIngestUrlResponse> {
      const requestPath = '/1/ingest/url';
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      if (!postURLJob) {
        throw new Error(
          'Parameter `postURLJob` is required when calling `postIngestUrl`.'
        );
      }

      if (!postURLJob.type) {
        throw new Error(
          'Parameter `postURLJob.type` is required when calling `postIngestUrl`.'
        );
      }
      if (!postURLJob.input) {
        throw new Error(
          'Parameter `postURLJob.input` is required when calling `postIngestUrl`.'
        );
      }
      if (!postURLJob.target) {
        throw new Error(
          'Parameter `postURLJob.target` is required when calling `postIngestUrl`.'
        );
      }

      const request: Request = {
        method: 'POST',
        path: requestPath,
        data: postURLJob,
      };

      return transporter.request(
        request,
        {
          queryParameters,
          headers,
        },
        requestOptions
      );
    },

    /**
     * This method allow you to send requests to the Algolia REST API.
     *
     * @summary Send requests to the Algolia REST API.
     * @param put - The put object.
     * @param put.path - The path of the API endpoint to target, anything after the /1 needs to be specified.
     * @param put.parameters - URL-encoded query string. Force some query parameters to be applied for each query made with this API key.
     * @param put.body - The parameters to send with the custom request.
     */
    put(
      { path, parameters, body }: PutProps,
      requestOptions?: RequestOptions
    ): Promise<Record<string, any>> {
      const requestPath = '/1{path}'.replace('{path}', String(path));
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      if (!path) {
        throw new Error('Parameter `path` is required when calling `put`.');
      }

      if (parameters !== undefined) {
        queryParameters.parameters = parameters.toString();
      }

      const request: Request = {
        method: 'PUT',
        path: requestPath,
        data: body,
      };

      return transporter.request(
        request,
        {
          queryParameters,
          headers,
        },
        requestOptions
      );
    },
  };
}

export type SourcesApi = ReturnType<typeof createSourcesApi>;

export type DelProps = {
  /**
   * The path of the API endpoint to target, anything after the /1 needs to be specified.
   */
  path: string;
  /**
   * URL-encoded query string. Force some query parameters to be applied for each query made with this API key.
   */
  parameters?: string;
  /**
   * The parameters to send with the custom request.
   */
  body?: Record<string, any>;
};

export type GetProps = {
  /**
   * The path of the API endpoint to target, anything after the /1 needs to be specified.
   */
  path: string;
  /**
   * URL-encoded query string. Force some query parameters to be applied for each query made with this API key.
   */
  parameters?: string;
};

export type PostProps = {
  /**
   * The path of the API endpoint to target, anything after the /1 needs to be specified.
   */
  path: string;
  /**
   * URL-encoded query string. Force some query parameters to be applied for each query made with this API key.
   */
  parameters?: string;
  /**
   * The parameters to send with the custom request.
   */
  body?: Record<string, any>;
};

export type PutProps = {
  /**
   * The path of the API endpoint to target, anything after the /1 needs to be specified.
   */
  path: string;
  /**
   * URL-encoded query string. Force some query parameters to be applied for each query made with this API key.
   */
  parameters?: string;
  /**
   * The parameters to send with the custom request.
   */
  body?: Record<string, any>;
};
