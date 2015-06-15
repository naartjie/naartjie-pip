import {expect} from 'chai'
import _ from 'lodash'

import validate from '../src/validate'
import {
  isValidMsisdn,
  isValidMobile,
  isValidEmail,
  isValidIsoDate,
  isValidHumanDate,
  sameNumbers
} from '../src/validate'

describe('exports', () => {

  it('should be a function', () => {
    expect(typeof validate).to.equal('function')
  })

  it('should be interchangeable', () => {
    expect(typeof validate).to.equal('function')
    expect(validate.isValidMsisdn).to.equal(isValidMsisdn)
    expect(validate.isValidMobile).to.equal(isValidMobile)
    expect(validate.isValidEmail).to.equal(isValidEmail)
    expect(validate.isValidIsoDate).to.equal(isValidIsoDate)
    expect(validate.isValidHumanDate).to.equal(isValidHumanDate)
    expect(validate.sameNumbers).to.equal(sameNumbers)
  })
})

describe('mobile number validation', () => {

  it('should validate Mobiles', () => {
    _(valid.mobiles.concat(valid.msisdns)).each(number =>
      expect(isValidMobile(number), number).to.be.true()
    ).value()
  })

  it('should fail for invalid Mobiles', () => {
    _(invalid.mobiles.concat(invalid.msisdns)).each(number =>
      expect(isValidMobile(number), number).to.be.false()
    ).value()
  })

  it('should fail for undefined/null/empty', () => {
    [undefined, null, ''].forEach(x => expect(isValidMobile(x)).to.be.false())
  })
})

describe('sameNumbers()', () => {
  it('should recognise 2 numbers are the same in a different format', () => {
    expect(sameNumbers({msisdn: '27849266611', mobile: '0849266611'})).to.be.true()
  })

  it('should return false for different numbers', () => {
    expect(sameNumbers({msisdn: '27849266611', mobile: '278492666111'})).to.be.false()
  })

  it('should return false for a botched up msisdn', () => {
    expect(sameNumbers({msisdn: '0849266611', mobile: '27849266611'})).to.be.false()
  })
})


describe('msisdn number validation', () => {

  it('should validate MSISDNs', () => {
    _(valid.msisdns).each(msisdn =>
      expect(isValidMsisdn(msisdn), msisdn).to.be.true()
    ).value()
  })

  it('should fail for invalid MSISDNs', () => {
    _(invalid.msisdns).each(msisdn =>
      expect(isValidMsisdn(msisdn), msisdn).to.be.false()
    ).value()
  })

  it('should fail for undefined/null/empty', () => {
    [undefined, null, ''].forEach(x => expect(isValidMsisdn(x)).to.be.false())
  })
})

describe('nice API', () => {

  it('for valid mobile', () => {
    const mobile = '00270849266611'
    const {isValid, msisdn, mobile: mobileReturned} = validate({mobile})

    expect(isValid).to.be.true()
    expect(msisdn).to.equal('27849266611')
    expect(mobileReturned).to.equal('0849266611')
  })

  it('for invalid mobile', () => {
    const mobile = '084926661'
    const {isValid, msisdn, mobile: mobileReturned} = validate({mobile})

    expect(isValid).to.be.false()
    expect(msisdn).to.be.undefined()
    expect(mobileReturned).to.be.undefined()
  })
})

describe('validate(): parameters', () => {

  it('should throw when both msisdn and mobile are given', (done) => {

    try {
      validate({mobile: '1', msisdn: '2'})
      done(Error('should have thrown'))
    } catch (e) {
      done()
    }
  })

  it('should return invalid when neither msisdn and mobile are given', () => {
    expect(validate({noMobile: '', noMsisdn: ''})).to.eql({isValid: false})
  })
})

describe('email validation', () => {

  it('should pass a valid email', () => {
    expect(isValidEmail('m@co.co')).to.be.true()
  })

  it('should fail for kak', () => {
    expect(isValidEmail('m@m.m')).to.be.false()
  })
})

describe('ISO date validation', () => {

  it('should pass a valid date', () => {
    expect(isValidIsoDate('1978-05-31')).to.be.true()
  })

  it('should fail an invalid date', () => {
    expect(isValidIsoDate('1978-31-05')).to.be.false()
  })

  it('should fail with null/undefined/empty', () => {
    [undefined, null, ''].forEach(x => expect(isValidIsoDate(x)).to.be.false())
  })

  it(`should fail a 'distant' date in the past`, () => {
    expect(isValidIsoDate('1899-12-31')).to.be.false('1899-12-31')
  })

  it(`should fail a 'distant' date in the future`, () => {
    expect(isValidIsoDate('2200-01-01')).to.be.false('2200-01-01')
  })
})

describe(`'human' date validation`, () => {
  it('should parse a valid date', () => {
    expect(isValidHumanDate('31/05/1978')).to.be.true('31/05/1978')
  })

  it('does not yet parse a date without zero padding', () => {
    expect(isValidHumanDate('31/5/1978')).to.be.false('31/5/1978')
  })
})

const valid = {
  msisdns: [
    '27849266611'
  ],
  mobiles: [
    '0849266611',
    '+27849266611',
    '270849266611',
    '0027849266611',
    '+0027849266611',
  ],
}

const invalid = {
  msisdn: [
    '2784926661',   // too short
    '278492666111', // too long
    '27851111111',  // wrong prefix
    '27891111111',  // wrong prefix
  ],
  mobiles: [
    '084926661',     // too short
    '+278492666111', // too long
    '27(0)849266611',// bracket
    'a0027849266611', // special char
    '00027849266611', // too many 0's at the start
  ],
}
