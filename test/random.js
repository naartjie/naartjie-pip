import {should, expect} from 'chai'
import _ from 'lodash'

import random from '../src/random'

should()

describe('random/pin', () => {

  // 2 dimensional matrix [length][sample]
  let data = []
  before(() => {
    _.times(20, length => {
      data[length] = []
      _.times(100, i => data[length][i] = random.pin(length))
    })
    expect(data).to.have.length(20)
    expect(data[0].length).to.equal(100)
  })

  describe('pin', () => {

    it('should return the correct length pin, digits only', () => {

      _(data).each((row, idx) => {
        const length = idx
        const reg = new RegExp(`[0-9]{${length}}`)

        _(row).each(pin => pin.should.match(reg)).value()
      }).value()
    })

    it(`should have an 'even-ish' distribution`, () => {

      const numberOfDigits = 10
      const distribution = _.times(numberOfDigits, _.constant(0))

      _.times(1000, () => {
        _(random.pin(numberOfDigits)).each(chr => distribution[chr] += 1).value()
      })
      const avg = distribution.reduce((sum, num) => sum + num) / numberOfDigits
      distribution.forEach(val => val.should.be.within(avg * 0.9, avg * 1.1))
    })
  })

  describe('digitFromByte, no crypto/randomness', () => {

    it('should distribute 0..9 perfectly, given a spread of 0..255 to work with', () => {

      const numberOfDigits = 10
      const distribution = _(numberOfDigits).times(_.constant(0)).value()

      _.times(256, i => {
        const digit = random._digitFromByte(i)
        if (digit) distribution[digit] += 1
      })

      // either
      distribution.should.have.length(numberOfDigits)

      // or, not sure which one I prefer
      expect(distribution).to.have.length(numberOfDigits);

      const [firstVal] = distribution
      distribution.forEach(val => expect(val).to.equal(firstVal))
    })
  })
})
