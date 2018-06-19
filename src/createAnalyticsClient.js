module.exports = createAnalyticsClient;

const algoliasearch = require('../index.js');

function createAnalyticsClient(appId, apiKey) {
  const analytics = {};

  analytics.as = algoliasearch(appId, apiKey, {
    hosts: ['analytics.algolia.com'],
    protocol: 'https:'
  });

  analytics.getABTests = function(_params, callback) {
    var params = params || {};
    var offset = params.offset || 0;
    var limit = params.limit || 10;

    return this.as._jsonRequest({
      method: 'GET',
      url: '/2/abtests?offset=' + encodeURIComponent(offset) + '&limit=' + encodeURIComponent(limit),
      hostType: 'read',
      callback: callback
    });
  };

  analytics.getABTest = function(abTestID, callback) {
    return this.as._jsonRequest({
      method: 'GET',
      url: '/2/abtests/' + encodeURIComponent(abTestID),
      hostType: 'read',
      callback: callback
    });
  };

  analytics.addABTest = function(abTest, callback) {
    return this.as._jsonRequest({
      method: 'POST',
      url: '/2/abtests',
      body: abTest,
      hostType: 'read',
      callback: callback
    });
  };

  analytics.stopABTest = function(abTestID, callback) {
    return this.as._jsonRequest({
      method: 'POST',
      url: '/2/abtests/' + encodeURIComponent(abTestID) + '/stop',
      hostType: 'read',
      callback: callback
    });
  };

  analytics.deleteABTest = function(abTestID, callback) {
    return this.as._jsonRequest({
      method: 'DELETE',
      url: '/2/abtests/' + encodeURIComponent(abTestID),
      hostType: 'write',
      callback: callback
    });
  };

  analytics.waitTask = function(indexName, taskID, callback) {
    return this.as.initIndex(indexName).waitTask(taskID, callback);
  };

  return analytics;
}
