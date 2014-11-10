'use strict';

require('chai').should();

var _ = require('lodash'),
    expect = require('chai').expect,
    random = require('../random');

describe('random/pin', function() {

    // 2 dimensional matrix [length][sample]
    var data = [];
    before(function() {
        _(20).times(function(length) {
            data[length] = [];

            _(100).times(function(i) {
                data[length][i] = random.pin(length);
            });
        });
    });

    describe('pin', function() {

        it('should return the correct length pin, digits only', function() {

            _(data).each(function(row, idx) {
                var length = idx;
                var reg = new RegExp('[0-9]{' + length + '}');

                _(row).each(function(pin) {

                    pin.should.match(reg);
                });
            });
        });

        it('should have an "even-ish" distribution', function() {

            var distribution = _(10).times(_.constant(0)).valueOf();

            _(1000).times(function() {
                _(random.pin(10)).each(function(chr) {
                    distribution[chr] += 1;
                });
            });

            var avg = _(distribution).reduce(function(sum, num) {
                return sum + num;
            }) / 10;

            _(distribution).each(function(val) {
                val.should.be.within(avg * 0.9, avg * 1.1);
            });
        });
    });

    describe('digitFromByte, no crypto/randomness', function() {

        it('should distribute 0..9 perfectly, given a spread of 0..255 to work with', function() {

            var distribution = _(10).times(_.constant(0)).valueOf();

            _(256).times(function(i) {
                var digit = random._digitFromByte(i);
                if (digit) distribution[ digit ] += 1;
            });

            // either
            distribution.should.have.length(10);

            // or, not sure which one I prefer
            expect(distribution).to.have.length(10);

            var firstVal = distribution[0];
            _(distribution).each(function(val) {
                expect(val).to.equal(firstVal);
            });

        });
    });
});
