export type Test<TStep = Step> = {
  testName: string;
  autoCreateClient?: boolean; // `true` by default
  steps: TStep[];
};

export type Step = CreateClientStep | MethodStep | VariableStep;

export type ModifiedStepForMustache = {
  isCreateClient: boolean;
  isVariable: boolean;
  isMethod: boolean;
  expectedError?: string;
  expectedNoError?: true;
} & (
  | CreateClientStep
  | VariableStep
  | (Omit<MethodStep, 'parameters'> & { parameters: string })
);

export type CreateClientStep = {
  type: 'createClient';
  parameters: {
    appId: string;
    apiKey: string;
  };
  expected?: Expected;
};

type VariableStep = {
  type: 'variable';
  object: string;
  path: string[];
  expected?: Expected;
};

type MethodStep = {
  type: 'method';
  object: string;
  path: string[];
  parameters?: any;
  expected?: Expected;
};

type Expected = {
  length?: number;
  error?: string | false;
  match?: any | { objectContaining: Record<any, any> };
};

export type TestsBlock<TStep = Step> = {
  operationId: string;
  tests: Array<Test<TStep>>;
};
