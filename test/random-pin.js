'use strict';
require('chai').should();
var random = require('../lib/random');

describe('random/pin', function() {

    it('should return the correct length pin', function() {

        for (var length = 1; length < 50; length++) {
            for (var i = 0; i < 50; i++) {
                random.pin(length).should.have.length(length);
            }
        }
    });

});
