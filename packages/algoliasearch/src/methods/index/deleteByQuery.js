// todo: make this into a package with the old code
export default function deleteByQuery(query, parameters) {
  return new Error(
    `this isn't supported, use algoliasearch v3, or: 

async function deleteByQuery(query, parameters) {
  const { hits } = await index.search('query', parameters);
  const ids = hits.map(hit => hit.objectId);
  return index.deleteObjects(ids);
}`
  );
}
