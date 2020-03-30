import axios from 'axios'

// Pokedex API url
export const API_URL = 'https://pokeapi.co/api/v2/'

// Local Server API url
export const SERVER_API = 'http://localhost:5000/users'

// ids for Facebook and Google - for both I registered the App
export const facebookID = '210062593585689'
export const google = '245233248634-fvk04phkvc0thk32iiugofspmvfardkj.apps.googleusercontent.com'

export function register (email, password, name, mobile) {
  return new Promise((resolve, reject) => {
    axios.post(`${SERVER_API}/signup`, {
      email, password
    })
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function auth ({ email, password, token }) {
  return new Promise((resolve, reject) => {
    axios.post(`${SERVER_API}/signin`, {
      email, password
    }, {
      headers: { Authorization: token }
    })
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export async function getAllPokemons (page, itemsToShow) {
  const url = `${API_URL}pokemon/?offset=${page === 1 ? 0 : (page - 1) * itemsToShow}&limit=${itemsToShow}`
  return new Promise((resolve, reject) => {
    try {
      axios.get(url).then(response => {
        resolve(response.data.results)
      })
    } catch (e) {
      reject(e)
    }
  })
}

export async function fetchPokemon (url) {
  return new Promise((resolve, reject) => {
    try {
      axios.get(url).then(response => {
        resolve(response.data)
      })
    } catch (e) {
      reject(e)
    }
  })
}

// export function togglePokemon (pokemonID, userID) {
//   return new Promise((resolve, reject) => {
//     try {
//       axios.post('http://localhost:8888/api/pokemons/bookmarked//userID', {
//         pokemonID,
//         userID
//       })
//         .then(function (response) {
//           console.log(response)
//           resolve(response)
//         })
//         .catch(function (error) {
//           reject(error)
//         })
//     } catch (e) {
//       reject(e)
//     }
//   })
// }
