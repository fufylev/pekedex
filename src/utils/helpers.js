import axios from 'axios'

export const API_URL = 'https://pokeapi.co/api/v2/'

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

export const pokemonTypes = {
  grass: false,
  poison: false,
  fire: false,
  water: false,
  flying: false,
  bug: false,
  fairy: false,
  psychic: false,
  normal: false,
  electric: false,
  ground: false,
  fighting: false,
  ice: false,
  rock: false,
  dragon: false,
  dark: false,
  ghost: false,
  steel: false
}
