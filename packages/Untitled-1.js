(async () => {
  // either manually await the task (with Promises)
  index
    .addObject(obj)
    .then(({ taskId }) => index.waitTask(taskId))
    .then(console.log('do whatever'));

  // or with async/await
  const { taskId } = await index.addObject(obj);
  await index.waitTask(taskId);
  // something else

  // or use waitTask implicitly
  await index.addObject(obj, { waitForIndexing: true });
  // something else
})();

const requester = createRequester();

search(requester, requests);
searchForFacetValues(requester, query);

requester.clearCache();

const App = () => <InstantSearch requester={requester} />;
