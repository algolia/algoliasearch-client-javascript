import attachParameters from './attachParameters';

it('attaches an existing parameter', () => {
  const multipleFunctions = {
    someFn: ({ normal }, { toAdd }) => ({ toAdd, normal }),
    anotherUnused: () => {},
  };

  const augmentedFunctions = attachParameters(multipleFunctions, {
    toAdd: 'some extra new param',
  });

  expect(augmentedFunctions).toMatchSnapshot();

  expect(augmentedFunctions.someFn()).toMatchObject({
    normal: undefined,
    toAdd: 'some extra new param',
  });

  expect(augmentedFunctions.someFn({ normal: 'something' })).toMatchObject({
    normal: 'something',
    toAdd: 'some extra new param',
  });

  expect(
    augmentedFunctions.someFn({ normal: 'something' }, { toAdd: 'override' })
  ).toMatchObject({ normal: 'something', toAdd: 'override' });
});
