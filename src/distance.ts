import Coord from './Coord'

const degreesToRadians = (degrees: number): number => degrees * (Math.PI / 180)

const calculateDistance = (a: Coord, b: Coord): number => {
  const radius = 5000 // Avar is a few thousand kilometers smaller than Earth
  const degreesLat = degreesToRadians(b.lat - a.lat)
  const degreesLon = degreesToRadians(b.lng - a.lng)
  const x =
    Math.sin(degreesLat / 2) * Math.sin(degreesLat / 2) +
    Math.cos(degreesToRadians(a.lat)) * Math.cos(degreesToRadians(b.lat)) *
    Math.sin(degreesLon / 2) * Math.sin(degreesLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x))
  return radius * c
}

export default calculateDistance
