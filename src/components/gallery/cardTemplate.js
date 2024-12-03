import './gallery.css'
export const cardTemplate = (item) => {
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
