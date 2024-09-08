import { Control, Map, LatLngBounds, imageOverlay } from 'leaflet'

const views: { [key: string]: string } = {
  'Landforms': '/maps/landforms.png',
  'Köppen climate areas': '/maps/koppen.png',
  'Ocean currents': '/maps/currents.png',
  'Prevailing winds': '/maps/winds.png',
  'Tectonic plates': '/maps/tectonics.png'
}

const initView = (map: Map, bounds: LatLngBounds) => {
  let view = imageOverlay(views['Landforms'], bounds).addTo(map)

  const createViewControl = Control.extend({
    onAdd: () => {
      const div = document.createElement('div')
      div.className = 'leaflet-bar leaflet-control leaflet-control-custom'
      div.style.backgroundColor = '#ffffff'
      div.style.padding = '10px'

      const select = document.createElement('select')
      for (const key in views) {
        select.innerHTML += `<option value="${views[key]}">${key}</option>`
      }
      select.style.cursor = 'pointer'
      div.appendChild(select)

      select.addEventListener('change', () => {
        if (view) map.removeLayer(view)
        view = imageOverlay(select.value, bounds).addTo(map)
      })

      return div
    }
  })

  new createViewControl({ position: 'bottomleft' }).addTo(map)
}

export default initView
