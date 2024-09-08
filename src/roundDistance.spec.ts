import { expect } from 'chai'
import roundDistance from './roundDistance.js'

describe('roundDistance', () => {
  it('rounds kilometers to a single decimal point', () => {
    expect(roundDistance(12.34567)).to.equal('12.3 km')
  })

  it('rounds up where appropriate', () => {
    expect(roundDistance(98.765432)).to.equal('98.8 km')
  })

  it('formats number with commas', () => {
    expect(roundDistance(12345.6789)).to.equal('12,345.7 km')
  })
})
