import Path, { calculatePathDistance } from './Path.js'
import {expect} from 'chai'

describe('calculatePathDistance', () => {
  it('calculates the total distance along the path', () => {
    const estimate = 2464
    const path = {
      points: [
        { lat: 0, lng: 0 },
        { lat: -5, lng: -5 },
        { lat: 10, lng: 10 }
      ]
    }
    expect(Math.floor(calculatePathDistance(path))).to.equal(estimate)
  })
})
