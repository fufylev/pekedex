import axios from 'axios'

export const API_URL = 'https://pokeapi.co/api/v2/'

export async function fetchPokemons (page, itemsToShow) {
  return new Promise((resolve, reject) => {
    try {
      const url = `${API_URL}pokemon/?offset=${page === 1 ? 0 : (page - 1) * itemsToShow}&limit=${itemsToShow}`
      console.log(url)
      axios.get(url).then(response => {
        resolve(response.data.results)
      })
    } catch (e) {
      reject(e)
    }
  })
}
