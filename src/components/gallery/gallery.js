// gallery.js

import './gallery.css'

// gallery.js
import { cardTemplate } from './cardTemplate' // Importar cardTemplate.js
import { searchPhotos } from '../utils/api' // Función de búsqueda de la API
import { showErrorMessage, printItems } from '../utils/helpers' // Funciones auxiliares

export const galleryTemplate = () => {
  return `
    <ul class="gallery"></ul>
  `
}

export const galleryListeners = async () => {
  const input = document.querySelector('#searchinput')
  const btn = document.querySelector('#searchbtn')

  btn.addEventListener('click', async () => {
    showErrorMessage('') // Limpiar cualquier mensaje de error
    const images = await searchPhotos(input.value)
    if (images.response.results.length === 0) {
      showErrorMessage(
        'No se encontraron imágenes. Buscamos "gatos" por defecto.'
      )
      const fallbackImages = await searchPhotos('gatos')
      printItems(fallbackImages.response.results)
    } else {
      showErrorMessage('')
      printItems(images.response.results)
    }
    input.value = '' // Limpiar el input después de cada búsqueda
  })
}

export const printGalleryTemplate = async () => {
  document.querySelector('main').innerHTML = `
    <div id="error-message" style="position: fixed; top: -100; width: 100%; background-color: red; color: white; text-align: center; padding: 10px; display: none;"></div>
    ${galleryTemplate()}
  `
  galleryListeners()

  // Término de búsqueda predeterminado (ej. "moon")
  const images = await searchPhotos('moon')
  printItems(images.response.results)
}
