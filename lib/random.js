'use strict';

var crypto = require('crypto');

function randomByte() {
    return crypto.randomBytes(1)[0];
}

exports.pin = function(length) {
    var len = length || 6;
    var result = '';

    for (var i = 0; i < len; i++) {
        result += String(Math.floor(randomByte() * 10 / 256));
    }

    return result;
};
