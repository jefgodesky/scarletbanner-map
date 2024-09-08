import { Control, Map } from 'leaflet'
import initModal from './modal'

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
  const ctrl = new measurePromptControl({ position: 'topright' }).addTo(map)
  const container = ctrl.getContainer()
  const modal = initModal('measurements')
  if (modal && container) {
    container.addEventListener('click', () => {
      modal.classList.toggle('open')
    })
  }
}

export default initMeasurements
