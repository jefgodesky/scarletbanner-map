import { Control, Map } from 'leaflet'
import initModal from './modal'

const helpPromptControl = Control.extend({
  onAdd: () => {
    const div = document.createElement('div')
    div.className = 'leaflet-bar leaflet-control leaflet-control-custom'
    div.style.backgroundColor = '#ffffff'
    div.style.padding = '1em'
    div.innerHTML = 'Press [?] for help'
    return div
  }
})

const initHelp = (map: Map) => {
  new helpPromptControl({ position: 'bottomright' }).addTo(map)
  const modal = initModal('help')
  if (modal) {
    document.addEventListener('keydown', event => {
      if (event.key === '?') {
        modal.classList.toggle('open')
      }
    })
  }
}

export default initHelp
