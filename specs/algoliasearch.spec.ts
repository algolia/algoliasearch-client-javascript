describe("algoliasearch api client - algoliasearch", () => {
  it("navigates to algoliasearch.com", async () => {
    await browser.url("algoliasearch.com");
  });

  it("performs SearchIndex::search", async () => {
    
    const credentials = await browser.credentials();

    const dataset = await browser.dataset();

    const results = await browser.executeAsync(function(credentials, done) {
      // @ts-ignore
      const index = algoliasearch(
        credentials.appId,
        credentials.apiKey
      ).initIndex("javascript-browser-testing-lite");

      Promise.all([
        index.search(""),
        index.search("red"),
        index.search("black")
      ]).then(function(responses) {
        done({
          all: responses[0],
          first: responses[1],
          last: responses[2]
        });
      });
    }, credentials);

    expect(results.all.nbHits).toBe(dataset.length);

    expect(results.first.hits.pop().value).toEqual("#f00");
    expect(results.first.nbHits).toBe(1);

    expect(results.last.hits.pop().value).toEqual("#000");
    expect(results.last.nbHits).toBe(1);
  });

  it("performs SearchIndex::searchForFacetValues", async () => {
    const credentials = await browser.credentials();

    const results = await browser.executeAsync(function(credentials, done) {
      // @ts-ignore
      const index = algoliasearch(
        credentials.appId,
        credentials.apiKey
      ).initIndex("javascript-browser-testing-lite");

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
