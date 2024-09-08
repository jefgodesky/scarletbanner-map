import { map, latLng, latLngBounds, imageOverlay, MapOptions } from 'leaflet'

const options: MapOptions = {
  center: latLng(0, 0),
  zoom: 12
}

const avar = map('map', options)
const bounds = latLngBounds(latLng(-90, -180), latLng(90, 180))
imageOverlay('map.png', bounds).addTo(avar)
avar.fitBounds(bounds)
