import { action, configure, decorate, observable, runInAction } from 'mobx'
import axios from 'axios'
import { API_URL } from '../utils/helpers'

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

    try {
      await axios.get(`${API_URL}pokemon/?offset=${page === 1 ? 0 : (page - 1) * itemsToShow}&limit=${itemsToShow}`)
        .then(response => {
          runInAction(() => {
            this.pokemons = response.data.results
          })
        })
    } catch (e) {
      console.log('Error - ', e)
    }
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
