import { Transporter, createAuth, getUserAgent } from '@algolia/client-common';
import type {
  CreateClientOptions,
  Headers,
  Host,
  Request,
} from '@algolia/client-common';

import type { PostIngestUrlResponse } from '../model/postIngestUrlResponse';
import type { PostURLJob } from '../model/postURLJob';

export const apiClientVersion = '0.0.1';

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
  const transporter = new Transporter({
    hosts: options?.hosts ?? getDefaultHosts(options.region),
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

  /**
   * Add an ingestion job that will fetch data from an URL.
   *
   * @summary Create a new ingestion job via URL.
   * @param postURLJob - The postURLJob object.
   */
  function postIngestUrl(
    postURLJob: PostURLJob
  ): Promise<PostIngestUrlResponse> {
    const path = '/1/ingest/url';
    const headers: Headers = { Accept: 'application/json' };
    const queryParameters: Record<string, string> = {};

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
      path,
      data: postURLJob,
    };

    return transporter.request(request, {
      queryParameters,
      headers,
    });
  }

  return { addUserAgent, postIngestUrl };
}

export type SourcesApi = ReturnType<typeof createSourcesApi>;
