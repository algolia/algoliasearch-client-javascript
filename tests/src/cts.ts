import fsp from 'fs/promises';

import SwaggerParser from '@apidevtools/swagger-parser';
import type { OpenAPIV3 } from 'openapi-types';

import type { CTS, CTSBlock, Tests } from './types';
import { removeObjectName, walk } from './utils';

async function loadRequestsCTS(client: string): Promise<CTSBlock[]> {
  // load the list of operations from the spec
  const spec = await SwaggerParser.validate(`../specs/${client}/spec.yml`);
  if (!spec.paths) {
    throw new Error(`No paths found for spec ${client}/spec.yml`);
  }

  const operations = Object.values(spec.paths)
    .flatMap<OpenAPIV3.OperationObject>((p) => Object.values(p))
    .map((obj) => obj.operationId);

  const ctsClient: CTSBlock[] = [];

  for await (const file of walk(`./CTS/clients/${client}/requests`)) {
    if (!file.name.endsWith('json')) {
      continue;
    }
    const fileName = file.name.replace('.json', '');
    const fileContent = (await fsp.readFile(file.path)).toString();

    if (!fileContent) {
      throw new Error(`cannot read empty file ${fileName} - ${client} client`);
    }

    const tests: Tests[] = JSON.parse(fileContent);

    // check test validity against spec
    if (!operations.includes(fileName)) {
      throw new Error(`cannot find ${fileName} for the ${client} client`);
    }

    for (const test of tests) {
      if (test.testName === undefined) {
        test.testName = test.method;
      }

      // stringify request.data too
      test.request.data = JSON.stringify(test.request.data);
      test.request.searchParams = JSON.stringify(test.request.searchParams);

      if (Object.keys(test.parameters).length === 0) {
        test.parameters = undefined;
        test.parametersWithDataType = undefined;
        test.hasParameters = false;

        continue;
      }

      if (
        typeof test.parameters !== 'object' ||
        Array.isArray(test.parameters)
      ) {
        throw new Error(`parameters of ${test.testName} must be an object`);
      }

      // we stringify the param for mustache to render them properly
      // delete the object name recursively for now, but it could be use for `new $objectName(params)`
      removeObjectName(test.parameters);

      // Provide the `key` and `is*` params to apply custom logic in templates
      // include the `-last` param to join with comma in mustache
      test.parametersWithDataType = Object.entries(test.parameters).map(
        ([key, value], i, arr) => {
          const isDate = key === 'endAt';
          const isArray = Array.isArray(value);

          return {
            key,
            value: JSON.stringify(value),
            isString: typeof value === 'string' && isDate === false,
            isObject: typeof value === 'object' && isArray === false,
            isArray,
            isDate,
            '-last': i === arr.length - 1,
          };
        }
      );

      test.parameters = JSON.stringify(test.parameters);
      test.hasParameters = true;
    }

    ctsClient.push({
      operationId: fileName,
      tests,
    });
  }

  return ctsClient.sort((t1, t2) =>
    t1.operationId.localeCompare(t2.operationId)
  );
}

export async function loadCTS(client: string): Promise<CTS> {
  return {
    requests: await loadRequestsCTS(client),
  };
}
