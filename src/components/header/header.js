import './header.css'
export const headerTemplate = () => {
  return `
    <h1 id="resetHeader">1</h1> 
    <input type="text" placeholder="Search" id="searchinput"/>
    <button id="searchbtn"><img src="https://w7.pngwing.com/pngs/348/1019/png-transparent-search-icon.png" alt="Search icon"/></button>
    <button id="darkmodebtn"><img src="https://images.vexels.com/content/145136/preview/sun-sharp-rays-big-icon-e55dd6.png" alt="Dark mode icon" id="darkmodeicon"></button>
    <button><img src="https://i.pinimg.com/736x/c5/60/62/c56062ce3d120bb50721216064f812cc.jpg" alt="Profile image" class="profileimg" /> </button>
  `
}

export const themeSwitch = () => {
  document.body.classList.toggle('dark')
}

export const listeners = () => {
  const darkmodebtn = document.querySelector('#darkmodebtn')
  darkmodebtn.addEventListener('click', () => {
    themeSwitch()
    const theme = document.body.classList.contains('dark')
    document.querySelector('#darkmodeicon').src = theme
      ? 'https://png.pngtree.com/png-vector/20190215/ourmid/pngtree-vector-moon-icon-png-image_516458.jpg'
      : 'https://images.vexels.com/content/145136/preview/sun-sharp-rays-big-icon-e55dd6.png'
  })

  const resetHeader = document.querySelector('#resetHeader')
  resetHeader.addEventListener('click', () => {
    const input = document.querySelector('#searchinput')
    input.value = ''
    const gallery = document.querySelector('.gallery')
    gallery.innerHTML = ''
    searchPhotos('moon').then((images) => {
      printItems(images.response.results)
    })
    showErrorMessage('')
  })
}

export const printHeaderTemplate = () => {
  document.querySelector('header').innerHTML = headerTemplate()
  listeners()
}
