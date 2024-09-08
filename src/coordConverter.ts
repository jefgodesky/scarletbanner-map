import { latLng } from 'leaflet'
import Coord from './Coord'

const leafletToCoord = (leaflet: latLng): Coord => {
  return {
    lat: leaflet.lat,
    lng: leaflet.lng
  }
}

const coordToLeaflet = (coord: Coord): latLng => {
  return latLng(coord.lat, coord.lng)
}

export { leafletToCoord, coordToLeaflet }
