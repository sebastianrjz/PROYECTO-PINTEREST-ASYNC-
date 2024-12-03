// api.js
import { createApi } from 'unsplash-js'

export const unsplash = createApi({
  accessKey: import.meta.env.VITE_ACCESS_KEY // Asegúrate de tener la clave de acceso
})

export const searchPhotos = async (keyword) => {
  const response = await unsplash.search.getPhotos({
    query: keyword,
    page: 1,
    perPage: 30
  })
  return response
}
