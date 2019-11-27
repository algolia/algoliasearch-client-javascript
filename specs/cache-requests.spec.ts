["algoliasearch-lite.com", "algoliasearch.com"].forEach(preset => {
  describe(`errors - ${preset}`, () => {
    const credentials = {
      appId: `${process.env.ALGOLIA_APPLICATION_ID_1}`,
      apiKey: `${process.env.ALGOLIA_SEARCH_KEY_1}`
    };

    it(`navigates to ${preset}`, async () => browser.url(preset));

    it("cache requests", async () => {
      const responses = await browser.executeAsync(function(credentials, done) {
        const client = algoliasearch(credentials.appId, credentials.apiKey);
        const params = [
          {
            indexName: "javascript-browser-testing-lite",
            params: { clickAnalytics: "true" }
          }
        ];
        const promise = client.search(params);
        const promise2 = client.search(params);
        const promise3 = client.search(params, { cacheable: false });

        return Promise.all([promise, promise2, promise3]).then(done);
      }, credentials);

      expect(responses.length).toBe(3);
      const queryID = responses[0].results[0].queryID;
      const queryID2 = responses[1].results[0].queryID;
      const queryID3 = responses[2].results[0].queryID;
      expect(queryID).toBe(queryID2);

      // because is not cacheable
      expect(queryID2 === queryID3).toBe(false);
    });
  });
});
