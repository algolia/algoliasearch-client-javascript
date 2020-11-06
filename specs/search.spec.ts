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

// @ts-ignore
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
          .then(function(response) {
            return Promise.all([response, client.search(params)]);
          })
          .then(done);
      }, credentials);

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

describe("search features - algoliasearch.com", () => {
  beforeEach(async () => browser.url("algoliasearch.com"));

  it("searchClient::findAnswers and searchIndex::findAnswers", async () => {
    const results = await browser.executeAsync(function(credentials, done) {
      // TODO: change these credentials to the main ones once enabled
      const client = algoliasearch(
        "CKOEQ4XGMU",
        "6560d3886292a5aec86d63b9a2cba447"
      );

      // TODO: remove this customization once the engine accepts url encoded query params
      client.transporter.userAgent.value = "answers-test";

      const index = client.initIndex("ted");

      Promise.all([
        index.findAnswers("sir ken robinson", ["en"]),
        index.findAnswers("what", ["en"]),
        index.findAnswers("sarah", ["en"], {
          nbHits: 2,
          params: {
            highlightPreTag: "_pre_",
            highlightPostTag: "_post_"
          }
        })
      ]).then(function(responses) {
        done({
          kenRobinson: responses[0],
          what: responses[1],
          sarah: responses[2]
        });
      });
    }, credentials);

    expect(results.kenRobinson.nbHits).toBe(10);

    expect(results.what.nbHits).toBe(0);

    expect(results.sarah.nbHits).toBe(2);
    expect(results.sarah.hits[0]._highlightResult.main_speaker.value).toBe(
      "_pre_Sarah_post_ Kay"
    );

    expect(results.sarah.hits[0]._answer.extract).toBe(
      "https://www.ted.com/talks/_pre_sarah_post__kay_how_many_lives_can_you_live\n"
    );
  });
});
