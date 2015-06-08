import {expect} from 'chai'
import {isoToHuman} from '../src/format'

describe('date formatting', () => {
  it('should format iso to human readable format', () => {
    expect(isoToHuman('2004-12-04')).to.equal('04/12/2004')
    expect(isoToHuman('1981-10-31')).to.equal('31/10/1981')
  })
})
