module.exports = getRequestURL;

function getRequestURL(credentials, pathname) {
  return {
    protocol: 'http:',
    host: credentials.applicationID + '-dsn.algolia.net',
    pathname: pathname,
    query: {
      'X-Algolia-API-Key': credentials.searchOnlyAPIKey,
      'X-Algolia-Application-Id': credentials.applicationID
    }
  };
}
