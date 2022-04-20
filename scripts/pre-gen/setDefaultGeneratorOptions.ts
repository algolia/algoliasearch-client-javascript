import { readFile, stat, writeFile } from 'fs/promises';

import clientsConfig from '../../config/clients.config.json';
import { toAbsolutePath } from '../common';
import type { Generator } from '../types';

import { getHostsOptions } from './getHostsOptions';

const AVAILABLE_CUSTOM_GEN = Object.entries(clientsConfig).reduce(
  (clients, [lang, clientOptions]) => {
    if (clientOptions.customGenerator) {
      return [...new Set([...clients, lang])];
    }

    return clients;
  },
  [] as string[]
);

/**
 * Sets default generator options to the openapitools.json config file.
 *
 * Defaults options are used to
 * - Set the hosts option based on the `servers` of input spec.
 * - Set config path.
 */
export async function setDefaultGeneratorOptions({
  language,
  client,
  key,
}: Generator): Promise<void> {
  const openapitoolsPath = toAbsolutePath('openapitools.json');
  if (!(await stat(openapitoolsPath))) {
    throw new Error(
      `File not found ${openapitoolsPath}.\nMake sure your run scripts from the root directory using yarn workspace.`
    );
  }
  const openapitools = JSON.parse(await readFile(openapitoolsPath, 'utf-8'));
  const generatorOptions = openapitools['generator-cli'].generators[key];

  if (!key || !generatorOptions) {
    throw new Error(`Generator not found: ${key}`);
  }

  const hostsOptions = await getHostsOptions({ client, key });

  openapitools['generator-cli'].generators[key] = {
    config: '#{cwd}/openapitools.json',
    gitHost: 'algolia',
    gitUserId: 'algolia',
    glob: `specs/bundled/${client}.yml`,
    templateDir: `#{cwd}/templates/${language}/`,
    generatorName: AVAILABLE_CUSTOM_GEN.includes(language)
      ? `algolia-${language}`
      : generatorOptions.generatorName,
    ...generatorOptions,
    additionalProperties: {
      ...generatorOptions.additionalProperties,
      ...hostsOptions,
    },
  };

  await writeFile(
    openapitoolsPath,
    JSON.stringify(openapitools, null, 2).concat('\n')
  );
}
