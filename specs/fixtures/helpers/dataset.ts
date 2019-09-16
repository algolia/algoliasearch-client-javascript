type Color = {
  color: string;
  value: string;
};

declare namespace WebdriverIOAsync {
  interface Browser {
    dataset(): Color[];
  }
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
