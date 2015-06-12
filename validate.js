'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.isValidIsoDate = isValidIsoDate;
exports.isValidHumanDate = isValidHumanDate;

/**
 * @param {msisdn, mobile}
 * @returns {isValid, msisdn, mobile}
 */
exports.validate = validate;

function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }

exports['default'] = validate;
var isValidMsisdn = function isValidMsisdn(msisdn) {
  return valid('msisdn')(msisdn);
};
exports.isValidMsisdn = isValidMsisdn;
var isValidMobile = function isValidMobile(mobile) {
  return valid('mobile')(mobile);
};
exports.isValidMobile = isValidMobile;
var isValidEmail = function isValidEmail(email) {
  return valid('email')(email);
};

exports.isValidEmail = isValidEmail;

function isValidIsoDate(date) {
  if (!valid('isoDate')(date)) return false;

  var _date$split = date.split('-');

  var _date$split2 = _slicedToArray(_date$split, 3);

  var year = _date$split2[0];
  var month = _date$split2[1];
  var day = _date$split2[2];

  var check = new Date(year, month - 1, day, 12);

  return date === check.toISOString().slice(0, 10);
}

function isValidHumanDate(date) {

  if (!valid('humanDate')(date)) return false;

  var _date$split3 = date.split('/');

  var _date$split32 = _slicedToArray(_date$split3, 3);

  var day = _date$split32[0];
  var month = _date$split32[1];
  var year = _date$split32[2];

  var check = new Date(year, month - 1, day, 12);

  day = pad(2, check.getDate());
  month = pad(2, check.getMonth() + 1);
  year = pad(4, check.getFullYear());

  return date === '' + day + '/' + month + '/' + year;
}

function pad(len, str) {
  return ('0000000000' + str).slice(-len);
}

// extra exports so different import options work

validate.isValidMsisdn = isValidMsisdn;
validate.isValidMobile = isValidMobile;
validate.isValidEmail = isValidEmail;
validate.isValidIsoDate = isValidIsoDate;
validate.isValidHumanDate = isValidHumanDate;
function validate(_ref) {
  var mobile = _ref.mobile;
  var msisdn = _ref.msisdn;

  if (mobile && msisdn) throw Error('please provide only one, \'mobile\' or \'msisdn\'');
  if (!mobile && !msisdn) return { isValid: false };

  if (mobile && isValidMobile(mobile)) return {
    isValid: true,
    msisdn: toMsisdn(mobile),
    mobile: toMobile(mobile) };else if (isValidMsisdn(msisdn)) return {
    isValid: true,
    msisdn: msisdn,
    mobile: toMobile(msisdn) };else return {
    isValid: false
  };
}

var toMsisdn = function toMsisdn(validMobile) {
  return '27' + validMobile.slice(-9);
};
var toMobile = function toMobile(validMsisdn) {
  return '0' + validMsisdn.slice(-9);
};
var valid = function valid(type) {
  return function (entity) {
    return pattern[type].test(entity);
  };
};

var pattern = {
  // standard MSISDN format: 27849266611
  msisdn: /^27[6-8][0-9]{8}$/,

  // any format a human might write (excluding brackets and spaces)
  // 0849266611 / +278492666111 / 0027 etc etc
  mobile: /^(\+?(00)?270?|0)[6-8][0-9]{8}$/,

  // YYYY-MM-DD, with years limited to 1900-2100
  isoDate: /^(19|20|21)\d\d-[0|1]\d-[0-3]\d$/,

  // DD-MM-YYYY
  humanDate: /^[0-3]\d\/[0|1]\d\/(19|20|21)\d\d$/,

  // http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
  email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ };