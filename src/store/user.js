import { action, configure, decorate, observable } from 'mobx'
import { SERVER_API } from '../utils/API'
import axios from 'axios'

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

  setIsRegistered ({ token }) {
    this.isRegistered = true
    this.token = token
    localStorage.setItem('token', token)
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
  }

  setUser ({ avatar, token, name, email, id }) {
    this.token = token
    this.name = name
    this.email = email
    this.userID = id
    this.avatar = avatar
    localStorage.setItem('token', token)
    localStorage.setItem('name', name)
    localStorage.setItem('userID', id)
    localStorage.setItem('avatar', avatar)
  }

  registerUser ({ email, password, name, mobile }) {
    axios.post(`${SERVER_API}/signup`, {
      email, password
    })
      .then(response => {
        // console.log(response.data)
        if (response.status === 200) {
          this.setIsRegistered(response.data)
        }
      })
      .catch(error => {
        console.log(error)
        this.setError('Email is already in use')
      })
  }

  authenticate ({ email, password }) {
    axios.post(`${SERVER_API}/signin`, {
      email, password
    }, {
      headers: { Authorization: this.token }
    })
      .then(response => {
        // console.log(response.data)
        if (response.status === 200) {
          this.setLoggedIn()
          this.setUser(response.data)
        }
      })
      .catch(error => {
        console.log(error)
        this.setError('Email or password are incorrect')
      })
  }

  authenticateWithFacebook ({ avatar, name, email, accessToken, userID }) {
    axios.post('http://localhost:5000/users/oauth/facebook', {
      access_token: accessToken
    })
      .then(res => {
        // console.log(res.data)
        this.setLoggedIn()
        this.setUser({ avatar, token: res.data.token, name, email, id: userID })
      })
      .catch(e => console.log(e))
  }

  authenticateWithGoogle ({ avatar, name, email, accessToken, userID }) {
    axios.post('http://localhost:5000/users/oauth/google', {
      access_token: accessToken
    })
      .then(res => {
        console.log(res.data)
        this.setLoggedIn()
        this.setUser({ avatar, token: res.data.token, name, email, id: userID })
      })
      .catch(e => console.log(e))
  }
}

decorate(User, {
  setIsRegistered: action,
  authenticateWithFacebook: action,
  authenticateWithGoogle: action,
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
