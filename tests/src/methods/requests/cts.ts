import fsp from 'fs/promises';

import SwaggerParser from '@apidevtools/swagger-parser';
import type { OpenAPIV3 } from 'openapi-types';

import { removeEnumType, removeObjectName, walk } from '../../utils';

import type {
  CTS,
  CTSBlock,
  ParametersWithDataType,
  RequestCTS,
  RequestCTSOutput,
} from './types';

/**
 * Provide the `key` and `is*` params to apply custom logic in templates
 * include the `-last` param to join with comma in mustache.
 */
function transformParam({
  key = '$root',
  value,
  last = true,
  testName,
  parent,
  suffix = 0,
}: {
  key?: string;
  value: any;
  last?: boolean;
  testName: string;
  parent?: string;
  suffix?: number;
}): ParametersWithDataType | ParametersWithDataType[] {
  const isDate = key === 'endAt';
  const isArray = Array.isArray(value);
  let isObject = typeof value === 'object' && !isArray;
  const isEnum = isObject && '$enumType' in value;
  const isString = typeof value === 'string' && !isDate;
  const isBoolean = typeof value === 'boolean';
  const isInteger = Number.isInteger(value);
  const isDouble = typeof value === 'number' && !isInteger;
  const objectName: string | undefined = (value as any).$objectName;
  const isFreeFormObject = objectName === 'Object';

  if (isEnum) {
    isObject = false;
  }

  const isTypes = {
    isArray,
    isObject: isObject && !isFreeFormObject,
    isFreeFormObject,
    isEnum,
    isString,
    isBoolean,
    isInteger,
    isDouble,
  };

  const isRoot = key === '$root';

  let out = value;
  if (isEnum) {
    out = { enumType: value.$enumType, value: value.value };
  } else if (isObject) {
    // recursive on every key:value
    out = Object.entries(value)
      .filter(([prop]) => prop !== '$objectName')
      .map(([inKey, inValue], i, arr) =>
        transformParam({
          key: inKey,
          value: inValue,
          last: i === arr.length - 1,
          testName,
          parent: isRoot ? 'param' : key,
          suffix: suffix + 1,
        })
      );

    // Special case for root
    if (isRoot) {
      if (objectName) {
        return {
          key: 'param',
          value: out,
          objectName,
          suffix,
          parentSuffix: suffix,
          ...isTypes,
          '-last': true,
        };
      }
      return out;
    }

    if (!objectName) {
      // throw new Error(`Object ${key} missing property $objectName in test ${testName}`);
      // eslint-disable-next-line no-console
      console.log(
        `Object ${key} missing property $objectName in test ${testName}`
      );
    }
  } else if (isArray) {
    // recursive on all value
    out = value.map((v, i) =>
      transformParam({
        key: `${key}Param${i}`,
        value: v,
        last: i === value.length - 1,
        testName,
        parent: key,
        suffix: suffix + 1,
      })
    );
  }

  return {
    key,
    value: out,
    objectName,
    parent,
    suffix,
    parentSuffix: suffix - 1,
    ...isTypes,
    '-last': last,
  };
}

function createParamWithDataType({
  parameters,
  testName,
}: {
  parameters: Record<string, any>;
  testName: string;
}): ParametersWithDataType[] {
  const transformed = transformParam({ value: parameters, testName });
  if (Array.isArray(transformed)) {
    return transformed;
  }
  return [transformed];
}

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

  for await (const file of walk(`./CTS/methods/requests/${client}`)) {
    if (!file.name.endsWith('json')) {
      continue;
    }
    const fileName = file.name.replace('.json', '');
    const fileContent = (await fsp.readFile(file.path)).toString();

    if (!fileContent) {
      throw new Error(`cannot read empty file ${fileName} - ${client} client`);
    }

    const tests: RequestCTS[] = JSON.parse(fileContent);

    // check test validity against spec
    if (!operations.includes(fileName)) {
      throw new Error(`cannot find ${fileName} for the ${client} client`);
    }

    const testsOutput: RequestCTSOutput[] = [];
    let testIndex = 0;
    for (const test of tests) {
      const testOutput = test as RequestCTSOutput;
      testOutput.testName = test.testName || test.method;
      testOutput.testIndex = testIndex++;

      // stringify request.data too
      testOutput.request.data = JSON.stringify(test.request.data);
      testOutput.request.searchParams = JSON.stringify(
        test.request.searchParams
      );

      if (
        typeof test.parameters !== 'object' ||
        Array.isArray(test.parameters)
      ) {
        throw new Error(
          `parameters of ${testOutput.testName} must be an object`
        );
      }

      if (Object.keys(test.parameters).length === 0) {
        testOutput.parameters = undefined;
        testOutput.parametersWithDataType = undefined;
        testOutput.hasParameters = false;
      } else {
        testOutput.parametersWithDataType = createParamWithDataType({
          parameters: test.parameters,
          testName: testOutput.testName,
        });

        // we stringify the param for mustache to render them properly
        testOutput.parameters = JSON.stringify(
          removeEnumType(removeObjectName(test.parameters))
        );
        testOutput.hasParameters = true;
      }
      testsOutput.push(testOutput);
    }

    ctsClient.push({
      operationId: fileName,
      tests: testsOutput,
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
