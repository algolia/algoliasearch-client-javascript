import { searchApi } from '@algolia/client-search';

import './app.css';

const searchClient = searchApi(
  'QPBQ67WNIG',
  'b590ae1153bf574215ca1605c19eb1fe'
);

const searchButton = document.querySelector('#search');

searchButton?.addEventListener('click', async () => {
  const results = await searchClient.search({
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
