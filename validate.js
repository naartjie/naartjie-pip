'use strict';

var _ = require('lodash');

var msisdnPattern = /^27[6-8][0-9]{8}$/;

exports.validate = function(opts) {
    var msisdn = opts.msisdn;

    if (msisdnPattern.test(msisdn)) {
        return {
            isValid: _.constant(true),
            v: msisdn,
            msisdn: msisdn
        };
    } else {
        return {
            isValid: _.constant(false),
            v: '',
            msisdn: '',
        };
    }

};
