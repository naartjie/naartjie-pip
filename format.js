'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

exports.isoToHuman = isoToHuman;
exports.humanToIso = humanToIso;
exports.parseHumanDate = parseHumanDate;

var _validate = require('./validate');

function isoToHuman(date) {
  if (!date) return undefined;

  var _date$split = date.split('-');

  var _date$split2 = _slicedToArray(_date$split, 3);

  var year = _date$split2[0];
  var month = _date$split2[1];
  var day = _date$split2[2];

  return day + '/' + month + '/' + year;
}

function humanToIso(date) {
  var _date$split3 = date.split('/');

  var _date$split32 = _slicedToArray(_date$split3, 3);

  var day = _date$split32[0];
  var month = _date$split32[1];
  var year = _date$split32[2];

  return year + '-' + month + '-' + day;
}

function parseHumanDate(date) {
  if (!(0, _validate.isValidHumanDate)(date)) return undefined;

  var _date$split4 = date.split('/');

  var _date$split42 = _slicedToArray(_date$split4, 3);

  var day = _date$split42[0];
  var month = _date$split42[1];
  var year = _date$split42[2];

  return new Date(year, month - 1, day);
}