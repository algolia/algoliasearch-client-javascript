module.exports = createAnalyticsClient;

var algoliasearch = require('../index.js');

function createAnalyticsClient(appId, apiKey, opts) {
  var analytics = {};

  opts = opts || {};
  // there need to be 4 hosts, like on the client, since if requests fail,
  // the counter goes up by 1, so we need to have the same amount of hosts
  // 4 because: -dsn, -1, -2, -3
  opts.hosts = opts.hosts || [
    'analytics.algolia.com',
    'analytics.algolia.com',
    'analytics.algolia.com',
    'analytics.algolia.com'
  ];
  opts.protocol = opts.protocol || 'https:';
  opts.forceAuthHeaders = true;

  analytics.as = algoliasearch(appId, apiKey, opts);

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
