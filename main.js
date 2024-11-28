import './style.css'

// HEADER
const headerTemplate = () => {
  return `
    <h1 id="resetHeader">1</h1> <!-- Agregar un id para el evento de clic -->
    <input type="text" placeholder="Search" id="searchinput"/>
    <button id="searchbtn"><img src="https://w7.pngwing.com/pngs/348/1019/png-transparent-search-icon.png" alt="Search icon"/></button>
    <button id="darkmodebtn"><img src="https://images.vexels.com/content/145136/preview/sun-sharp-rays-big-icon-e55dd6.png" alt="Dark mode icon" id="darkmodeicon"></button>
    <button><img src="https://i.pinimg.com/736x/c5/60/62/c56062ce3d120bb50721216064f812cc.jpg" alt="Profile image" class="profileimg" /> </button>
  `
}
const themeSwitch = () => {
  document.body.classList.toggle('dark')
}

const listeners = () => {
  const darkmodebtn = document.querySelector('#darkmodebtn')
  darkmodebtn.addEventListener('click', () => {
    themeSwitch()
    const theme = document.body.classList.contains('dark')
    if (theme) {
      document.querySelector('#darkmodeicon').src =
        'https://png.pngtree.com/png-vector/20190215/ourmid/pngtree-vector-moon-icon-png-image_516458.jpg'
    } else {
      document.querySelector('#darkmodeicon').src =
        'https://images.vexels.com/content/145136/preview/sun-sharp-rays-big-icon-e55dd6.png'
    }
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
      printItems(images.response.results)
    })

    // Limpiar mensaje de error si es visible
    showErrorMessage('')
  })
}
const printHeaderTemplate = () => {
  document.querySelector('header').innerHTML = headerTemplate()
  listeners()
}

printHeaderTemplate()

// FOOTER
const templateFooter = () => {
  return `
    <h4>Copyright 2023 - Inspirest - Rock the Code</h4>
  `
}

const printFooterTemplate = () => {
  document.querySelector('footer').innerHTML = templateFooter()
}

printFooterTemplate()

// Card Template for Gallery
const cardTemplate = (item) => {
  return `
    <li class="gallery-item" style="background-image: url(${item.urls.regular}); border: 10px solid ${item.color}">
      <div class="info">
        <div class="save-btn">
          <button>Guardar</button>
        </div>
        <div class="links">
          <a href=${item.links.html} class="full-link">${item.links.html}</a>
          <div>
            <a href=${item.urls.full} target="_blank" class="links-icon">
              <img src="https://cdn-icons-png.flaticon.com/512/14/14777.png" alt="Upload icon"/>
            </a>
          </div>
        </div>
      </div>
    </li>
  `
}

// Unsplash API setup
import { createApi } from 'unsplash-js'

const unsplash = createApi({
  accessKey: import.meta.env.VITE_ACCESS_KEY
})

// Search function to fetch photos
const searchPhotos = async (keyword) => {
  const response = await unsplash.search.getPhotos({
    query: keyword,
    page: 1,
    perPage: 30
  })
  return response
}

// Gallery template for displaying images
const galleryTemplate = () => {
  return `
    <ul class="gallery"></ul>
  `
}

// Function to print the gallery items
const printItems = (items) => {
  const gallery = document.querySelector('.gallery')
  gallery.innerHTML = ''
  items.forEach((item) => {
    gallery.innerHTML += cardTemplate(item)
  })
}

// Show error message at the top of the page
const showErrorMessage = (message) => {
  const errorMessageDiv = document.querySelector('#error-message')
  errorMessageDiv.innerHTML = `
    <p>${message}</p>
  `
  errorMessageDiv.style.display = message ? 'block' : 'none'
  // Hide the error message after 7 seconds
  if (message) {
    setTimeout(() => {
      errorMessageDiv.style.display = 'none'
    }, 7000) // 7000 milliseconds = 7 seconds
  }
}

// Event listeners for the search button
const galleryListeners = async () => {
  const input = document.querySelector('#searchinput')
  const btn = document.querySelector('#searchbtn')

  btn.addEventListener('click', async () => {
    // 1. Primero muestra el mensaje de error, si es necesario.
    showErrorMessage('') // Limpiar cualquier mensaje de error existente

    // 3. Realiza la búsqueda
    const images = await searchPhotos(input.value)

    // 4. Si no hay imágenes, muestra un mensaje de error y busca imágenes de respaldo (gatos)
    if (images.response.results.length === 0) {
      showErrorMessage(
        'No se encontraron imágenes. Buscamos "gatos" por defecto. Puedes buscar "canada", "1", "2" o algún valor existente.'
      )
      const fallbackImages = await searchPhotos('gatos')
      // Después de mostrar el error, muestra las imágenes de respaldo
      printItems(fallbackImages.response.results)
    } else {
      // 5. Si se encuentran imágenes, limpia el mensaje de error y muestra las imágenes
      showErrorMessage('') // Borra el mensaje de error si hay resultados
      printItems(images.response.results)
    }
    // 6. Limpia el input después de cada búsqueda
    input.value = '' // Limpia el valor del input
  })
}

const printTemplate = async () => {
  // 6. Crea el contenedor de la galería y el contenedor de error
  const mainContent = document.querySelector('main')
  mainContent.innerHTML = `
    <div id="error-message" style="position: fixed; top: -100; width: 100%; background-color: red; color: white; text-align: center; padding: 10px; display: none;"></div>
    ${galleryTemplate()}
  `
  galleryListeners()

  // Término de búsqueda predeterminado (ej. "moon")
  const images = await searchPhotos('moon')
  printItems(images.response.results)
}

printTemplate()
