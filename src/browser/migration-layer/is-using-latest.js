'use strict';

// this module helps finding if the current page is using
// the cdn.jsdelivr.net/algoliasearch/latest/$BUILDNAME.min.js version

module.exports = isUsingLatest;

function isUsingLatest(buildName) {
  const toFind = new RegExp(
    `cdn\\.jsdelivr\\.net/algoliasearch/latest/${buildName.replace(
      '.',
      '\\.'
    ) // algoliasearch, algoliasearch.angular
    }(?:\\.min)?\\.js$`
  ); // [.min].js

  const scripts = document.getElementsByTagName('script');
  let found = false;
  for (
    let currentScript = 0, nbScripts = scripts.length;
    currentScript < nbScripts;
    currentScript++
  ) {
    if (scripts[currentScript].src && toFind.test(scripts[currentScript].src)) {
      found = true;
      break;
    }
  }

  return found;
}
