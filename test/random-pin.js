'use strict';

require('chai').should();

var _ = require('lodash'),
    expect = require('chai').expect,
    random = require('../lib/random');

describe('random/pin', function() {

    describe('pin', function() {

        it('should return the correct length pin', function() {

            for (var length = 1; length < 20; length++) {
                for (var i = 0; i < 100; i++) {
                    random.pin(length).should.have.length(length);
                }
            }
        });

        it('should have even distribution', function() {

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

    describe('digitFromByte', function() {

        it('should distribute 0..9 evenly, given a 0..255 byte spread', function() {

            var distribution = _(10).times(_.constant(0)).valueOf();

            _(256).times(function(i) {
                var digit = random.digitFromByte(i);
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
