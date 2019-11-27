const objects = [
  {
    color: "red",
    value: "#f00"
  },
  {
    color: "green",
    value: "#0f0"
  },
  {
    color: "blue",
    value: "#00f"
  },
  {
    color: "cyan",
    value: "#0ff"
  },
  {
    color: "magenta",
    value: "#f0f"
  },
  {
    color: "yellow",
    value: "#ff0"
  },
  {
    color: "black",
    value: "#000"
  }
];

["algoliasearch-lite.com", "algoliasearch.com"].forEach(preset => {
  describe(`search features - ${preset}`, () => {
    const credentials = {
      appId: `${process.env.ALGOLIA_APPLICATION_ID_1}`,
      apiKey: `${process.env.ALGOLIA_SEARCH_KEY_1}`
    };

        it(`navigates to ${preset}`, async () => browser.url(preset));

    it("searchClient::search and searchIndex::search", async () => {
      const results = await browser.executeAsync(function(credentials, done) {
        const client = algoliasearch(credentials.appId, credentials.apiKey);

        const index = client.initIndex("javascript-browser-testing-lite");

        Promise.all([
          index.search(""),
          index.search("red"),
          index.search("black")
        ]).then(done);
      }, credentials);

      expect(results[0].nbHits).toBe(objects.length);

      expect(results[1].hits.pop().value).toEqual("#f00");
      expect(results[1].nbHits).toBe(1);

      expect(results[2].hits.pop().value).toEqual("#000");
      expect(results[2].nbHits).toBe(1);
    });

    it("searchClient::searchForFacetValues and searchIndex::searchForFacetValues", async () => {
      const results = await browser.executeAsync(function(credentials, done) {
        const client = algoliasearch(credentials.appId, credentials.apiKey);

        const index = client.initIndex("javascript-browser-testing-lite");

        Promise.all([
          index.searchForFacetValues("color", "red"),
          index.searchForFacetValues("color", "green")
        ]).then(function(responses) {
          done({
            red: responses[0],
            green: responses[1]
          });
        });
      }, credentials);

      expect(results.red.facetHits.pop().value).toEqual("red");
      expect(results.green.facetHits.pop().value).toEqual("green");
    });
  });
});
