import { map, latLng, latLngBounds, imageOverlay, MapOptions, CRS } from 'leaflet'
import initHelp from './help'
import initMeasurements from './measure'

const bounds = latLngBounds(
  latLng(-90, -180),
  latLng(90, 180)
)


const options: MapOptions = {
  crs: CRS.EPSG4326,
  center: latLng(0, 0),
  zoom: 2,
  minZoom: 2,
  maxZoom: 7,
  maxBounds: bounds,
  maxBoundsViscosity: 1
}

const avar = map('map', options)
imageOverlay('map.png', bounds).addTo(avar)
avar.fitBounds(bounds)
initHelp(avar)
initMeasurements(avar)
