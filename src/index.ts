import { map, latLng, latLngBounds, imageOverlay, MapOptions, CRS } from 'leaflet'
import initHelp from './help'

const bounds = latLngBounds(
  latLng(-90, -180),
  latLng(90, 180)
)


const options: MapOptions = {
  crs: CRS.EPSG4326,
  center: latLng(0, 0),
  zoom: 3,
  minZoom: 3,
  maxZoom: 7,
  maxBounds: bounds,
  maxBoundsViscosity: 1
}

const avar = map('map', options)
imageOverlay('map.png', bounds).addTo(avar)
avar.fitBounds(bounds)
initHelp(avar)
