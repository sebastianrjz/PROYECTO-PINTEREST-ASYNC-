import { cardTemplate } from '../gallery/cardTemplate' // Ajusta la ruta según la estructura de tu proyecto

// gallery.js
export const showErrorMessage = (message) => {
  const errorMessageDiv = document.querySelector('#error-message')
  errorMessageDiv.innerHTML = `<p>${message}</p>`
  errorMessageDiv.style.display = message ? 'block' : 'none'

  if (message) {
    setTimeout(() => {
      errorMessageDiv.style.display = 'none'
    }, 7000) // 7 segundos
  }
}

export const printItems = (items) => {
  const gallery = document.querySelector('.gallery')
  gallery.innerHTML = ''
  items.forEach((item) => {
    gallery.innerHTML += cardTemplate(item) // Asumiendo que tienes una función cardTemplate
  })
}
