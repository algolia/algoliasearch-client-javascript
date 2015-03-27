module.exports = migrationLayer;

// Now onto the V2 related code:
//  If the client is using /latest/$BUILDNAME.min.js, load V2 of the library
//
//  Otherwise, setup a migration layer that will throw on old constructors like
//  new AlgoliaSearch().
//  So that users upgrading from v2 to v3 will have a clear information
//  message on what to do if they did not read the migration guide
function migrationLayer(buildName) {
  var isUsingLatest = require('./is-using-latest');
  var loadV2 = require('./load-v2');
  var oldGlobals = require('./old-globals');

  if (isUsingLatest(buildName)) {
    loadV2(buildName);
  } else {
    oldGlobals();
  }
}
