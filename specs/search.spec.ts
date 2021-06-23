import algolia from "../packages/algoliasearch/dist/algoliasearch";
declare const algoliasearch: typeof algolia;

declare const browser: {
  executeAsync<TArg, TResult>(
    cb: (arg: TArg, done: (res: TResult) => TResult) => void,
    arg: TArg
  ): TResult;
  executeAsync<TResult>(cb: (done: (res: TResult) => void) => void): TResult;

  url(to: string): void;
};

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

const credentials = {
  appId: `${process.env.ALGOLIA_APPLICATION_ID_1}`,
  apiKey: `${process.env.ALGOLIA_SEARCH_KEY_1}`
};

// @ts-ignore
const version = require("../lerna.json").version;

["algoliasearch-lite.com", "algoliasearch.com"].forEach(preset => {
  describe(`search features - ${preset}`, () => {
    beforeEach(async () => browser.url(preset));

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
      const results: any = await browser.executeAsync(function(
        credentials,
        done
      ) {
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
      },
      credentials);

      expect(results.red.facetHits.pop().value).toEqual("red");
      expect(results.green.facetHits.pop().value).toEqual("green");
    });

    it("cache requests", async () => {
      const responses: any = await browser.executeAsync(function(
        credentials,
        done
      ) {
        const client = algoliasearch(credentials.appId, credentials.apiKey);
        const params = [
          {
            indexName: "javascript-browser-testing-lite",
            params: { clickAnalytics: true }
          }
        ];
        const promise = client.search(params);
        const promise2 = client.search(params);
        const promise3 = client.search(params, { cacheable: false });

        return Promise.all([promise, promise2, promise3]).then(done);
      },
      credentials);

      expect(responses.length).toBe(3);
      const queryID = responses[0].results[0].queryID;
      const queryID2 = responses[1].results[0].queryID;
      const queryID3 = responses[2].results[0].queryID;
      expect(queryID).toBe(queryID2);

      // because is not cacheable
      expect(queryID2 === queryID3).toBe(false);
    });

    it("cache responses", async () => {
      const responses: any = await browser.executeAsync(function(
        credentials,
        done
      ) {
        const client = algoliasearch(credentials.appId, credentials.apiKey);
        const params = [
          {
            indexName: "javascript-browser-testing-lite",
            params: { clickAnalytics: true }
          }
        ];
        return client
          .search(params)
          .then(function(response) {
            return Promise.all([response, client.search(params)]);
          })
          .then(done);
      },
      credentials);

      expect(responses.length).toBe(2);
      const queryID = responses[0].results[0].queryID;
      const queryID2 = responses[1].results[0].queryID;
      expect(queryID).toBe(queryID2);
    });

    it("contains version", async () => {
      const browserVersion: string = await browser.executeAsync(function(done) {
        done(algoliasearch.version);
      });

      expect(browserVersion).toBe(version);
      expect(browserVersion.startsWith("4.")).toBe(true);
    });
  });
});
