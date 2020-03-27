import { action, configure, decorate, observable } from 'mobx'
import { register } from '../utils/API'

configure({ enforceActions: 'observed' })

class User {
  constructor () {
    this.isLoggedIn = false
    this.isRegistered = false
    this.error = ''
  }

  setIsRegistered () {
    this.isRegistered = true
  }

  clearStore () {
    this.isLoggedIn = false
    this.isRegistered = false
    this.error = ''
  }

  setError (error) {
    this.error = error
    console.log(error)
  }

  regUser (email, password, name, mobile) {
    register(email, password, name, mobile).then(response => {
      console.log(response)
      if (response.data.result === 'success') {
        this.setIsRegistered()
      } else {
        this.setError(response.data.result)
      }
    })
      .catch(error => this.setError(error))
  }
}

decorate(User, {
  setIsRegistered: action,
  setError: action,
  clearStore: action,
  isLoggedIn: observable,
  isRegistered: observable,
  error: observable
})

export default new User()
