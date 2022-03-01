import { readFile, stat, writeFile } from 'fs/promises';
import { URL } from 'url';

import yaml from 'js-yaml';

import { exists, toAbsolutePath } from '../common';
import type { Generator } from '../types';

type Server = {
  url: string;
  variables?: {
    [k: string]: {
      enum?: string[];
      default: string;
    };
  };
};

type Tag = {
  name: string;
  description: string;
};

type Path = Record<string, Record<string, any>>;

export type Spec = {
  servers: Server[];
  tags: Tag[];
  paths: Path[];
};

type AdditionalProperties = Partial<{
  hasRegionalHost: boolean;
  fallbackToAliasHost: boolean;
  isEuHost: boolean;
  isDeHost: boolean;
  host: string;
  topLevelDomain: string;
  /**
   * Client name needs to be explicitly set, no variables required in the host.
   */
  experimentalHost: string;
}>;

export async function setHostsOptions({
  client,
  key: generator,
}: Pick<Generator, 'client' | 'key'>): Promise<void> {
  const openapitoolsPath = toAbsolutePath('openapitools.json');
  if (!(await stat(openapitoolsPath))) {
    throw new Error(
      `File not found ${openapitoolsPath}.\nMake sure your run scripts from the root directory using yarn workspace.`
    );
  }
  const openapitools = JSON.parse(await readFile(openapitoolsPath, 'utf-8'));

  const generatorOptions = openapitools['generator-cli'].generators[generator];

  if (!generator || !generatorOptions) {
    throw new Error(`Generator not found: ${generator}`);
  }

  const specPath = toAbsolutePath(`specs/bundled/${client}.yml`);

  if (!(await exists(specPath))) {
    throw new Error(
      `File not found ${specPath}.\nMake sure your run scripts from the root directory using yarn workspace.`
    );
  }

  try {
    const { servers } = yaml.load(await readFile(specPath, 'utf8')) as Spec;
    const additionalProperties: AdditionalProperties = {};

    for (const [index, { url, variables }] of servers.entries()) {
      if (!url) {
        throw new Error(`Invalid server: ${url}`);
      }

      const { host } = new URL(url);

      // Edge case for `predict`, we should maybe have a proper way to detect
      // experimental/staging hosts
      if (client === 'predict') {
        additionalProperties.experimentalHost = host;
      }

      if (!variables?.region || !variables?.region?.enum) {
        continue;
      }

      additionalProperties.hasRegionalHost = true;

      if (!additionalProperties.fallbackToAliasHost) {
        // Determine if the current URL with `region` also have an alias without variables.
        additionalProperties.fallbackToAliasHost =
          servers.some((curr, i) => {
            // we skip current item
            if (i === index) {
              return false;
            }

            return curr.url === url.replace('.{region}', '');
          }) || undefined;
      }

      if (variables.region.enum.includes('eu')) {
        additionalProperties.isEuHost = true;
      }

      if (variables.region.enum.includes('de')) {
        additionalProperties.isDeHost = true;
      }

      // This is used for hosts like `insights` that uses `.io`
      additionalProperties.host = host.split('.')[0];
      additionalProperties.topLevelDomain = host.split('.').pop();
    }

    generatorOptions.additionalProperties = {
      ...generatorOptions.additionalProperties,
      ...additionalProperties,
    };

    await writeFile(openapitoolsPath, JSON.stringify(openapitools, null, 2));
  } catch (e) {
    throw new Error(`Error reading yaml file ${generator}: ${e}`);
  }
}
