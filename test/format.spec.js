import {expect} from 'chai'
import {isoToHuman, humanToIso} from '../src/format'

describe('date formatting', () => {
  it('should format iso to human readable format', () => {
    expect(isoToHuman('2004-12-04')).to.equal('04/12/2004')
    expect(isoToHuman('1981-10-31')).to.equal('31/10/1981')
  })

  it('should format human readable to iso', () => {
    expect(humanToIso('04/09/2004')).to.equal('2004-09-04')
    expect(humanToIso('31/10/1981')).to.equal('1981-10-31')
  })
})
