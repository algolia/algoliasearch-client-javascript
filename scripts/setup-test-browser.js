/* eslint-disable import/no-commonjs*/
const algoliasearch = require('../packages/algoliasearch');

const objects = [
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

(async () => {
  const index = algoliasearch(
    process.env.ALGOLIA_APPLICATION_ID_1,
    process.env.ALGOLIA_ADMIN_KEY_1
  ).initIndex('javascript-browser-testing-lite');

  if (await index.exists()) {
    // eslint-disable-next-line no-console
    console.log(
      `Index "javascript-browser-testing-lite" already exists on app id: ${process.env.ALGOLIA_APPLICATION_ID_1}`
    );

    return;
  }

  await index
    .setSettings({
      attributesForFaceting: ['searchable(color)'],
    })
    .wait();

  await index
    .saveObjects(objects, {
      autoGenerateObjectIDIfNotExist: true,
    })
    .wait();

  // eslint-disable-next-line no-console
  console.log(
    `Created index "javascript-browser-testing-lite" on app id: ${process.env.ALGOLIA_APPLICATION_ID_1}`
  );
})();
