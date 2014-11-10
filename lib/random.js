'use strict';

var crypto = require('crypto');

function randomByte() {
    return crypto.randomBytes(1)[0];
}

function digitFromByte(_byte) {
    if (_byte >= 250) return void 0;
    return String(_byte % 10);
}

exports._digitFromByte = digitFromByte;

function pinCode(length) {
    var len = length || 6;
    var result = '';

    while (result.length < len) {
        var digit = digitFromByte(randomByte());
        if (digit) result += digit;
    }

    return result;
}

exports.pin = exports.code = pinCode;
