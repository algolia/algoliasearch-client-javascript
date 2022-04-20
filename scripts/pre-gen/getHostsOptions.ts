import { readFile } from 'fs/promises';
import { URL } from 'url';

import yaml from 'js-yaml';

import { exists, toAbsolutePath } from '../common';
import type { AdditionalProperties, Generator, Spec } from '../types';

/**
 * Retrieve hosts options from the bundled spec file to define them
 * in the `additionalProperties` of a generator.
 *
 * Those options are used to determine which host method should be generated
 * in the template.
 */
export async function getHostsOptions({
  client,
  key,
}: Pick<Generator, 'client' | 'key'>): Promise<AdditionalProperties> {
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

    return additionalProperties;
  } catch (e) {
    throw new Error(`Error reading yaml file ${key}: ${e}`);
  }
}
