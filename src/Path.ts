import Coord from './Coord.js'
import calculateDistance from './distance.js'

interface Path {
  points: Coord[]
}

const calculatePathDistance = (path: Path): number => {
  let distance = 0
  let prev = path.points[0]
  for (let i = 1; i < path.points.length; i++) {
    distance += calculateDistance(prev, path.points[i])
    prev = path.points[i]
  }
  return distance
}

export default Path
export { calculatePathDistance }
