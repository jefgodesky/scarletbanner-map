import { expect } from 'chai'
import calculateDistance from './distance.js'

describe('calculateDistance', () => {
  it('calculates distance between two points', () => {
    const estimate = 2461
    const actual = calculateDistance(
      { lat: 10, lng: 10 },
      { lat: -10, lng: -10 }
    )
    expect(Math.floor(actual)).to.equal(estimate)
  })
})
