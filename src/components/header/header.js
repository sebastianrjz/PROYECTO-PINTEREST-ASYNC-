import './header.css'
// header.js
import { searchPhotos } from '../utils/api' // Asegúrate de importar correctamente
import { printItems, showErrorMessage } from '../utils/helpers' // Importar estas funciones si están en otro archivo

// Template del Header
export const headerTemplate = () => {
  return `
    <h1 id="resetHeader">1</h1>
    <input type="text" placeholder="Search" id="searchinput"/>
    <button id="searchbtn">
      <img src="https://w7.pngwing.com/pngs/348/1019/png-transparent-search-icon.png" alt="Search icon"/>
    </button>
    <button id="darkmodebtn">
      <img src="https://images.vexels.com/content/145136/preview/sun-sharp-rays-big-icon-e55dd6.png" alt="Dark mode icon" id="darkmodeicon">
    </button>
    <button>
      <img src="https://i.pinimg.com/736x/c5/60/62/c56062ce3d120bb50721216064f812cc.jpg" alt="Profile image" class="profileimg" />
    </button>
  `
}

// Función para activar o desactivar el modo oscuro
export const themeSwitch = () => {
  document.body.classList.toggle('dark')
}

// Función que maneja los eventos
export const listeners = () => {
  const darkmodebtn = document.querySelector('#darkmodebtn')
  darkmodebtn.addEventListener('click', () => {
    themeSwitch()
    const theme = document.body.classList.contains('dark')
    const darkModeIcon = document.querySelector('#darkmodeicon')
    darkModeIcon.src = theme
      ? 'https://png.pngtree.com/png-vector/20190215/ourmid/pngtree-vector-moon-icon-png-image_516458.jpg'
      : 'https://images.vexels.com/content/145136/preview/sun-sharp-rays-big-icon-e55dd6.png'
  })

  // Evento para restablecer la página al hacer clic en el <h1>
  const resetHeader = document.querySelector('#resetHeader')
  resetHeader.addEventListener('click', () => {
    // Limpiar el campo de búsqueda
    const input = document.querySelector('#searchinput')
    input.value = '' // Restablecer el valor del input

    // Limpiar la galería de imágenes
    const gallery = document.querySelector('.gallery')
    gallery.innerHTML = '' // Limpiar la galería

    // Mostrar un conjunto predeterminado de imágenes (por ejemplo, "moon")
    searchPhotos('moon').then((images) => {
      printItems(images.response.results) // Llenar la galería con las imágenes predeterminadas
    })

    // Limpiar cualquier mensaje de error
    showErrorMessage('')
  })
}

// Función para imprimir el Header
export const printHeaderTemplate = () => {
  document.querySelector('header').innerHTML = headerTemplate()
  listeners() // Asocia los listeners de eventos al header
}
