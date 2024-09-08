import { Control, Map, divIcon, marker, polyline } from 'leaflet'
import { leafletToCoord } from './coordConverter'
import Path from './Path'
import initModal from './modal'

declare global {
  interface Window {
    paths: Path[]
    currentPath?: Path
    mode: 'measuring' | 'viewing'
  }
}

const createMarker = () => divIcon({
  className: 'point-marker',
  iconSize: [10, 10]
})

const measurePromptControl = Control.extend({
  onAdd: () => {
    const div = document.createElement('div')
    div.className = 'leaflet-bar leaflet-control leaflet-control-custom'
    div.style.backgroundColor = '#ffffff'
    div.style.padding = '1em'
    div.style.cursor = 'pointer'
    div.innerHTML = 'Measurements'
    return div
  }
})

const initMeasurements = (map: Map) => {
  window.paths = []
  window.mode = 'viewing'
  const ctrl = new measurePromptControl({ position: 'topright' }).addTo(map)
  const container = ctrl.getContainer()
  const modal = initModal('measurements')
  if (modal && container) {
    container.addEventListener('click', () => {
      modal.classList.toggle('open')
    })
  }

  map.on('keydown', event => {
    if (event.originalEvent.key === 'm' && window.mode !== 'measuring') {
      window.mode = 'measuring'
      window.currentPath = { points: [] }
    }
  })

  map.on('keyup', event => {
    if (window.mode === 'measuring') {
      const { currentPath } = window
      window.mode = 'viewing'
      if (currentPath && currentPath.points.length > 1) {
        window.paths.push(currentPath)
      }
      window.currentPath = undefined
    }
  })

  map.on('click', event => {
    if (window.mode === 'measuring' && window.currentPath) {
      const prev = window.currentPath.points.length > 0
        ? window.currentPath.points[window.currentPath.points.length - 1]
        : null
      window.currentPath.points.push(leafletToCoord(event.latlng))
      marker(event.latlng, { icon: createMarker() }).addTo(map)
      if (prev) {
        const expr = [[prev.lat, prev.lng], [event.latlng.lat, event.latlng.lng]]
        polyline(expr, { color: 'black' }).addTo(map)
      }
    }
  })
}

export default initMeasurements
