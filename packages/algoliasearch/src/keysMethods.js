export {
  get,
  _delete as delete,
  save,
  list
};

function get({req, indexName, apiKey}) {
  const path = indexName === undefined ? '/1/keys/%s' : '/1/indexes/%s/keys/%s';
  const pathParams = indexName === undefined ? [apiKey] : [indexName, apiKey];

  return req({
    method: 'GET',
    path,
    pathParams
  });
}

function _delete({req, indexName, apiKey}) {
  const path = indexName === undefined ? '/1/keys/%s' : '/1/indexes/%s/keys/%s';
  const pathParams = indexName === undefined ? [apiKey] : [indexName, apiKey];

  return req({
    method: 'DELETE',
    path,
    pathParams
  });
}

function save({req, indexName, apiKey}) {
  const method = apiKey === undefined ? 'POST' : 'PUT';
  const path = indexName === undefined ? '/1/keys/%s' : '/1/indexes/%s/keys/%s';
  const pathParams = indexName === undefined ? [apiKey] : [indexName, apiKey];

  return req({
    method,
    path,
    pathParams
  });
}

function list({req, indexName}) {
  const path = indexName === undefined ? '/1/keys' : '/1/indexes/%s/keys';
  const pathParams = indexName === undefined ? [] : [indexName];

  return req({
    method: 'GET',
    path,
    pathParams
  });
}
