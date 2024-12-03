
import { cardTemplate } from '../gallery/cardTemplate' // Ajusta la ruta según la estructura de tu proyecto

export const showErrorMessage = (message) => {
  const errorMessageDiv = document.querySelector('#error-message')
  errorMessageDiv.innerHTML = `<p>${message}</p>`
  errorMessageDiv.style.display = message ? 'block' : 'none'
  if (message) {
    setTimeout(() => {
      errorMessageDiv.style.display = 'none'
    }, 7000) // 7000 milliseconds = 7 seconds
  }
}

export const printItems = (items) => {
  const gallery = document.querySelector('.gallery')
  gallery.innerHTML = ''
  items.forEach((item) => {
    gallery.innerHTML += cardTemplate(item) // Usar cardTemplate.js
  })
}
