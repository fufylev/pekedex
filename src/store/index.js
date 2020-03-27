import { action, computed, configure, decorate, observable } from 'mobx'
import { pokemonTypes } from '../utils/helpers'
import { fetchPokemon, getAllPokemons } from '../utils/API'

configure({ enforceActions: 'observed' })

class Store {
  constructor () {
    this.pokemons = []
    this.page = 1 // number of page taking into consideration itemsToShow variable
    this.itemsToShow = 9 // number of pokemons per page
    this.pokemonTypes = {}
    this.searchValue = '' // search line entry
  }

  setPage (page) {
    this.page = page
    this.fetchData()
  }

  setItemToShow (value) {
    this.itemsToShow = value
    this.fetchData()
  }

  setSearchValue (value) {
    this.searchValue = value
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
   * Returns pokemons array filtered by search line or by checked types
   * @returns Array {T[]}
   */
  get pokemonsFiltered () {
    // create an array of all types with as a string of concatenated type-value
    const typesRegex = Object.keys(this.pokemonTypes).map(key => `${key}-${this.pokemonTypes[key]}`)

    // create an Regex expression from search line
    const matchesFilter = new RegExp(this.searchValue, 'i')

    return this.pokemons.filter(({ name, id, types }) => {
      // create an array of the particular pokemon's type as a string of concatenated type-value
      const pokemonTypeRegex = types.map(type => `${type.type.name}-true`)

      // if search line contain entries:
      if (this.searchValue.length > 0) {
        // match by id or name
        return (matchesFilter.test(name) || matchesFilter.test(id))

        // if any type checked:
      } else if (Object.keys(this.pokemonTypes).some(type => this.pokemonTypes[type] === true)) {
        return pokemonTypeRegex.some(el => typesRegex.includes(el))
      }

      // if no any search requests then show all pokemons
      return true
    })
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
  pokemonsFiltered: computed,
  page: observable,
  itemsToShow: observable,
  pokemonTypes: observable,
  searchValue: observable,
  setSearchValue: action
})

export default new Store()
