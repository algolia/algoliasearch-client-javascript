import attachParameters from './attachParameters';

it('attaches an existing parameter', () => {
  const multipleFunctions = {
    someFn: ({ toAdd, host }) => ({ toAdd, host }),
    anotherUnused: () => {},
  };

  const augmentedFunctions = attachParameters(multipleFunctions, {
    toAdd: 'some extra new param',
  });

  expect(augmentedFunctions).toMatchSnapshot();

  expect(augmentedFunctions.someFn()).toMatchObject({
    host: undefined,
    toAdd: 'some extra new param',
  });

  expect(augmentedFunctions.someFn({ host: 'something' })).toMatchObject({
    host: 'something',
    toAdd: 'some extra new param',
  });

  expect(
    augmentedFunctions.someFn({ host: 'something', toAdd: 'override' })
  ).toMatchObject({
    host: 'something',
    toAdd: 'override',
  });
});
