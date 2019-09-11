const credentials: CredentialsType = {
  appId: `${process.env.ALGOLIA_APPLICATION_ID_1}`,
  apiKey: `${process.env.ALGOLIA_SEARCH_KEY_1}`,
};

type Color = {
  readonly color: string;
  readonly value: string;
};

declare namespace WebdriverIOAsync {
  type Browser = {
    dataset(): readonly Color[];
  };
}

browser.addCommand('dataset', () => {
  return [
    {
      color: 'red',
      value: '#f00',
    },
    {
      color: 'green',
      value: '#0f0',
    },
    {
      color: 'blue',
      value: '#00f',
    },
    {
      color: 'cyan',
      value: '#0ff',
    },
    {
      color: 'magenta',
      value: '#f0f',
    },
    {
      color: 'yellow',
      value: '#ff0',
    },
    {
      color: 'black',
      value: '#000',
    },
  ];
});
