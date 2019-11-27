["algoliasearch-lite.com", "algoliasearch.com"].forEach(preset => {
  describe(`errors - ${preset}`, () => {
    const credentials = {
      appId: `${process.env.ALGOLIA_APPLICATION_ID_1}`,
      apiKey: `${process.env.ALGOLIA_SEARCH_KEY_1}`
    };

    it(`navigates to ${preset}`, async () => browser.url(preset));

    it("cache responses", async () => {
      const responses = await browser.executeAsync(function(credentials, done) {
        const client = algoliasearch(credentials.appId, credentials.apiKey);
        const params = [
          {
            indexName: "javascript-browser-testing-lite",
            params: { clickAnalytics: "true" }
          }
        ];
        return client
          .search(params)
          .then(function (response) {
            return Promise.all([response, client.search(params)]);
          })
          .then(done);
      }, credentials);

      expect(responses.length).toBe(2);
      const queryID = responses[0].results[0].queryID;
      const queryID2 = responses[1].results[0].queryID;
      expect(queryID).toBe(queryID2);
    });
  });
});
