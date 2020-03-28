import axios from 'axios'

export const API_URL = 'https://pokeapi.co/api/v2/'
// eslint-disable-next-line no-unused-vars
export const facebookID = '210062593585689'
/**
 *
 * @param email
 * @param password
 * @param name
 * @param mobile
 * @returns {Promise<unknown>}
 */
export function register (email, password, name, mobile) {
  return new Promise((resolve, reject) => {
    axios.post('http://localhost:8888/register', {
      email, password, name, mobile
    })
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

/**
 *
 * @param email
 * @param password
 * @returns {Promise<unknown>}
 */
export function auth (email, password) {
  return new Promise((resolve, reject) => {
    axios.post('http://localhost:8888/auth', {
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

/**
 *
 * @param page
 * @param itemsToShow
 * @returns {Promise<unknown>}
 */
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

/**
 *
 * @param url
 * @returns {Promise<unknown>}
 */
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
