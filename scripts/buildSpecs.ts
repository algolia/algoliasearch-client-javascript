import fsp from 'fs/promises';

import { hashElement } from 'folder-hash';

import { exists, run, toAbsolutePath } from './common';
import { createSpinner } from './oraLog';

async function buildSpec(
  client: string,
  outputFormat: string,
  verbose: boolean,
  useCache: boolean
): Promise<void> {
  createSpinner(`'${client}' spec`, verbose).start().info();
  const cacheFile = toAbsolutePath(`specs/dist/${client}.cache`);
  if (useCache) {
    const spinner = createSpinner(
      `checking cache for '${client}'`,
      verbose
    ).start();
    // check if file and cache exist
    if (await exists(toAbsolutePath(`specs/bundled/${client}.yml`))) {
      // compare with stored cache
      const hash = (await hashElement(toAbsolutePath(`specs/${client}`))).hash;
      if (await exists(cacheFile)) {
        const storedHash = (await fsp.readFile(cacheFile)).toString();
        if (storedHash === hash) {
          spinner.succeed(
            `skipped building ${client} spec because the files did not change`
          );
          return;
        }
      }
    }

    spinner.info(`cache not found for ${client}' spec`);
  }

  const spinner = createSpinner(`linting '${client}' spec`, verbose).start();
  await run(`yarn specs:lint ${client}`, { verbose });

  spinner.text = `building '${client}' spec`;
  await run(
    `yarn openapi bundle specs/${client}/spec.yml -o specs/bundled/${client}.${outputFormat} --ext ${outputFormat}`,
    { verbose }
  );

  spinner.text = `validating '${client}' spec`;
  await run(`yarn openapi lint specs/bundled/${client}.${outputFormat}`, {
    verbose,
  });

  spinner.text = `storing ${client} spec cache`;
  const hash = (await hashElement(toAbsolutePath(`specs/${client}`))).hash;
  await fsp.writeFile(cacheFile, hash);

  spinner.succeed(`building complete for '${client}' spec`);
}

export async function buildSpecs(
  clients: string[],
  outputFormat: 'json' | 'yml',
  verbose: boolean,
  useCache: boolean
): Promise<void> {
  await fsp.mkdir(toAbsolutePath('specs/dist'), { recursive: true });

  await Promise.all(
    clients.map((client) => buildSpec(client, outputFormat, verbose, useCache))
  );
}
