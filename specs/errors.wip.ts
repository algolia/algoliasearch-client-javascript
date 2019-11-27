["algoliasearch-lite.com", "algoliasearch.com"].forEach(preset => {
  describe(`errors - ${preset}`, () => {
    const credentials = {
      appId: `${process.env.ALGOLIA_APPLICATION_ID_1}`,
      apiKey: `${process.env.ALGOLIA_SEARCH_KEY_1}`
    };

    it(`navigates to ${preset}`, async () => browser.url(preset));

    it("throws errors", async () => {
      const err = await browser.executeAsync(function(credentials, done) {
        const client = algoliasearch(credentials.appId, credentials.apiKey);

        const index = client.initIndex("SDFGHJKL");
        
        index.search("").then(undefined, done);
      }, credentials);

      expect(err).toEqual({
        name: "ApiError",
        status: 404,
        message: "Index SDFGHJKL does not exist"
      });
    });
  });
});
