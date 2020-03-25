import { action, configure, decorate, observable, runInAction } from 'mobx'
import { fetchPokemons } from '../utils/helpers'

configure({ enforceActions: true })

class Store {
  constructor () {
    this.pokemons = []
    this.page = 1
    this.itemsToShow = 10
  }

  setPage (page) {
    this.page = page
    this.fetchItems()
  }

  setItemToShow (value) {
    this.itemsToShow = value
    this.fetchItems()
  }

  async fetchItems () {
    const page = this.page
    const itemsToShow = this.itemsToShow
    await fetchPokemons(page, itemsToShow)
      .then(data => {
        runInAction(() => {
          this.pokemons = data
        })
      })
  }
}

decorate(Store, {
  setItemToShow: action,
  setPage: action,
  fetchItems: action,
  pokemons: observable,
  page: observable,
  itemsToShow: observable
})

export default new Store()
