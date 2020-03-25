import { action, configure, decorate, observable } from 'mobx'
import { getAllPokemons, fetchPokemon, pokemonTypes } from '../utils/helpers'

configure({ enforceActions: true })

class Store {
  constructor () {
    this.pokemons = []
    this.page = 1
    this.itemsToShow = 10
    this.pokemonTypes = {}
  }

  setPage (page) {
    this.page = page
    this.fetchData()
  }

  setItemToShow (value) {
    this.itemsToShow = value
    this.fetchData()
  }

  setPokemons (data) {
    this.pokemons = data
  }

  setPokemonTypes () {
    this.pokemonTypes = { ...pokemonTypes }
  }

  tickPokemonTypes (type) {
    this.pokemonTypes = { ...this.pokemonTypes, ...type }
  }

  /**
   * fetches pokemons from API by its url and once all have been recieved save them into observable variable
   * @param data {Array} - array of pokemons with their name and url
   * @returns {Promise<void>} - new array with pokemons, however this time with all necessary data
   */
  async fetchPokemons (data) {
    const pokemonsArray = await Promise.all(
      data.map(async pokemon => {
        const pokemonData = await fetchPokemon(pokemon.url)
        return pokemonData
      })
    )

    this.setPokemons(pokemonsArray)
    console.log(pokemonsArray)
  }

  async fetchData () {
    // clean the pokemons container
    this.setPokemons([])

    const page = this.page
    const itemsToShow = this.itemsToShow

    // get array with all requested pokemons with names and urls
    await getAllPokemons(page, itemsToShow)
      .then(data => this.fetchPokemons(data))
  }
}

decorate(Store, {
  setItemToShow: action,
  setPage: action,
  setPokemons: action,
  setPokemonTypes: action,
  tickPokemonTypes: action,
  pokemons: observable,
  page: observable,
  itemsToShow: observable,
  pokemonTypes: observable
})

export default new Store()
