'use strict';

var istanbul = require('babel-istanbul');

module.exports = function (source) {
  var instrumenter = new istanbul.Instrumenter({
    embedSource: true,
    noAutoWrap: true
  });

  if (this.cacheable) {
    this.cacheable();
  }

  return instrumenter.instrumentSync(source, this.resourcePath);
};
