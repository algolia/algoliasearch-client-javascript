import algolia from "../packages/algoliasearch/dist/algoliasearch";
declare const algoliasearch: typeof algolia;

declare const browser: {
  executeAsync<TArg, TResult>(
    cb: (arg: TArg, done: (res: TResult) => TResult) => void,
    arg: TArg
  ): TResult;

  url(to: string): void;
};

const credentials = {
  appId: "CKOEQ4XGMU",
  apiKey: "6560d3886292a5aec86d63b9a2cba447"
  // TODO: change these credentials to the main ones once enabled on our app
  // appId: `${process.env.ALGOLIA_APPLICATION_ID_1}`,
  // apiKey: `${process.env.ALGOLIA_SEARCH_KEY_1}`
};

describe("answers features - algoliasearch.com", () => {
  beforeEach(async () => browser.url("algoliasearch.com"));

  it("searchIndex::findAnswers", async () => {
    const results: any = await browser.executeAsync(function(
      credentials,
      done
    ) {
      const client = algoliasearch(credentials.appId, credentials.apiKey);

      // TODO: remove this customization once the engine accepts url encoded query params
      client.transporter.userAgent.value = "answers-test";

      const index = client.initIndex("ted");

      Promise.all([
        index.findAnswers("sir ken robinson", ["en"]),
        index.findAnswers("what", ["en"]),
        index.findAnswers("sarah jones", ["en"], {
          nbHits: 2,
          attributesForPrediction: ["main_speaker"],
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
    },
    credentials);

    expect(results.kenRobinson.nbHits).toBe(10);

    expect(results.what.nbHits).toBe(0);

    expect(results.sarah.nbHits).toBe(1);
    expect(results.sarah.hits[0]._highlightResult.main_speaker.value).toBe(
      "_pre_Sarah_post_ _pre_Jones_post_"
    );

    expect(results.sarah.hits[0]._answer.extract).toBe(
      "_pre_Sarah_post_ _pre_Jones_post_"
    );
  });
});
