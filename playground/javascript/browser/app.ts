import { searchClient } from '@experimental-api-clients-automation/client-search';

import './app.css';

const client = searchClient('QPBQ67WNIG', 'b590ae1153bf574215ca1605c19eb1fe');

client.addUserAgent('Browser playground', '0.0.1');

const searchButton = document.querySelector('#search');

searchButton?.addEventListener('click', async () => {
  const results = await client.search({
    indexName: 'docsearch',
    searchParams: {
      query: 'docsearch',
    },
  });

  const parent = document.querySelector('#results');

  results.hits?.forEach(({ objectID }) => {
    const children = document.createElement('p');
    children.innerHTML = objectID;

    parent?.appendChild(children);
  });
});
