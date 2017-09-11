import cases from 'jest-in-case';
import attachParameters from './attachParameters';

cases(
  'attaches parameters',
  ({ parameter }) => {
    const multipleFunctions = {
      someFn: ({ normal, extraNormal }) => ({ normal, extraNormal }),
      anotherFn: (...args) => args,
    };
    const augmentedFunctions = attachParameters(multipleFunctions, parameter);

    expect(augmentedFunctions).toMatchSnapshot("doesn't change the object");

    expect(augmentedFunctions.someFn()).toMatchSnapshot(
      'no overriding arguments given'
    );

    expect(augmentedFunctions.someFn({ normal: 'something' })).toMatchSnapshot(
      'normal argument is given'
    );

    expect(
      augmentedFunctions.someFn({
        normal: 'something',
        extraNormal: 'override',
      })
    ).toMatchSnapshot('overridden normal arg');

    expect(augmentedFunctions.anotherFn()).toMatchSnapshot('adds nothing');
    expect(augmentedFunctions.anotherFn({ test: true })).toMatchSnapshot(
      'add only normal'
    );

    expect(
      augmentedFunctions.anotherFn(undefined, { test: true })
    ).toMatchSnapshot('adds only meta');

    expect(
      augmentedFunctions.anotherFn({ boring: 'test' }, { test: true })
    ).toMatchSnapshot('add both');

    expect(
      augmentedFunctions.anotherFn({ extraNormal: 'test' }, { extraMeta: true })
    ).toMatchSnapshot('override both');
  },
  {
    'normal parameter': {
      parameter: { args: { extraNormal: 'algolia' } },
    },
    'meta parameter': {
      parameter: { meta: { extraMeta: 'something meta' } },
    },
    'meta and normal parameter': {
      parameter: {
        args: { extraNormal: 'turbo' },
        meta: { extraMeta: 'be careful' },
      },
    },

    'multiple meta and normal parameters': {
      parameter: {
        args: { extraNormal: 'turbo', more: 'moar' },
        meta: { extraMeta: 'be careful', whatShouldIUse: 'algolia' },
      },
    },
  }
);
