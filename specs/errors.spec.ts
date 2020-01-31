// @ts-ignore
const credentials = {
  appId: `${process.env.ALGOLIA_APPLICATION_ID_1}`,
  apiKey: `${process.env.ALGOLIA_SEARCH_KEY_1}`
};

const version = require("../lerna.json").version;

["algoliasearch-lite.com", "algoliasearch.com"].forEach(preset => {
  describe(`search features - ${preset}`, () => {
    beforeEach(async () => browser.url(preset));

    it("throws api errors", async () => {
      const headers =
        preset === "algoliasearch.com"
          ? {
              "content-type": "application/x-www-form-urlencoded",
              "x-algolia-api-key": "*****",
              "x-algolia-application-id": "NOCTT5TZUU"
            }
          : {
              "content-type": "application/x-www-form-urlencoded"
            };

      let url = `https://${credentials.appId}-dsn.algolia.net/1/indexes/SDFGHJKL/query?x-algolia-agent=Algolia%20for%20JavaScript%20(${version})%3B%20Browser`;

      if (preset === "algoliasearch-lite.com") {
        url += `%20(lite)&x-algolia-api-key=${credentials.apiKey}&x-algolia-application-id=${credentials.appId}`;
      }

      const err = await browser.executeAsync(function(credentials, done) {
        const client = algoliasearch(credentials.appId, credentials.apiKey);

        const index = client.initIndex("SDFGHJKL");

        index.search("").then(undefined, done);
      }, credentials);

      expect(err.transporterStackTrace[0].host).toEqual({
        accept: 1,
        protocol: "https",
        url: `${credentials.appId}-dsn.algolia.net`
      });

      expect(err.transporterStackTrace[0].request).toEqual({
        connectTimeout: 1,
        data: '{"query":""}',
        headers: headers,
        method: "POST",
        responseTimeout: 2,
        url: url
      });

      expect(err.transporterStackTrace[0].triesLeft).toBe(3);

      expect(err.name).toBe('ApiError');
      expect(err.status).toBe(404);
      expect(err.message).toBe('Index SDFGHJKL does not exist');
    });
  });
});
