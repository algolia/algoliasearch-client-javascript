module.exports = loadV2;

function loadV2(buildName) {
  var message =
    'Warning, you are using the `latest` version tag from jsDelivr for the AlgoliaSearch library.\n' +
    'We updated the AlgoliaSearch JavaScript client to V3, using `latest` is no more recommended.\n' +
    'Please read our migration guide at https://github.com/algolia/algoliasearch-client-js/wiki/Migration-guide-from-2.x.x-to-3.x.x';

  if (global.console) {
    if (global.console.warn) {
      global.console.warn(message);
    } else if (global.console.log) {
      global.console.log(message);
    }
  }

  // "temp" fix, to include the full JS client
  // for people loading /latest/ asynchronously
  require('./v2/algoliasearch.js');

  // why \x3c? http://stackoverflow.com/a/236106/147079
  // document.write(
  //   '\x3Cscript src="//cdn.jsdelivr.net/algoliasearch/2.9/' +
  //   buildName + '.min.js">\x3C/script>'
  // );
}
