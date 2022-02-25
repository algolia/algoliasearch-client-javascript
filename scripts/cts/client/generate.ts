import fsp from 'fs/promises';

import Mustache from 'mustache';

import { exists, toAbsolutePath } from '../../common';
import { createSpinner } from '../../oraLog';
import type { Generator } from '../../types';
import {
  walk,
  createClientName,
  createOutputDir,
  getOutputPath,
  loadTemplates,
} from '../utils';

import type { TestsBlock, Test, ModifiedStepForMustache } from './types';

const testPath = 'client';

async function loadTests(client: string): Promise<TestsBlock[]> {
  const testsBlocks: TestsBlock[] = [];
  const clientPath = toAbsolutePath(`tests/CTS/client/${client}`);

  if (!(await exists(clientPath))) {
    return [];
  }

  for await (const file of walk(clientPath)) {
    if (!file.name.endsWith('.json')) {
      continue;
    }
    const fileName = file.name.replace('.json', '');
    const fileContent = (await fsp.readFile(file.path)).toString();

    if (!fileContent) {
      throw new Error(`cannot read empty file ${fileName} - ${client} client`);
    }

    const tests: Test[] = JSON.parse(fileContent).map((testCase) => {
      if (!testCase.testName) {
        throw new Error(
          `Cannot have a test with no name ${fileName} - ${client} client`
        );
      }
      return {
        autoCreateClient: true,
        ...testCase,
      };
    });

    testsBlocks.push({
      operationId: fileName,
      tests,
    });
  }

  return testsBlocks;
}

export async function generateClientTests(
  {
    language,
    client,
    additionalProperties: { hasRegionalHost, packageName },
  }: Generator,
  verbose: boolean
): Promise<void> {
  let spinner = createSpinner(
    { text: 'generating client tests', indent: 4 },
    verbose
  ).start();
  const testsBlocks = await loadTests(client);

  if (testsBlocks.length === 0) {
    spinner.warn("skipping because tests doesn't exist");
    return;
  }
  spinner.info();
  spinner = createSpinner(
    { text: 'loading templates', indent: 8 },
    verbose
  ).start();

  await createOutputDir({ language, testPath });

  const { suite: template, ...partialTemplates } = await loadTemplates({
    language,
    testPath,
  });

  if (!template) {
    spinner.warn("skipping because template doesn't exist");
    return;
  }

  spinner.text = 'rendering templates';
  const code = Mustache.render(
    template,
    {
      import: packageName,
      client: createClientName(client, language),
      blocks: modifyForMustache(testsBlocks),
      hasRegionalHost: hasRegionalHost ? true : undefined,
    },
    partialTemplates
  );
  await fsp.writeFile(getOutputPath({ language, client, testPath }), code);

  spinner.succeed();
}

function serializeParameters(parameters: any): string {
  const serialized = JSON.stringify(parameters);
  return serialized.slice(1, serialized.length - 1); // remove array bracket surrounding the parameters
}

function modifyForMustache(
  blocks: TestsBlock[]
): Array<TestsBlock<ModifiedStepForMustache>> {
  return blocks.map(({ tests, ...blockRest }) => ({
    ...blockRest,
    tests: tests.map(({ steps, ...testRest }) => ({
      ...testRest,
      steps: steps.map((step) => {
        const base = {
          isCreateClient: step.type === 'createClient',
          isVariable: step.type === 'variable',
          isMethod: step.type === 'method',
        };

        let modified: ModifiedStepForMustache;
        if (step.type === 'method') {
          modified = {
            type: step.type,
            object: step.object,
            path: step.path,
            expected: step.expected,
            parameters: step.parameters && serializeParameters(step.parameters),
            ...base,
          };
        } else {
          modified = { ...step, ...base };
        }

        if (step.expected?.error) {
          modified.expectedError = step.expected.error;
        }

        if (step.expected?.error === false) {
          modified.expectedNoError = true;
        }

        if (step.expected?.match?.objectContaining) {
          if (!modified.expected) {
            modified.expected = {};
          }

          modified.expected.match = {
            objectContaining: JSON.stringify(
              step.expected?.match?.objectContaining
            ),
          };
        }

        return modified;
      }),
    })),
  }));
}
