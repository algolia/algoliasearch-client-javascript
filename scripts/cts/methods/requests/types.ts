export type ParametersWithDataType = {
  key: string;
  value: Record<string, any> | string;
  parent?: string;
  suffix: number;
  parentSuffix: number;
  isArray: boolean;
  isObject: boolean;
  isFreeFormObject: boolean;
  isString: boolean;
  isBoolean: boolean;
  isInteger: boolean;
  isDouble: boolean;
  '-last': boolean;
  objectName?: string;
};

export type RequestCTS = {
  testName?: string;
  method: string;
  parameters: Record<string, any>;
  request: {
    path: string;
    method: string;
    data?: Record<string, any>;
    searchParams?: Record<string, string>;
  };
};

export type RequestCTSOutput = {
  testName: string;
  testIndex: number;
  method: string;
  parameters: any;
  parametersWithDataType?: ParametersWithDataType[];
  hasParameters: boolean;
  request: {
    path: string;
    method: string;
    data?: string;
    searchParams?: string;
  };
};

export type CTSBlock = {
  operationId: string;
  tests: RequestCTSOutput[];
};

export type CTS = {
  requests: CTSBlock[];
};
