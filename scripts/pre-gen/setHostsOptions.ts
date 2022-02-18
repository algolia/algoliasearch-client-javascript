import { readFile, stat, writeFile } from 'fs/promises';
import path from 'path';
import { URL } from 'url';

import yaml from 'js-yaml';

type Server = {
  url: string;
  variables?: {
    [k: string]: {
      enum?: string[];
      default: string;
    };
  };
};

type Spec = {
  servers: Server[];
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

async function setHostsOptions(): Promise<void> {
  const openapitoolsPath = path.join(process.cwd(), '../openapitools.json');
  if (!(await stat(openapitoolsPath))) {
    throw new Error(
      `File not found ${openapitoolsPath}.\nMake sure your run scripts from the root directory using yarn workspace.`
    );
  }
  const openapitools = JSON.parse(await readFile(openapitoolsPath, 'utf-8'));

  const [language, client] = process.argv.slice(2);
  const generator = `${language}-${client}`;
  const generatorOptions = openapitools['generator-cli'].generators[generator];

  if (!generator || !generatorOptions) {
    throw new Error(`Generator not found: ${generator}`);
  }

  const specPath = path.join(process.cwd(), `../specs/bundled/${client}.yml`);

  if (!(await stat(specPath))) {
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

setHostsOptions();
