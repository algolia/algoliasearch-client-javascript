import algoliasearch from './';

it('shows a nice and friendly message when using the old import on develop', () => {
  process.env = 'development';
  expect(algoliasearch).toThrowErrorMatchingSnapshot();
});

it('shows a short message when using the old import', () => {
  process.env = 'production';
  expect(algoliasearch).toThrowErrorMatchingSnapshot();
});
