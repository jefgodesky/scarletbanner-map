import { Control, Map, divIcon, marker, polyline } from 'leaflet'
import { leafletToCoord } from './coordConverter'
import Coord from './Coord'
import Path, {calculatePathDistance} from './Path'
import initModal from './modal'
import calculateDistance from './distance'
import roundDistance from './roundDistance'

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

const reportPath = (path: Path, n: number): string => {
  const rows: string[] = []
  let prev: Coord | null = null
  for (const point of path.points) {
    const distance = prev
      ? roundDistance(calculateDistance(prev, point))
      : ''
    const lat = point.lat.toFixed(4)
    const lng = point.lng.toFixed(4)
    rows.push(`<tr><td>${lat}, ${lng}</td><td class="num">${distance}</td></tr>`)
    prev = point
  }

  const total = roundDistance(calculatePathDistance(path))

  const header = '<thead><tr><th>Lat/Lon</th><th class="num">Distance</th></tr></thead>'
  const footer = `<tfoot><tr><td>Total</td><td class="num">${total}</td></tr></tfoot>`
  const table = `<table>${header}<tbody>${rows.join('')}</tbody>${footer}</table>`
  const summary = `<summary>Path ${n} (${total})</summary>`
  return `<details>${summary}${table}</details>`
}

const updateMeasurements = (paths: Path[]) => {
  const div = document.getElementById('measurements-record')
  if (div && paths.length > 0) {
    let html = ''
    for (const [index, path] of paths.entries()) {
      html += reportPath(path, index + 1)
    }
    div.innerHTML = html
  }
}

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
      updateMeasurements([...window.paths, window.currentPath])
      marker(event.latlng, { icon: createMarker() }).addTo(map)
      if (prev) {
        const expr = [[prev.lat, prev.lng], [event.latlng.lat, event.latlng.lng]]
        polyline(expr, { color: 'black' }).addTo(map)
      }
    }
  })
}

export default initMeasurements
