import cases from 'jest-in-case';
import attachParameters from './attachParameters';

cases(
  'attaches parameters',
  ({ parameter }) => {
    const multipleFunctions = {
      anotherFn: (...args) => args,
    };
    const augmentedFunctions = attachParameters(multipleFunctions, parameter);

    expect(augmentedFunctions).toMatchSnapshot("doesn't change the object");

    expect(augmentedFunctions.anotherFn()).toMatchSnapshot('adds nothing');
    expect(augmentedFunctions.anotherFn({ test: true })).toMatchSnapshot(
      'add only normal'
    );

    expect(
      augmentedFunctions.anotherFn(undefined, { test: true })
    ).toMatchSnapshot('gets appended to meta param');

    expect(
      augmentedFunctions.anotherFn({ boring: 'test' }, { test: true })
    ).toMatchSnapshot("doesn't mess with first param");

    expect(
      augmentedFunctions.anotherFn({ boring: 'test' }, { extraMeta: true })
    ).toMatchSnapshot('override meta param');
  },
  {
    'meta parameter': {
      parameter: { extraMeta: 'something meta' },
    },
    'multiple meta and normal parameters': {
      parameter: {
        extraMeta: 'be careful',
        whatShouldIUse: 'algolia',
      },
    },
  }
);
