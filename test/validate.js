'use strict';

var chai = require('chai'),
    expect = chai.expect,
    validate = require('../validate').validate;

chai.should();

describe('mobile numbers', function() {

    describe('validate ZA MSISDNs', function() {

        var aValidMsisdn = '27849266611';
        var anInvalidMsisdn = '27949266611';

        it('should pick up a valid MSISDN', function() {

            var msisdn = validate({msisdn: aValidMsisdn});

            expect(msisdn).property('v').to.equal(aValidMsisdn);
            expect(msisdn).property('msisdn').to.equal(aValidMsisdn);
            expect(msisdn).propertty('mobile').to.equal('0849266611');
        });

        it('should should invalidate an invalid MSISDN', function() {

            var nope = validate({msisdn: anInvalidMsisdn});

            nope.should.not.be.ok();

            expect(nope.v).to.be('');
            expect(nope.msisdn).to.be.empty();
        });
    });


    describe('validate ZA Mobile numbers', function() {

        var aValidMobile = '0849266611';
        var anInvalidMobile = '0801211441';

        it('should validate a valid ZA Mobile number, and cannonicalize it', function() {

            var mobile = validate({mobile: aValidMobile});

            expect(mobile).to.be.ok();

            expect(mobile.v).to.equal(aValidMobile);
            expect(mobile.mobile).to.equal(aValidMobile);
            expect(mobile.msisdn).to.equal('27849266611');
        });

        it('should not validate an invalid ZA Mobile number', function() {

            var nope = validate({mobile: anInvalidMobile});

            nope.should.not.be.ok();

            expect(nope).property('v').to.be('');
            expect(nope).property('msisdn').to.be('');
            expect(nope).property('mobile').to.be('');
        });
    });
});
