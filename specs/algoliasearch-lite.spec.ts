describe('AlgoliaSearch Client - Lite', () => {
  it('navigates to algoliasearch-lite.com', async () => {
    await browser.url('algoliasearch-lite.com');
  });

  it('performs SearchIndex::search', async () => {
    const credentials = await browser.credentials();

    const dataset = await browser.dataset();

    const results = await browser.executeAsync(async (credentials, done) => {
      // @ts-ignore
      const index = algoliasearch(credentials.appId, credentials.apiKey).initIndex(
        'javascript-browser-testing-lite',
      );

      done({
        all: await index.search(''),
        first: await index.search('red'),
        last: await index.search('black'),
      });
    }, credentials);

    expect(results.all.nbHits).toBe(dataset.length);

    expect(results.first.hits.pop().value).toEqual('#f00');
    expect(results.first.nbHits).toBe(1);

    expect(results.last.hits.pop().value).toEqual('#000');
    expect(results.last.nbHits).toBe(1);
  });

  it('performs SearchIndex::searchForFacetValues', async () => {
    // @ts-ignore
    const credentials = await browser.credentials();
    // @ts-ignore
    const results = await browser.executeAsync(async (credentials, done) => {
      // @ts-ignore
      const index = algoliasearch(credentials.appId, credentials.apiKey).initIndex(
        'javascript-browser-testing-lite',
      );

      done({
        red: await index.searchForFacetValues('color', 'red'),
        green: await index.searchForFacetValues('color', 'green'),
      });
    }, credentials);

    expect(results.red.facetHits.pop().value).toEqual('red');
    expect(results.green.facetHits.pop().value).toEqual('green');
  });
});
