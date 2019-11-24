browser.addCommand("credentials", () => {
  return {
    appId: `${process.env.ALGOLIA_APPLICATION_ID_1}`,
    apiKey: `${process.env.ALGOLIA_SEARCH_KEY_1}`
  };
});
