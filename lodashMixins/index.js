'use strict';

var _ = require('lodash');

_.mixin({
  compactObject: _.partialRight(_.pick, _.identity),
  capitalize: function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  },
  capitalizeAll: function capitalizeAll(string) {
    return string.replace(/(^|\s)([a-z])/g, function (m, p1, p2) {
      return p1 + p2.toUpperCase();
    });
  }
});

module.exports = _;