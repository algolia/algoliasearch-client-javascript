type ParametersWithDataType = {
  key: string;
  value: string;
  isArray: boolean;
  isObject: boolean;
  isString: boolean;
  '-last': boolean;
};

// This does not reflect the expected type of the CTS, it's rather the type passed to mustache
export type Tests = {
  testName?: string;
  method: string;
  parameters: any;
  parametersWithDataType: ParametersWithDataType[] | undefined;
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
  tests: Tests[];
};

export type CTS = {
  requests: CTSBlock[];
};
