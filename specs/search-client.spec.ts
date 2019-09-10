describe('AlgoliaSearch Client - algoliasearch-lite', () => {
  it('navigates to algoliasearch-lite.com', async () => {
    await browser.url('algoliasearch-lite.com');
  });

  it('performs a search query', async () => {
    const appId = `${process.env.ALGOLIA_APP_ID}`;
    const apiKey = `${process.env.ALGOLIA_API_KEY}`;

    await browser.executeAsync(
      (argv, done) => {
        // eslint-disable-next-line no-console
        console.log(argv);

        done();
      },
      { appId, apiKey }
    );
  });
});
