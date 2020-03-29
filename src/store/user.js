import { action, configure, decorate, observable } from 'mobx'
import { auth, register } from '../utils/API'

configure({ enforceActions: 'observed' })

class User {
  constructor () {
    this.isLoggedIn = localStorage.getItem('token')
    this.isRegistered = false
    this.error = ''
    this.token = localStorage.getItem('token')
    this.name = localStorage.getItem('name')
    this.email = ''
    this.userID = localStorage.getItem('userID')
    this.avatar = localStorage.getItem('avatar')
  }

  setLoggedIn () {
    this.isLoggedIn = true
  }

  setIsRegistered () {
    this.isRegistered = true
  }

  logout () {
    this.isLoggedIn = false
    this.token = ''
    this.name = ''
    this.email = ''
    this.avatar = ''
    this.userID = null
    localStorage.removeItem('token')
    localStorage.removeItem('name')
    localStorage.removeItem('avatar')
    localStorage.removeItem('userID')
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

  setUser ({ token, name, email, id }) {
    this.token = token
    this.name = name
    this.email = email
    this.userID = id
    localStorage.setItem('token', `Bearer ${token}`)
    localStorage.setItem('name', name)
    localStorage.setItem('userID', id)
  }

  registerUser ({ email, password, name, mobile }) {
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

  authenticate ({ email, password }) {
    auth(email, password).then(response => {
      console.log(response)
      if (response.data.result === 'success') {
        console.log(response.data)
        this.setLoggedIn()
        this.setUser(response.data)
      } else {
        this.setError(response.data.result)
      }
    })
      .catch(error => this.setError(error))
  }

  authenticateWithAccount ({ avatar, name, email, accessToken, userID }) {
    this.avatar = avatar
    this.name = name
    this.email = email
    this.isLoggedIn = true
    this.token = accessToken
    localStorage.setItem('token', `Bearer ${accessToken}`)
    localStorage.setItem('name', name)
    localStorage.setItem('avatar', avatar)
  }
}

decorate(User, {
  setIsRegistered: action,
  authenticateWithAccount: action,
  setLoggedIn: action,
  setUser: action,
  setError: action,
  logout: action,
  clearStore: action,
  isLoggedIn: observable,
  isRegistered: observable,
  token: observable,
  name: observable,
  email: observable,
  avatar: observable,
  error: observable,
  userID: observable
})

export default new User()
